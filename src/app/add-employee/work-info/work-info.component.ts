import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WorkExperience } from 'src/app/model/work-experience';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { WorkInfo } from 'src/app/model/work-info';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-work-info',
  templateUrl: './work-info.component.html',
  styleUrls: ['./work-info.component.scss']
})
export class WorkInfoComponent implements OnInit {

  editMode : boolean = false;
  workInfosCount : number[] = [1]
  workInfos : WorkExperience[] = [];
  @Output() workInfosAdded : EventEmitter<any> = new EventEmitter();
  currentEmployee : Employee;
  urlPattern : string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  
  workInfoForm : FormGroup;

  constructor(private dataService : DataService, private router : Router) { }

  ngOnInit(): void {
    this.editMode = this.router.url.includes("edit");
    if(this.editMode){
      let empId = parseInt(this.router.url.substr(6,1));
      this.currentEmployee = this.dataService.getData().filter(emp => emp.id==empId)[0];
    }
    this.workInfoForm = new FormGroup({});
    if(this.editMode){
      this.workInfosCount.length = this.currentEmployee.workInfo.experienceInfo.length;
      this.workInfosCount.fill(1);
      for(let [index,element] of this.currentEmployee.workInfo.experienceInfo.entries()){
        this.workInfoForm.addControl('company'+index, new FormControl(element.company, [Validators.required, Validators.minLength(3), Validators.maxLength(25),Validators.pattern('[A-Za-z\\s]*')]));
        this.workInfoForm.addControl('role'+index, new FormControl(element.role, [Validators.required]));
        this.workInfoForm.addControl('location'+index, new FormControl(element.location, [Validators.required]));
        this.workInfoForm.addControl('companyWebsite'+index, new FormControl(element.companyWebsite, [Validators.required, Validators.pattern(this.urlPattern)]));
        this.workInfoForm.addControl('joinedDate'+index, new FormControl(element.joinedDate, [Validators.required]));
        this.workInfoForm.addControl('relievedDate'+index, new FormControl(element.relievedDate, [Validators.required]));
      }
    }else{
      this.workInfoForm.addControl('company0', new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25),Validators.pattern('[A-Za-z\\s]*')]));
      this.workInfoForm.addControl('role0', new FormControl('', [Validators.required]));
      this.workInfoForm.addControl('location0', new FormControl('', [Validators.required]));
      this.workInfoForm.addControl('companyWebsite0', new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)]));
      this.workInfoForm.addControl('joinedDate0', new FormControl('', [Validators.required]));
      this.workInfoForm.addControl('relievedDate0', new FormControl('', [Validators.required]));
    }
  }

  addExperience(){
    this.addFormControl();
    this.workInfosCount.push(1);
  }

  addFormControl(){
    let count = this.workInfosCount.length;
    this.workInfoForm.addControl(('company'+count), new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25),Validators.pattern('[A-Za-z\\s]*')]));
    this.workInfoForm.addControl(('role'+count), new FormControl('', [Validators.required]));
    this.workInfoForm.addControl(('location'+count), new FormControl('', [Validators.required]));
    this.workInfoForm.addControl(('companyWebsite'+count), new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)]));
    this.workInfoForm.addControl(('joinedDate'+count), new FormControl('', [Validators.required]));
    this.workInfoForm.addControl(('relievedDate'+count), new FormControl('', [Validators.required]));
  }

  removeFormControl(i : number){
    this.workInfosCount.pop();
    this.workInfoForm.removeControl('company' + i);
    this.workInfoForm.removeControl('role' + i);
    this.workInfoForm.removeControl('location' + i);
    this.workInfoForm.removeControl('companyWebsite' + i);
    this.workInfoForm.removeControl('joinedDate' + i);
    this.workInfoForm.removeControl('relievedDate' + i);
  }

  submit(){
    let workInfo = new WorkInfo();
    let form = this.workInfoForm.value;
    let totalExperience = 0;

    for(let i=0; i<this.workInfosCount.length; i++){
      let exp = new WorkExperience();
      exp.company = form["company" + i];
      exp.role = form["role" + i];
      exp.location = form["location" + i];
      exp.companyWebsite = form["companyWebsite" + i];
      exp.joinedDate = form["joinedDate" + i];
      exp.relievedDate = form["relievedDate" + i];
      exp.experience = this.dataService.calculateExperience(exp.joinedDate, exp.relievedDate);
      this.workInfos.push(exp);
    }
    workInfo.experienceInfo = this.workInfos;
    for(let info of this.workInfos){
      totalExperience+=info.experience;
    }
    workInfo.totalExperience=totalExperience;
    this.workInfosAdded.emit(workInfo);
  }

}
