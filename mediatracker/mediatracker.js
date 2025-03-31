// Data storage for different categories
const categories = {
  tv: {
    title: "TV Shows",
    items: [
      "American Dad!", "Aqua Teen Hunger Force", "Archer", "Big Mouth", 
      "BoJack Horseman", "Bob's Burgers", "Breaking Bad", "Better Call Saul",
      "Family Guy", "Futurama", "Game of Thrones", "House of the Dragon",
      "Rick and Morty", "South Park", "Stranger Things", "The Office",
      "The Simpsons", "The Last of Us", "Succession", "Wednesday"
    ]
  },
  movies: {
    title: "Movies",
    items: [
      "The Godfather", "The Shawshank Redemption", "The Dark Knight", 
      "Pulp Fiction", "Forrest Gump", "Inception", "The Matrix",
      "Interstellar", "Avatar", "Avengers: Endgame", "Titanic",
      "Star Wars: Episode IV", "The Lion King", "Jurassic Park",
      "Back to the Future", "Toy Story", "The Silence of the Lambs",
      "Goodfellas", "The Lord of the Rings: The Fellowship of the Ring",
      "Fight Club"
    ]
  },
  anime: {
    title: "Anime",
    items: [
      "Attack on Titan", "Death Note", "Fullmetal Alchemist: Brotherhood",
      "One Piece", "Naruto", "Demon Slayer", "My Hero Academia",
      "Jujutsu Kaisen", "Hunter x Hunter", "One Punch Man",
      "Cowboy Bebop", "Dragon Ball Z", "Neon Genesis Evangelion",
      "Your Name", "Spirited Away", "Princess Mononoke",
      "Ghost in the Shell", "Akira", "Violet Evergarden", "Steins;Gate"
    ]
  }
};

// Initialize user data
let userData = JSON.parse(localStorage.getItem('mediaTrackerData')) || {
  tv: {},
  movies: {},
  anime: {}
};

// Current category
let currentCategory = 'tv';

// Check login status
let isLoggedIn = false;

// Function to load user data from server
function loadUserData() {
  fetch('load_data.php')
    .then(response => response.json())
    .then(data => {
      if (data.success === false) {
        // Not logged in or no data, use localStorage
        userData = JSON.parse(localStorage.getItem('mediaTrackerData')) || {
          tv: {},
          movies: {},
          anime: {}
        };
        isLoggedIn = false;
        
        // Show login message - Matching home page style
        const userStatus = document.getElementById('user-status');
        userStatus.innerHTML = '<a href="/login.php">Login / Register</a>';
      } else {
        // User is logged in and has data
        userData = data;
        isLoggedIn = true;
        
        // Add a logout button - Matching home page style
        const userStatus = document.getElementById('user-status');
        userStatus.innerHTML = `
          <span>Logged in as: ${data.username || 'User'}</span>
          <a href="/logout.php">Logout</a>
        `;
      }
      
      // Initialize items if needed
      initializeAllCategories();
      
      // Load current category
      populateTable();
    })
    .catch(error => {
      console.error('Error loading data:', error);
      // Error connecting to server, use localStorage
      userData = JSON.parse(localStorage.getItem('mediaTrackerData')) || {
        tv: {},
        movies: {},
        anime: {}
      };
      
      // Initialize items
      initializeAllCategories();
      
      // Load current category
      populateTable();
    });
}

// Function to initialize all categories
function initializeAllCategories() {
  Object.keys(categories).forEach(category => {
    if (!userData[category]) {
      userData[category] = {};
    }
    
    categories[category].items.forEach(item => {
      if (!userData[category][item]) {
        userData[category][item] = {
          status: "not", // Default status is "not watched"
          rating: "", // Empty rating by default
          notes: "", // Empty notes by default
          currentSeason: "", // Added for season tracking
          currentEpisode: "", // Added for episode tracking
          totalSeasons: "", // Added for total seasons tracking
          totalEpisodes: "" // Added for total episodes tracking
        };
      } else {
        // Make sure existing entries have the progress fields
        if (userData[category][item].currentSeason === undefined) {
          userData[category][item].currentSeason = "";
        }
        if (userData[category][item].currentEpisode === undefined) {
          userData[category][item].currentEpisode = "";
        }
        if (userData[category][item].totalSeasons === undefined) {
          userData[category][item].totalSeasons = "";
        }
        if (userData[category][item].totalEpisodes === undefined) {
          userData[category][item].totalEpisodes = "";
        }
      }
    });
  });
}

// Update table header based on category
function updateTableHeader() {
  const tableHead = document.querySelector('#showsTable thead tr');
  tableHead.innerHTML = ''; // Clear existing headers
  
  // Add common headers
  tableHead.innerHTML += '<th onclick="sortTable(0)">Title</th>';
  tableHead.innerHTML += '<th onclick="sortTable(1)">Status</th>';
  tableHead.innerHTML += '<th onclick="sortTable(2)">Rating</th>';
  
  // Only add progress column for TV Shows and Anime
  if (currentCategory === 'tv' || currentCategory === 'anime') {
    tableHead.innerHTML += '<th class="progress-column">Progress</th>';
  }
  
  tableHead.innerHTML += '<th>Notes</th>';
}

// Function to populate the table
function populateTable(filterValue = 'all') {
  const tableBody = document.getElementById('showsTableBody');
  tableBody.innerHTML = '';
  
  // Update heading
  document.querySelector('h1').textContent = `${categories[currentCategory].title} Tracker`;
  
  // Update table headers based on category
  updateTableHeader();
  
  // Get current items and sort alphabetically
  const items = [...categories[currentCategory].items].sort();
  
  items.forEach(item => {
    // Skip if filtered out
    if (filterValue !== 'all' && userData[currentCategory][item].status !== filterValue) {
      return;
    }
    
    const row = document.createElement('tr');
    
    // Add status class to row for visual distinction
    if (userData[currentCategory][item].status) {
      row.classList.add(userData[currentCategory][item].status + '-row');
    }
    
    // Item title
    const titleCell = document.createElement('td');
    titleCell.textContent = item;
    row.appendChild(titleCell);
    
    // Status dropdown
    const statusCell = document.createElement('td');
    statusCell.className = 'status-cell';
    const statusSelect = document.createElement('select');
    statusSelect.className = 'status-select';
    statusSelect.dataset.item = item;
    
    const statusOptions = [
      { value: 'not', text: 'Not Watched' },
      { value: 'watching', text: 'Currently Watching' },
      { value: 'watched', text: 'Watched' },
      { value: 'plan', text: 'Plan to Watch' },
      { value: 'dropped', text: 'Dropped' }
    ];
    
    statusOptions.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.text;
      if (option.value === userData[currentCategory][item].status) {
        optionElement.selected = true;
      }
      statusSelect.appendChild(optionElement);
    });
    
    statusSelect.addEventListener('change', (e) => {
      const item = e.target.dataset.item;
      userData[currentCategory][item].status = e.target.value;
      saveToLocalStorage();
      updateStatistics();
      
      // If we're not filtering, update the row's class for visual feedback
      if (document.getElementById('statusFilter').value === 'all') {
        const row = e.target.closest('tr');
        row.className = '';
        row.classList.add(e.target.value + '-row');
      }
    });
    
    statusCell.appendChild(statusSelect);
    row.appendChild(statusCell);
    
    // Rating input
    const ratingCell = document.createElement('td');
    ratingCell.className = 'status-cell';
    const ratingSelect = document.createElement('select');
    ratingSelect.className = 'status-select';
    ratingSelect.dataset.item = item;
    
    // Add empty option for unrated
    const emptyOption = document.createElement('option');
    emptyOption.value = "";
    emptyOption.textContent = "No Rating";
    if (userData[currentCategory][item].rating === "") {
      emptyOption.selected = true;
    }
    ratingSelect.appendChild(emptyOption);
    
    // Add rating options 1-10
    for (let i = 1; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i + "/10";
      if (userData[currentCategory][item].rating === i.toString()) {
        option.selected = true;
      }
      ratingSelect.appendChild(option);
    }
    
    ratingSelect.addEventListener('change', (e) => {
      const item = e.target.dataset.item;
      userData[currentCategory][item].rating = e.target.value;
      saveToLocalStorage();
    });
    
    ratingCell.appendChild(ratingSelect);
    row.appendChild(ratingCell);
    
    // Progress input (Season/Episode) - only for TV shows and anime
    if (currentCategory === 'tv' || currentCategory === 'anime') {
      const progressCell = document.createElement('td');
      progressCell.className = 'progress-cell';
      
      // Create a container div for the season/episode inputs
      const progressContainer = document.createElement('div');
      progressContainer.className = 'progress-inputs';
      
      // Season input
      const seasonInput = document.createElement('input');
      seasonInput.type = 'number';
      seasonInput.min = '0';
      seasonInput.placeholder = 'Season';
      seasonInput.value = userData[currentCategory][item].currentSeason || '';
      seasonInput.dataset.item = item;
      seasonInput.dataset.field = 'currentSeason';
      
      // Episode input
      const episodeInput = document.createElement('input');
      episodeInput.type = 'number';
      episodeInput.min = '0';
      episodeInput.placeholder = 'Episode';
      episodeInput.value = userData[currentCategory][item].currentEpisode || '';
      episodeInput.dataset.item = item;
      episodeInput.dataset.field = 'currentEpisode';
      
      // Add separator
      const separator = document.createElement('div');
      separator.className = 'separator';
      separator.textContent = '/';
      
      // Total seasons input
      const totalSeasonsInput = document.createElement('input');
      totalSeasonsInput.type = 'number';
      totalSeasonsInput.min = '0';
      totalSeasonsInput.placeholder = 'Total S';
      totalSeasonsInput.value = userData[currentCategory][item].totalSeasons || '';
      totalSeasonsInput.dataset.item = item;
      totalSeasonsInput.dataset.field = 'totalSeasons';
      
      // Total episodes input
      const totalEpisodesInput = document.createElement('input');
      totalEpisodesInput.type = 'number';
      totalEpisodesInput.min = '0';
      totalEpisodesInput.placeholder = 'Total E';
      totalEpisodesInput.value = userData[currentCategory][item].totalEpisodes || '';
      totalEpisodesInput.dataset.item = item;
      totalEpisodesInput.dataset.field = 'totalEpisodes';
      
      // Add all inputs to the container
      progressContainer.appendChild(seasonInput);
      progressContainer.appendChild(episodeInput);
      progressContainer.appendChild(separator);
      progressContainer.appendChild(totalSeasonsInput);
      progressContainer.appendChild(totalEpisodesInput);
      
      // Add event listeners to save changes
      [seasonInput, episodeInput, totalSeasonsInput, totalEpisodesInput].forEach(input => {
        input.addEventListener('change', (e) => {
          const item = e.target.dataset.item;
          const field = e.target.dataset.field;
          userData[currentCategory][item][field] = e.target.value;
          saveToLocalStorage();
        });
      });
      
      progressCell.appendChild(progressContainer);
      row.appendChild(progressCell);
    }
    
    // Notes input
    const notesCell = document.createElement('td');
    const notesInput = document.createElement('input');
    notesInput.type = 'text';
    notesInput.className = 'status-select';
    notesInput.value = userData[currentCategory][item].notes || '';
    notesInput.placeholder = 'Add notes...';
    notesInput.dataset.item = item;
    
    notesInput.addEventListener('change', (e) => {
      const item = e.target.dataset.item;
      userData[currentCategory][item].notes = e.target.value;
      saveToLocalStorage();
    });
    
    notesCell.appendChild(notesInput);
    row.appendChild(notesCell);
    
    tableBody.appendChild(row);
  });
  
  updateStatistics();
}

// Function to save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('mediaTrackerData', JSON.stringify(userData));
}

// Function to update the statistics
function updateStatistics() {
  const totalItems = categories[currentCategory].items.length;
  let watchedCount = 0;
  let watchingCount = 0;
  let planCount = 0;
  let notCount = 0;
  let droppedCount = 0;
  
  categories[currentCategory].items.forEach(item => {
    const status = userData[currentCategory][item]?.status || 'not';
    if (status === 'watched') watchedCount++;
    else if (status === 'watching') watchingCount++;
    else if (status === 'plan') planCount++;
    else if (status === 'not') notCount++;
    else if (status === 'dropped') droppedCount++;
  });
  
  const watchedPercent = Math.round((watchedCount / totalItems) * 100);
  
  document.getElementById('totalShows').textContent = totalItems;
  document.getElementById('watchedCount').textContent = watchedCount;
  document.getElementById('watchedPercent').textContent = watchedPercent + '%';
  document.getElementById('watchingCount').textContent = watchingCount;
  document.getElementById('planCount').textContent = planCount;
  document.getElementById('notCount').textContent = notCount;
  document.getElementById('droppedCount').textContent = droppedCount;
}

// Function to sort the table
function sortTable(n) {
  const table = document.getElementById("showsTable");
  let switching = true;
  let direction = "asc";
  let switchcount = 0;
  
  while (switching) {
    switching = false;
    const rows = table.rows;
    
    for (let i = 1; i < rows.length - 1; i++) {
      let shouldSwitch = false;
      const x = rows[i].getElementsByTagName("TD")[n];
      const y = rows[i + 1].getElementsByTagName("TD")[n];
      
      // Check if it's the status or rating column
      if (n === 1 || n === 2) {
        const xSelect = x.getElementsByTagName("SELECT")[0];
        const ySelect = y.getElementsByTagName("SELECT")[0];
        const xValue = xSelect.value;
        const yValue = ySelect.value;
        
        if (direction === "asc") {
          if (xValue > yValue) {
            shouldSwitch = true;
            break;
          }
        } else {
          if (xValue < yValue) {
            shouldSwitch = true;
            break;
          }
        }
      } else {
        if (direction === "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount === 0 && direction === "asc") {
        direction = "desc";
        switching = true;
      }
    }
  }
}

// Handle category buttons
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    document.querySelectorAll('.category-btn').forEach(b => {
      b.classList.remove('active');
    });
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    // Update current category
    currentCategory = btn.dataset.category;
    
    // Reset filters
    document.getElementById('searchInput').value = '';
    document.getElementById('statusFilter').value = 'all';
    
    // Populate table with new category
    populateTable();
  });
});

// Handle search input
document.getElementById('searchInput').addEventListener('input', (e) => {
  const searchText = e.target.value.toLowerCase();
  const rows = document.getElementById('showsTableBody').getElementsByTagName('tr');
  
  for (let i = 0; i < rows.length; i++) {
    const titleCell = rows[i].getElementsByTagName('td')[0];
    if (titleCell) {
      const title = titleCell.textContent || titleCell.innerText;
      if (title.toLowerCase().indexOf(searchText) > -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
});

// Handle status filter
document.getElementById('statusFilter').addEventListener('change', (e) => {
  populateTable(e.target.value);
});

// Handle reset button
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('statusFilter').value = 'all';
  populateTable();
});

// Handle save button
document.getElementById('saveBtn').addEventListener('click', () => {
  if (isLoggedIn) {
    // Save to server
    fetch('save_data.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Data saved successfully to your account!');
      } else {
        alert('Error saving data: ' + data.message);
        // Fallback to local storage
        saveToLocalStorage();
      }
    })
    .catch(error => {
      alert('Error connecting to server. Data saved locally instead.');
      // Fallback to local storage
      saveToLocalStorage();
    });
  } else {
    // Save to local storage if not logged in
    saveToLocalStorage();
    alert('Data saved to local storage. Create an account to save data to the server!');
  }
});

// Handle export button
document.getElementById('exportBtn').addEventListener('click', (event) => {
  // Create dropdown menu for export options
  const exportOptions = document.createElement('div');
  exportOptions.style.position = 'absolute';
  exportOptions.style.right = '0';
  exportOptions.style.backgroundColor = '#1e1e1e';
  exportOptions.style.border = '1px solid #333';
  exportOptions.style.borderRadius = '4px';
  exportOptions.style.padding = '10px';
  exportOptions.style.zIndex = '1000';
  
  // Add CSV option
  const csvOption = document.createElement('div');
  csvOption.textContent = 'Export current category as CSV';
  csvOption.style.padding = '5px 10px';
  csvOption.style.cursor = 'pointer';
  csvOption.style.borderRadius = '3px';
  csvOption.addEventListener('mouseover', () => {
    csvOption.style.backgroundColor = '#2d2d2d';
  });
  csvOption.addEventListener('mouseout', () => {
    csvOption.style.backgroundColor = 'transparent';
  });
  csvOption.addEventListener('click', exportCSV);
  
  // Add JSON option (for backup/import)
  const jsonOption = document.createElement('div');
  jsonOption.textContent = 'Export all data as JSON (for backup)';
  jsonOption.style.padding = '5px 10px';
  jsonOption.style.cursor = 'pointer';
  jsonOption.style.borderRadius = '3px';
  jsonOption.addEventListener('mouseover', () => {
    jsonOption.style.backgroundColor = '#2d2d2d';
  });
  jsonOption.addEventListener('mouseout', () => {
    jsonOption.style.backgroundColor = 'transparent';
  });
  jsonOption.addEventListener('click', exportJSON);
  
  // Add options to dropdown
  exportOptions.appendChild(csvOption);
  exportOptions.appendChild(jsonOption);
  
  // Add dropdown to page
  document.querySelector('.save-container').appendChild(exportOptions);
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function closeDropdown(e) {
    if (!exportOptions.contains(e.target) && e.target !== document.getElementById('exportBtn')) {
      exportOptions.remove();
      document.removeEventListener('click', closeDropdown);
    }
  });
  
  // Prevent immediate closing
  event.stopPropagation();
});

function exportCSV() {
  // Start with the standard fields
  let csvContent = "Title,Status,Rating";
  
  // Add progress fields only for TV and anime
  if (currentCategory === 'tv' || currentCategory === 'anime') {
    csvContent += ",Current Season,Current Episode,Total Seasons,Total Episodes";
  }
  
  csvContent += ",Notes\n";
  
  // Sort items alphabetically
  const items = [...categories[currentCategory].items].sort();
  
  items.forEach(item => {
    const status = userData[currentCategory][item]?.status || 'not';
    const rating = userData[currentCategory][item]?.rating || '';
    const notes = userData[currentCategory][item]?.notes || '';
    
    // Convert status code to full text
    let statusText = '';
    switch (status) {
      case 'watched': statusText = 'Watched'; break;
      case 'watching': statusText = 'Currently Watching'; break;
      case 'plan': statusText = 'Plan to Watch'; break;
      case 'not': statusText = 'Not Watched'; break;
      case 'dropped': statusText = 'Dropped'; break;
    }
    
    // Properly escape CSV fields
    const escapeCSV = (field) => {
      if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };
    
    // Start with standard fields
    let row = `${escapeCSV(item)},${statusText},${rating}`;
    
    // Add progress fields only for TV and anime
    if (currentCategory === 'tv' || currentCategory === 'anime') {
      const currentSeason = userData[currentCategory][item]?.currentSeason || '';
      const currentEpisode = userData[currentCategory][item]?.currentEpisode || '';
      const totalSeasons = userData[currentCategory][item]?.totalSeasons || '';
      const totalEpisodes = userData[currentCategory][item]?.totalEpisodes || '';
      
      row += `,${currentSeason},${currentEpisode},${totalSeasons},${totalEpisodes}`;
    }
    
    // Add notes and line break
    row += `,${escapeCSV(notes)}\n`;
    csvContent += row;
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${categories[currentCategory].title.toLowerCase().replace(/\s+/g, '_')}_tracker.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// JSON export function (for backup/import)
function exportJSON() {
  const dataStr = JSON.stringify(userData);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const exportName = 'media_tracker_data.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportName);
  linkElement.click();
}

// Handle import button
document.getElementById('importBtn').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function () {
      try {
        const importedData = JSON.parse(reader.result);
        userData = importedData;
        saveToLocalStorage();
        populateTable();
        updateStatistics();
        alert('Data imported successfully!');
      } catch (error) {
        alert('Error importing data: ' + error.message);
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
});

// Make sortTable function global for table header onclick
window.sortTable = sortTable;

// Call loadUserData when page loads
document.addEventListener('DOMContentLoaded', loadUserData);