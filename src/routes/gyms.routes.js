import express from 'express';
import { gymsController } from '../controllers/gyms.controller.js';

const router = express.Router();

router.post('/', gymsController.create);
router.get('/', gymsController.findAll);
router.get('/:id', gymsController.findOne);
router.get('/tenant/:tenantId', gymsController.findByTenant);
router.put('/:id', gymsController.update);
router.delete('/:id', gymsController.delete);

export default router;