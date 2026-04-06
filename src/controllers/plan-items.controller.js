import prisma from '../config/db.config.js';

export const planItemsController = {
  // Create plan item
  async create(req, res) {
    try {
      const planItem = await prisma.planItem.create({
        data: req.body,
        include: {
          tenant: true,
          plan: true,
        },
      });
      res.status(201).json(planItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all plan items
  async findAll(req, res) {
    try {
      const planItems = await prisma.planItem.findMany({
        include: {
          tenant: true,
          plan: true,
        },
      });
      res.json(planItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plan item by id
  async findOne(req, res) {
    try {
      const planItem = await prisma.planItem.findUnique({
        where: { id: req.params.id },
        include: {
          tenant: true,
          plan: true,
        },
      });
      if (!planItem) return res.status(404).json({ error: 'Plan item not found' });
      res.json(planItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plan items by plan id
  async findByPlan(req, res) {
    try {
      const planItems = await prisma.planItem.findMany({
        where: { planId: req.params.planId },
        include: {
          tenant: true,
          plan: true,
        },
      });
      res.json(planItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plan items by tenant id
  async findByTenant(req, res) {
    try {
      const planItems = await prisma.planItem.findMany({
        where: { tenantId: req.params.tenantId },
        include: {
          tenant: true,
          plan: true,
        },
      });
      res.json(planItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update plan item
  async update(req, res) {
    try {
      const planItem = await prisma.planItem.update({
        where: { id: req.params.id },
        data: req.body,
        include: {
          tenant: true,
          plan: true,
        },
      });
      res.json(planItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete plan item
  async delete(req, res) {
    try {
      await prisma.planItem.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};