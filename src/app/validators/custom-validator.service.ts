import { Injectable } from '@angular/core';
import { DataService } from '../service/data.service';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor(private dataService : DataService) { }

  ageValidator(control : AbstractControl){
    if(control.value!=null){
      let diff = Date.now() - new Date(control.value).getTime();
      let ageDate = new Date(diff);
      let age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if(age < 18 || age > 80 ){
        return { "ageRange" : true};
      }
      return null;
    }
  }
}
