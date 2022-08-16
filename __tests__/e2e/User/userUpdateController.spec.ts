import request from "supertest";
import { Server } from "http";

import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { userFactory } from "../../utils/userFactory";
import { _server } from "../../_server";

describe("[e2e] - userUpdateController", () => {
    let app: Server;

    let prismaUserDeleteRepository: PrismaUserDeleteRepository;

    beforeAll(() => {
        app = _server.listen(4113);
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();
    });


    it("should create and update", async () => {
        const user = new userFactory().create()
        const create = await request(app).post('/api/v1/users/create').send(user)

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(user)

        const { email, name, password, role } = create.body.data

        const updateFactory = new userFactory().update(name, "novo@gmail.com", user.password, role, sign_in.body.token, sign_in.body.data[0].avatar)

        const update = await request(app).put('/api/v1/users/update').send(updateFactory)

        expect(update.status).toBe(201);
        expect(update.body.data[0].email).toEqual("novo@gmail.com");
    });



    it("should update password", async () => {
        const user = new userFactory().create()
        const create = await request(app).post('/api/v1/users/create').send(user)

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(user)

        const { email, name, password, role } = create.body.data

        const updateFactory = new userFactory().updateNewPassword(name, user.email, user.password, "novasenhanovasenha", role, sign_in.body.token, sign_in.body.data[0].avatar)

        const update = await request(app).put('/api/v1/users/update').send(updateFactory)

        const sign_in_update = await request(app).post('/api/v1/users/sign_in').send({ email: user.email, password: "novasenhanovasenha" })


        expect(sign_in_update.status).toBe(200);
    });

    it("should fail in update with email exist", async () => {
        const user = new userFactory().create()
        const user2 = new userFactory().create()

        await request(app).post('/api/v1/users/create').send(user)

        const create = await request(app).post('/api/v1/users/create').send(user2)

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(user2)

        const { email, name, password, role } = create.body.data

        const updateFactory = new userFactory().update(name, user.email, user.password, role, sign_in.body.token, sign_in.body.data[0].avatar)
        const update = await request(app).put('/api/v1/users/update').send(updateFactory)

        expect(update.status).toBe(400);
    });


    it("should fail in update with empty values", async () => {
        const user = new userFactory().create()

        const create = await request(app).post('/api/v1/users/create').send(user)

        const sign_in = await request(app).post('/api/v1/users/sign_in').send(user)

        const updateFactory = new userFactory().updateEmptyValues(sign_in.body.token)
        const update = await request(app).put('/api/v1/users/update').send(updateFactory)

        expect(update.status).toBe(400);
    });





});

