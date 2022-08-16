import { JobSaveProps, RoleUserValidProps, UserValidProps } from "../../types"
import { User } from "@prisma/client";
import { UserPass } from "../users/UserPass";
import { JobPass } from "./JobPass";
import { UtilsUser } from "..";



export class JobValidation extends JobPass {

    async pass(values: JobSaveProps) {
        this.clean();

        this.setTitle(values.title);
        this.setNamy_company(values.name_company)
        this.setRemote(values.remote);
        this.setBenefits(values.benefits)
        this.setTechs(values.techs)
        this.setResponsibilities(values.responsibilities)
        this.setRequirements(values.requirements)
        this.setTypes_contract(values.types_contract)
        this.setSize_company(values.size_company)
        this.setSalary(values.salary)
        this.setExpired_days(Number(values.expired_days))
        this.setExperience_level(values.experience_level)
        return this.get();

    }



}

