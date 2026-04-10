import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import TenentsRoutes from './routes/tenents.routes.js';
import UsersRoutes from './routes/users.routes.js';
import SaasPlansRoutes from './routes/saas-plans.routes.js';
import MembershipPlansRoutes from './routes/membership-plans.routes.js';
import TenantSubscriptionsRoutes from './routes/tenant-subscriptions.routes.js';
import TenantPaymentsRoutes from './routes/tenant-payments.routes.js';
import GymsRoutes from './routes/gyms.routes.js';
import CustomerSubscriptionsRoutes from './routes/customer-subscriptions.routes.js';
import CustomerPaymentsRoutes from './routes/customer-payments.routes.js';
import PlansRoutes from './routes/plans.routes.js';
import PlanItemsRoutes from './routes/plan-items.routes.js';
import UserPlansRoutes from './routes/user-plans.routes.js';
import PlanProgressRoutes from './routes/plan-progress.routes.js';
import PlanProgressItemsRoutes from './routes/plan-progress-items.routes.js';
import TrainerUsersRoutes from './routes/trainer-users.routes.js';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

/* =========================
   ✅ ES MODULE FIX
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   ✅ MIDDLEWARE
========================= */
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

/* =========================
   ✅ API ROUTES (FIRST)
========================= */
app.use('/api/tenents', TenentsRoutes);
app.use('/api/users', UsersRoutes);
app.use('/api/saas-plans', SaasPlansRoutes);
app.use('/api/membership-plans', MembershipPlansRoutes);
app.use('/api/tenant-subscriptions', TenantSubscriptionsRoutes);
app.use('/api/tenant-payments', TenantPaymentsRoutes);
app.use('/api/gyms', GymsRoutes);
app.use('/api/customer-subscriptions', CustomerSubscriptionsRoutes);
app.use('/api/customer-payments', CustomerPaymentsRoutes);
app.use('/api/plans', PlansRoutes);
app.use('/api/plan-items', PlanItemsRoutes);
app.use('/api/user-plans', UserPlansRoutes);
app.use('/api/plan-progress', PlanProgressRoutes);
app.use('/api/plan-progress-items', PlanProgressItemsRoutes);
app.use('/api/trainer-users', TrainerUsersRoutes);

/* =========================
   ✅ SERVE REACT BUILD
========================= */

const distPath = path.join(__dirname, '../dist');

// Serve static files
app.use(express.static(distPath));

// ✅ FIXED: Express v5 wildcard
app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

/* ========================= */

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});