// Get the spotlights container
const spotlightsContainer = document.querySelector('#spotlights-container');

// Membership levels: 2=Gold, 1=Silver
const GOLD_LEVEL = 2;
const SILVER_LEVEL = 1;

// Fetch members data
async function loadSpotlights() {
  try {
    const response = await fetch('/chamber/data/members.json');
    if (!response.ok) throw new Error('Failed to load members data');
    
    const data = await response.json();
    console.log('Members data:', data);
    
    // Filter for Gold and Silver members
    const premiumMembers = data.members.filter(member => 
      member.membership === GOLD_LEVEL || member.membership === SILVER_LEVEL
    );
    
    console.log('Premium members:', premiumMembers);
    
    // Get 2-3 random members
    const randomSpotlights = getRandomMembers(premiumMembers, 3);
    
    // Display spotlights
    displaySpotlights(randomSpotlights);
    
  } catch (error) {
    console.log('Error loading spotlights:', error);
    spotlightsContainer.innerHTML = '<p>Unable to load featured businesses</p>';
  }
}

// Function to get random members from array
function getRandomMembers(array, count) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Function to display spotlight cards
function displaySpotlights(members) {
  let html = '';
  
  members.forEach(member => {
    const membershipLabel = member.membership === GOLD_LEVEL ? 'Gold' : 'Silver';
    html += `
      <div class="spotlight-card">
        <img src="/chamber/images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p><strong>Membership:</strong> ${membershipLabel}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        <p><em>${member.description}</em></p>
      </div>
    `;
  });
  
  spotlightsContainer.innerHTML = html;
}

// Load spotlights when page loads
loadSpotlights();