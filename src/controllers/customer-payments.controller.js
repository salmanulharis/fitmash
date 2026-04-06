import prisma from '../config/db.config.js';

export const customerPaymentsController = {
  // Create customer payment
  async create(req, res) {
    try {
      const customerPayment = await prisma.customerPayment.create({
        data: req.body,
      });
      res.status(201).json(customerPayment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all customer payments
  async findAll(req, res) {
    try {
      const customerPayments = await prisma.customerPayment.findMany({
        include: {
          tenant: true,
          customerSubscription: true,
        },
      });
      res.json(customerPayments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get customer payment by id
  async findOne(req, res) {
    try {
      const customerPayment = await prisma.customerPayment.findUnique({
        where: { id: req.params.id },
        include: {
          tenant: true,
          customerSubscription: true,
        },
      });
      if (!customerPayment) return res.status(404).json({ error: 'Customer payment not found' });
      res.json(customerPayment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get payments by customer subscription id
  async findBySubscription(req, res) {
    try {
      const customerPayments = await prisma.customerPayment.findMany({
        where: { customerSubscriptionId: req.params.subscriptionId },
        include: {
          tenant: true,
          customerSubscription: true,
        },
      });
      res.json(customerPayments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update customer payment
  async update(req, res) {
    try {
      const customerPayment = await prisma.customerPayment.update({
        where: { id: req.params.id },
        data: req.body,
        include: {
          tenant: true,
          customerSubscription: true,
        },
      });
      res.json(customerPayment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete customer payment
  async delete(req, res) {
    try {
      await prisma.customerPayment.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};