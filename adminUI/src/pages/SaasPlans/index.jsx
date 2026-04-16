import React, { useEffect, useState } from 'react';
import './style.css';
import { api } from '../../services/api';

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
    features: [{ label: '', enabled: true }],
    popular: false
  });

  const openCreateModal = () => {
    setEditingPlan(null);
    setForm({ 
      name: '', 
      description: '', 
      price: '', 
      durationDays: '30', 
      features: [{ label: '', enabled: true }], 
      popular: false 
    });
    setIsModalOpen(true);
  };

  const openEditModal = (plan) => {
    setEditingPlan(plan);
    setForm({
      name: plan.name,
      description: plan.description,
      price: plan.price.toString(),
      durationDays: plan.durationDays.toString(),
      features: plan.features.length > 0 ? plan.features : [{ label: '', enabled: true }],
      popular: plan.popular
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const addFeature = () => {
    setForm(prev => ({
      ...prev,
      features: [...prev.features, { label: '', enabled: true }]
    }));
  };

  const removeFeature = (index) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const handleSavePlan = async () => {
    if (!form.name.trim() || !form.price.trim() || !form.description.trim()) {
      alert('Please fill in the plan name, price, and description.');
      return;
    }

    // Filter out empty features and validate
    const validFeatures = form.features.filter(feature => feature.label.trim() !== '');
    if (validFeatures.length === 0) {
      alert('Please add at least one feature.');
      return;
    }

    const parsedPrice = Number(form.price);
    const parsedDuration = Number(form.durationDays);

    if (editingPlan) {
      const updatedPlan = {
        ...editingPlan,
        name: form.name,
        description: form.description,
        price: parsedPrice,
        durationDays: parsedDuration,
        features: validFeatures,
        popular: form.popular
      };
      const res = await api.updateSaasPlan(editingPlan.id, updatedPlan);
      if (res.ok) {
        setPlans((currentPlans) =>
          currentPlans.map((plan) =>
            plan.id === editingPlan.id
              ? { ...plan, name: form.name, description: form.description, price: parsedPrice, durationDays: parsedDuration, features: validFeatures, popular: form.popular }
              : plan
          )
        );
      }else {
        alert('Error updating plan.');
        return;
      }
    } else {
      const newPlan = {
        name: form.name,
        description: form.description,
        price: parsedPrice,
        durationDays: parsedDuration,
        features: validFeatures,
        popular: form.popular
      };
      const res = await api.createSaasPlan(newPlan);
      if (res.ok) {
        const createdPlan = await res.json();
        setPlans((currentPlans) => [...currentPlans, createdPlan]);
      } else {
        alert('Error creating plan.');
        return;
      }
    }

    closeModal();
  };

  const handleDelete = async (planId) => {
    if (window.confirm('Delete this plan? This action cannot be undone.')) {
      const res = await api.deleteSaasPlan(planId);
      if (res.ok) {
        setPlans((currentPlans) => currentPlans.filter((plan) => plan.id !== planId));
      } else {
        alert('Error deleting plan.');
      }
    }
  };

  const fetchPlans = async () => {
    const res = await api.getSaasPlans();
    if (res.ok) {
      const data = await res.json();
      setPlans(data);
    } else {
      alert('Error fetching plans.');
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

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

              <div className="features-section">
                <div className="features-header">
                  <label>Features</label>
                  <button type="button" className="btn-add-feature" onClick={addFeature}>
                    + Add Feature
                  </button>
                </div>
                <div className="features-list">
                  {form.features.map((feature, index) => (
                    <div key={index} className="feature-row">
                      <input
                        type="text"
                        value={feature.label}
                        onChange={(e) => updateFeature(index, 'label', e.target.value)}
                        placeholder="Feature name"
                        className="feature-input"
                      />
                      <label className="feature-checkbox">
                        <input
                          type="checkbox"
                          checked={feature.enabled}
                          onChange={(e) => updateFeature(index, 'enabled', e.target.checked)}
                        />
                        Enabled
                      </label>
                      {form.features.length > 1 && (
                        <button 
                          type="button" 
                          className="btn-remove-feature"
                          onClick={() => removeFeature(index)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

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
