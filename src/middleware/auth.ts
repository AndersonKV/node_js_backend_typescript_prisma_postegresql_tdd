import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import dotenv from 'dotenv';

//dotenv.config();

interface RequestProps extends Request {
    id_user?: string;
    token?: string;
}

export default {
    auth(request: RequestProps, response: Response, next: NextFunction) {
        try {

            if (!authConfig[0].secret) {
                return response.status(401).send({ success: false, error: "fail in verify secret" });
            }

            let authHeader = request.query.Authorization ? request.query.Authorization : request.body.Authorization;



            if (!authHeader) {
                return response.status(401).send({ success: false, error: "no token provid" });
            }

            const parts = authHeader.split(" ");

            if (parts.length !== 2) {
                return response.status(409).send({ success: false, error: "token erro" });
            }

            const [schema, token] = parts;

            if (!/^Bearer$/i.test(schema)) {
                return response.status(401).send({ error: "token malformated" });
            }

            jwt.verify(token, authConfig[0].secret, (err: any, decoded: any) => {

                if (err) {
                    return response.status(401).send({ error: "token expirado" });
                }

                request.id_user = decoded.id;
                request.token = token;
                return next();
            });
        } catch (err: any) {
            return response.status(400).send({
                error: {
                    message: "problema com o token"
                }
            });
        }
    },

}