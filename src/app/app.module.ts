import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { GeneralInfoComponent } from './add-employee/general-info/general-info.component';
import { ContactInfoComponent } from './add-employee/contact-info/contact-info.component';
import { SkillInfoComponent } from './add-employee/skill-info/skill-info.component';
import { WorkInfoComponent } from './add-employee/work-info/work-info.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeDetailComponent,
    AddEmployeeComponent,
    GeneralInfoComponent,
    ContactInfoComponent,
    SkillInfoComponent,
    WorkInfoComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
