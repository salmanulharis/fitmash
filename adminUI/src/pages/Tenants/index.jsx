import React, { useState, useMemo } from 'react';
import "./style.css";

// Sample data generator based on Prisma schema
const generateSampleTenants = () => {
  const statuses = ['active', 'blocked', 'suspended'];
  const tenants = [];
  const names = ['FitZone Gym', 'PowerHouse Fitness', 'Elite Athletics', 'Cardio Kings', 'Strength Academy', 
                 'Flex Studio', 'Pump Iron Gym', 'CrossFit Central', 'Yoga Heaven', 'BoxFit Pro'];
  
  for (let i = 0; i < 15; i++) {
    tenants.push({
      id: `tenant-${String(i + 1).padStart(3, '0')}`,
      name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length)}` : ''),
      ownerId: `owner-${String(i + 1).padStart(3, '0')}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      blockedReason: Math.random() > 0.7 ? 'Payment overdue' : null,
      blockedAt: Math.random() > 0.7 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString() : null,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
    });
  }
  return tenants;
};

const Tenants = () => {
  const [tenants, setTenants] = useState(generateSampleTenants());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    ownerId: '', 
    status: 'active', 
    blockedReason: '',
    gym: { name: '', address: '', contactNumber: '' },
    plan: { name: '', type: 'workout', description: '' }
  });
  
  const itemsPerPage = 10;

  // Filter tenants
  const filteredTenants = useMemo(() => {
    return tenants.filter(tenant => {
      const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tenant.ownerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tenant.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tenants, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTenants = filteredTenants.slice(startIndex, startIndex + itemsPerPage);

  const openModal = (tenant = null) => {
    if (tenant) {
      setEditingTenant(tenant);
      setFormData({ 
        name: tenant.name, 
        ownerId: tenant.ownerId, 
        status: tenant.status, 
        blockedReason: tenant.blockedReason || '',
        gym: { name: '', address: '', contactNumber: '' },
        plan: { name: '', type: 'workout', description: '' }
      });
    } else {
      setEditingTenant(null);
      setFormData({ 
        name: '', 
        ownerId: '', 
        status: 'active', 
        blockedReason: '',
        gym: { name: '', address: '', contactNumber: '' },
        plan: { name: '', type: 'workout', description: '' }
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTenant(null);
    setFormData({ 
      name: '', 
      ownerId: '', 
      status: 'active', 
      blockedReason: '',
      gym: { name: '', address: '', contactNumber: '' },
      plan: { name: '', type: 'workout', description: '' }
    });
  };

  const handleSaveTenant = () => {
    if (!formData.name.trim() || !formData.ownerId.trim()) {
      alert('Please fill in all required tenant fields');
      return;
    }

    if (!formData.gym.name.trim() || !formData.gym.address.trim() || !formData.gym.contactNumber.trim()) {
      alert('Please fill in all required gym fields');
      return;
    }

    if (!formData.plan.name.trim()) {
      alert('Please fill in plan name');
      return;
    }

    if (editingTenant) {
      setTenants(tenants.map(t => 
        t.id === editingTenant.id 
          ? { ...t, ...formData, blockedAt: formData.status === 'blocked' ? new Date().toLocaleDateString() : null }
          : t
      ));
    } else {
      const newTenant = {
        id: `tenant-${String(tenants.length + 1).padStart(3, '0')}`,
        name: formData.name,
        ownerId: formData.ownerId,
        status: formData.status,
        blockedReason: formData.blockedReason,
        blockedAt: formData.status === 'blocked' ? new Date().toLocaleDateString() : null,
        createdAt: new Date().toLocaleDateString(),
        gym: {
          id: `gym-${String(tenants.length + 1).padStart(3, '0')}`,
          ...formData.gym,
          createdAt: new Date().toLocaleDateString()
        },
        plan: {
          id: `plan-${String(tenants.length + 1).padStart(3, '0')}`,
          ...formData.plan,
          createdAt: new Date().toLocaleDateString()
        }
      };
      setTenants([...tenants, newTenant]);
    }
    closeModal();
  };

  const handleDeleteTenant = (id) => {
    setTenants(tenants.filter(t => t.id !== id));
    setDeleteConfirm(null);
  };

  const getStatusBadgeClass = (status) => {
    return `badge badge-${status}`;
  };

  return (
    <div className="main-content tenants-page">
      <div className="content-header">
        <h2>Tenants Management</h2>
        <button className='btn btn-primary' onClick={() => openModal()}>+ Add New Tenant</button>
      </div>

      <div className="content-body">
        <div className="tenants-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, owner ID, or tenant ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>

          <div className="filter-group">
            <label>Status Filter:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="tenants-table">
            <thead>
              <tr>
                <th>Tenant ID</th>
                <th>Name</th>
                <th>Owner ID</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTenants.length > 0 ? (
                paginatedTenants.map((tenant) => (
                  <tr key={tenant.id}>
                    <td><code className="tenant-id">{tenant.id}</code></td>
                    <td className="tenant-name">{tenant.name}</td>
                    <td><code>{tenant.ownerId}</code></td>
                    <td>
                      <span className={getStatusBadgeClass(tenant.status)}>
                        {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                      </span>
                      {tenant.blockedReason && <div className="blocked-reason">{tenant.blockedReason}</div>}
                    </td>
                    <td>{tenant.createdAt}</td>
                    <td className="actions-cell">
                      <button className="btn-action btn-edit" onClick={() => openModal(tenant)} title="Edit">
                        ✎
                      </button>
                      <button className="btn-action btn-delete" onClick={() => setDeleteConfirm(tenant.id)} title="Delete">
                        ✕
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">No tenants found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredTenants.length > 0 && (
          <div className="pagination">
            <button 
              className="pagination-btn" 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <div className="pagination-info">
              Page {currentPage} of {totalPages} • Showing {paginatedTenants.length} of {filteredTenants.length} results
            </div>
            <button 
              className="pagination-btn" 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit Tenant */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingTenant ? 'Edit Tenant' : 'Add New Tenant with Gym & Plan'}</h3>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              {/* Tenant Information */}
              <div className="form-section">
                <h4>Tenant Information</h4>
                <div className="form-group">
                  <label>Tenant Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., FitZone Gym"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Owner ID *</label>
                  <input
                    type="text"
                    value={formData.ownerId}
                    onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
                    placeholder="e.g., owner-001"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="form-input"
                  >
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                {formData.status === 'blocked' && (
                  <div className="form-group">
                    <label>Blocked Reason</label>
                    <input
                      type="text"
                      value={formData.blockedReason}
                      onChange={(e) => setFormData({ ...formData, blockedReason: e.target.value })}
                      placeholder="e.g., Payment overdue"
                      className="form-input"
                    />
                  </div>
                )}
              </div>

              {/* Gym Information */}
              <div className="form-section">
                <h4>Gym Information</h4>
                <div className="form-group">
                  <label>Gym Name *</label>
                  <input
                    type="text"
                    value={formData.gym.name}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      gym: { ...formData.gym, name: e.target.value }
                    })}
                    placeholder="e.g., Main Gym"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Address *</label>
                  <input
                    type="text"
                    value={formData.gym.address}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      gym: { ...formData.gym, address: e.target.value }
                    })}
                    placeholder="e.g., 123 Main St, City"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number *</label>
                  <input
                    type="text"
                    value={formData.gym.contactNumber}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      gym: { ...formData.gym, contactNumber: e.target.value }
                    })}
                    placeholder="e.g., +1-XXX-XXX-XXXX"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Plan Information */}
              <div className="form-section">
                <h4>Initial Plan</h4>
                <div className="form-group">
                  <label>Plan Name *</label>
                  <input
                    type="text"
                    value={formData.plan.name}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      plan: { ...formData.plan, name: e.target.value }
                    })}
                    placeholder="e.g., 8-Week Transformation"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Plan Type</label>
                  <select
                    value={formData.plan.type}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      plan: { ...formData.plan, type: e.target.value }
                    })}
                    className="form-input"
                  >
                    <option value="workout">Workout</option>
                    <option value="diet">Diet</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={formData.plan.description}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      plan: { ...formData.plan, description: e.target.value }
                    })}
                    placeholder="Brief description of the plan"
                    className="form-input"
                    rows="3"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveTenant}>Save Tenant with Gym & Plan</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this tenant? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDeleteTenant(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenants;