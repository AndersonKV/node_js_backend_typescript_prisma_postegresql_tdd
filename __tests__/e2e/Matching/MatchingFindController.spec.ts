import request from "supertest";
import { _server } from "../../_server";
import { Server } from "http";

import { PrismaJobDeleteRepositry } from "../../../src/repositories/prisma/job/PrismaJobDeleteRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { userFactory } from "../../utils/userFactory";
import { jobFactory } from "../../utils/jobFactory";

import { matchingFactory } from "../../utils/matchingFactory";

import { PrismaMatchingDeleteRepository } from "../../../src/repositories/prisma/matching/PrismaMatchingDeleteRepository";


interface PropsUserCreate {


    confirm_password: string;
    email: string;
    name: string;
    password: string;
    token: string;
}

interface PropsData {

    id: string;
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

interface IJob {
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
interface PropsJob {
    data: IJob
}

interface PropsApply {
    id_job: number,
    Authorization: string,
    id_user: number;
}
describe("[e2e] - applyFindController", () => {
    let app: Server;

    let prismaJobDeleteRepositry: PrismaJobDeleteRepositry;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;

    let prismaMatchingDeleteRepository: PrismaMatchingDeleteRepository;

    let user: PropsUserCreate;
    let company: PropsUserCreate;
    let userAuthenticate: PropsAuth;
    let companyAuthenticate: PropsAuth;
    let jobCreate: PropsJob;
    let matchingCreate: PropsApply;


    beforeAll(async () => {

        app = _server.listen(7777);

        prismaJobDeleteRepositry = new PrismaJobDeleteRepositry;
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
        prismaMatchingDeleteRepository = new PrismaMatchingDeleteRepository;

        user = new userFactory().create()
        company = new userFactory().createWithRoleCompany()

        const createUser = await request(app).post('/api/v1/users/create').send(user)
        const createCompany = await request(app).post('/api/v1/users/create').send(company)

        const userLogin = {
            email: user.email,
            password: user.password
        }

        const companyLogin = {
            email: company.email,
            password: company.password
        }

        const userAuth = await request(app).post('/api/v1/users/sign_in').send(userLogin)
        const companyAuth = await request(app).post('/api/v1/users/sign_in').send(companyLogin)

        userAuthenticate = await userAuth.body;
        companyAuthenticate = await companyAuth.body;

        const userConfig = {
            token: userAuth.body.token,
            id_user: userAuth.body.data[0].id
        }

        const companyConfig = {
            token: companyAuth.body.token,
            id_user: companyAuth.body.data[0].id
        }

        const job = new jobFactory().create(companyConfig.token, companyConfig.id_user)

        const createJob = await request(app).post('/api/v1/jobs/create').send(job)

        jobCreate = await createJob.body;

        matchingCreate = new matchingFactory().create(Number(createJob.body.data.id), userAuthenticate.token, Number(userAuthenticate.data[0].id))
    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();
    });

    it("should find by id", async () => {
        const apply = await request(app).post("/api/v1/matchings/apply").send(matchingCreate)

        const findById = {
            id: apply.body.data.id,
            id_user: matchingCreate.id_user
        }


        const find = await request(app).get("/api/v1/matchings/find_by_id").send({
            Authorization: `Bearer ${companyAuthenticate.token}`
        }).query(findById)

        expect(find.status).toBe(200)

    });

    it("should fail in find by id", async () => {

        const findById = {
            id: 0,
            Authorization: `Bearer ${userAuthenticate.token}`,
            id_user: matchingCreate.id_user
        }

        const find = await request(app).get("/api/v1/matchings/find_by_id").send({
            Authorization: `Bearer ${userAuthenticate.token}`
        }).query(findById)

        expect(find.status).toBe(400)

    });

    it("should find by id_user", async () => {
        const config = {
            id_user: matchingCreate.id_user,
            id_job: matchingCreate.id_job
        }

        const find = await request(app).get("/api/v1/matchings/find_by_user_id").send({
            Authorization: `Bearer ${userAuthenticate.token}`
        }).query(config)

        expect(find.status).toBe(200)
    });

    it("should fail in find by id_user", async () => {

        const config = {
            id_user: 999,
            id_job: 999

        }

        const find = await request(app).get("/api/v1/matchings/find_by_user_id").send({
            Authorization: `Bearer ${userAuthenticate.token}`
        }).query(config)


        expect(find.body.data.length).toBe(0)

    });

    it("should find by id_job", async () => {

        const config = {
            id_user: matchingCreate.id_user,
            Authorization: `Bearer ${userAuthenticate.token}`,
            id_job: matchingCreate.id_job

        }

        const find = await request(app).get("/api/v1/matchings/find_by_job_id").send({
            id_user: matchingCreate.id_user,
            Authorization: `Bearer ${userAuthenticate.token}`,
            id_job: matchingCreate.id_job
        })




        expect(find.status).toBe(200)

    });

    it("should fail in find by id_job", async () => {

        const find = await request(app).get("/api/v1/matchings/find_by_job_id").send({
            Authorization: `Bearer ${userAuthenticate.token}`,
            id_job: 61616
        })

        expect(find.status).toBe(400)
    });

    it("should find All By User Id", async () => {

        const config = {
            id_user: matchingCreate.id_user,
            Authorization: `Bearer ${userAuthenticate.token}`,
            id_job: matchingCreate.id_job

        }

        const find = await request(app).get("/api/v1/matchings/find_all_by_user_id").send({
            Authorization: `Bearer ${userAuthenticate.token}`
        }).query(config)

        expect(find.status).toBe(200)

    });

    it("should faill find All By User Id", async () => {

        const config = {
            id_user: 'r,',
            Authorization: `Bearer ${userAuthenticate.token}`,
            id_job: matchingCreate.id_job

        }

        const find = await request(app).get("/api/v1/matchings/find_all_by_user_id").send({
            Authorization: `Bearer ${userAuthenticate.token}`
        }).query(config)

        expect(find.status).toBe(400)

    });

    it("should find all", async () => {


        const config = {
            id_user: userAuthenticate.data[0].id
        }

        const find = await request(app).get("/api/v1/matchings/find_all").send({
            Authorization: `Bearer ${userAuthenticate.token}`
        }).query(config)

        expect(find.status).toBe(200)



    });



    it("should faill in find with wrong token", async () => {

        const matchingCreateFactory = new matchingFactory().createWrongToken()

        await request(app).post("/api/v1/matchings/apply").send(matchingCreateFactory)


        const id = {
            Authorization: matchingCreateFactory.Authorization
        }

        const find = await request(app).get("/api/v1/matchings/find_by_id").send(id)

        expect(find.status).toBe(401)


    });





});

