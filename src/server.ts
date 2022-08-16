import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes/routes';
import dotenv from 'dotenv';
import path from "path";
import bodyParser from 'body-parser';

dotenv.config();

const server = express();


server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes);
server.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
server.listen(3333);




