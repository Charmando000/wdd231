// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const grid = document.querySelector('#games-grid');
const modal = document.querySelector('#game-modal');
const modalContent = document.querySelector('#modal-content');
const closeBtn = document.querySelector('#close-modal');

// ============================================
// STATE MANAGEMENT
// ============================================

/** Retrieve user's favorite games from localStorage */
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// FETCH & DISPLAY GAMES

/**
 * Asynchronously load games from JSON file and render them
 * Uses Fetch API with error handling
 * Displays 15+ items with 4+ distinct properties each
 */
async function loadGames() {
  try {
    // Fetch game data from local JSON file
    const response = await fetch('datas/games.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const games = await response.json();

    // Dynamically generate game cards using array methods
    games.forEach(game => {
      const card = document.createElement('article');
      const isFavorited = favorites.includes(game.title);
      
      // Template literal for card content (dynamic HTML generation)
      card.innerHTML = `
        <img src="${game.image}" alt="${game.title} cover art" loading="lazy" class="game-image">
        <div class="game-info">
          <h2>${game.title}</h2>
          <p><strong>Genre:</strong> ${game.genre}</p>
          <p><strong>Platform:</strong> ${game.platform}</p>
          <p><strong>Year:</strong> ${game.year}</p>
          <p>${game.description}</p>
          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button class="fav-btn" aria-label="Add to favorites" title="Add to favorites">⭐ Favorite</button>
            <button class="details-btn" aria-label="View details">View Details</button>
          </div>
        </div>
      `;

      // Handle "View Details" button click
      card.querySelector('.details-btn').addEventListener('click', () => {
        modalContent.innerHTML = `
          <h2>${game.title}</h2>
          <p><strong>Genre:</strong> ${game.genre}</p>
          <p><strong>Platform:</strong> ${game.platform}</p>
          <p><strong>Year:</strong> ${game.year}</p>
          <p>${game.description}</p>
        `;
        modal.showModal();
      });

      // Handle "Favorite" button - DOM manipulation & local storage
      const favBtn = card.querySelector('.fav-btn');

      // Set initial active state based on localStorage
      if (isFavorited) {
        favBtn.classList.add('active');
      }

      // Add click listener for favorite toggle
      favBtn.addEventListener('click', () => {
        if (favorites.includes(game.title)) {
          // Remove from favorites
          favorites = favorites.filter(title => title !== game.title);
          favBtn.classList.remove('active');
        } else {
          // Add to favorites
          favorites.push(game.title);
          favBtn.classList.add('active');
        }
        
        // Persist favorites to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
      });

      // Add card to grid
      grid.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading games:', error);
    grid.innerHTML = '<p style="color: red;">Error loading games. Please try again later.</p>';
  }
}

// MODAL DIALOG HANDLING
/** Close modal when close button is clicked */
closeBtn.addEventListener('click', () => modal.close());

/** Allow clicking outside modal to close it (accessibility) */
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.close();
  }
});
loadGames();
