import express from 'express';
import { userController } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/', userController.create);
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.get('/tenant/:tenantId', userController.findByTenant);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;