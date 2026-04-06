import express from 'express';
import { tenantsController } from '../controllers/tenents.controller.js';

const router = express.Router();

router.post('/', tenantsController.create);
router.get('/', tenantsController.findAll);
router.get('/:id', tenantsController.findOne);
router.get('/owner/:ownerId', tenantsController.findByOwner);
router.put('/:id', tenantsController.update);
router.delete('/:id', tenantsController.delete);

export default router;
