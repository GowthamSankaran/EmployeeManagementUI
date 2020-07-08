import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { GeneralInfo } from 'src/app/model/general-info';
import { Employee } from 'src/app/model/employee';
import { CustomValidatorService } from '../../validators/custom-validator.service'

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

  @Output() generalInfoAdded : EventEmitter<any> = new EventEmitter();
  editMode : boolean = false;
  generalInfoForm : FormGroup;
  currentEmployee : Employee;


  constructor(private router : Router, private dataService : DataService, private route : ActivatedRoute, private customValidator : CustomValidatorService) { }

  ngOnInit(): void {
    this.editMode = this.router.url.includes("edit");
    if(this.editMode){
      let empId = parseInt(this.router.url.substr(6,1));
      this.currentEmployee = this.dataService.getData().filter(emp => emp.id==empId)[0];
    }
    this.generalInfoForm = new FormGroup({
      firstName : new FormControl((this.editMode ? this.currentEmployee.generalInfo.firstName : ''),[Validators.required, Validators.minLength(3), Validators.maxLength(15),Validators.pattern('[A-Za-z]*')]),
      lastName : new FormControl((this.editMode ? this.currentEmployee.generalInfo.lastName : ''), [Validators.required, Validators.minLength(3), Validators.maxLength(15),Validators.pattern('[A-Za-z]*')]),
      DOB : new FormControl((this.editMode ? this.currentEmployee.generalInfo.dateOfBirth : null),[Validators.required, this.customValidator.ageValidator])
    });
  }

  next(){
    let form = this.generalInfoForm.value;
    let generalInfo = new GeneralInfo(form.firstName, form.lastName, form.DOB);
    generalInfo.age = this.dataService.calculateAge(form.DOB);
    this.generalInfoAdded.emit(generalInfo);
    if(this.generalInfoForm.valid){
      if(this.editMode){
        this.router.navigate([`/edit/${this.currentEmployee.id}/contact`]);
      }else{
        this.router.navigate(['/add/contact']);
      }
    }
  }

}
