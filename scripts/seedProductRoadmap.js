/**
 * Seed Product Roadmap Items via API
 * Creates initial product roadmap items for GoFast Company Stack
 * 
 * Usage: 
 * 1. Get your Firebase token from browser console: await getAuth().currentUser.getIdToken()
 * 2. Set FIREBASE_TOKEN environment variable
 * 3. Run: node scripts/seedProductRoadmap.js
 */

import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://gofastbackendv2-fall2025.onrender.com';
const FIREBASE_TOKEN = process.env.FIREBASE_TOKEN;

if (!FIREBASE_TOKEN) {
  console.error('❌ FIREBASE_TOKEN environment variable is required');
  console.log('💡 Get your token from browser console: await getAuth().currentUser.getIdToken()');
  process.exit(1);
}

const productRoadmapItems = [
  {
    title: 'Join RunCrew',
    itemType: 'Feature',
    parentArchitecture: 'RunCrew',
    roadmapType: 'Product',
    category: 'Core Feature',
    whatItDoes: 'Allow users to join RunCrews and participate in group runs',
    howItHelps: 'Enables community building and group run coordination',
    priority: 'P1',
    status: 'In Progress',
    hoursEstimated: 40
  },
  {
    title: 'Messaging',
    itemType: 'Feature',
    parentArchitecture: 'Communication',
    roadmapType: 'Product',
    category: 'Core Feature',
    whatItDoes: 'Direct messaging between users and RunCrew members',
    howItHelps: 'Enables communication and coordination for runs and events',
    priority: 'P1',
    status: 'Not Started',
    hoursEstimated: 60
  },
  {
    title: 'Dynamic Leaderboard',
    itemType: 'Feature',
    parentArchitecture: 'Competition',
    roadmapType: 'Product',
    category: 'Engagement',
    whatItDoes: 'Real-time leaderboard showing top performers in RunCrews and challenges',
    howItHelps: 'Increases engagement and competition among runners',
    priority: 'P2',
    status: 'Not Started',
    hoursEstimated: 50
  },
  {
    title: 'Sales Partnership',
    itemType: 'Feature',
    parentArchitecture: 'Business',
    roadmapType: 'Product',
    category: 'Revenue',
    whatItDoes: 'Partnership management and sales tracking system',
    howItHelps: 'Enables tracking of partnerships and revenue opportunities',
    priority: 'P2',
    status: 'Not Started',
    hoursEstimated: 80
  },
  {
    title: 'Ambassador Program',
    itemType: 'Feature',
    parentArchitecture: 'Community',
    roadmapType: 'Product',
    category: 'Growth',
    whatItDoes: 'Ambassador program management and tracking',
    howItHelps: 'Enables community growth through ambassador network',
    priority: 'P2',
    status: 'Not Started',
    hoursEstimated: 70
  }
];

async function seedProductRoadmap() {
  try {
    console.log('🌱 Seeding product roadmap items via API...');
    console.log('📍 API URL:', API_BASE_URL);

    const axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${FIREBASE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    let created = 0;
    let errors = 0;

    for (const item of productRoadmapItems) {
      try {
        const response = await axiosInstance.post('/api/company/roadmap', item);
        if (response.data.success) {
          console.log(`✅ Created: ${item.title} (${item.status})`);
          created++;
        } else {
          console.error(`❌ Failed to create ${item.title}:`, response.data.error);
          errors++;
        }
      } catch (error) {
        console.error(`❌ Error creating ${item.title}:`, error.response?.data?.message || error.message);
        errors++;
      }
    }

    console.log('\n✅ Product roadmap seeding complete!');
    console.log(`📊 Created: ${created}, Errors: ${errors}`);

  } catch (error) {
    console.error('❌ Error seeding product roadmap:', error.message);
    throw error;
  }
}

seedProductRoadmap()
  .then(() => {
    console.log('✅ Seeding completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });

