import request from "supertest";
import { _server } from "../../_server";
import { Server } from "http";

import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { userFactory } from "../../utils/userFactory";

describe("[e2e] - userFindController", () => {
    let app: Server;

    let prismaUserDeleteRepository: PrismaUserDeleteRepository;

    beforeAll(() => {
        app = _server.listen(3344);

        prismaUserDeleteRepository = new PrismaUserDeleteRepository;

    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();
    });

    it("[e2e] should create user and find", async () => {

        const userCreate = new userFactory().create()
        const user = await request(app).post('/api/v1/users/create').send(userCreate)
        const findUserById = await request(app).get('/api/v1/users/find_by_id').query({ id: user.body.data.id })

        expect(findUserById.status).toBe(200);


    });

    it("[e2e] should faill in find user with wrong id", async () => {
        const findUserById = await request(app).get('/api/v1/users/find_by_id').query({ id: 1 })
        expect(findUserById.status).toBe(400);
    });

    it("[e2e] find all", async () => {
        const findAll = await request(app).get('/api/v1/users/find_all')
        expect(findAll.status).toBe(200);
    });

});

