
import { Job, Matching } from "@prisma/client";
import { PrismaJobFindRepository } from "../repositories/prisma/job/PrismaJobFindRepository";
import { RoleUserValidProps } from "../types";
import bcryptjs from "bcryptjs";
import crypto from 'crypto';
import { PrismaMatchingFindRepository } from "../repositories/prisma/matching/PrismaMatchingFindRepository";

//     const day = data.getDate().toString().padStart(2, '0');
//     const currentMonth = data.getMonth() + 1;
//     const month = currentMonth.toString().padStart(2, '0');
//     const year = data.getFullYear();

//     return `${day}/${month}/${year}`;
// }

export class UtilsUser {
    regex = new RegExp(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    );
    async encodedPassword(password: string) {
        return await bcryptjs.hash(password, 10);
    }

    async dencodedPassword(actual_password: string, hash_password: string) {
        return await bcryptjs.compare(actual_password, hash_password);
    }

    public checkRoleUser(userRole: string) {
        if (userRole !== RoleUserValidProps.USER) {
            throw Error("você está cadastrado como usuário, seu registro é como compania")
        }
    }

    public checkRoleCompany(userRole: string) {
        if (userRole !== RoleUserValidProps.COMPANY) {
            throw Error("você está cadastrado como compania, seu registro é como usuário")
        }
    }



}



export class UtilsDate {
    async dataHasExpired(created_at: Date, expired_days: number) {
        const dateCreated = new Date(created_at);

        dateCreated.setDate(Number(dateCreated.getDate()) + Number(expired_days))

        const today = new Date();

        const isExpired = today.setHours(0, 0, 0, 0) <= dateCreated.setHours(0, 0, 0, 0);

        return !isExpired;
    }
}




export class UtilsJob {
    public async mappingCandidaties(find: Job[]) {
        const matchingFind = new PrismaMatchingFindRepository();

        const arr: Matching[] = [];

        for (let i = 0; i < find.length; i++) {
            const match = await matchingFind.findByIdJob(find[i].id)

            for (let a = 0; a < match.length; a++) {
                arr.push(match[a])
            }

        }

        return arr;

    }



}

// export async function dataHasExpired(created_at: Date, expired_days: number) {
//     const dateCreated = new Date(created_at);

//     dateCreated.setDate(Number(dateCreated.getDate()) + Number(expired_days))

//     const today = new Date();

//     const isExpired = today.setHours(0, 0, 0, 0) <= dateCreated.setHours(0, 0, 0, 0);

//     return !isExpired;
// }


// export function checkRoleUser(userRole: string) {
//     if (userRole !== RoleUserValidProps.USER) {
//         throw Error("você não tem autorização para aplicar, seu registro é " + userRole)
//     }
// }

// export function checkRoleCompany(userRole: string) {
//     if (userRole !== RoleUserValidProps.COMPANY) {
//         throw Error("você não tem autorização, seu registro é " + userRole)
//     }
// }

// export async function mappingCandidaties(find: Job[]) {
//     const applyFind = new PrismaApplyFindRepository();

//     const arr: Apply[] = [];


//     for (let i = 0; i < find.length; i++) {
//         const applys = await applyFind.findByJobId(find[i].id)

//         for (let a = 0; a < applys.length; a++) {
//             arr.push(applys[a])
//         }

//     }

//     return arr;

// }