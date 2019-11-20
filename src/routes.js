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
routes.post('/help-orders/:helpId/answer', HelpRespondController.store);

routes.get('/students', StudentsController.index);
routes.get('/students/:studentId', StudentsController.show);
routes.post('/students', StudentsController.store);

routes.get('/plans', PlanController.index);
routes.get('/plans/:planId', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:planId', PlanController.update);
routes.delete('/plans/:planId', PlanController.delete);

routes.get('/enrollment', EnrollmentController.index);
routes.post('/enrollment', EnrollmentController.store);
routes.put('/enrollment/:enrollmentId', EnrollmentController.update);
routes.delete('/enrollment/:enrollmentId', EnrollmentController.delete);

export default routes;
