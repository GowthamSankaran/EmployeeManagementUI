import { SocialInfo } from "./social-info";
import { SkillSet } from "./skill-set";
import { WorkExperience } from "./work-experience";
import { GeneralInfoComponent } from '../add-employee/general-info/general-info.component';
import { GeneralInfo } from './general-info';
import { ContactInfo } from './contact-info';
import { WorkInfo } from './work-info';

export class Employee {
    id : number;
    generalInfo : GeneralInfo;
    contactInfo : ContactInfo;
    skillsInfo : SkillSet[];
    workInfo : WorkInfo;
}
