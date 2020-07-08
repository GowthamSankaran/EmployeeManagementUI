import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { SkillSet } from 'src/app/model/skill-set';
import { SkillInfoComponent } from '../skill-info/skill-info.component';
import { SocialInfo } from 'src/app/model/social-info';
import { ContactInfo } from 'src/app/model/contact-info';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  editMode : boolean = false;
  socialInfosCount : number[] = [1];
  socialInfos : SocialInfo[]=[];
  @Output() contactInfoAdded : EventEmitter<any> = new EventEmitter();
  currentEmployee : Employee;
  urlPattern : string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  contactInfoForm : FormGroup;

  constructor(private router : Router, private dataService : DataService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.editMode = this.router.url.includes("edit");
    if(this.editMode){
      let empId = parseInt(this.router.url.substr(6,1));
      this.currentEmployee = this.dataService.getData().filter(emp => emp.id==empId)[0];
    }

    this.contactInfoForm = new FormGroup({
      email : new FormControl((this.editMode ? this.currentEmployee.contactInfo.email : ''),[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      phone : new FormControl((this.editMode ? this.currentEmployee.contactInfo.phone : ''),[Validators.required, Validators.pattern("[0-9]{10}")])
    });

    if(this.editMode){
      this.socialInfosCount.length = this.currentEmployee.contactInfo.socialInfos.length;
      this.socialInfosCount.fill(1);
      for(let [index,element] of this.currentEmployee.contactInfo.socialInfos.entries()){
        this.contactInfoForm.addControl('website'+index, new FormControl(element.type, [Validators.required]));
        this.contactInfoForm.addControl('websiteUrl'+index, new FormControl(element.url, [Validators.required, Validators.pattern(this.urlPattern)]));
      }
    }else{
      this.contactInfoForm.addControl('website0', new FormControl('', [Validators.required]));
      this.contactInfoForm.addControl('websiteUrl0', new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)]));
    }
  }

  addSocialInfo(){
    this.addFormControl();
    this.socialInfosCount.push(1);
  }

  addFormControl(){
    let count = this.socialInfosCount.length;
    this.contactInfoForm.addControl(('website'+count), new FormControl('', [Validators.required]));
    this.contactInfoForm.addControl(('websiteUrl'+count), new FormControl('', [Validators.required, Validators.pattern(this.urlPattern)]));
    console.log(this.contactInfoForm);
  }

  removeFormControl(i : number){
    this.socialInfosCount.pop();
    this.contactInfoForm.removeControl('website' + i);
    this.contactInfoForm.removeControl('websiteUrl' + i);
  }

  next(){
    console.log(this.contactInfoForm);
    let form = this.contactInfoForm.value;
    for(let i=0; i<this.socialInfosCount.length;i++){
      let socialInfo = new SocialInfo();
      socialInfo.type = form["website" + i];
      socialInfo.url = form["websiteUrl" + i];
      this.socialInfos.push(socialInfo);
    };

    let contactInfo = new ContactInfo(form.email, form.phone, this.socialInfos);
    this.contactInfoAdded.emit(contactInfo);
    if(this.contactInfoForm.valid){
      if(this.editMode){
        this.router.navigate([`/edit/${this.currentEmployee.id}/skills`]);
      }else{
        this.router.navigate(['/add/skills']);
      }
    }
  }
}
