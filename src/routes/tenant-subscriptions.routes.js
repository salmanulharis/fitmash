import express from 'express';
import { tenantSubscriptionController } from '../controllers/tenant-subscriptions.controller.js';

const router = express.Router();

router.post('/', tenantSubscriptionController.create);
router.get('/', tenantSubscriptionController.findAll);
router.get('/:id', tenantSubscriptionController.findOne);
router.get('/tenant/:tenantId', tenantSubscriptionController.findByTenant);
router.get('/plan/:planId', tenantSubscriptionController.findByPlan);
router.put('/:id', tenantSubscriptionController.update);
router.delete('/:id', tenantSubscriptionController.delete);

export default router;