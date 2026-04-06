import prisma from '../config/db.config.js';

export const customerSubscriptionsController = {
  // Create customer subscription
  async create(req, res) {
    try {
      const customerSubscription = await prisma.customerSubscription.create({
        data: req.body,
      });
      res.status(201).json(customerSubscription);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all customer subscriptions
  async findAll(req, res) {
    try {
      const customerSubscriptions = await prisma.customerSubscription.findMany({
        include: {
          tenant: true,
          user: true,
          plan: true,
        },
      });
      res.json(customerSubscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get customer subscription by id
  async findOne(req, res) {
    try {
      const customerSubscription = await prisma.customerSubscription.findUnique({
        where: { id: req.params.id },
        include: {
          tenant: true,
          user: true,
          plan: true,
        },
      });
      if (!customerSubscription) return res.status(404).json({ error: 'Customer subscription not found' });
      res.json(customerSubscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get subscriptions by tenant id
  async findByTenant(req, res) {
    try {
      const customerSubscriptions = await prisma.customerSubscription.findMany({
        where: { tenantId: req.params.tenantId },
        include: {
          tenant: true,
          user: true,
          plan: true,
        },
      });
      res.json(customerSubscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get subscriptions by user id
  async findByUser(req, res) {
    try {
      const customerSubscriptions = await prisma.customerSubscription.findMany({
        where: { userId: req.params.userId },
        include: {
          tenant: true,
          user: true,
          plan: true,
        },
      });
      res.json(customerSubscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update customer subscription
  async update(req, res) {
    try {
      const customerSubscription = await prisma.customerSubscription.update({
        where: { id: req.params.id },
        data: req.body,
        include: {
          tenant: true,
          user: true,
          plan: true,
        },
      });
      res.json(customerSubscription);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete customer subscription
  async delete(req, res) {
    try {
      await prisma.customerSubscription.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};