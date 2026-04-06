import express from 'express';
import { userPlansController } from '../controllers/user-plans.controller.js';

const router = express.Router();

router.post('/', userPlansController.create);
router.get('/', userPlansController.findAll);
router.get('/:id', userPlansController.findOne);
router.get('/user/:userId', userPlansController.findByUser);
router.get('/plan/:planId', userPlansController.findByPlan);
router.get('/tenant/:tenantId', userPlansController.findByTenant);
router.put('/:id', userPlansController.update);
router.delete('/:id', userPlansController.delete);

export default router;