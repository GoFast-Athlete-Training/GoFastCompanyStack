import axios from 'axios';
import { getAuth } from 'firebase/auth';

const gfcompanyapi = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://gofastbackendv2-fall2025.onrender.com' 
    : 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
  // No withCredentials - we use Bearer tokens, not cookies
});

// Request interceptor - Firebase automatically handles token refresh
gfcompanyapi.interceptors.request.use(
  async (config) => {
    // Get Firebase auth instance
    const firebaseAuth = getAuth();
    const user = firebaseAuth.currentUser;
    
    // If user is authenticated, Firebase automatically refreshes token if needed
    if (user) {
      try {
        // Firebase SDK automatically refreshes expired tokens
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('❌ GFCompany: Failed to get Firebase token:', error);
      }
    }
    
    // Log request
    console.log('🔥 GFCompany API Request:', config.method.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('❌ GFCompany API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handles errors and logging
gfcompanyapi.interceptors.response.use(
  response => {
    console.log('✅ GFCompany API Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('❌ GFCompany API Error:', error.response?.status, error.response?.data || error.message);
    
    // Handle 401 (Unauthorized) - Firebase will handle token refresh automatically
    // Just clear CompanyStaff data and redirect (Firebase auth persists automatically)
    if (error.response?.status === 401) {
      console.error('🚫 GFCompany: Unauthorized - clearing CompanyStaff data');
      
      // Clear ONLY CompanyStaff data (Firebase auth persists automatically)
      const keysToRemove = [
        'gfcompany_staffId',
        'gfcompany_staff',
        'gfcompany_firebaseId',
        'gfcompany_firebaseToken',
        'gfcompany_email',
        'gfcompany_company',
        'gfcompany_companyId',
        'gfcompany_role'
      ];
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Redirect to signin - Firebase will handle re-auth if needed
      window.location.href = '/gfcompanysignin';
    }
    
    return Promise.reject(error);
  }
);

export default gfcompanyapi;

