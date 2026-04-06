import prisma from '../config/db.config.js';

export const trainerUsersController = {
  // Create trainer user relationship
  async create(req, res) {
    try {
      const trainerUser = await prisma.trainerUser.create({
        data: req.body,
        include: {
          tenant: true,
          trainer: true,
          user: true,
        },
      });
      res.status(201).json(trainerUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all trainer user relationships
  async findAll(req, res) {
    try {
      const trainerUsers = await prisma.trainerUser.findMany({
        include: {
          tenant: true,
          trainer: true,
          user: true,
        },
      });
      res.json(trainerUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get trainer user relationship by id
  async findOne(req, res) {
    try {
      const trainerUser = await prisma.trainerUser.findUnique({
        where: { id: req.params.id },
        include: {
          tenant: true,
          trainer: true,
          user: true,
        },
      });
      if (!trainerUser) return res.status(404).json({ error: 'Trainer user relationship not found' });
      res.json(trainerUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get trainer user relationships by trainer id
  async findByTrainer(req, res) {
    try {
      const trainerUsers = await prisma.trainerUser.findMany({
        where: { trainerId: req.params.trainerId },
        include: {
          tenant: true,
          trainer: true,
          user: true,
        },
      });
      res.json(trainerUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get trainer user relationships by user id
  async findByUser(req, res) {
    try {
      const trainerUsers = await prisma.trainerUser.findMany({
        where: { userId: req.params.userId },
        include: {
          tenant: true,
          trainer: true,
          user: true,
        },
      });
      res.json(trainerUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get trainer user relationships by tenant id
  async findByTenant(req, res) {
    try {
      const trainerUsers = await prisma.trainerUser.findMany({
        where: { tenantId: req.params.tenantId },
        include: {
          tenant: true,
          trainer: true,
          user: true,
        },
      });
      res.json(trainerUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update trainer user relationship
  async update(req, res) {
    try {
      const trainerUser = await prisma.trainerUser.update({
        where: { id: req.params.id },
        data: req.body,
        include: {
          tenant: true,
          trainer: true,
          user: true,
        },
      });
      res.json(trainerUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete trainer user relationship
  async delete(req, res) {
    try {
      await prisma.trainerUser.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};