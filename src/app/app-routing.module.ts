import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { GeneralInfoComponent } from './add-employee/general-info/general-info.component';
import { ContactInfoComponent } from './add-employee/contact-info/contact-info.component';
import { SkillInfoComponent } from './add-employee/skill-info/skill-info.component';
import { WorkInfoComponent } from './add-employee/work-info/work-info.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';


const routes: Routes = [
  {path : "", redirectTo : "/home", pathMatch: "full"},
  {path : "home", component : EmployeesComponent},
  {path : "employee/:id", component : EmployeeDetailComponent},
  {path : "add", component: AddEmployeeComponent, children: [
    {path : "general", component: GeneralInfoComponent},
    {path : "contact", component: ContactInfoComponent},
    {path : "skills", component: SkillInfoComponent},
    {path : "work", component: WorkInfoComponent}
  ]},
  {path: "edit/:id", component: AddEmployeeComponent, children: [
    {path : "general", component: GeneralInfoComponent, },
    {path : "contact", component: ContactInfoComponent},
    {path : "skills", component: SkillInfoComponent},
    {path : "work", component: WorkInfoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
