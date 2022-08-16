import { RoleUserValidProps } from "../../src/types";

export class userFactory {
    create() {
        const uui = Math.random().toFixed(4).replaceAll(".", "");

        return {
            confirm_password: '123456789',
            email: `anderson${uui}@gmail.com`,
            name: 'anderson',
            password: '123456789',
            token: '123456789',
            role: RoleUserValidProps.USER
        }
    }

    createWithRoleCompany() {
        const uui = Math.random().toFixed(4).replaceAll(".", "");

        return {
            confirm_password: '123456789',
            email: `anderson${uui}@gmail.com`,
            name: 'anderson',
            password: '123456789',
            token: '123456789',
            role: RoleUserValidProps.COMPANY
        }
    }

    createEmptyValues() {

        return {
            confirm_password: '',
            email: ``,
            name: '',
            password: '',
            token: '',
            role: RoleUserValidProps.COMPANY

        }
    }


    createWrongPassword() {
        const uui = Math.random().toFixed(4).replaceAll(".", "");

        return {
            confirm_password: "12345674893",
            email: `anderson${uui}@gmail.com`,
            name: "anderson",
            password: "123456789",
            token: '123456784449',

        }
    }

    createWrongEmail() {
        const uui = Math.random().toFixed(4).replaceAll(".", "");

        return {
            confirm_password: "1234567893",
            email: `ander.son${uui}@gma.il.com`,
            name: "anderson",
            password: "123456789",
            token: '123456789',

        }
    }

    update(name: string, email: string, password: string, role: any, token: string, avatar: string) {
        return {
            email: email,
            name: name,
            password: password,
            Authorization: `Bearer ${token}`,
            role: role,
            avatar: avatar
        }
    }

    updateNewPassword(name: string, email: string, password: string, new_password: string, role: any, token: string, avatar: string) {
        return {
            email: email,
            name: name,
            password: password,
            new_password: new_password,
            Authorization: `Bearer ${token}`,
            role: role,
            avatar: avatar
        }
    }
    updateEmptyValues(token: string) {
        return {
            email: '',
            name: '',
            password: '',
            Authorization: `Bearer ${token}`,
            role: '',
            avatar: ''
        }
    }
}