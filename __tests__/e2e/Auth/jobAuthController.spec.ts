import request from "supertest";
import { _server } from "../../_server";
import { Server } from "http";
import { PrismaJobDeleteRepositry } from "../../../src/repositories/prisma/job/PrismaJobDeleteRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { userFactory } from "../../utils/userFactory";
import { jobFactory } from "../../utils/jobFactory";
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


describe("[e2e] - jobAuthController", () => {
    let app: Server;


    let prismaJobDeleteRepositry: PrismaJobDeleteRepositry;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;
    let prismaMatchingDeleteRepository: PrismaMatchingDeleteRepository;


    let userCreate: PropsUserCreate;
    let userAuthenticate: PropsAuth;
    let jobCreate: PropsJob;

    let applyCreate: PropsApply;



    beforeAll(async () => {
        app = _server.listen(26666);

        prismaJobDeleteRepositry = new PrismaJobDeleteRepositry;
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
        prismaMatchingDeleteRepository = new PrismaMatchingDeleteRepository;


        userCreate = new userFactory().createWithRoleCompany()


        await request(app).post('/api/v1/users/create').send(userCreate)

        const login = {
            email: userCreate.email,
            password: userCreate.password
        }

        const userAuth = await request(app).post('/api/v1/users/sign_in').send(login)

        userAuthenticate = await userAuth.body

        const config = {
            token: userAuth.body.token,
            id_user: userAuth.body.data[0].id
        }

        const jobCreateFactory = new jobFactory().create(config.token, config.id_user)

        const createJob = await request(app).post('/api/v1/jobs/create').send(jobCreateFactory)
        jobCreate = await createJob.body.data;


    });

    afterAll(async () => {

        await prismaUserDeleteRepository.destroyer();

    });

    it("should get info about job and user authenticate", async () => {

        const user = new userFactory().create()

        await request(app).post('/api/v1/users/create').send(user)

        const data = {
            id_job: jobCreate.id,
            id_user: userAuthenticate.data[0].id,
            Authorization: `Bearer ${userAuthenticate.token}`
        }

        const find = await request(app).post('/api/v1/authenticate/find_by_job_id').send(data)

        expect(find.body.job[0]).toHaveProperty("id")
        expect(find.status).toBe(200)

    });

    it("should get all with authenticate", async () => {

        const user = new userFactory().create()

        await request(app).post('/api/v1/users/create').send(user)

        const data = {
            id_job: jobCreate.id,
            id_user: userAuthenticate.data[0].id,
            Authorization: `Bearer ${userAuthenticate.token}`
        }

        const find = await request(app).post('/api/v1/authenticate/list_all_jobs').send(data)

        expect(find.body.user).toHaveProperty("id")
        expect(find.body.job[0]).toHaveProperty("id")
        expect(find.status).toBe(200)

    });



    it("should fail in get info about job and user authenticate with id_job", async () => {

        const userCreateFactory = await new userFactory().create()


        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const data = {
            id_job: '0',
            id_user: userAuthenticate.data[0].id,
            Authorization: `Bearer ${userAuthenticate.token}`
        }

        const res = await request(app).post('/api/v1/authenticate/find_by_job_id').send(data)

        expect(res.status).toBe(400)

    });

    it("should fail with id_user", async () => {
        const data = {
            id_job: 'd',
            id_user: 'd',
            Authorization: `Bearer ${userAuthenticate.token}`
        }
        const find = await request(app).post('/api/v1/authenticate/find_by_job_id').send(data)
        expect(find.status).toBe(400)
    });




});

