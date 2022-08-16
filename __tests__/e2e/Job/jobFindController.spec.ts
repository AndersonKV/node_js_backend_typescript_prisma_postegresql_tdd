import request from "supertest";
import { _server } from "../../_server";
import { Server } from "http";
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

describe("[e2e] - jobFindController", () => {
    let app: Server;
    let userCreate: PropsUserCreate;
    let userAuthenticate: PropsAuth;
    let companyAuthenticate: PropsAuth;


    let prismaJobDeleteRepositry: PrismaJobDeleteRepositry;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;

    beforeAll(async () => {
        app = _server.listen(5555);


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
    });

    afterAll(async () => {

        await prismaUserDeleteRepository.destroyer();



    });

    it("should find job who created", async () => {
        const job = new jobFactory().create(companyAuthenticate.token, companyAuthenticate.data[0].id)

        await request(app).post('/api/v1/jobs/create').send(job)



        const find = await request(app).get('/api/v1/jobs/find_by_user_id').query({
            user_id: companyAuthenticate.data[0].id,
            Authorization: `Bearer ${companyAuthenticate.token}`
        })

        expect(find.status).toBe(200);

    });

    it("should find by id", async () => {
        const job = new jobFactory().create(companyAuthenticate.token, companyAuthenticate.data[0].id)

        const create = await request(app).post('/api/v1/jobs/create').send(job)

        const config = {
            id: create.body.data.id,
            Authorization: `Bearer ${companyAuthenticate.token}`

        }

        const getJobById = await request(app).get('/api/v1/jobs/find_by_id').query(config)

        expect(getJobById.status).toBe(200);
    });


    it("should fail in find job", async () => {
        const getJobById = await request(app).get('/api/v1/jobs/find_by_id').query({ id: 999999 })
        expect(getJobById.status).toBe(400);
    });


    it("should find by user_id", async () => {
        const job = new jobFactory().create(companyAuthenticate.token, companyAuthenticate.data[0].id)

        const create = await request(app).post('/api/v1/jobs/create').send(job)

        const config = {
            user_id: companyAuthenticate.data[0].id,

        }


        const getJobById = await request(app).get('/api/v1/jobs/find_by_user_id').query({
            user_id: companyAuthenticate.data[0].id,
            Authorization: `Bearer ${companyAuthenticate.token}`
        })

        expect(getJobById.status).toBe(200);
    });

    it("should fail in find by user_id", async () => {
        const getJobById = await request(app).get('/api/v1/jobs/find_by_id').query({
            user_id: 999,
            Authorization: `Bearer ${companyAuthenticate.token}`
        })

        expect(getJobById.status).toBe(400);
    });


    it("should find last three job", async () => {

        const config = {
            token: companyAuthenticate.token,
            id_user: companyAuthenticate.data[0].id
        }

        const jobCreateFactory = new jobFactory().create(config.token, config.id_user)

        const job1 = request(app).post('/api/v1/jobs/create').send(jobCreateFactory)
        const job2 = request(app).post('/api/v1/jobs/create').send(jobCreateFactory)
        const job3 = request(app).post('/api/v1/jobs/create').send(jobCreateFactory)

        const promisse1 = await Promise.resolve(job1);
        const promisse2 = await Promise.resolve(job2);
        const promisse3 = await Promise.resolve(job3);

        await Promise.all([promisse1, promisse2, promisse3]).then(async data => {
            const findAll = await request(app).get('/api/v1/jobs/find_the_last_three_jobs')
            expect(findAll.body.data.length).toBe(3);
        })


    });



    it("should fail create job by token expired", async () => {
        const job = new jobFactory().createWrongToken()
        const create = await request(app).post('/api/v1/jobs/create').send(job)
        expect(create.status).toBe(401);

    });

    it("should fail create job by mal formated ", async () => {
        const job = new jobFactory().createMalFormatedValues(companyAuthenticate.token)
        const create = await request(app).post('/api/v1/jobs/create').send(job)
        expect(create.status).toBe(400);
    });


    it("should find all job who created", async () => {
        const config = {
            token: companyAuthenticate.token,
            id_user: companyAuthenticate.data[0].id
        }

        const job = new jobFactory().create(config.token, config.id_user)

        await request(app).post('/api/v1/jobs/create').send(job)

        const find = await request(app).get('/api/v1/jobs/find_by_user_id').query({
            user_id: companyAuthenticate.data[0].id,
            Authorization: `Bearer ${companyAuthenticate.token}`,
        })
        expect(find.body.data.length).toBeGreaterThanOrEqual(1)
    });

    it("should find all job", async () => {
        const config = {
            token: companyAuthenticate.token,
            id_user: companyAuthenticate.data[0].id
        }

        const job = new jobFactory().create(config.token, config.id_user)

        await request(app).post('/api/v1/jobs/create').send(job)

        const find = await request(app).get('/api/v1/jobs/list_jobs').send({ id: companyAuthenticate.data[0].id })
        expect(find.status).toBe(200)
    });


    it("should find by tech", async () => {
        const config = {
            token: companyAuthenticate.token,
            id_user: companyAuthenticate.data[0].id
        }

        const job = new jobFactory().create(config.token, config.id_user)

        const create = await request(app).post('/api/v1/jobs/create').send(job)

        const findByTech = await request(app).get(`/api/v1/jobs/find_by_tech`).query({ tech: 'ruby' })

        expect(findByTech.body.data[0]).toHaveProperty("id")
    });

    it("should find by remote", async () => {
        const config = {
            token: companyAuthenticate.token,
            id_user: companyAuthenticate.data[0].id
        }

        const job = new jobFactory().create(config.token, config.id_user)

        const create = await request(app).post('/api/v1/jobs/create').send(job)

        const findByTech = await request(app).get(`/api/v1/jobs/find_by_tech`).query({ remote: 'sim' })

        expect(findByTech.status).toBe(200)
        expect(findByTech.body.data[0]).toHaveProperty("id")

    });



    it("should find by experience_level", async () => {
        const config = {
            token: companyAuthenticate.token,
            id_user: companyAuthenticate.data[0].id
        }

        const job = new jobFactory().create(config.token, config.id_user)

        const create = await request(app).post('/api/v1/jobs/create').send(job)

        const findByTech = await request(app).get(`/api/v1/jobs/find_by_tech`).query({ types_contract: 'clt' })

        expect(findByTech.status).toBe(200)
        expect(findByTech.body.data[0]).toHaveProperty("id")
    });


    it("should find by all", async () => {
        const config = {
            token: companyAuthenticate.token,
            id_user: companyAuthenticate.data[0].id
        }

        const job = new jobFactory().create(config.token, config.id_user)

        const create = await request(app).post('/api/v1/jobs/create').send(job)

        const findByTech = await request(app).get(`/api/v1/jobs/find_by_tech`).send({ tech: 'ruby', remote: 'sim', types_contract: 'clt', experience_level: 'junior' })

        expect(findByTech.status).toBe(200)

    });

    it("should find tech with empty values", async () => {
        const config = {
            token: companyAuthenticate.token,
            id_user: companyAuthenticate.data[0].id
        }

        const job = new jobFactory().create(config.token, config.id_user)


        const findByTech = await request(app).get(`/api/v1/jobs/find_by_tech`)
        expect(findByTech.body.data.length).toBe(0)
    });



    it("should fail find tech ", async () => {
        const config = {
            token: companyAuthenticate.token,
            id_user: companyAuthenticate.data[0].id
        }

        const findByTech = await request(app).get(`/api/v1/jobs/find_by_tech`).send({ tech: 'wewewewe' })

        expect(findByTech.body.data.length).toBe(0)
    });

    it("shoud return tech empty", async () => {
        const findByTech = await request(app).get('/api/v1/jobs/find_by_tech').query({ tech: "rssuby" })
        expect(findByTech.body.data.length).toBe(0)
    });



});

