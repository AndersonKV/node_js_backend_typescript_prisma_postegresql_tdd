export class matchingFactory {
    create(id_job: number, token: string, id_user: number) {
        return {
            id_job,
            Authorization: `Bearer ${token}`,
            id_user
        }
    }

    createWrongIdJob(token: string) {
        return {
            id_job: 9999,
            Authorization: `Bearer ${token}`
        }
    }

    createWrongToken() {
        return {
            Authorization: `Bearer sd55ds5dsds5-sda5dsa-5dsa*5s*sd5*s`
        }
    }

    createTokenMalformated(token: string) {
        return {
            Authorization: `Beare-r ${token}`
        }
    }

}