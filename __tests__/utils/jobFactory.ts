import { RoleUserValidProps } from "../../src/types"

export class jobFactory {
    create(token: string, id_user: number) {
        return {
            id_user,
            benefits: "lorem ipsum lorem ipsum",
            experience_level: "pleno",
            expired_days: "10",
            name_company: "lorem ipsum inc",
            remote: "sim",
            requirements: "lorem ipsum req impus dolapintos",
            responsibilities: "lorem ipsum etcterus",
            salary: "3000",
            size_company: "grande",
            techs: ['php', 'react', 'ruby'],
            title: "lorem titulos ipsum",
            types_contract: "clt",
            Authorization: `Bearer ${token}`,

        }
    }

    createWrongIdUser(token: string) {
        return {
            id_user: "6516516515",
            benefits: "lorem ipsum lorem ipsum",
            experience_level: "pleno",
            expired_days: "10",
            name_company: "lorem ipsum inc",
            remote: "sim",
            requirements: "lorem ipsum req impus dolapintos",
            responsibilities: "lorem ipsum etcterus",
            salary: "3000",
            size_company: "grande",
            techs: ['php', 'react', 'ruby'],
            title: "lorem titulos ipsum",
            types_contract: "clt",
            Authorization: `Bearer ${token}`,
            role: RoleUserValidProps.COMPANY
        }
    }
    createMalFormatedValues(token: string) {
        return {
            id_user: 999,
            benefits: "",
            experience_level: "",
            expired_days: "",
            name_company: "",
            remote: "",
            requirements: "",
            responsibilities: "",
            salary: "",
            size_company: "",
            techs: [],
            title: "",
            types_contract: "",
            Authorization: `Bearer ${token}`,

        }
    }

    createNoToken() {
        return {
            benefits: "lorem ipsum lorem ipsum",
            experience_level: "",
            expired_days: "10",
            name_company: "lorem ipsum inc",
            remote: "",
            requirements: "lorem ipsum req impus dolapintos",
            responsibilities: "lorem ipsum etcterus",
            salary: "3000",
            size_company: "",
            techs: ['php', 'react', 'ruby'],
            title: "lorem titulos ipsum",
            types_contract: "",
            Authorization: ""
        }
    }

    createWrongToken() {
        return {
            benefits: "lorem ipsum lorem ipsum",
            experience_level: "",
            expired_days: "10",
            name_company: "lorem ipsum inc",
            remote: "",
            requirements: "lorem ipsum req impus dolapintos",
            responsibilities: "lorem ipsum etcterus",
            salary: "3000",
            size_company: "",
            techs: ['php', 'react', 'ruby'],
            title: "lorem titulos ipsum",
            types_contract: "",
            Authorization: `Bearer 5156165-5165165165-515616`
        }
    }


}