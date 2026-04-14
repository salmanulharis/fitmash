import React, { useMemo, useState } from 'react';
import './style.css';

const sampleSubscriptions = [
  {
    id: 'sub-001',
    tenant: 'PowerHouse Fitness',
    plan: 'Pro',
    status: 'active',
    startDate: '2026-03-01',
    endDate: '2027-03-01',
    paymentMethod: 'Credit Card',
    amount: 299.0,
    lastPayment: '2026-03-01'
  },
  {
    id: 'sub-002',
    tenant: 'Elite Athletics',
    plan: 'Enterprise',
    status: 'expired',
    startDate: '2025-04-15',
    endDate: '2026-04-14',
    paymentMethod: 'Bank Transfer',
    amount: 999.0,
    lastPayment: '2025-04-15'
  },
  {
    id: 'sub-003',
    tenant: 'Yoga Heaven',
    plan: 'Basic',
    status: 'cancelled',
    startDate: '2026-01-05',
    endDate: '2026-07-04',
    paymentMethod: 'Credit Card',
    amount: 99.0,
    lastPayment: '2026-01-05'
  },
  {
    id: 'sub-004',
    tenant: 'FitZone Gym',
    plan: 'Pro',
    status: 'active',
    startDate: '2026-02-12',
    endDate: '2027-02-11',
    paymentMethod: 'PayPal',
    amount: 299.0,
    lastPayment: '2026-02-12'
  },
  {
    id: 'sub-005',
    tenant: 'Flex Studio',
    plan: 'Basic',
    status: 'active',
    startDate: '2026-04-02',
    endDate: '2027-04-01',
    paymentMethod: 'Credit Card',
    amount: 29.0,
    lastPayment: '2026-04-02'
  },
  {
    id: 'sub-006',
    tenant: 'Cardio Kings',
    plan: 'Pro',
    status: 'expired',
    startDate: '2025-11-01',
    endDate: '2026-10-31',
    paymentMethod: 'Bank Transfer',
    amount: 299.0,
    lastPayment: '2025-11-01'
  },
  {
    id: 'sub-007',
    tenant: 'CrossFit Central',
    plan: 'Enterprise',
    status: 'active',
    startDate: '2026-03-15',
    endDate: '2027-03-14',
    paymentMethod: 'Direct Debit',
    amount: 999.0,
    lastPayment: '2026-03-15'
  },
  {
    id: 'sub-008',
    tenant: 'Pump Iron Gym',
    plan: 'Pro',
    status: 'cancelled',
    startDate: '2026-02-20',
    endDate: '2026-08-19',
    paymentMethod: 'Credit Card',
    amount: 299.0,
    lastPayment: '2026-02-20'
  },
  {
    id: 'sub-009',
    tenant: 'Strength Academy',
    plan: 'Basic',
    status: 'active',
    startDate: '2026-01-18',
    endDate: '2027-01-17',
    paymentMethod: 'Credit Card',
    amount: 29.0,
    lastPayment: '2026-01-18'
  },
  {
    id: 'sub-010',
    tenant: 'GymFlow Collective',
    plan: 'Enterprise',
    status: 'active',
    startDate: '2026-05-01',
    endDate: '2027-04-30',
    paymentMethod: 'PayPal',
    amount: 999.0,
    lastPayment: '2026-05-01'
  }
];

const getBadgeClass = (status) => {
  switch (status) {
    case 'active':
      return 'status-badge status-active';
    case 'expired':
      return 'status-badge status-expired';
    case 'cancelled':
      return 'status-badge status-cancelled';
    default:
      return 'status-badge';
  }
};

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState(sampleSubscriptions);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((subscription) => {
      const matchesSearch = [
        subscription.id,
        subscription.tenant,
        subscription.plan,
        subscription.paymentMethod
      ].some((value) => value.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [subscriptions, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredSubscriptions.length / itemsPerPage));
  const displayedSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    if (window.confirm('Delete this subscription?')) {
      setSubscriptions(subscriptions.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="main-content subscriptions-page">
      <div className="content-header subscriptions-header">
        <div>
          <h2>Subscriptions</h2>
          <p>Review tenant subscriptions, billing status, and renewal details.</p>
        </div>
      </div>

      <div className="content-body subscriptions-body">
        <div className="subscriptions-toolbar">
          <div className="search-group">
            <input
              type="text"
              placeholder="Search by subscription ID, tenant, plan, or payment method"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>

          <div className="filter-group subscriptions-filter">
            <label>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="status-select"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper subscriptions-table-wrapper">
          <table className="subscriptions-table">
            <thead>
              <tr>
                <th>Subscription ID</th>
                <th>Tenant</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Period</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedSubscriptions.length > 0 ? (
                displayedSubscriptions.map((subscription) => (
                  <tr key={subscription.id}>
                    <td><code>{subscription.id}</code></td>
                    <td>{subscription.tenant}</td>
                    <td>{subscription.plan}</td>
                    <td>${subscription.amount.toFixed(2)}</td>
                    <td>{subscription.startDate} → {subscription.endDate}</td>
                    <td>{subscription.paymentMethod}</td>
                    <td><span className={getBadgeClass(subscription.status)}>{subscription.status}</span></td>
                    <td className="actions-cell">
                      <button className="action-button action-edit">Edit</button>
                      <button className="action-button action-delete" onClick={() => handleDelete(subscription.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">No subscriptions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="subscriptions-footer">
          <div className="pagination-info">
            Showing {displayedSubscriptions.length} of {filteredSubscriptions.length} subscriptions
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
