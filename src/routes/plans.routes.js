import express from 'express';
import { plansController } from '../controllers/plans.controller.js';

const router = express.Router();

router.post('/', plansController.create);
router.get('/', plansController.findAll);
router.get('/:id', plansController.findOne);
router.get('/tenant/:tenantId', plansController.findByTenant);
router.get('/creator/:creatorId', plansController.findByCreator);
router.put('/:id', plansController.update);
router.delete('/:id', plansController.delete);

export default router;