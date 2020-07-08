import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { DataService } from '../service/data.service';
import { GeneralInfo } from '../model/general-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  editMode : boolean = false;
  employee : Employee = new Employee();
  componentEventMap : Map<string,string> = new Map();

  constructor(private dataService : DataService, private router : Router) { }

  ngOnInit(): void {
    this.editMode = this.router.url.includes("edit");
  }

  onActivate(childRouteComponent : any){
    let className = childRouteComponent.constructor.name;

    if(className === "GeneralInfoComponent"){
      childRouteComponent.generalInfoAdded.subscribe(data => this.employee.generalInfo = data);
    }else if(className === "ContactInfoComponent"){
      childRouteComponent.contactInfoAdded.subscribe(data => this.employee.contactInfo = data);
    }else if(className === "SkillInfoComponent"){
      childRouteComponent.skillsInfoAdded.subscribe(data => this.employee.skillsInfo = data);
    }else if(className === "WorkInfoComponent"){
      childRouteComponent.workInfosAdded.subscribe(data => {
        this.employee.workInfo = data;
        if(this.editMode){
          let empId = parseInt(this.router.url.substr(6,1));
          let editObservable = this.dataService.updateEmployee(empId, this.employee);
          editObservable.subscribe(response => {
            this.dataService.refreshEmployees();
            alert("Employee updated successfully");
            this.router.navigate(['/employee', empId]);
          }, error => {
            this.dataService.refreshEmployees();
            alert("Error occurred while updating the employee");
            this.router.navigate(['/home']);
          })
        }else{
          this.employee.id = 1;
          let addObservable = this.dataService.addEmployee(this.employee);
          addObservable.subscribe(response => {
            this.dataService.refreshEmployees();
            alert("Employee added successfully");
            this.router.navigate(['/employee', this.employee.id]);
          }, error => {
            this.dataService.refreshEmployees();
            alert("Error occurred while adding the employee");
            this.router.navigate(['/home']);
          });
        }
      });      
    }
  }
}
