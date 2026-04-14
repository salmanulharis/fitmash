import React, { useState } from 'react';
import './style.css';

const initialPlans = [
  {
    id: 'plan-basic',
    name: 'Basic',
    description: 'For small boutique studios.',
    price: 29,
    durationDays: 30,
    features: [
      { label: 'Up to 100 Members', enabled: true },
      { label: '1 Admin Account', enabled: true },
      { label: 'Basic Analytics', enabled: true },
      { label: 'No Custom Branding', enabled: false }
    ],
    popular: false
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    description: 'For growing gym businesses.',
    price: 99,
    durationDays: 30,
    features: [
      { label: 'Unlimited Members', enabled: true },
      { label: '5 Admin Accounts', enabled: true },
      { label: 'Advanced Analytics', enabled: true },
      { label: 'Custom Branding', enabled: true }
    ],
    popular: true
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    description: 'For franchises & chains.',
    price: 299,
    durationDays: 30,
    features: [
      { label: 'Multi-location Support', enabled: true },
      { label: 'Unlimited Staff', enabled: true },
      { label: 'Dedicated Account Mgr', enabled: true },
      { label: 'Custom API Access', enabled: true }
    ],
    popular: false
  }
];

const SaasPlans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    durationDays: '30',
    features: 'Feature 1, Feature 2, Feature 3',
    popular: false
  });

  const openCreateModal = () => {
    setEditingPlan(null);
    setForm({ name: '', description: '', price: '', durationDays: '30', features: '', popular: false });
    setIsModalOpen(true);
  };

  const openEditModal = (plan) => {
    setEditingPlan(plan);
    setForm({
      name: plan.name,
      description: plan.description,
      price: plan.price.toString(),
      durationDays: plan.durationDays.toString(),
      features: plan.features.map((feature) => feature.label).join(', '),
      popular: plan.popular
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handleSavePlan = () => {
    if (!form.name.trim() || !form.price.trim() || !form.description.trim()) {
      alert('Please fill in the plan name, price, and description.');
      return;
    }

    const parsedPrice = Number(form.price);
    const parsedDuration = Number(form.durationDays);
    const parsedFeatures = form.features
      .split(',')
      .map((feature) => feature.trim())
      .filter(Boolean)
      .map((label) => ({ label, enabled: true }));

    if (editingPlan) {
      setPlans((currentPlans) =>
        currentPlans.map((plan) =>
          plan.id === editingPlan.id
            ? { ...plan, name: form.name, description: form.description, price: parsedPrice, durationDays: parsedDuration, features: parsedFeatures, popular: form.popular }
            : plan
        )
      );
    } else {
      const newPlan = {
        id: `plan-${Date.now()}`,
        name: form.name,
        description: form.description,
        price: parsedPrice,
        durationDays: parsedDuration,
        features: parsedFeatures,
        popular: form.popular
      };
      setPlans((currentPlans) => [...currentPlans, newPlan]);
    }

    closeModal();
  };

  const handleDelete = (planId) => {
    if (window.confirm('Delete this plan? This action cannot be undone.')) {
      setPlans((currentPlans) => currentPlans.filter((plan) => plan.id !== planId));
    }
  };

  return (
    <div className="main-content saas-plans-page">
      <div className="content-header">
        <h2>SaaS Plans</h2>
        <button className="btn btn-primary" onClick={openCreateModal}>Create Plan</button>
      </div>

      <div className="content-body saas-body">
        <p>Configure pricing tiers and features for gym owners.</p>
        <div className="plans-grid">
          {plans.map((plan) => (
            <div key={plan.id} className={`plan-card ${plan.popular ? 'plan-card-popular' : ''}`}>
              {plan.popular && <div className="plan-badge">POPULAR</div>}
              <div className="plan-card-body">
                <div>
                  <h3>{plan.name}</h3>
                  <p className="plan-subtitle">{plan.description}</p>
                </div>
                <div className="plan-price">
                  <span>${plan.price}</span>
                  <small>/mo</small>
                </div>
              </div>

              <div className="plan-divider" />

              <div className="plan-features">
                {plan.features.map((feature, index) => (
                  <div key={index} className={`feature-item ${feature.enabled ? 'enabled' : 'disabled'}`}>
                    <span className="feature-icon">{feature.enabled ? '✓' : '✕'}</span>
                    <span>{feature.label}</span>
                  </div>
                ))}
              </div>

              <div className="plan-actions">
                <button className="plan-action-edit" onClick={() => openEditModal(plan)}>Edit</button>
                <button className="plan-action-delete" onClick={() => handleDelete(plan.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>{editingPlan ? 'Edit Plan' : 'Create Plan'}</h3>
                <p>{editingPlan ? 'Update plan details and features.' : 'Add a new SaaS plan for gym owners.'}</p>
              </div>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              <label>
                Plan Name
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Basic"
                />
              </label>

              <label>
                Description
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="For gym owners who need a small starter package."
                />
              </label>

              <div className="modal-row">
                <label>
                  Price
                  <input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="29"
                  />
                </label>
                <label>
                  Billing Period (days)
                  <input
                    type="number"
                    min="1"
                    value={form.durationDays}
                    onChange={(e) => setForm({ ...form, durationDays: e.target.value })}
                    placeholder="30"
                  />
                </label>
              </div>

              <label>
                Features
                <textarea
                  rows="4"
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  placeholder="Enter comma-separated feature names"
                />
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.popular}
                  onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                />
                Mark as popular plan
              </label>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSavePlan}>{editingPlan ? 'Save changes' : 'Create plan'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaasPlans;
