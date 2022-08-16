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

describe("[e2e] - MatchingDeleteController", () => {
    let app: Server;


    let prismaJobDeleteRepositry: PrismaJobDeleteRepositry;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;
    let prismaMatchingDeleteRepository: PrismaMatchingDeleteRepository;

    let user: PropsUserCreate;
    let company: PropsUserCreate;
    let userAuthenticate: PropsAuth;
    let companyAuthenticate: PropsAuth;
    let jobCreate: PropsJob;
    let applyCreate: PropsApply;


    beforeAll(async () => {
        app = _server.listen(5666);



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


        jobCreate = await createJob.body.data;
        applyCreate = new matchingFactory().create(Number(createJob.body.data.id), userAuthenticate.token, Number(userAuthenticate.data[0].id))

    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();
    });

    it("should apply and delete", async () => {
        const apply = await request(app).post("/api/v1/matchings/apply").send(applyCreate)

        const config = {
            id_apply: await apply.body.data.id,
            id_job: jobCreate.id,
            id_user: companyAuthenticate.data[0].id,
            Authorization: `Bearer ${userAuthenticate.token}`
        }

        const deleteByid = await request(app).delete("/api/v1/matchings/delete_by_id").send(config)

        expect(deleteByid.status).toBe(200)
    });

    it("should fail in delete ", async () => {
        const deleteConfig = {
            id_apply: 'await apply.body.data.id',
            id_job: 'jobCreate.id',
            id_user: `'userAuthenticate.data[0].id'`,
            Authorization: `Bearer ${companyAuthenticate.token}`
        }

        const deleteByid = await request(app).delete("/api/v1/matchings/delete_by_id").send(deleteConfig)
        expect(deleteByid.status).toBe(400)
    });

    it("should fail delete by id_user", async () => {

        const apply = await request(app).get("/api/v1/matchings/find_by_user_id").send({
            Authorization: `Bearer ${companyAuthenticate.token}`
        }).query(applyCreate)

        const deleteConfig = {
            id_apply: await apply.body.data.id,
            id_job: jobCreate.id,
            id_user: `'companyAuthenticate.data[0].id'`,
            Authorization: `Bearer ${companyAuthenticate.token}`
        }

        const deleteByid = await request(app).delete("/api/v1/matchings/delete_by_id").send(deleteConfig)

        expect(deleteByid.status).toBe(400)
    });

    it("should fail delete ", async () => {

        const apply = await request(app).get("/api/v1/matchings/find_by_user_id").send({
            Authorization: `Bearer ${companyAuthenticate.token}`
        }).query(applyCreate)

        const deleteConfig = {
            id_apply: 0,
            id_job: jobCreate.id,
            id_user: companyAuthenticate.data[0].id,
            Authorization: `Bearer ${companyAuthenticate.token}`
        }

        const deleteByid = await request(app).delete("/api/v1/matchings/delete_by_id").send(deleteConfig)

        expect(deleteByid.status).toBe(400)
    });


    it("should delete all", async () => {
        const apply = await request(app).post("/api/v1/matchings/apply").send(applyCreate)
        const deleteAll = await request(app).delete("/api/v1/matchings/delete_all");
        expect(deleteAll.status).toBe(200)
    });

    it("should fail in delete all", async () => {
        await request(app).delete("/api/v1/matchings/delete_all");
        const deleteAll = await request(app).delete("/api/v1/matchings/delete_all");
        expect(deleteAll.status).toBe(400)
    });


});

