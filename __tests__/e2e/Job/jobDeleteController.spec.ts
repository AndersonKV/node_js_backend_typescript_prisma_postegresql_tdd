import { sign } from "jsonwebtoken";
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

interface PropsUserCreate {


    confirm_password: string;
    email: string;
    name: string;
    password: string;
    token: string;
}

interface PropsData {

    id: number;
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    created_at: string;
    updated_at: string;
    avatar: string;

}
interface PropsAuth {
    data: PropsData[];
    token: string;
}

interface PropsJob {
    id: string;
    title: string;
    name_company: string;
    id_user: string;
    remote: string;
    techs: string[] | string;
    responsibilities: string;
    requirements: string;
    types_contract: string;
    size_company: string;
    experience_level: string;
    salary: string;
    expired_days: number | string;
    benefits: string;
}

interface PropsApply {
    id_job: number,
    Authorization: string,
    id_user: number;
}

describe("#jobCreateController", () => {
    let app: Server;

    let prismaJobCreateRepository: PrismaJobCreateRepository;
    let prismaUserCreateRepository: PrismaUserCreateRepository;
    let prismaJobFindRepository: PrismaJobFindRepository;
    let prismaJobDeleteRepositry: PrismaJobDeleteRepositry;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;

    let userCreate: PropsUserCreate;
    let userAuthenticate: PropsAuth;
    let companyAuthenticate: PropsAuth;
    let jobCreate: PropsJob;
    let applyCreate: PropsApply;


    beforeAll(async () => {
        app = _server.listen(5644);
        prismaJobCreateRepository = new PrismaJobCreateRepository;
        prismaUserCreateRepository = new PrismaUserCreateRepository;
        prismaJobFindRepository = new PrismaJobFindRepository;
        prismaJobDeleteRepositry = new PrismaJobDeleteRepositry;
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;


        userCreate = new userFactory().createWithRoleCompany()


        await request(app).post('/api/v1/users/create').send(userCreate)

        const login = {
            email: userCreate.email,
            password: userCreate.password
        }

        const userAuth = await request(app).post('/api/v1/users/sign_in').send(login)

        companyAuthenticate = await userAuth.body

        const config = {
            token: userAuth.body.token,
            id_user: userAuth.body.data[0].id
        }

        const jobCreateFactory = new jobFactory().create(config.token, config.id_user)

        const createJob = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)

        jobCreate = await createJob.body.data;


    });

    afterAll(async () => {
        await Promise.resolve(prismaJobDeleteRepositry).then(async (services) => {
            await services.destroyer();

        })

    });

    it("should delete by id", async () => {

        const config = {
            token: companyAuthenticate.token,
            id_user: companyAuthenticate.data[0].id
        }

        const jobCreateFactory = new jobFactory().create(config.token, config.id_user)

        const jobCreate = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)

        const deleteConfig = {
            id_job: jobCreate.body.data.id,
            id_user: jobCreate.body.data.id_user,
            Authorization: `Bearer ${companyAuthenticate.token}`

        }
        const deleteById = await request(app).delete('/api/v1/jobs/delete_by_id').send(deleteConfig)

        expect(deleteById.status).toBe(200)

    });


    it("should fail in delete", async () => {

        const config = {
            token: companyAuthenticate.token,
            id_user: companyAuthenticate.data[0].id
        }

        const jobCreateFactory = new jobFactory().create(config.token, config.id_user)

        const jobCreate = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)

        const deleteConfig = {
            id_job: 99999,
            id_user: jobCreateFactory.id_user,
            Authorization: `Bearer ${companyAuthenticate.token}`

        }
        const deleteById = await request(app).delete('/api/v1/jobs/delete_by_id').send(deleteConfig)

        expect(deleteById.status).toBe(400)

    });


    it("should fail in delete with same value", async () => {

        const config = {
            token: companyAuthenticate.token,
            id_user: companyAuthenticate.data[0].id
        }

        const jobCreateFactory = new jobFactory().create(config.token, config.id_user)

        const jobCreate = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)

        const deleteConfig = {
            id_job: 99999,
            id_user: jobCreateFactory.id_user,
            Authorization: `Bearer ${companyAuthenticate.token}`

        }
        const deleteById = await request(app).delete('/api/v1/jobs/delete_by_id').send(deleteConfig)

        expect(deleteById.status).toBe(400)

    });

    it("should fail in delete by id_job", async () => {
        const deleteConfig = {
            id_job: `jobCreate.body.data.id`,
            id_user: companyAuthenticate.data[0].id,
            Authorization: `Bearer ${companyAuthenticate.token}`
        }

        const deleteById = await request(app).delete('/api/v1/jobs/delete_by_id').send(deleteConfig)

        expect(deleteById.status).toBe(400)

    });

    it("should fail in delete by id_user", async () => {
        const deleteConfig = {
            id_user: 'companyAuthenticate.data[0].id',
            Authorization: `Bearer ${companyAuthenticate.token}`
        }

        const deleteById = await request(app).delete('/api/v1/jobs/delete_by_id').send(deleteConfig)

        expect(deleteById.status).toBe(400)

    });

    it("should fail in delete with job no exist", async () => {
        const deleteConfig = {
            id_user: companyAuthenticate.data[0].id,
            Authorization: `Bearer ${companyAuthenticate.token}`
        }
        const jobCreateFactory = new jobFactory().create(companyAuthenticate.token, companyAuthenticate.data[0].id)

        const jobCreate = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)

        const deleteById = await request(app).delete('/api/v1/jobs/delete_by_id').send(deleteConfig)

        expect(deleteById.status).toBe(200)

    });

    it("should create and and delete all", async () => {
        const jobCreateFactory = new jobFactory().create(companyAuthenticate.token, companyAuthenticate.data[0].id)

        const jobCreate = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)

        const deleteConfig = {
            id_job: jobCreate.body.data.id,
            id_user: jobCreate.body.data.id_user,
            Authorization: `Bearer ${companyAuthenticate.token}`


        }

        const deleteById = await request(app).delete('/api/v1/jobs/destroyer').send(deleteConfig)

        expect(deleteById.status).toBe(200)

    });


});

