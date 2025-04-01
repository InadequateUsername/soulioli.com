// Data storage for different categories
const categories = {
  tv: {
    title: "TV Shows",
    items: [
      "100 Days to Indy", "100 Foot Wave", "1000-lb Sisters", "12 oz. Mouse", "16 and Pregnant", 
      "2010s", "20/20", "25 Words or Less", "30 for 30", "3-2-1 Penguins!", "3-South", "48 Hours", 
      "60 Days In", "60 Minutes", "666 Park Avenue", "90 Day Fiancé", "A League of Their Own", 
      "A Man on the Inside", "ADHD Shorts", "Afraid", "After Words", "AgDay", "Aidan's Big Day", 
      "AirRace", "Alex, Inc.", "All Elite Wrestling: Dynamite", "All In with Chris Hayes", 
      "All That", "All the Queen's Men", "Alma's Way", "Amanpour", "Amanpour & Company", 
      "America in Black", "America Reports", "America This Morning", "America's Barbecue Showdown", 
      "America's Black Forum", "America's Court with Judge Ross", "America's Funniest Home Videos", 
      "America's Game: The Super Bowl Champions", "America's Got Talent", "America's Heartland", 
      "America's Morning Headquarters", "America's Most Wanted", "America's Test Kitchen", 
      "American Crime Story", "American Dad!", "American Greed", "American Horror Stories", 
      "American Horror Story", "American Housewife", "American Idol", "American Masters", 
      "And Just Like That...", "Animal Control", "Antiques Roadshow", "Are You Afraid of the Dark?", 
      "Around the Horn", "Austin City Limits", "Avatar: The Last Airbender", "Awkward.", 
      "Bachelor in Paradise", "Bar Rescue", "Barely Famous", "Baseball Tonight", "Basket Case", 
      "Beat Bobby Flay", "Beat Shazam", "Beef", "Below Deck", "Below Deck Mediterranean", 
      "Below Deck Sailing Yacht", "Better Call Saul", "Big Brother", "Big Mouth", "Black Dynamite", 
      "Bob's Burgers", "BoJack Horseman", "Bodkin", "Bordertown", "Breaking Bad", "Bridgerton", 
      "Brooklyn Nine-Nine", "Bull", "Burn Notice", "CBS Evening News", "CBS Morning News", 
      "CBS News Sunday Morning", "Celebrity Family Feud", "Charmed", "Chicago Fire", "Chicago Med", 
      "Chicago P.D.", "Chopped", "Class of 3000", "Closer to Truth", "College Football on CBS Sports", 
      "Comedy Bang! Bang!", "Community", "Condor", "Cooking Impossible", "Cops", "Criminal Minds", 
      "Curb Your Enthusiasm", "Dateline NBC", "Days of Our Lives", "Defending Jacob", "Dexter", 
      "Diners, Drive-Ins and Dives", "Divorce Court", "Down to Earth", "Duck Tales", 
      "Early Today", "El Gordo y la Flaca", "Emily in Paris", "Empire", "Entertainment Tonight", 
      "ESPN College Basketball", "ESPN College Football", "Euphoria", "Everybody Hates Chris", 
      "Expedition Unknown", "Extra", "Face the Nation", "Faking It", "Family Feud", "Family Guy", 
      "Fargo", "FBI", "Fear the Walking Dead", "Firefly", "First Take", "Frontline", 
      "Four Weddings", "Fox College Football", "Fox College Hoops", "Fox & Friends", 
      "Fox NFL Sunday", "Fox News Sunday", "Fox Report", "Frasier", "Friday Night Lights", 
      "Golf Central", "Golf Channel on NBC", "Good Morning America", "Good Omens", "Good Girls", 
      "Gordon Ramsay's Food Stars", "Great Performances", "Grey's Anatomy", "Guardians of the Galaxy", 
      "Hacks", "Hallmark Hall of Fame", "Hard Knocks", "Hell's Kitchen", "Heroes", "House", 
      "House Hunters", "House of Cards", "House of the Dragon", "How I Met Your Mother", 
      "Hugh Laurie: Road Trip", "I Know What You Did", "Impact!", "Impractical Jokers", 
      "Independent Lens", "Inside Edition", "Inside No. 9", "Inside the NBA", "Inside the NFL", 
      "Insecure", "Intervention", "Invincible", "Is It Cake?", "It's Always Sunny in Philadelphia", 
      "Jane the Virgin", "Jeopardy!", "Jessica Jones", "Jimmy Kimmel Live!", "Joe Millionaire", 
      "Joseline's Cabaret", "Judy Justice", "Kenan", "Key and Peele", "Killing Eve", 
      "Kitchen Nightmares", "The Kitchen", "Last Week Tonight with John Oliver", "Late Night", 
      "Law & Order", "Law & Order: Organized Crime", "Law & Order: Special Victims Unit", 
      "Legion", "Leverage", "Life in Pieces", "Little America", "Live with...", "Love Is Blind", 
      "Love After Lockup", "Love Island", "Love & Hip Hop: Atlanta", "Lucifer", "Mad Money", 
      "Major League Baseball Game of the Week",
      "Major League Baseball on Fox", "MasterChef", "MasterChef Junior", "Masters of Illusion", 
      "Mayans M.C.", "Meet the Press", "Megamind Rules!", "Mid-Century Modern", "Military Wives", 
      "Million Dollar Listing Los Angeles", "MLB Network Showcase", "MLB Tonight", 
      "MSNBC Reports", "MTV Unplugged", "My Adventures with Superman", "My Big Fat Fabulous Life", 
      "My Lottery Dream Home", "My Next Guest Needs No Introduction with David Letterman", 
      "My 600-lb Life", "Naked and Afraid", "Naked and Afraid XL", "Name That Tune", 
      "NASCAR on Fox", "NASCAR on USA", "NASCAR RaceDay", "Nature", "NCIS", "NCIS: Origins", 
      "Netflix Explained", "New York Undercover", "NFL Live", "NFL on ABC", "NFL on CBS", 
      "NFL on Fox", "NFL on NBC", "NFL on Nickelodeon", "NFL RaceDay", "NFL Slimetime", 
      "NFL Top 100", "NFL Today", "NHL on ABC", "NHL on ESPN", "NHL on TNT", 
      "Noticias Telemundo", "Nova", "Odd Squad", "Off Base", "On Patrol: Live", 
      "One Nation with Brian Kilmeade", "Only Murders in the Building", "Outlast", 
      "Owning Manhattan", "PAW Patrol", "PBA on Fox", "PBS NewsHour", "Peacemaker", 
      "Penny Dreadful", "Percy Jackson and the Olympians", "Perfect Match", "Pew Die Pie", 
      "PGA Tour on CBS", "Power", "Power Book II: Ghost", "Power Book III: Raising Kanan", 
      "Prank Panel", "Premiere League on NBC", "Premier Boxing Champions", "Press Your Luck", 
      "Presumed Innocent", "Primer Impacto", "Project Runway", "Puppy Bowl", "Pupstruction", 
      "Queer Eye", "Raid the Cage", "Real Time with Bill Maher", "RealityCon", 
      "Reasonable Doubt", "Resident Alien", "Rick and Morty", "Rick and Morty: The Anime", 
      "Robot Chicken", "Rock Paper Scissors", "RuPaul's Drag Race", "RuPaul's Drag Race All Stars", 
      "Running Wild with Bear Grylls", "Saturday Night Football", "Saturday Night Live", 
      "Scare Tactics", "Scrabble", "SEC Nation", "Secret Level", "Selling the City", 
      "Selling the OC", "Selling Sunset", "Sesame Street", "Severance", "Shark Tank", 
      "Shifting Gears", "Shōgun", "Sit and Be Fit", "Sistas", "Snapped", "So You Think You Can Dance", 
      "Soccer on Fox Sports", "Somebody Feed Phil", "Southern Charm", "Southern Hospitality", 
      "Space Force", "Special Forces: World's Toughest Test", "SpongeBob SquarePants", 
      "SportsCenter", "Spring Baking Championship", "St. Denis Medical", "Star Trek: Strange New Worlds", 
      "Star Wars: Skeleton Crew", "Star Wars: Young Jedi Adventures", "State of the Union", 
      "Storage Wars", "Straight Up Steve Austin", "Stupid Pet Tricks", "Sugar", "Survivor", 
      "Swamp People", "Tales of the Teenage Mutant Ninja Turtles", "Tamron Hall", "Ted", 
      "Ted Lasso", "Teen Mom", "Teen Titans Go!", "The Agency", "The Amazing Race", 
      "The Amazing Race: All Stars", "The Ark", "The Bachelor", "The Bachelorette", 
      "The Bear", "The Big Bakeover", "The Baxters", "The Challenge", "The Cleaning Lady", 
      "The Circle", "The Crown", "The Curse", "The Daily Show", "The Diplomat", 
      "The First 48", "The Floor", "The Food That Built America", 
      "The Great American Baking Show", "The Great Food Truck Race", 
      "The Great Christmas Light Fight", "The Ingraham Angle", "The Jennifer Hudson Show", 
      "The Joe Schmo Show", "The Kitchen", "The Last Drive-in with Joe Bob Briggs", 
      "The Last of Us", "The Last Thing He Told Me", "The Loud House", 
      "The Mandalorian", "The Marvelous Mrs. Maisel", 
      "The Masked Singer", "The Morning Show", "The Ms. Pat Show", 
      "The National Desk", "The NFT", "The Night Agent", "The Price Is Right", 
      "The Quilted Tiger", "The Rookie", "The Situation Room with Wolf Blitzer", 
      "The Summit", "The Tonight Show", "The Traitors", "The Trust: A Game of Greed", 
      "The Ultimatum: Marry or Move On", "The Valley", "The Vince Staples Show", 
      "The Voice", "The Wall", "The Wheel of Time", "The White Lotus", "This Is Us", 
      "This Old House", "This Week", "Thomas & Friends: All Engines Go", 
      "Thursday Night Football", "Top Chef", "Tracker", "Transformers: EarthSpark", 
      "Trivial Pursuit", "True Detective", "Twisted Metal", "Unchained", 
      "Universal Basic Guys", "Unsolved Mysteries", "Upload", "WNBA on ESPN", 
      "Veronica Mars", "Vice", "Virgin River", "Wager", "Washington Journal", 
      "Washington Week", "Water Wipes", "Wayne Brady: The Family Remix", 
      "We Are Family", "Weekend Today", "What Would You Do?", 
      "When Calls the Heart", "Wheel of Fortune", "Who Wants to Be a Millionaire", 
      "Why Women Kill", "Wild Kingdom", "Winter Baking Championship", 
      "Witch Hunt", "Wizard of Paws", "World's Funniest Animals", "WWE Raw", 
      "WWE SmackDown", "WWE Rivals", "You", "Young Sheldon", "Yellowjackets", 
      "Your Friendly Neighborhood Spider-Man"
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
      // Add more movies as needed
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
      // Add more anime as needed
    ]
  },
  cartoons: {
    title: "Cartoons",
    items: [
      "12 oz. Mouse", "3-South", "ADHD Shorts", "Adventure Time", "Adventure Time: Fionna and Cake", 
      "The Adventures of Baxter and McGuire", "The Adventures of Chico and Guapo", 
      "The Adventures of Edward the Less", "The Adventures of OG Sherlock Kush", "Æon Flux", 
      "Agent Elvis", "Alien News Desk", "Allen Gregory", "The Ambiguously Gay Duo", 
      "American Dad!", "Animals", "Aqua Teen Hunger Force", "Archer", "Assy McGee", 
      "Avatar: The Last Airbender", "The Awesomes", "Axe Cop", "Baby Blues", 
      "Ballmastrz: 9009", "Batman: The Animated Series", "Beavis and Butt-Head", 
      "Bee and PuppyCat", "Big Mouth", "Birdgirl", "Black Dynamite", "Bless the Harts", 
      "Bob's Burgers", "BoJack Horseman", "The Boondocks", "Bordertown", 
      "The Boys Presents: Diabolical", "Brad Neely's Harg Nallin' Sclopio Peepio", 
      "The Brak Show", "Bravest Warriors", "Brickleberry", "The Brothers Grunt", 
      "Cake", "Camp Camp", "Camp WWE", "Capitol Critters", "Captain Fall", 
      "Carol & the End of the World", "Cartoon Sushi", "Castlevania", "Ceasar and Chuy", 
      "Celebrity Deathmatch", "Central Park", "Cheyenne Cinnamon and the Fantabulous Unicorn of Sugar Town Candy Fudge", 
      "Chicago Party Aunt", "China, IL", "Chozen", "Clerks: The Animated Series", 
      "The Cleveland Show", "Click and Clack's As the Wrench Turns", "Clone High", 
      "Close Enough", "Code Monkeys", "Codefellas", "Common Side Effects", 
      "Courage the Cowardly Dog", "Creature Comforts", "The Critic", "Crossing Swords", 
      "The Cyanide & Happiness Show", "Dallas & Robo", "Daria", "Devil May Care", 
      "Dexter's Laboratory", "The Dick & Paula Celebrity Special", "Dick Figures", 
      "Dicktown", "Digman!", "Dilbert", "Disenchantment", "DJ & the Fro", 
      "Dr. Katz, Professional Therapist", "Doomlands", "Downtown", "Drawn Together", 
      "Dream Corp LLC", "The Drinky Crow Show", "The Duck Factory", "Duckman", 
      "DuckTales", "Duncanville", "Everybody Still Hates Chris", "Exploding Kittens", 
      "F Is for Family", "Fairfax", "Fairview", "Family Dog", "Family Guy", "Farzar", 
      "Father of the Pride", "Fatherhood", "Final Space", "Fired on Mars", "Fish Police", 
      "The Flintstones", "The Freak Brothers", "Freak Show", "Free for All", 
      "Friday: The Animated Series", "Frisky Dingo", "Fugget About It", "Full English", 
      "Futurama", "Game Over", "Gary & Mike", "Gary and His Demons", "Gary the Rat", 
      "Gēmusetto", "Ginger Snaps", "Glenn Martin, DDS", "The God & Devil Show", 
      "God, the Devil and Bob", "Golan the Insatiable", "Good Morning Today", 
      "Good Times: Black Again", "Good Vibes", "The Goodbye Family", "The Goode Family", 
      "The Great North", "Greatest Party Story Ever", "Gravity Falls", "Grimsburg", 
      "The Guardians of Justice", "Happy Tree Friends", "Hard Drinkin' Lincoln", 
      "Harley Quinn", "HarmonQuest", "The Harper House", "Harvey Birdman, Attorney at Law", 
      "Hazbin Hotel", "He-Man and the Masters of the Universe", "The Head", "Hell Den", 
      "Helluva Boss", "Hey Joel", "Hey Monie!", "High School USA!", "Hit-Monkey", 
      "Home Movies", "Hoops", "Hopeless Pictures", "House of Cosbys", "HouseBroken", 
      "How It Should Have Ended", "Human Kind Of", "Human Resources", "Imaginary Mary", 
      "Inside Job", "Jeff & Some Aliens", "The Jellies!", "JJ Villard's Fairy Tales", 
      "Johnny Bravo", "Jokebook", "Kid Notorious", "King of the Hill", "King Star King", 
      "Kite Man: Hell Yeah!", "Koala Man", "Krapopolis", "Krogzilla", "Lazor Wulf", 
      "The Legend of Vox Machina", "Legends of Chamberlain Heights", "The Life & Times of Tim", 
      "Like, Share, Die", "Lil' Bush", "Liquid Television", "Little Demon", 
      "Liverspots and Astronots", "Lizzy the Lezzy", "Loafy", "Looney Tunes", 
      "Love, Death & Robots", "Lucas Bros. Moving Co.", "Lucy, the Daughter of the Devil", 
      "Lugar Heights", "M.O.D.O.K.", "Magical Girl Friendship Squad", 
      "Magical Girl Friendship Squad: Origins", "Major Lazer", "Marvel Superheroes: What the--?!", 
      "Mary Shelley's Frankenhole", "The Maxx", "Metalocalypse", "The Midnight Gospel", 
      "Mike Judge Presents: Tales from the Tour Bus", "Mike Tyson Mysteries", "Minoriteam", 
      "Mission Hill", "Momma Named Me Sheriff", "Mongo Wrestling Alliance", "Moonbeam City", 
      "Moral Orel", "The Most Popular Girls in School", "Mother Up!", "Mr. Pickles", 
      "Mr. Wong", "Mulligan", "Napoleon Dynamite", "Neighbors from Hell", "Neo Yokio", 
      "Number 1 Happy Family USA", "The Nutshack", "The Oblongs", "Off the Air", 
      "Oh My God... Yes! A Series of Extremely Relatable Circumstances", "Ollie & Scoops", 
      "Our Cartoon President", "Out There", "Outer Space Astronauts", "Paradise PD", 
      "Paranormal Action Squad", "Party Legends", "Perfect Hair Forever", "Phineas and Ferb", 
      "The PJs", "Planet Unicorn", "Popzilla", "Powerpuff Girls", "Praise Petey", 
      "The Prince", "Q-Force", "Queer Duck", "Regular Show", "Ren & Stimpy \"Adult Party Cartoon\"", 
      "Rick and Morty", "Rick and Morty: The Anime", "Rick & Steve: The Happiest Gay Couple in All the World", 
      "The Ricky Gervais Show", "Robot Chicken", "The Rotten Fruit", "Royal Crackers", 
      "RWBY Chibi", "Sammy", "Samurai Jack", "Santa Inc.", "Saturday Morning All Star Hits!", 
      "Sausage Party: Foodtopia", "Scooby-Doo", "Sealab 2021", "The Second Best Hospital in the Galaxy", 
      "Seth MacFarlane's Cavalcade of Cartoon Comedy", "The Shivering Truth", 
      "Shorties Watchin' Shorties", "The Simpsons", "Sit Down, Shut Up", "Slacker Cats", 
      "Smiling Friends", "Solar Opposites", "Son of Zorn", "Soul Quest Overdrive", 
      "South Park", "Space Ghost Coast to Coast", "Spaceballs: The Animated Series", 
      "Spongebob Squarepants", "Spy Groove", "Squidbillies", "Star Trek: Lower Decks", 
      "Starship Regulars", "Starveillance", "Station Zero", "Steven Universe", "Stone Quackers", 
      "Strange Planet", "Stressed Eric", "Stripperella", "Stroker & Hoop", "Sugar and Toys", 
      "SuperFuckers", "Superjail!", "SuperMansion", "SuperNews!", "Tarantula", "Teen Titans", 
      "Teenage Euthanasia", "Ten Year Old Tom", "Tender Touches", "This Just In!", 
      "Titan Maximum", "Tom and Jerry", "Tom Goes to the Mayor", "Tooning Out the News", 
      "Tripping the Rift", "TripTank", "Tuca & Bertie", "TV Funhouse", "Ugly Americans", 
      "Undergrads", "Undone", "Universal Basic Guys", "Unsupervised", "Velma", 
      "The Venture Bros.", "VH1 ILL-ustrated", "Wait Till Your Father Gets Home", 
      "Where My Dogs At?", "Where's Huddles?", "Wild Life", "Wonder Showzen", 
      "The Wrong Coast", "X-Men: The Animated Series", "The X-Presidents", 
      "Xavier: Renegade Angel", "The Xtacles", "YOLO", "You're Not a Monster", 
      "Young Love", "Zombie College"
    ]
  }
};

// Initialize user data
let userData = JSON.parse(localStorage.getItem('mediaTrackerData')) || {
  tv: {},
  movies: {},
  anime: {},
  cartoons: {}
};

// Current category
let currentCategory = 'tv';

// Check login status
let isLoggedIn = false;

// Function to load user data from server
function loadUserData() {
  console.log("Loading user data...");
  
  fetch('load_data.php')
    .then(response => response.json())
    .then(data => {
      console.log("Received user data:", data);
      
      if (data.success === false) {
        // Not logged in or no data, use localStorage
        userData = JSON.parse(localStorage.getItem('mediaTrackerData')) || {
          tv: {},
          movies: {},
          anime: {},
          cartoons: {}
        };
        isLoggedIn = false;
        
        console.log("Using localStorage data:", userData);
        
        // Show login message
        const userStatus = document.getElementById('user-status');
        userStatus.innerHTML = '<a href="/login.php" class="home-link">Login / Register</a>';
      } else {
        // User is logged in and has data
        userData = data;
        isLoggedIn = true;
        
        console.log("Using server data:", userData);
        
        // Add a logout button - Get username from session data
        const userStatus = document.getElementById('user-status');
        userStatus.innerHTML = `<span>Logged in as: ${data.username || 'User'}</span> <a href="/logout.php">Logout</a>`;
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
        anime: {},
        cartoons: {}
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
          notes: "" // Empty notes by default
        };
      }
    });
  });
}

// Function to populate the table
function populateTable(filterValue = 'all') {
  const tableBody = document.getElementById('showsTableBody');
  tableBody.innerHTML = '';
  
  // Update heading
  document.querySelector('h1').textContent = `${categories[currentCategory].title} Tracker`;
  
  // Update table headers
  const tableHeader = document.querySelector('#showsTable thead tr');
  tableHeader.innerHTML = ''; // Clear existing headers
  
  // Add standard headers
  tableHeader.innerHTML += '<th onclick="sortTable(0)">Title</th>';
  tableHeader.innerHTML += '<th onclick="sortTable(1)">Status</th>';
  tableHeader.innerHTML += '<th onclick="sortTable(2)">Rating</th>';
  tableHeader.innerHTML += '<th>Notes</th>';
  tableHeader.innerHTML += '<th>Share</th>';
  
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
    
    // Share button
    const shareCell = document.createElement('td');
    const shareButton = document.createElement('button');
    shareButton.className = 'btn btn-secondary';
    shareButton.textContent = 'Share';
    shareButton.dataset.item = item;
    shareButton.dataset.rating = userData[currentCategory][item].rating || '';
    shareButton.addEventListener('click', (e) => {
      const item = e.target.dataset.item;
      const rating = e.target.dataset.rating;
      openShareModal(item, rating);
    });
    shareCell.appendChild(shareButton);
    row.appendChild(shareCell);
    
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

// Function to open the share modal
function openShareModal(title, rating) {
  const modal = document.getElementById('shareModal');
  const titleText = document.getElementById('shareTitleText');
  const ratingText = document.getElementById('shareRatingText');
  const thoughtsInput = document.getElementById('shareThoughts');
  
  // Set values
  titleText.textContent = title;
  ratingText.textContent = rating || 'Not Rated';
  thoughtsInput.value = '';
  
  // Update character count
  document.getElementById('charCount').textContent = '0';
  
  // Show modal
  modal.style.display = 'flex';
  
  // Character count functionality
  thoughtsInput.addEventListener('input', function() {
    document.getElementById('charCount').textContent = this.value.length;
  });
  
  // Add event listeners for buttons
  document.getElementById('cancelShareBtn').onclick = function() {
    modal.style.display = 'none';
  };
  
  document.getElementById('confirmShareBtn').onclick = function() {
    shareContent(title, rating, thoughtsInput.value);
    modal.style.display = 'none';
  };
}

// Function to handle the share action
function shareContent(title, rating, thoughts) {
  if (!isLoggedIn) {
    alert('Please log in to share your ratings.');
    return;
  }
  
  // Prepare data to send
  const shareData = {
    category: currentCategory,
    title: title,
    rating: rating,
    thoughts: thoughts,
    timestamp: new Date().toISOString()
  };
  
  // Send to server
  fetch('/social/share_rating.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shareData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Your rating has been shared!');
    } else {
      alert('Error sharing rating: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error connecting to server. Please try again later.');
  });
}

// Close modal if clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('shareModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

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

// Fixed function to export CSV
function exportCSV() {
  // Start with the standard fields (without progress fields)
  let csvContent = "Title,Status,Rating,Notes\n";
  
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
    
    // Create row without progress fields
    let row = `${escapeCSV(item)},${statusText},${rating},${escapeCSV(notes)}\n`;
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
  
  const link = document.createElement('a');
  link.setAttribute('href', dataUri);
  link.setAttribute('download', exportName);
  link.click();
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