import { UtilsUser } from '..';
import { PrismaUserUpdateRepository } from '../../repositories/prisma/user/PrismaUserUpdateRepository';
import { RoleUserValidProps } from '../../types';


export class JobPass extends UtilsUser {
    private errors = {} as any;

    get() {
        return this.errors;
    }

    clean() {
        this.errors = {};
    }

    protected async setTitle(title: string) {


        const titleEqualZero = title.trim().length === 0;
        const titleMoreThan = title.length > 60;

        if (titleEqualZero || titleMoreThan) {
            this.errors.title = 'O titulo deve ter no maximo 60 caracteres';
        }
    }
    protected setNamy_company(name_company: string) {
        if (name_company.trim().length === 0) {
            this.errors.name_company = 'Nome da compania vazio';
        }
    }

    protected setRemote(remote: string) {
        if (remote !== 'sim' && remote !== 'não') {
            this.errors.remote =
                'Problema ao seleciona se a vaga aceita remoto ou não';
        }
    }

    protected setBenefits(benefits: string) {
        if (benefits.length === 0) {
            this.errors.benefits = 'Texto não pode estar vazio';
        }
    }
    protected setTechs(techs: string[]) {
        techs.forEach(tech => {
            if (tech.trim().length === 0) {
                throw Error("tech não pode estar vazia")
            }
        })
    }

    protected setRequirements(requirements: string) {
        if (requirements.length === 0) {
            this.errors.requirements = 'requerimentos da vaga não pode ser vazio';
        }
    }

    protected setTypes_contract(types_contract: string) {
        if (types_contract !== 'pj' && types_contract !== 'clt' && types_contract !== 'estagio') {
            this.errors.types_contract = 'Error ao escolher tipo de contrato';
        }
    }

    protected setSize_company(size_company: string) {
        if (
            size_company !== 'pequeno' &&
            size_company !== 'grande' &&
            size_company !== 'startup'
        ) {
            this.errors.size_company = 'Error ao escolher tamanho da empresa';
        }
    }

    protected setResponsibilities(responsibilities: string) {
        if (responsibilities.length === 0) {
            this.errors.responsibilities =
                'responsabilidade da vaga não pode ser vazio';
        }

    }

    protected setExperience_level(experience_level: string) {
        if (
            experience_level !== 'junior' &&
            experience_level !== 'pleno' &&
            experience_level !== 'senior'
        ) {
            this.errors.experience_level = 'Falha ao escolher nivel de experiência';
        }
    }
    protected setSalary(salary: any) {
        if (
            String(salary).length === 0 ||
            /^[0-9]+$/.test(salary) === false
        ) {
            this.errors.salary = 'Valor não pode estar vazio';
        }


    }

    protected setExpired_days(expired_days: number) {
        if (expired_days <= 0 || expired_days.toString().length === 0) {
            this.errors.expired_days = 'data para expirar não pode ser 0';
        }
    }


}
