/**
 * Seed Product Roadmap Items - Browser Console Script
 * 
 * Copy and paste this into your browser console on the Command Central page
 * (after you're logged in)
 */

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
  console.log('🌱 Seeding product roadmap items...');
  
  // Import the API (you need to be on a page that has gfcompanyapi imported)
  // Or use fetch directly with token
  const { default: gfcompanyapi } = await import('/src/lib/gfcompanyapi.js');
  
  let created = 0;
  let errors = 0;

  for (const item of productRoadmapItems) {
    try {
      const response = await gfcompanyapi.post('/api/company/roadmap', item);
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
  
  // Refresh the page to see the new items
  console.log('🔄 Refreshing page in 2 seconds...');
  setTimeout(() => window.location.reload(), 2000);
}

// Run it
seedProductRoadmap();

