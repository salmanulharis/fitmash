import React, { useState } from 'react';
import './style.css';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Sample metrics
  const metrics = {
    totalRevenue: 12450.75,
    totalSubscriptions: 24,
    activeSubscriptions: 18,
    totalPayments: 156,
    successfulPayments: 142,
    totalTenants: 24,
    activeTenants: 21
  };

  // Monthly revenue data
  const revenueData = [
    { month: 'Jan', revenue: 8500, subscriptions: 15 },
    { month: 'Feb', revenue: 9200, subscriptions: 17 },
    { month: 'Mar', revenue: 10800, subscriptions: 20 },
    { month: 'Apr', revenue: 12450, subscriptions: 24 }
  ];

  // Subscription status breakdown
  const subscriptionStatus = [
    { status: 'Active', count: 18, percentage: 75, color: '#10b981' },
    { status: 'Expired', count: 4, percentage: 17, color: '#f59e0b' },
    { status: 'Cancelled', count: 2, percentage: 8, color: '#ef4444' }
  ];

  // Payment status breakdown
  const paymentStatus = [
    { status: 'Paid', count: 142, percentage: 91, color: '#10b981' },
    { status: 'Pending', count: 10, percentage: 6, color: '#6366f1' },
    { status: 'Failed', count: 4, percentage: 3, color: '#ef4444' }
  ];

  // Recent transactions
  const recentTransactions = [
    { id: 'TXN-001', tenant: 'Iron Will Fitness', amount: 299.0, status: 'Complete', date: '2026-04-14' },
    { id: 'TXN-002', tenant: 'Core Gym', amount: 99.0, status: 'Complete', date: '2026-04-13' },
    { id: 'TXN-003', tenant: 'PowerHouse Fitness', amount: 599.0, status: 'Complete', date: '2026-04-12' },
    { id: 'TXN-004', tenant: 'Elite Athletics', amount: 199.0, status: 'Failed', date: '2026-04-11' },
    { id: 'TXN-005', tenant: 'Yoga Heaven', amount: 99.0, status: 'Complete', date: '2026-04-10' }
  ];

  // Top performing plans
  const topPlans = [
    { name: 'Pro Plan', subscriptions: 12, revenue: 3588.0, growth: '+15%' },
    { name: 'Enterprise Plan', subscriptions: 8, revenue: 7992.0, growth: '+22%' },
    { name: 'Basic Plan', subscriptions: 4, revenue: 596.0, growth: '+8%' }
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <div className="main-content analytics-page">
      <div className="content-header analytics-header">
        <div>
          <h2>Analytics</h2>
          <p>Real-time insights and performance metrics.</p>
        </div>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="content-body analytics-body">
        {/* Key Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <h3>Total Revenue</h3>
              <span className="metric-icon">💰</span>
            </div>
            <div className="metric-value">${metrics.totalRevenue.toFixed(2)}</div>
            <div className="metric-change positive">+18% from last month</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>Total Subscriptions</h3>
              <span className="metric-icon">📋</span>
            </div>
            <div className="metric-value">{metrics.totalSubscriptions}</div>
            <div className="metric-change positive">+4 this month</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>Active Subscriptions</h3>
              <span className="metric-icon">✅</span>
            </div>
            <div className="metric-value">{metrics.activeSubscriptions}</div>
            <div className="metric-change">75% of total</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>Payment Success Rate</h3>
              <span className="metric-icon">📊</span>
            </div>
            <div className="metric-value">91%</div>
            <div className="metric-change positive">142 of 156 payments</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          {/* Revenue Chart */}
          <div className="chart-card">
            <h3>Revenue Trend</h3>
            <div className="mini-chart revenue-chart">
              <div className="chart-bars">
                {revenueData.map((data, index) => (
                  <div key={index} className="chart-bar-container">
                    <div 
                      className="chart-bar" 
                      style={{
                        height: `${(data.revenue / maxRevenue) * 100}%`
                      }}
                    />
                    <div className="chart-label">{data.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="chart-card">
            <h3>Subscription Status</h3>
            <div className="status-breakdown">
              {subscriptionStatus.map((item, index) => (
                <div key={index} className="status-item">
                  <div className="status-label">
                    <div 
                      className="status-dot" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.status}</span>
                  </div>
                  <div className="status-value">{item.count}</div>
                  <div className="status-bar">
                    <div 
                      className="status-progress" 
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Status */}
          <div className="chart-card">
            <h3>Payment Status</h3>
            <div className="status-breakdown">
              {paymentStatus.map((item, index) => (
                <div key={index} className="status-item">
                  <div className="status-label">
                    <div 
                      className="status-dot" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.status}</span>
                  </div>
                  <div className="status-value">{item.count}</div>
                  <div className="status-bar">
                    <div 
                      className="status-progress" 
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Plans */}
        <div className="chart-card full-width">
          <h3>Top Performing Plans</h3>
          <div className="table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Active Subscriptions</th>
                  <th>Revenue</th>
                  <th>Growth</th>
                </tr>
              </thead>
              <tbody>
                {topPlans.map((plan, index) => (
                  <tr key={index}>
                    <td className="plan-name">{plan.name}</td>
                    <td>{plan.subscriptions}</td>
                    <td className="revenue-cell">${plan.revenue.toFixed(2)}</td>
                    <td><span className="growth-badge positive">{plan.growth}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="chart-card full-width">
          <h3>Recent Transactions</h3>
          <div className="table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Tenant</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((txn, index) => (
                  <tr key={index}>
                    <td><code>{txn.id}</code></td>
                    <td>{txn.tenant}</td>
                    <td className="revenue-cell">${txn.amount.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${txn.status.toLowerCase()}`}>
                        {txn.status}
                      </span>
                    </td>
                    <td>{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
