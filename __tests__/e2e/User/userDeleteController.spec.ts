import request from "supertest";
import { Server } from "http";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { userFactory } from "../../utils/userFactory";
import { _server } from "../../_server";

describe("[e2e] - userDeleteController", () => {
    let app: Server;

    let prismaUserDeleteRepository: PrismaUserDeleteRepository;

    beforeAll(() => {
        app = _server.listen(4345);
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();
    });

    it("should create user and delete ", async () => {

        const userCreateFactory = new userFactory().create()
        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const signIn = await request(app).post('/api/v1/users/sign_in').send(userCreateFactory)

        const deleteConfig = {
            id: signIn.body.data[0].id,
            Authorization: `Bearer ${signIn.body.token}`
        }
        const deleteById = await request(app).delete('/api/v1/users/delete_by_id').send(deleteConfig)

        expect(deleteById.status).toBe(200);
    });


    it("should create user and fall in delete ", async () => {
        const userCreateFactory = new userFactory().create()

        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const signIn = await request(app).post('/api/v1/users/sign_in').send(userCreateFactory)

        const deleteConfig = {
            id: 3,
            Authorization: `Bearer ${signIn.body.token}`

        }

        const deleteById = await request(app).delete('/api/v1/users/delete_by_id').send(deleteConfig)
        expect(deleteById.status).toBe(400)
    });



    it("should create user and fall in delete by token ", async () => {
        const userCreateFactory = await new userFactory().create()

        await request(app).post('/api/v1/users/create').send(userCreateFactory)

        const signIn = await request(app).post('/api/v1/users/sign_in').send(userCreateFactory)

        const deleteConfig = {
            id: signIn.body.data[0].id,
            Authorization: `Bearer ${signIn.body.token}55`
        }

        const deleteById = await request(app).delete('/api/v1/users/delete_by_id').send(deleteConfig)

        expect(deleteById.status).toBe(401);
    });

    it("should delete all ", async () => {
        const deleteAll = await request(app).delete('/api/v1/users/destroyer')
        expect(deleteAll.status).toBe(200);
    });


});

