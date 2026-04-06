import prisma from '../config/db.config.js';

export const membershipPlansController = {
  // Create membership plan
  async create(req, res) {
    try {
      const membershipPlan = await prisma.membershipPlan.create({
        data: req.body,
      });
      res.status(201).json(membershipPlan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all membership plans
  async findAll(req, res) {
    try {
      const membershipPlans = await prisma.membershipPlan.findMany();
      res.json(membershipPlans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get membership plan by id
  async findOne(req, res) {
    try {
      const membershipPlan = await prisma.membershipPlan.findUnique({
        where: { id: req.params.id },
      });
      if (!membershipPlan) return res.status(404).json({ error: 'Membership plan not found' });
      res.json(membershipPlan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get membership plans by tenant id
  async findByTenant(req, res) {
    try {
      const membershipPlans = await prisma.membershipPlan.findMany({
        where: { tenantId: req.params.tenantId },
      });
      res.json(membershipPlans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update membership plan
  async update(req, res) {
    try {
      const membershipPlan = await prisma.membershipPlan.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json(membershipPlan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete membership plan
  async delete(req, res) {
    try {
      await prisma.membershipPlan.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};