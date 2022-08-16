import request from "supertest";
import { Server } from "http";

import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { userFactory } from "../../utils/userFactory";
import { _server } from "../../_server";

describe("[e2e] - userCreateController", () => {
    let app: Server;

    let prismaUserDeleteRepository: PrismaUserDeleteRepository;

    beforeAll(() => {
        app = _server.listen(3333);
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();
    });


    it("should create user", async () => {
        const user = new userFactory().create()
        const create = await request(app).post('/api/v1/users/create').send(user)

        expect(create.status).toBe(201);
    });

    it("should fail in create same email", async () => {

        const user = new userFactory().create()
        await request(app).post('/api/v1/users/create').send(user)
        const create2 = await request(app).post('/api/v1/users/create').send(user)
        expect(create2.status).toBe(400);
    });

    it("should fail in create user with password not equal", async () => {
        const user = new userFactory().createWrongPassword()
        const create = await request(app).post('/api/v1/users/create').send(user)
        expect(create.status).toBe(400);
    });

    it("should fail in create user with email mal formated", async () => {
        const user = new userFactory().createWrongEmail()
        const create = await request(app).post('/api/v1/users/create').send(user)
        expect(create.status).toBe(400);
    });

    it("should fail in create user with empty values", async () => {
        const create = await request(app).post('/api/v1/users/create').send({
            confirm_password: '',
            email: '',
            name: '',
            password: '',
            token: '',
        })
        expect(create.status).toBe(400);
    });

});

