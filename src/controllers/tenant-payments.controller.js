import prisma from '../config/db.config.js';

export const tenantPaymentController = {
  // Create tenant payment
  async create(req, res) {
    try {
      const tenantPayment = await prisma.tenantPayment.create({
        data: req.body,
        include: {
          tenantSubscription: {
            include: {
              tenant: true,
              plan: true,
            },
          },
        },
      });
      res.status(201).json(tenantPayment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all tenant payments
  async findAll(req, res) {
    try {
      const tenantPayments = await prisma.tenantPayment.findMany({
        include: {
          tenantSubscription: {
            include: {
              tenant: true,
              plan: true,
            },
          },
        },
      });
      res.json(tenantPayments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get tenant payment by id
  async findOne(req, res) {
    try {
      const tenantPayment = await prisma.tenantPayment.findUnique({
        where: { id: req.params.id },
        include: {
          tenantSubscription: {
            include: {
              tenant: true,
              plan: true,
            },
          },
        },
      });
      if (!tenantPayment) return res.status(404).json({ error: 'Tenant payment not found' });
      res.json(tenantPayment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get payments by tenant subscription id
  async findBySubscription(req, res) {
    try {
      const tenantPayments = await prisma.tenantPayment.findMany({
        where: { tenantSubscriptionId: req.params.subscriptionId },
        include: {
          tenantSubscription: {
            include: {
              tenant: true,
              plan: true,
            },
          },
        },
      });
      res.json(tenantPayments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update tenant payment
  async update(req, res) {
    try {
      const tenantPayment = await prisma.tenantPayment.update({
        where: { id: req.params.id },
        data: req.body,
        include: {
          tenantSubscription: {
            include: {
              tenant: true,
              plan: true,
            },
          },
        },
      });
      res.json(tenantPayment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete tenant payment
  async delete(req, res) {
    try {
      await prisma.tenantPayment.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};