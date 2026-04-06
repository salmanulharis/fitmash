import express from 'express';
import { saasPlanController } from '../controllers/saas-plans.controller.js';

const router = express.Router();

router.post('/', saasPlanController.create);
router.get('/', saasPlanController.findAll);
router.get('/:id', saasPlanController.findOne);
router.put('/:id', saasPlanController.update);
router.delete('/:id', saasPlanController.delete);

export default router;