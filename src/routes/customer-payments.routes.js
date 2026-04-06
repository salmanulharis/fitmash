import express from 'express';
import { customerPaymentsController } from '../controllers/customer-payments.controller.js';

const router = express.Router();

router.post('/', customerPaymentsController.create);
router.get('/', customerPaymentsController.findAll);
router.get('/:id', customerPaymentsController.findOne);
router.get('/subscription/:subscriptionId', customerPaymentsController.findBySubscription);
router.put('/:id', customerPaymentsController.update);
router.delete('/:id', customerPaymentsController.delete);

export default router;