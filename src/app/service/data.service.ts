import { Injectable, OnInit } from '@angular/core';
import { Employee } from '../model/employee'
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{

  employees : Employee[] = [];
  personalInfoForm : FormGroup;
  contactForm : FormGroup;
  skillsForm : FormGroup;
  workForm : FormGroup;

  constructor(private http : HttpClient) { 
    let observable  = this.http.get('http://localhost:3000/employees');
    observable.subscribe(data => {
          for(let employee of (data as any)){
            this.employees.push(employee);
          }
        }); 
  }
  
  ngOnInit(): void {
    
  }

  getData(){
    return this.employees;
  }

  getEmployees(){
    return this.http.get('http://localhost:3000/employees');
  }

  getFormControlName(name : string, index : number){
    return (name + index);
  }

  calculateAge(dateOfBirth : string) : number{
    let diff = Date.now() - new Date(dateOfBirth).getTime();
    let ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
   }

   addEmployee(employee : Employee){
    return this.http.post('http://localhost:3000/employees', employee);
   }

   updateEmployee(id : number, employee : Employee){
    return this.http.put(`http://localhost:3000/employees/${id}`, employee);
   }

   deleteEmployee(id : number){
     return this.http.delete(`http://localhost:3000/employees/${id}`);
   }

   refreshEmployees(){
    this.employees = [];
    let observable  = this.http.get('http://localhost:3000/employees');
    observable.subscribe(data => {
          for(let employee of (data as any)){
            this.employees.push(employee);
          }
        }); 
   }

   calculateExperience(joinedDate : string, relievedDate : string){
     let from = new Date(joinedDate);
     let to = new Date(relievedDate);
     let diff = to.getTime() - from.getTime();
     let exp = new Date(diff);
     console.log(exp.getUTCFullYear() - 1970);
     return Math.abs(exp.getUTCFullYear() - 1970);
   }
}
