import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import HelpRespondController from './app/controllers/HelpRespondController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students/:studentId/checkins', CheckinController.store);
routes.get('/students/:studentId/checkins', CheckinController.show);

routes.post('/students/:studentId/help-orders', HelpOrderController.store);
routes.get('/students/:studentId/help-orders', HelpOrderController.index);

routes.use(authMiddleware);

routes.get('/help-orders', HelpRespondController.index);
routes.put('/help-orders/:helpId/answer', HelpOrderController.update);

routes.post('/students', StudentsController.store);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
// routes.put('/plans/:id', PlanController.update);
// routes.detele('/plans/:id', PlanController.delete);

routes.get('/enrollment', EnrollmentController.index);
routes.post('/enrollment', EnrollmentController.store);

export default routes;
