import prisma from '../config/db.config.js';

export const planProgressItemsController = {
  // Create plan progress item
  async create(req, res) {
    try {
      const planProgressItem = await prisma.planProgressItem.create({
        data: req.body,
        include: {
          tenant: true,
          progress: {
            include: {
              userPlan: {
                include: {
                  user: true,
                  plan: true,
                },
              },
            },
          },
          planItem: true,
        },
      });
      res.status(201).json(planProgressItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all plan progress items
  async findAll(req, res) {
    try {
      const planProgressItems = await prisma.planProgressItem.findMany({
        include: {
          tenant: true,
          progress: {
            include: {
              userPlan: {
                include: {
                  user: true,
                  plan: true,
                },
              },
            },
          },
          planItem: true,
        },
      });
      res.json(planProgressItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plan progress item by id
  async findOne(req, res) {
    try {
      const planProgressItem = await prisma.planProgressItem.findUnique({
        where: { id: req.params.id },
        include: {
          tenant: true,
          progress: {
            include: {
              userPlan: {
                include: {
                  user: true,
                  plan: true,
                },
              },
            },
          },
          planItem: true,
        },
      });
      if (!planProgressItem) return res.status(404).json({ error: 'Plan progress item not found' });
      res.json(planProgressItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plan progress items by progress id
  async findByProgress(req, res) {
    try {
      const planProgressItems = await prisma.planProgressItem.findMany({
        where: { progressId: req.params.progressId },
        include: {
          tenant: true,
          progress: {
            include: {
              userPlan: {
                include: {
                  user: true,
                  plan: true,
                },
              },
            },
          },
          planItem: true,
        },
      });
      res.json(planProgressItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plan progress items by plan item id
  async findByPlanItem(req, res) {
    try {
      const planProgressItems = await prisma.planProgressItem.findMany({
        where: { planItemId: req.params.planItemId },
        include: {
          tenant: true,
          progress: {
            include: {
              userPlan: {
                include: {
                  user: true,
                  plan: true,
                },
              },
            },
          },
          planItem: true,
        },
      });
      res.json(planProgressItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get plan progress items by tenant id
  async findByTenant(req, res) {
    try {
      const planProgressItems = await prisma.planProgressItem.findMany({
        where: { tenantId: req.params.tenantId },
        include: {
          tenant: true,
          progress: {
            include: {
              userPlan: {
                include: {
                  user: true,
                  plan: true,
                },
              },
            },
          },
          planItem: true,
        },
      });
      res.json(planProgressItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update plan progress item
  async update(req, res) {
    try {
      const planProgressItem = await prisma.planProgressItem.update({
        where: { id: req.params.id },
        data: req.body,
        include: {
          tenant: true,
          progress: {
            include: {
              userPlan: {
                include: {
                  user: true,
                  plan: true,
                },
              },
            },
          },
          planItem: true,
        },
      });
      res.json(planProgressItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete plan progress item
  async delete(req, res) {
    try {
      await prisma.planProgressItem.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};