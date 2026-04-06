import express from 'express';
import { tenantPaymentController } from '../controllers/tenant-payments.controller.js';

const router = express.Router();

router.post('/', tenantPaymentController.create);
router.get('/', tenantPaymentController.findAll);
router.get('/:id', tenantPaymentController.findOne);
router.get('/subscription/:subscriptionId', tenantPaymentController.findBySubscription);
router.put('/:id', tenantPaymentController.update);
router.delete('/:id', tenantPaymentController.delete);

export default router;