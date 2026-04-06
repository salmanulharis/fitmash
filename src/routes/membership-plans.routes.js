import express from 'express';
import { membershipPlansController } from '../controllers/membership-plans.controller.js';

const router = express.Router();

router.post('/', membershipPlansController.create);
router.get('/', membershipPlansController.findAll);
router.get('/:id', membershipPlansController.findOne);
router.get('/tenant/:tenantId', membershipPlansController.findByTenant);
router.put('/:id', membershipPlansController.update);
router.delete('/:id', membershipPlansController.delete);

export default router;