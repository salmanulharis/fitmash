import prisma from '../config/db.config.js';

export const plansController = {
  // Create plan
  async create(req, res) {
    try {
      const plan = await prisma.plan.create({
        data: req.body,
        include: {
          tenant: true,
          creator: true,
        },
      });
      res.status(201).json(plan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all plans
  async findAll(req, res) {
    try {
      const plans = await prisma.plan.findMany({
        include: {
          tenant: true,
          creator: true,
        },
      });
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plan by id
  async findOne(req, res) {
    try {
      const plan = await prisma.plan.findUnique({
        where: { id: req.params.id },
        include: {
          tenant: true,
          creator: true,
        },
      });
      if (!plan) return res.status(404).json({ error: 'Plan not found' });
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plans by tenant id
  async findByTenant(req, res) {
    try {
      const plans = await prisma.plan.findMany({
        where: { tenantId: req.params.tenantId },
        include: {
          tenant: true,
          creator: true,
        },
      });
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plans by creator id
  async findByCreator(req, res) {
    try {
      const plans = await prisma.plan.findMany({
        where: { createdBy: req.params.creatorId },
        include: {
          tenant: true,
          creator: true,
        },
      });
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update plan
  async update(req, res) {
    try {
      const plan = await prisma.plan.update({
        where: { id: req.params.id },
        data: req.body,
        include: {
          tenant: true,
          creator: true,
        },
      });
      res.json(plan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete plan
  async delete(req, res) {
    try {
      await prisma.plan.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};