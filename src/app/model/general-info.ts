import { DataService } from '../service/data.service';

export class GeneralInfo {
    fullName : string;
    age : number;

    constructor(public firstName : string, public lastName: string, public dateOfBirth : string){
        this.fullName = `${firstName} ${lastName}`;
    }
}
