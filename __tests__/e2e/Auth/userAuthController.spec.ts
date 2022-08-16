import request from "supertest";
import { _server } from "../../_server";
import { Server } from "http";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { userFactory } from "../../utils/userFactory";
import { sign } from "jsonwebtoken";

describe("[e2e] - userAuthController", () => {
    let app: Server;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;

    beforeAll(async () => {
        app = _server.listen(1666);
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();
    });

    it("should create user and login", async () => {
        const userCreateFactory = new userFactory().create()

        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const loginConfig = {
            email: userCreateFactory.email,
            password: userCreateFactory.password,
        }

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(loginConfig)
        expect(sign_in.status).toBe(200)
    });

    it("should create user and login and auth", async () => {
        const userCreateFactory = new userFactory().create()

        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const loginConfig = {
            email: userCreateFactory.email,
            password: userCreateFactory.password,
        }

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(loginConfig)

        const authConfig = {
            id_user: sign_in.body.data[0].id,
            Authorization: `Bearer ${await sign_in.body.token}`
        }

        const userAthenticate = await request(app).post('/api/v1/authenticate/login').send(authConfig)

        expect(userAthenticate.status).toBe(200)
    });

    it("should create user and login and fail in auth", async () => {
        const userCreateFactory = new userFactory().create()

        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const loginConfig = {
            email: userCreateFactory.email,
            password: userCreateFactory.password,
        }

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(loginConfig)

        const authConfig = {
            Authorization: `Bearer '  sign_in.body.token '`
        }

        const userAthenticate = await request(app).post('/api/v1/authenticate/login').send(authConfig)

        expect(userAthenticate.status).toBe(409)
    });



    it("should fail login with wrong email", async () => {
        const sign_in = await request(app).post('/api/v1/users/sign_in').send({ email: "exemplo@gmail.com", password: 'exemplo@gmail.com' })
        expect(sign_in.status).toBe(400)
    });

    it("should fail login with mal formated values", async () => {
        const userCreateFactory = new userFactory().createEmptyValues()
        const sign_in = await request(app).post('/api/v1/users/sign_in').send(userCreateFactory)
        expect(sign_in.status).toBe(400)
    });

    it("should fail login with wrong password", async () => {
        const create = new userFactory().create()

        await request(app).post('/api/v1/users/create').send(create)

        const config = {
            email: create.email,
            password: 56165165165165
        }
        const sign_in = await request(app).post('/api/v1/users/sign_in').send(config)
        expect(sign_in.status).toBe(400)
    });

    it("should auth with dashboard", async () => {
        const userCreateFactory = new userFactory().create()

        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const loginConfig = {
            email: userCreateFactory.email,
            password: userCreateFactory.password,
        }

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(loginConfig)



        const authDashboard = await request(app).post('/api/v1/authenticate/dashboard').send({
            Authorization: `Bearer ${await sign_in.body.token}`
        })

        expect(authDashboard.status).toBe(200)
    });

    it("should auth with dashboard opportunity", async () => {
        const userCreateFactory = new userFactory().create()

        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const loginConfig = {
            email: userCreateFactory.email,
            password: userCreateFactory.password,
        }

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(loginConfig)



        const authDashboard = await request(app).post('/api/v1/authenticate/dashboard/opportunity').send({
            Authorization: `Bearer ${await sign_in.body.token}`
        })

        expect(authDashboard.status).toBe(200)
        expect(authDashboard.body.data).toHaveProperty("id")
    });

    it("should auth by token", async () => {
        const userCreateFactory = new userFactory().create()

        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const loginConfig = {
            email: userCreateFactory.email,
            password: userCreateFactory.password,
        }

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(loginConfig)

        const auth = await request(app).post('/api/v1/authenticate/login').send({
            Authorization: `Bearer ${await sign_in.body.token}`
        })


        expect(auth.status).toBe(200)
        expect(auth.body.user).toHaveProperty("id")
    });

});

