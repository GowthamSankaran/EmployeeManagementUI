import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  currentEmployeeId : number;
  employees : Employee[] = [];
  employee : Employee;
  
  constructor(private route : ActivatedRoute, private dataService : DataService, private router : Router) {
    this.currentEmployeeId = this.route.snapshot.params['id'];

    let employeesObservable = this.dataService.getEmployees();
    employeesObservable.subscribe(data => {
      for(let employee of (data as any)){
        this.employees.push(employee);
      }
      this.employees = this.employees.filter(employee => employee.id==this.currentEmployeeId);
      if(this.employees.length>0){
        this.employee = this.employees[0];
      }else{
        this.employee = null;
      }
      if(this.employee===null){
        this.router.navigate(['/home']);
      }
    }, error => {
      console.log(error);
      this.employee = null;
    });
  }

  ngOnInit(): void {

  }

  editEmployee(){
    this.router.navigate([`edit/${this.employee.id}/general`]);
  }

  deleteEmployee(id : number){
    
    let observable = this.dataService.deleteEmployee(id);
    observable.subscribe(response => {
      this.dataService.refreshEmployees();
      alert("Employee deleted successfully");
      this.router.navigate(['/home']);
    }, error => {
      this.dataService.refreshEmployees();
      console.log(error);
      alert("Error occurred while deleting employee");
    })
  }

}
