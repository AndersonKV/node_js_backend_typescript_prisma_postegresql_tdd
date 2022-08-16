import request from "supertest";
import { _server } from "../../_server";
import { Server } from "http";
import { PrismaUserCreateRepository } from "../../../src/repositories/prisma/user/PrismaUserCreateRepository";
import { PrismaJobFindRepository } from "../../../src/repositories/prisma/job/PrismaJobFindRepository";
import { PrismaJobCreateRepository } from "../../../src/repositories/prisma/job/PrismaJobCreateRepository";
import { PrismaJobDeleteRepositry } from "../../../src/repositories/prisma/job/PrismaJobDeleteRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { userFactory } from "../../utils/userFactory";
import { jobFactory } from "../../utils/jobFactory";

interface PropsAuth {
    data: {
        id: string;
        name: string;
        email: string;
        password: string;
        confirm_password: string;
        created_at: string;
        updated_at: string;
        avatar: string;
    }
    token: string;

}
describe("jobCreateController", () => {
    let app: Server;

    let prismaJobCreateRepository: PrismaJobCreateRepository;
    let prismaUserCreateRepository: PrismaUserCreateRepository;
    let prismaJobFindRepository: PrismaJobFindRepository;
    let prismaJobDeleteRepositry: PrismaJobDeleteRepositry;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;

    beforeAll(async () => {
        app = _server.listen(4444);

        prismaJobCreateRepository = new PrismaJobCreateRepository;
        prismaUserCreateRepository = new PrismaUserCreateRepository;
        prismaJobFindRepository = new PrismaJobFindRepository;
        prismaJobDeleteRepositry = new PrismaJobDeleteRepositry;
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;



    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();
    });

    it("should create user, authenticate and create job", async () => {

        const companyCreateFactory = new userFactory().createWithRoleCompany()

        const login = {
            email: companyCreateFactory.email,
            password: companyCreateFactory.password
        }

        await request(app).post('/api/v1/users/create').send(companyCreateFactory)

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(login)

        const config = {
            token: sign_in.body.token,
            id_user: sign_in.body.data[0].id
        }

        const jobCreateFactory = new jobFactory().create(config.token, config.id_user)

        const jobCreate = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)


        expect(jobCreate.status).toBe(201)
    });

    it("should fail in create user with wrong id_user ", async () => {

        const userCreateFactory = new userFactory().create()

        const login = {
            email: userCreateFactory.email,
            password: userCreateFactory.password
        }

        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(login)

        const config = {
            token: sign_in.body.token,
            id_user: sign_in.body.data[0].id
        }

        const jobCreateFactory = new jobFactory().createWrongIdUser(config.token)

        const jobCreate = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)

        expect(jobCreate.status).toBe(400)
    });


    it("should faill and create job", async () => {

        const userCreateFactory = new userFactory().create()

        const login = {
            email: userCreateFactory.email,
            password: userCreateFactory.password
        }

        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(login)

        const jobCreateFactory = new jobFactory().createMalFormatedValues(sign_in.body.token)

        const jobCreate = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)

        expect(jobCreate.status).toBe(400)
    });


    it("should faill and create job with id_user", async () => {

        const userCreateFactory = new userFactory().create()

        const login = {
            email: userCreateFactory.email,
            password: userCreateFactory.password
        }

        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(login)

        const jobCreateFactory = new jobFactory().createWrongIdUser(sign_in.body.token)

        const jobCreate = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)
        expect(jobCreate.status).toBe(400)
    });
    it("should faill and create job no token", async () => {

        const jobCreateFactory = new jobFactory().createNoToken()
        const jobCreate = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)


        expect(jobCreate.status).toBe(401)
    });

    it("should faill and create with wrong token", async () => {

        const jobCreateFactory = new jobFactory().createWrongToken()
        const jobCreate = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)


        expect(jobCreate.status).toBe(401)
    });

    it("should faill and create with  Mal Formated Values ", async () => {



        const userCreateFactory = new userFactory().create()

        const login = {
            email: userCreateFactory.email,
            password: userCreateFactory.password
        }

        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(login)

        const jobCreateFactory = new jobFactory().createMalFormatedValues(sign_in.body.token)

        const jobCreate = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)


        expect(jobCreate.status).toBe(400)
    });

});

