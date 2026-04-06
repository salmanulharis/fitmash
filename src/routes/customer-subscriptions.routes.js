import express from 'express';
import { customerSubscriptionsController } from '../controllers/customer-subscriptions.controller.js';

const router = express.Router();

router.post('/', customerSubscriptionsController.create);
router.get('/', customerSubscriptionsController.findAll);
router.get('/:id', customerSubscriptionsController.findOne);
router.get('/tenant/:tenantId', customerSubscriptionsController.findByTenant);
router.get('/user/:userId', customerSubscriptionsController.findByUser);
router.put('/:id', customerSubscriptionsController.update);
router.delete('/:id', customerSubscriptionsController.delete);

export default router;