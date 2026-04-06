import express from 'express';
import { planProgressItemsController } from '../controllers/plan-progress-items.controller.js';

const router = express.Router();

router.post('/', planProgressItemsController.create);
router.get('/', planProgressItemsController.findAll);
router.get('/:id', planProgressItemsController.findOne);
router.get('/progress/:progressId', planProgressItemsController.findByProgress);
router.get('/plan-item/:planItemId', planProgressItemsController.findByPlanItem);
router.get('/tenant/:tenantId', planProgressItemsController.findByTenant);
router.put('/:id', planProgressItemsController.update);
router.delete('/:id', planProgressItemsController.delete);

export default router;