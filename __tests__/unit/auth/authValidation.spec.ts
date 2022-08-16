import { UtilsUser } from "../../../src/util";
import { AuthValidation } from "../../../src/util/AuthValidation";
import { userFactory } from "../../utils/userFactory";
import bcryptjs from "bcryptjs";
import authConfig from '../../../src/config/auth'
import jwt from "jsonwebtoken";


describe("[unit] - authValidation", () => {

    it("should pass in validate sign in", async () => {
        const user = new userFactory().create();

        const validation = await new AuthValidation().signIn(user);

        expect(Object.values(validation).length).toBe(0)
    });

    it("should fail in sign in ", async () => {

        const data = {
            email: 'sad@sdsa.d33',
            password: '',
        }
        const validation = await new AuthValidation().signIn(data);

        expect(Object.values(validation).length).toBeGreaterThanOrEqual(1)
    });


    it("should encodedPassword password   ", async () => {
        const user = new userFactory().create();

        const encodedPassword = await new UtilsUser().encodedPassword(user.password);

        const compareEncodedPassword = await bcryptjs.compare(user.password, encodedPassword);

        expect(compareEncodedPassword).toBe(true)
    });



    it("should fail in encodedPassword ", async () => {
        const user = new userFactory().create();

        const encodedPassword = await new UtilsUser().encodedPassword(user.password);

        const compareEncodedPassword = await bcryptjs.compare('6516516516515665', encodedPassword);

        expect(compareEncodedPassword).toBe(false)
    });


    it("should get token ", async () => {
        const user = new userFactory().create();
        const token = await new AuthValidation().setTokenAuth(Number(user.password));

        if (!token) {
            return;
        }

        if (!authConfig[0].secret) {
            return;
        }

        jwt.verify(token, authConfig[0].secret, (err: any, decoded: any) => {
            const isEqual = user.password == decoded.id;
            expect(isEqual).toBe(true)
        });

    });




});

