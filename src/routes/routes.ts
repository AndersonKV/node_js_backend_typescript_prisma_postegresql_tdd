import { Router } from 'express';
import middleware from '../middleware/auth';

import { userCreateController } from '../useCases/user/createUser';
import { userFindController } from '../useCases/user/findCreate';
import { userDeleteController } from '../useCases/user/userDelete';
import { jobCreateController } from '../useCases/job/jobCreate';
import { jobFindController } from '../useCases/job/jobFind';
import { jobDeleteController } from '../useCases/job/jobDelete';
import { matchingFindController } from '../useCases/matching/matchingFind';
import { matchingDeleteController } from '../useCases/matching/matchingDelete';
import { matchingCreateController } from '../useCases/matching/matchingCreate';
import { jobAuthController } from '../useCases/auth/jobAuth';
import { authController } from '../useCases/auth/auth';
import { userUpdateController } from '../useCases/user/update';
import uploadConfig from "../config/upload";
import multer from "multer";


const routes = Router();
const upload = multer(uploadConfig);

/*:::::USER CONTROLLER */
routes.post('/api/v1/users/create', (req, res) => userCreateController.create(req, res));
routes.post('/api/v1/users/sign_in', (req, res) => authController.sign_in(req, res));
routes.get('/api/v1/users/find_all', (req, res) => userFindController.findAll(req, res));
routes.get('/api/v1/users/find_by_id', (req, res) => userFindController.findById(req, res));
routes.get('/api/v1/users/list_users', (req, res) => userFindController.findAll(req, res));
routes.put('/api/v1/users/update', middleware.auth, upload.single("avatar"),
    (req, res) => userUpdateController.update(req, res));
routes.delete('/api/v1/users/delete_by_id', middleware.auth, (req, res) => userDeleteController.deleteById(req, res));
routes.delete('/api/v1/users/destroyer', (req, res) => userDeleteController.destroyer(req, res));

/*:::::JOB CONTROLLER */
routes.post('/api/v1/jobs/create', middleware.auth, (req, res) => jobCreateController.create(req, res));
routes.get('/api/v1/jobs/list_jobs', (req, res) => jobFindController.findAll(req, res));
routes.get('/api/v1/jobs/find_by_id', (req, res) => jobFindController.findById(req, res));
routes.get('/api/v1/jobs/find_by_user_id', middleware.auth, (req, res) => jobFindController.findByUserId(req, res));
routes.get('/api/v1/jobs/find_the_last_three_jobs', (req, res) => jobFindController.findTheLastThreeJobs(req, res));
routes.get('/api/v1/jobs/find_by_tech', (req, res) => jobFindController.findByTech(req, res));
routes.delete('/api/v1/jobs/delete_by_id', middleware.auth, (req, res) => jobDeleteController.deleteById(req, res));
routes.delete('/api/v1/jobs/destroyer', (req, res) => jobDeleteController.destroyer(req, res));

/*:::::MATCHING CONTROLLER */
routes.post('/api/v1/matchings/apply', middleware.auth, (req, res) => matchingCreateController.create(req, res));
routes.get('/api/v1/matchings/find_by_id', middleware.auth, (req, res) => matchingFindController.findById(req, res));
routes.get('/api/v1/matchings/find_by_user_id', middleware.auth, (req, res) => matchingFindController.findByUserId(req, res));
routes.get('/api/v1/matchings/find_by_job_id', middleware.auth, (req, res) => matchingFindController.findByJobId(req, res));
routes.get('/api/v1/matchings/find_all_by_user_id', middleware.auth, (req, res) => matchingFindController.findByIdUser(req, res));
routes.get('/api/v1/matchings/find_all', (req, res) => matchingFindController.findAll(req, res));
routes.delete('/api/v1/matchings/delete_by_id', middleware.auth, (req, res) => matchingDeleteController.deleteById(req, res));
routes.delete('/api/v1/matchings/delete_all', (req, res) => matchingDeleteController.destroyer(req, res));

/*::::AUTH CONTROLLER::::*/
routes.post('/api/v1/authenticate/dashboard', middleware.auth, (req, res) => authController.dashboard(req, res));
routes.post('/api/v1/authenticate/dashboard/opportunity', middleware.auth, (req, res) => authController.dashboardOpportunity(req, res));
routes.post('/api/v1/authenticate/list_all_jobs', middleware.auth, (req, res) => jobAuthController.findAll(req, res));
routes.post('/api/v1/authenticate/find_by_job_id', middleware.auth, (req, res) => jobAuthController.findById(req, res));
routes.post('/api/v1/authenticate/login', middleware.auth, (req, res) => authController.authToken(req, res));
//routes.post('/api/v1/authenticate/update', middleware.auth, userAuthController.authToken);

export default routes;