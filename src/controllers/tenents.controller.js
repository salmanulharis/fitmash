import prisma from '../config/db.config.js';

export const tenantsController = {
  // Create tenant
  async create(req, res) {
    try {
      const tenant = await prisma.tenant.create({
        data: req.body,
      });
      res.status(201).json(tenant);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all tenants
  async findAll(req, res) {
    try {
      const tenants = await prisma.tenant.findMany();
      res.json(tenants);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get tenant by id
  async findOne(req, res) {
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { id: req.params.id },
      });
      if (!tenant) return res.status(404).json({ error: 'Tenant not found' });
      res.json(tenant);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get tenants by owner id
  async findByOwner(req, res) {
    try {
      const tenants = await prisma.tenant.findMany({
        where: { ownerId: req.params.ownerId },
      });
      res.json(tenants);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update tenant
  async update(req, res) {
    try {
      const tenant = await prisma.tenant.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json(tenant);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete tenant
  async delete(req, res) {
    try {
      await prisma.tenant.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};