import prisma from '../config/db.config.js';

export const saasPlanController = {
  // Create saas plan
  async create(req, res) {
    try {
      const saasPlan = await prisma.saasPlan.create({
        data: req.body,
      });
      res.status(201).json(saasPlan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all saas plans
  async findAll(req, res) {
    try {
      const saasPlans = await prisma.saasPlan.findMany();
      res.json(saasPlans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get saas plan by id
  async findOne(req, res) {
    try {
      const saasPlan = await prisma.saasPlan.findUnique({
        where: { id: req.params.id },
      });
      if (!saasPlan) return res.status(404).json({ error: 'Saas plan not found' });
      res.json(saasPlan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update saas plan
  async update(req, res) {
    try {
      const saasPlan = await prisma.saasPlan.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json(saasPlan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete saas plan
  async delete(req, res) {
    try {
      await prisma.saasPlan.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};