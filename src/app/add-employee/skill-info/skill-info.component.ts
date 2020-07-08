import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, Data } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SkillSet } from 'src/app/model/skill-set';
import { DataService } from 'src/app/service/data.service';
import { Employee } from 'src/app/model/employee';
import { Skill } from '../../model/skill.enum';

@Component({
  selector: 'app-skill-info',
  templateUrl: './skill-info.component.html',
  styleUrls: ['./skill-info.component.scss']
})
export class SkillInfoComponent implements OnInit {

  editMode : boolean = false;
  skillsCount : number[] = [1,1];
  skillsInfo : SkillSet[] = [];
  @Output() skillsInfoAdded : EventEmitter<any> = new EventEmitter();
  currentEmployee : Employee;
  skills : string[] = [];

  skillsInfoForm : FormGroup;
  constructor(private router : Router, private dataService : DataService) { 
    for(let skill in Skill){
      this.skills.push(Skill[skill]);
    }
  }

  ngOnInit(): void {
    this.editMode = this.router.url.includes("edit");
    if(this.editMode){
      let empId = parseInt(this.router.url.substr(6,1));
      this.currentEmployee = this.dataService.getData().filter(emp => emp.id==empId)[0];
    }
    this.skillsInfoForm = new FormGroup({});
    if(this.editMode){
      this.skillsCount.length = this.currentEmployee.skillsInfo.length;
      this.skillsCount.fill(1);
      for(let [index,element] of this.currentEmployee.skillsInfo.entries()){
        this.skillsInfoForm.addControl('skill'+index, new FormControl(element.name, [Validators.required]));
        this.skillsInfoForm.addControl('skillRating'+index, new FormControl(element.rating, [Validators.required]));
      }
    }else{
      for(let [index,element] of this.skillsCount.entries()){
        this.skillsInfoForm.addControl('skill' + index, new FormControl('', [Validators.required]));
        this.skillsInfoForm.addControl('skillRating' + index, new FormControl('', [Validators.required]));
      }
    }
  }

  addSkill(){
    this.addFormControl();
    this.skillsCount.push(1);
  }

  addFormControl(){
    let count = this.skillsCount.length;
    this.skillsInfoForm.addControl(('skill' + count), new FormControl('', [Validators.required]));
    this.skillsInfoForm.addControl(('skillRating' + count), new FormControl('', [Validators.required]));
  }

  removeFormControl(i : number){
    this.skillsCount.pop();
    this.skillsInfoForm.removeControl('skill' + i);
    this.skillsInfoForm.removeControl('skillRating' + i);
  }

  next(){
    let form = this.skillsInfoForm.value;
    for(let i=0; i<this.skillsCount.length; i++){
      let skill = new SkillSet();
      skill.name = form["skill" + i];
      skill.rating = form["skillRating" + i];
      this.skillsInfo.push(skill);
    }
    this.skillsInfoAdded.emit(this.skillsInfo);
    if(this.skillsInfoForm.valid){
      if(this.editMode){
        this.router.navigate([`/edit/${this.currentEmployee.id}/work`]);
      }else{
        this.router.navigate(['/add/work']);
      }
    }
  }
}
