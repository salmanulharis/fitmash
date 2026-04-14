import React, { useState, useMemo } from 'react';
import './style.css';

const samplePayments = [
  {
    id: 'payment-001',
    tenantName: 'Iron Will Fitness',
    gymName: 'Iron Will Fitness',
    amount: 99.0,
    status: 'paid',
    date: 'Today',
    paymentDate: '2026-04-14',
    paymentMethod: 'Credit Card',
    type: 'tenant'
  },
  {
    id: 'payment-002',
    tenantName: 'Core Gym',
    gymName: 'Core Gym',
    amount: 29.0,
    status: 'failed',
    date: 'Yesterday',
    paymentDate: '2026-04-13',
    paymentMethod: 'Bank Transfer',
    type: 'tenant'
  },
  {
    id: 'payment-003',
    tenantName: 'PowerHouse Fitness',
    gymName: 'PowerHouse Fitness',
    amount: 299.0,
    status: 'paid',
    date: '2 days ago',
    paymentDate: '2026-04-12',
    paymentMethod: 'PayPal',
    type: 'tenant'
  },
  {
    id: 'payment-004',
    tenantName: 'Elite Athletics',
    gymName: 'Elite Athletics',
    amount: 199.5,
    status: 'paid',
    date: '3 days ago',
    paymentDate: '2026-04-11',
    paymentMethod: 'Credit Card',
    type: 'tenant'
  },
  {
    id: 'payment-005',
    tenantName: 'Yoga Heaven',
    gymName: 'Yoga Heaven',
    amount: 49.99,
    status: 'failed',
    date: '4 days ago',
    paymentDate: '2026-04-10',
    paymentMethod: 'Direct Debit',
    type: 'customer'
  },
  {
    id: 'payment-006',
    tenantName: 'FitZone Gym',
    gymName: 'FitZone Gym',
    amount: 149.0,
    status: 'paid',
    date: '5 days ago',
    paymentDate: '2026-04-09',
    paymentMethod: 'Credit Card',
    type: 'customer'
  },
  {
    id: 'payment-007',
    tenantName: 'Flex Studio',
    gymName: 'Flex Studio',
    amount: 99.0,
    status: 'paid',
    date: '6 days ago',
    paymentDate: '2026-04-08',
    paymentMethod: 'PayPal',
    type: 'tenant'
  },
  {
    id: 'payment-008',
    tenantName: 'Cardio Kings',
    gymName: 'Cardio Kings',
    amount: 249.0,
    status: 'failed',
    date: 'Last week',
    paymentDate: '2026-04-07',
    paymentMethod: 'Bank Transfer',
    type: 'tenant'
  },
  {
    id: 'payment-009',
    tenantName: 'CrossFit Central',
    gymName: 'CrossFit Central',
    amount: 399.0,
    status: 'paid',
    date: 'Last week',
    paymentDate: '2026-04-06',
    paymentMethod: 'Direct Debit',
    type: 'tenant'
  },
  {
    id: 'payment-010',
    tenantName: 'Pump Iron Gym',
    gymName: 'Pump Iron Gym',
    amount: 199.0,
    status: 'paid',
    date: 'Last week',
    paymentDate: '2026-04-05',
    paymentMethod: 'Credit Card',
    type: 'customer'
  }
];

const Payments = () => {
  const [payments] = useState(samplePayments);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch = [
        payment.id,
        payment.gymName,
        payment.paymentMethod
      ].some((value) => value.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const handleExportCSV = () => {
    const headers = ['Payment ID', 'Gym', 'Amount', 'Status', 'Date', 'Payment Method'];
    const rows = filteredPayments.map((payment) => [
      payment.id,
      payment.gymName,
      `$${payment.amount.toFixed(2)}`,
      payment.status,
      payment.paymentDate,
      payment.paymentMethod
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `payments_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadgeClass = (status) => {
    return `status-badge status-${status}`;
  };

  return (
    <div className="main-content payments-page">
      <div className="content-header payments-header">
        <h2>Payments & Invoices</h2>
        <button className="btn btn-export" onClick={handleExportCSV}>
          📥 Export CSV
        </button>
      </div>

      <div className="content-body payments-body">
        <div className="payments-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by payment ID, gym name, or payment method..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-select"
            >
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper payments-table-wrapper">
          <table className="payments-table">
            <thead>
              <tr>
                <th>GYM</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="gym-name">{payment.gymName}</td>
                    <td className="amount">${payment.amount.toFixed(2)}</td>
                    <td>
                      <span className={getStatusBadgeClass(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="date-cell">{payment.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">No payments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
