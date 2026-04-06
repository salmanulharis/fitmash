import express from 'express';
import { trainerUsersController } from '../controllers/trainer-users.controller.js';

const router = express.Router();

router.post('/', trainerUsersController.create);
router.get('/', trainerUsersController.findAll);
router.get('/:id', trainerUsersController.findOne);
router.get('/trainer/:trainerId', trainerUsersController.findByTrainer);
router.get('/user/:userId', trainerUsersController.findByUser);
router.get('/tenant/:tenantId', trainerUsersController.findByTenant);
router.put('/:id', trainerUsersController.update);
router.delete('/:id', trainerUsersController.delete);

export default router;