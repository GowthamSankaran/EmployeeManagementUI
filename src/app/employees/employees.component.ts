import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service'
import { Employee } from '../model/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees : Employee[];
  searchParam : string;
  sortParam : string = "";
  errorMessage : string = "";

  constructor(private dataService : DataService, private router : Router) { }

  ngOnInit(): void {
    this.employees = this.dataService.getData();
  }

  selectEmployee(employee : Employee) : void{
    this.router.navigate(['employee',employee.id]);
  }

  search(){
    this.errorMessage="";
    let searchValue = this.searchParam.trim();
    if(searchValue.length>0){
      if(Number.isInteger(parseInt(searchValue))){
        let convertedParam = parseInt(searchValue);
        this.employees = this.dataService.getData().filter(employee => {
          return employee.id===convertedParam;
        });
      }else{
        this.employees = this.dataService.getData().filter(employee => {
          return employee.generalInfo.fullName.toLowerCase().includes(searchValue.toLowerCase());
        });
      }
      if(this.employees.length===0){
        console.log("No employees found");
        this.errorMessage="No employees found";
      }
    }
  }

  sortEmployees(){
    if(this.sortParam.length>0){
      if(this.sortParam==="fullName"){
        this.employees = this.dataService.getData().sort((emp1,emp2) => {
          var x = emp1.generalInfo.fullName.toLowerCase();
          var y = emp2.generalInfo.fullName.toLowerCase();
          if(x < y) {return -1};
          if(x > y) {return 1};
          return 0;
        })
      }
      else if(this.sortParam==="email"){
        this.employees = this.dataService.getData().sort((emp1,emp2) => {
          var x = emp1.contactInfo.email.toLowerCase();
          var y = emp2.contactInfo.email.toLowerCase();
          if(x < y) {return -1};
          if(x > y) {return 1};
          return 0;
        })
      }
      else if(this.sortParam==="totalExperience"){
        this.employees = this.dataService.getData().sort((emp1,emp2) => {
          return emp1.workInfo.totalExperience - emp2.workInfo.totalExperience;
        })
      }
    }
  }

  addEmployee(){
    this.router.navigate(['/add/general']);
  }

}
