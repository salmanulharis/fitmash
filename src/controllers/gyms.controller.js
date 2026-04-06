import prisma from '../config/db.config.js';

export const gymsController = {
  // Create gym
  async create(req, res) {
    try {
      const gym = await prisma.gym.create({
        data: req.body,
      });
      res.status(201).json(gym);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all gyms
  async findAll(req, res) {
    try {
      const gyms = await prisma.gym.findMany();
      res.json(gyms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get gym by id
  async findOne(req, res) {
    try {
      const gym = await prisma.gym.findUnique({
        where: { id: req.params.id },
      });
      if (!gym) return res.status(404).json({ error: 'Gym not found' });
      res.json(gym);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get gyms by tenant id
  async findByTenant(req, res) {
    try {
      const gyms = await prisma.gym.findMany({
        where: { tenantId: req.params.tenantId },
      });
      res.json(gyms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update gym
  async update(req, res) {
    try {
      const gym = await prisma.gym.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json(gym);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete gym
  async delete(req, res) {
    try {
      await prisma.gym.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};