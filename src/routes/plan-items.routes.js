import express from 'express';
import { planItemsController } from '../controllers/plan-items.controller.js';

const router = express.Router();

router.post('/', planItemsController.create);
router.get('/', planItemsController.findAll);
router.get('/:id', planItemsController.findOne);
router.get('/plan/:planId', planItemsController.findByPlan);
router.get('/tenant/:tenantId', planItemsController.findByTenant);
router.put('/:id', planItemsController.update);
router.delete('/:id', planItemsController.delete);

export default router;