import prisma from '../config/db.config.js';

export const userPlansController = {
  // Create user plan
  async create(req, res) {
    try {
      const userPlan = await prisma.userPlan.create({
        data: req.body,
        include: {
          tenant: true,
          user: true,
          plan: true,
          assigner: true,
        },
      });
      res.status(201).json(userPlan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all user plans
  async findAll(req, res) {
    try {
      const userPlans = await prisma.userPlan.findMany({
        include: {
          tenant: true,
          user: true,
          plan: true,
          assigner: true,
        },
      });
      res.json(userPlans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get user plan by id
  async findOne(req, res) {
    try {
      const userPlan = await prisma.userPlan.findUnique({
        where: { id: req.params.id },
        include: {
          tenant: true,
          user: true,
          plan: true,
          assigner: true,
        },
      });
      if (!userPlan) return res.status(404).json({ error: 'User plan not found' });
      res.json(userPlan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get user plans by user id
  async findByUser(req, res) {
    try {
      const userPlans = await prisma.userPlan.findMany({
        where: { userId: req.params.userId },
        include: {
          tenant: true,
          user: true,
          plan: true,
          assigner: true,
        },
      });
      res.json(userPlans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get user plans by plan id
  async findByPlan(req, res) {
    try {
      const userPlans = await prisma.userPlan.findMany({
        where: { planId: req.params.planId },
        include: {
          tenant: true,
          user: true,
          plan: true,
          assigner: true,
        },
      });
      res.json(userPlans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get user plans by tenant id
  async findByTenant(req, res) {
    try {
      const userPlans = await prisma.userPlan.findMany({
        where: { tenantId: req.params.tenantId },
        include: {
          tenant: true,
          user: true,
          plan: true,
          assigner: true,
        },
      });
      res.json(userPlans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update user plan
  async update(req, res) {
    try {
      const userPlan = await prisma.userPlan.update({
        where: { id: req.params.id },
        data: req.body,
        include: {
          tenant: true,
          user: true,
          plan: true,
          assigner: true,
        },
      });
      res.json(userPlan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete user plan
  async delete(req, res) {
    try {
      await prisma.userPlan.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};