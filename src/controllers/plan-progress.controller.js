import prisma from '../config/db.config.js';

export const planProgressController = {
  // Create plan progress
  async create(req, res) {
    try {
      const planProgress = await prisma.planProgress.create({
        data: req.body,
        include: {
          tenant: true,
          userPlan: {
            include: {
              user: true,
              plan: true,
            },
          },
        },
      });
      res.status(201).json(planProgress);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all plan progress
  async findAll(req, res) {
    try {
      const planProgress = await prisma.planProgress.findMany({
        include: {
          tenant: true,
          userPlan: {
            include: {
              user: true,
              plan: true,
            },
          },
        },
      });
      res.json(planProgress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plan progress by id
  async findOne(req, res) {
    try {
      const planProgress = await prisma.planProgress.findUnique({
        where: { id: req.params.id },
        include: {
          tenant: true,
          userPlan: {
            include: {
              user: true,
              plan: true,
            },
          },
        },
      });
      if (!planProgress) return res.status(404).json({ error: 'Plan progress not found' });
      res.json(planProgress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plan progress by user plan id
  async findByUserPlan(req, res) {
    try {
      const planProgress = await prisma.planProgress.findMany({
        where: { userPlanId: req.params.userPlanId },
        include: {
          tenant: true,
          userPlan: {
            include: {
              user: true,
              plan: true,
            },
          },
        },
      });
      res.json(planProgress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plan progress by tenant id
  async findByTenant(req, res) {
    try {
      const planProgress = await prisma.planProgress.findMany({
        where: { tenantId: req.params.tenantId },
        include: {
          tenant: true,
          userPlan: {
            include: {
              user: true,
              plan: true,
            },
          },
        },
      });
      res.json(planProgress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update plan progress
  async update(req, res) {
    try {
      const planProgress = await prisma.planProgress.update({
        where: { id: req.params.id },
        data: req.body,
        include: {
          tenant: true,
          userPlan: {
            include: {
              user: true,
              plan: true,
            },
          },
        },
      });
      res.json(planProgress);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete plan progress
  async delete(req, res) {
    try {
      await prisma.planProgress.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};