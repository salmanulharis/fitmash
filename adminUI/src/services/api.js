const BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const api = {
    login: (phoneNumber) => fetch(`${BASE_URL}/login`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    }),
    verifyOtp: (otp, phoneNumber) => fetch(`${BASE_URL}/login/verify-otp`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp, phoneNumber })
    }),
    getUserById: (userId) => fetch(`${BASE_URL}/users/${userId}`),
    
    //Saas Plans
    createSaasPlan: (planData) => fetch(`${BASE_URL}/saas-plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planData)
    }),
    deleteSaasPlan: (planId) => fetch(`${BASE_URL}/saas-plans/${planId}`, {
      method: 'DELETE',
    }),
    updateSaasPlan: (planId, planData) => fetch(`${BASE_URL}/saas-plans/${planId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planData)
    }),
    getSaasPlans: () => fetch(`${BASE_URL}/saas-plans`),
    getSaasPlanById: (planId) => fetch(`${BASE_URL}/saas-plans/${planId}`),
};