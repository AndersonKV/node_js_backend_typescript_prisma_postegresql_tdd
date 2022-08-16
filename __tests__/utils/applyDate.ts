import request from "supertest";
import { matchingFactory } from "./matchingFactory"
import { jobFactory } from "./jobFactory"
import { userFactory } from "./userFactory"
import { Server } from "http";
import { UserValidProps } from "../../src/types";

class applyDate {
    userCreate: UserValidProps;

    async createDate(app: Server) {
        this.userCreate = new userFactory().create()

        const createdUser = await request(app).post('/api/v1/users/create').send(this.userCreate)

        // console.log(createdUser.body)


        // const login = {
        //     email: createdUser.body[0].email,
        //     password: createdUser.body[0].password
        // }

        // const userAuth = await request(app).post('/api/v1/users/sign_in').send(login)
        // console.log(userAuth.body)

        // userAuthenticate = await userAuth.body

        // const config = {
        //     token: userAuth.body.token,
        //     id_user: userAuth.body.data[0].id
        // }


        // const jobCreateFactory = new jobFactory().create(config.token, config.id_user)

        // const createJob = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)

        // jobCreate = await createJob.body.data;
        // applyCreate = new applyFactory().create(Number(createJob.body.data.id), userAuthenticate.token, Number(userAuthenticate.data[0].id))

    }
}