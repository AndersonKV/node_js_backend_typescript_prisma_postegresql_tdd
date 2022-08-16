import express, { Express } from 'express';
import cors from 'cors';
import routes from '../src/routes/routes';
import dotenv from 'dotenv';

dotenv.config();

const _server = express();

_server.use(cors());
_server.use(express.json());
_server.use(express.urlencoded({ extended: true }));
_server.use(routes);


export { _server };



