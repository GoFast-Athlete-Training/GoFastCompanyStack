# Seed Product Roadmap Items

## Quick Method: Browser Console

1. Go to Command Central page (you should already be there)
2. Open browser console (F12 or Cmd+Option+I)
3. Paste this code and press Enter:

```javascript
// Seed Product Roadmap Items
(async () => {
  const items = [
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

  // Get the API instance (assuming it's available globally or import it)
  // If gfcompanyapi is not available, we'll use fetch with token
  const { default: gfcompanyapi } = await import('/src/lib/gfcompanyapi.js');
  
  let created = 0;
  let errors = 0;

  for (const item of items) {
    try {
      const response = await gfcompanyapi.post('/api/company/roadmap', item);
      if (response.data.success) {
        console.log(`✅ Created: ${item.title} (${item.status})`);
        created++;
      } else {
        console.error(`❌ Failed: ${item.title}`, response.data.error);
        errors++;
      }
    } catch (error) {
      console.error(`❌ Error: ${item.title}`, error.response?.data || error.message);
      errors++;
    }
  }

  console.log(`\n✅ Done! Created: ${created}, Errors: ${errors}`);
  console.log('🔄 Refresh the page to see the new items');
})();
```

## Alternative: Use Fetch Directly

If the import doesn't work, use this version that gets the Firebase token:

```javascript
(async () => {
  const { getAuth } = await import('firebase/auth');
  const auth = getAuth();
  const user = auth.currentUser;
  const token = await user.getIdToken();
  
  const items = [/* same items as above */];
  
  const API_URL = 'https://gofastbackendv2-fall2025.onrender.com';
  
  for (const item of items) {
    try {
      const response = await fetch(`${API_URL}/api/company/roadmap`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      const data = await response.json();
      if (data.success) {
        console.log(`✅ Created: ${item.title}`);
      } else {
        console.error(`❌ Failed: ${item.title}`, data.error);
      }
    } catch (error) {
      console.error(`❌ Error: ${item.title}`, error);
    }
  }
})();
```

