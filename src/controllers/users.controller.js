import prisma from '../config/db.config.js';

export const userController = {
  // Create user
  async create(req, res) {
    try {
      const user = await prisma.user.create({
        data: req.body,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all users
  async findAll(req, res) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get user by id
  async findOne(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.params.id },
      });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get users by tenant id
  async findByTenant(req, res) {
    try {
      const users = await prisma.user.findMany({
        where: { tenantId: req.params.tenantId },
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update user
  async update(req, res) {
    try {
      const user = await prisma.user.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete user
  async delete(req, res) {
    try {
      await prisma.user.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};