import prisma from '../config/db.config.js';

export const tenantSubscriptionController = {
  // Create tenant subscription
  async create(req, res) {
    try {
      const tenantSubscription = await prisma.tenantSubscription.create({
        data: req.body,
      });
      res.status(201).json(tenantSubscription);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all tenant subscriptions
  async findAll(req, res) {
    try {
      const tenantSubscriptions = await prisma.tenantSubscription.findMany({
        include: {
          tenant: true,
          plan: true,
        },
      });
      res.json(tenantSubscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get tenant subscription by id
  async findOne(req, res) {
    try {
      const tenantSubscription = await prisma.tenantSubscription.findUnique({
        where: { id: req.params.id },
        include: {
          tenant: true,
          plan: true,
        },
      });
      if (!tenantSubscription) return res.status(404).json({ error: 'Tenant subscription not found' });
      res.json(tenantSubscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get subscriptions by tenant id
  async findByTenant(req, res) {
    try {
      const tenantSubscriptions = await prisma.tenantSubscription.findMany({
        where: { tenantId: req.params.tenantId },
        include: {
          tenant: true,
          plan: true,
        },
      });
      res.json(tenantSubscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get subscriptions by plan id
  async findByPlan(req, res) {
    try {
      const tenantSubscriptions = await prisma.tenantSubscription.findMany({
        where: { planId: req.params.planId },
        include: {
          tenant: true,
          plan: true,
        },
      });
      res.json(tenantSubscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update tenant subscription
  async update(req, res) {
    try {
      const tenantSubscription = await prisma.tenantSubscription.update({
        where: { id: req.params.id },
        data: req.body,
        include: {
          tenant: true,
          plan: true,
        },
      });
      res.json(tenantSubscription);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete tenant subscription
  async delete(req, res) {
    try {
      await prisma.tenantSubscription.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};