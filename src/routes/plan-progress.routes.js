import express from 'express';
import { planProgressController } from '../controllers/plan-progress.controller.js';

const router = express.Router();

router.post('/', planProgressController.create);
router.get('/', planProgressController.findAll);
router.get('/:id', planProgressController.findOne);
router.get('/user-plan/:userPlanId', planProgressController.findByUserPlan);
router.get('/tenant/:tenantId', planProgressController.findByTenant);
router.put('/:id', planProgressController.update);
router.delete('/:id', planProgressController.delete);

export default router;