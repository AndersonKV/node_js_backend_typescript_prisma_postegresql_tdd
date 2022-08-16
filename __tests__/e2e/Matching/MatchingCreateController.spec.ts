import request from "supertest";
import { Server } from "http";
import { PrismaJobDeleteRepositry } from "../../../src/repositories/prisma/job/PrismaJobDeleteRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { userFactory } from "../../utils/userFactory";
import { jobFactory } from "../../utils/jobFactory";
import { matchingFactory } from "../../utils/matchingFactory";
import { _server } from "../../_server";
import { PrismaMatchingCreateRepository } from "../../../src/repositories/prisma/matching/PrismaMatchingCreateRepository";


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

describe("[e2e] - applyCreateController", () => {
    let app: Server;


    let prismaJobDeleteRepositry: PrismaJobDeleteRepositry;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;

    let prismaMatchingCreateRepository: PrismaMatchingCreateRepository;

    let user: PropsUserCreate;
    let company: PropsUserCreate;
    let userAuthenticate: PropsAuth;
    let companyAuthenticate: PropsAuth;
    let jobCreate: PropsJob;
    let applyCreate: PropsApply;


    beforeAll(async () => {
        app = _server.listen(6666);

        prismaJobDeleteRepositry = new PrismaJobDeleteRepositry;
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
        prismaMatchingCreateRepository = new PrismaMatchingCreateRepository;

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

        applyCreate = new matchingFactory().create(Number(createJob.body.data.id), userAuthenticate.token, Number(userAuthenticate.data[0].id))

    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();
    });

    it("should create apply", async () => {

        const apply = await request(app).post("/api/v1/matchings/apply").send(applyCreate)

        expect(apply.status).toBe(201)

    });

    it("should fail to apply twice", async () => {

        const apply = await request(app).post("/api/v1/matchings/apply").send(applyCreate)
        expect(apply.status).toBe(400)

    });

    it("should fail in create apply by id_job", async () => {

        const apply = new matchingFactory().createWrongIdJob(userAuthenticate.token)

        const create = await request(app).post("/api/v1/matchings/apply").send(apply)
        expect(create.status).toBe(400);
    });

    it("should fail in create apply with wrong token", async () => {

        const apply = new matchingFactory().createWrongToken()

        const create = await request(app).post("/api/v1/matchings/apply").send(apply)

        expect(create.status).toBe(401);

    });

    it("should fail in create apply no token", async () => {
        const create = await request(app).post("/api/v1/matchings/apply").send({})
        expect(create.status).toBe(401);
    });

    it("should fail in create apply token mal formated", async () => {

        const apply = new matchingFactory().createTokenMalformated(userAuthenticate.token)

        const create = await request(app).post("/api/v1/matchings/apply").send(apply)


        expect(create.status).toBe(401);


    });


});

