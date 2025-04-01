// Data storage for different categories
const categories = {
  tv: {
    title: "TV Shows",
    items: [
      "20/20", "30 for 30", "60 Minutes", "90 Day Fiancé", "9-1-1", "A Man on the Inside", "Abbott Elementary", 
      "ABC World News Tonight", "Acapulco", "Accused", "AEW Battle of the Belts", "AEW Collision", "AEW Dynamite", 
      "Ahsoka", "AgDay", "Alert: Missing Persons Unit", "Alex Witt Reports", "All American", 
      "All Elite Wrestling: Dynamite", "All In with Chris Hayes", "All the Queen's Men", "Alma's Way", "Amanpour", 
      "Amanpour & Company", "The Amazing Race", "America in Black", "America Reports", "America This Morning", 
      "America's Black Forum", "America's Court with Judge Ross", "America's Funniest Home Videos", 
      "America's Game: The Super Bowl Champions", "America's Got Talent", "America's Heartland", 
      "America's Morning Headquarters", "America's Most Wanted", "America's Newsroom", "America's Test Kitchen", 
      "American Crime Story", "American Experience", "American Greed", "American Horror Story", 
      "American Horror Stories", "American Idol", "American Masters", "American Ninja Warrior", 
      "American Pickers", "American Religious Townhall", "American Sports Story", "Ancient Aliens", 
      "Anderson Cooper 360°", "And Just Like That...", "Animal Control", "Antiques Roadshow", 
      "Aquí y Ahora", "The Ark", "Ariel", "Austin City Limits", 
      "AXS TV Fights", "The Bachelor", "The Bachelorette", "Bachelor in Paradise", "Back of the Shop", 
      "Baddies", "Bad Monkey", "The Baldwins", "Banfield", "Bar Rescue", "Barmageddon", "Barney's World", 
      "Barnwood Builders", "Baseball Night in America", "Baseball Tonight", 
      "Batpugs", "The Baxters", "BBQ Brawl", "BBQ USA", "BBC World News America", "Bea's Block", 
      "The Beat with Ari Melber", "The Bear", "Beast Games", "Beauty in Black", "Beef", "Behind the Music", 
      "Below Deck", "Below Deck Mediterranean", "Below Deck Sailing Yacht", "Bering Sea Gold", "Better Call Saul", 
      "Beyond the Gates", "The Big Bakeover", "Big Brother", "Big City Greens", "The Big Weekend Show", 
      "Biography: WWE Legends", "Big Noon Kickoff", "Blue Eye Samurai", "Blue's Clues & You!", "BMF", 
      "The Bold and the Beautiful", "Bodkin", "Book TV", "Botched", "The Boulet Brothers' Dragula", 
      "Breaking Bad", "Bridgerton", "Brilliant Minds", "Bugs Bunny Builders", "Casos de Familia", "Cash Cab", 
      "Castlevania: Nocturne", "Catfish: The TV Show", "CBS Evening News", "CBS Morning News", 
      "CBS Mornings", "CBS News Roundup", "CBS News Sunday Morning", "CBS Saturday Morning", "CBS Sports Spectacular", 
      "Celebrity Family Feud", "Celebrity Jeopardy!", "Celebrity Page", "The Challenge", "The Challenge: All Stars", 
      "Chef's Table", "The Chi", "Chicago Fire", "Chicago Med", "Chicago P.D.", "Chibiverse", 
      "Chip 'n' Dale: Park Life", "Chopped", "Chrissy & Dave Dine Out", "Churchy", "Citadel", 
      "Claim to Fame", "Clean Slate", "The Cleaning Lady", "Closing Bell", "Closer to Truth", 
      "CMT Crossroads", "CNN Business Traveller", "CNN News Central", "CNN Newsroom", "CNN NewsNight", "CNN This Morning", 
      "CNN This Morning Weekend", "Coach Prime", "Cold Justice", "College Basketball on CBS", 
      "College Basketball on ESPN", "College Basketball on USA", "College Football on CBS Sports", "College Football on NBC Sports", 
      "College Football Scoreboard", "College GameDay, basketball version", "College GameDay, football version", 
      "College Hill: Celebrity Edition", "Conan O'Brien Must Go", "Condor", "Contacto Deportivo", 
      "Cops", "Creature Commandos", "The Creep Tapes", 
      "Crime Nation", "Crime Scene Kitchen", "Criminal Minds", "Cross", "Cruel Intentions", 
      "The Curse", "The Curse of Oak Island", "Curb Appeal", "Curb Your Enthusiasm", 
      "Cyberchase", "Dancing with the Stars", "Daniel Tiger's Neighborhood", "Daredevil: Born Again", 
      "Dark Matter", "Dark Winds", "Dateline NBC", "The Daytripper", "Days of Our Lives", "Deadliest Catch", 
      "Deal or No Deal Island", "Death Note", "Deli Boys", "Delicious Miss Brown", "Denise Richards & Her Wild Things", 
      "¡Despierta América!", "Dinner and a Movie", "The Diplomat", "Dish Nation", "Disney+ Marvel series", "Divorce Court", 
      "Doc", "Doctor Odyssey", "Don't Forget the Lyrics!", "Donkey Hodie", "Dora", 
      "Dr. Phil Primetime", "The Drew Barrymore Show", "Duck Family Treasure", 
      "Dune: Prophecy", "E! News", "Early Today", "El Gordo y la Flaca", "Elinor Wonders Why", "Elsbeth", "Emily in Paris", 
      "The Emperor of Ocean Park", "The Equalizer", "Erin Burnett OutFront", "English Teacher", "Enjoying Everyday Life", 
      "Entertainment Tonight", "Entertainers with Byron Allen", "ESPN Bet Live", "ESPN College Basketball", 
      "ESPN College Football", "ESPN College Football on ABC", "ESPN Major League Baseball", "ESPN Megacast", "E:60", 
      "Euphoria", "Evil Lives Here", "Exatlón Estados Unidos", "Expedition Unknown", 
      "Extracted", "Extra", "Extreme Makeover: Home Edition", "Face the Nation", 
      "Fallout", "The Family Business", "Family Feud", "Fantasmas", 
      "Fargo", "Farmer Wants a Wife", "Fast Money", "Fatal Attraction", 
      "FBI", "FBI True", "Fear Thy Neighbor", "Feud", 
      "Finding Your Roots", "The First 48", "First Take", "First Things First", 
      "Firing Line", "The Five", "The Floor", "Food Network Star", "Football Night in America", "For All Mankind", 
      "Formula 1: Drive to Survive", "Forged in Fire", "Forensic Files II", "The Food That Built America", "Found", 
      "Foundation", "Fox & Friends", "Fox & Friends First", "Fox College Football", "Fox College Hoops", 
      "Fox News @ Night", "Fox News Live", "Fox News Saturday Night", "Fox News Sunday", "Fox NFL Kickoff", 
      "Fox NFL Sunday", "Fox Report", "Fox Saturday Baseball", "Friday Night Baseball", 
      "From", "Frontline", "FUBAR", "Full Measure with Sharyl Attkisson", "Full Swing", "Funny You Should Ask", 
      "Gabby's Dollhouse", "Game of Thrones", "GMA3: What You Need To Know", 
      "General Hospital", "Genius", "Gen V", "Get Up!", "Ghosts", "Ghost Adventures", "Ghost Hunters", 
      "The Gilded Age", "Ginny & Georgia", "Girl Meets Farm", "The Glenn Beck Program", 
      "Godfather of Harlem", "Going Dutch", "The Golden Bachelor", 
      "The Golden Bachelorette", "Golf Central", "Golf Channel on NBC", "Golf on ESPN", 
      "Golf on Fox Sports", "Golf on USA", "Good Cop/Bad Cop", "The Good Doctor", "Good Morning America", 
      "Good Morning Football", "Good Omens", 
      "Gordon Ramsay's Food Stars", "Gordon Ramsay: Uncharted", 
      "Grand Cayman: Secrets in Paradise", "Graveyard Carz", "The Great American Baking Show", "The Great Christmas Light Fight", 
      "The Great Food Truck Race", "Great Performances", 
      "The Greatest AtHome Videos", "Grey's Anatomy", "Gremlins: Secrets of the Mogwai", 
      "Grosse Pointe Garden Society", "Grotesquerie", "Growing Up Hip Hop", "Gutfeld!", "Guy's Grocery Games", 
      "Hallmark Hall of Fame", "Halloween Baking Championship", "Halloween Wars", "Hamster & Gretel", "Hannity", 
      "Happy Face", "Happy's Place", "Hard Knocks", 
      "Hardwood Classics", "Hart to Heart", 
      "Have I Got News for You", 
      "Hell's Kitchen", "High Hopes", "High Potential", 
      "Hoarders", "Holiday Baking Championship", "Hollywood Houselift with Jeff Lewis", 
      "Hollywood Squares", "Home Town", "Hostage Rescue", "Hot Bench", 
      "The Hot Ones", "Hot Stove", "Hot Wheels Let's Race", "House Hunters", "House of the Dragon", 
      "House of Villains", "How the Universe Works", "Hoy Día", 
      "The Hunting Party", "I Can See Your Voice", "Impact!", 
      "Impractical Jokers", "In Depth", "Independent Lens", "The Ingraham Angle", "Inside Edition", 
      "Inside Politics", "Inside the NBA", "Inside the NFL", "Inside with Jen Psaki", "Intentional Talk", 
      "Interior Chinatown", "Intervention", "Interview with the Vampire", "Invasion", "Invincible", 
      "Invincible Fight Girl", "The Irrational", "Is It Cake?", "It's Always Sunny in Philadelphia", "It's Florida, Man",
      "Jane", "The Jennifer Hudson Show", "Jentry Chau vs. The Underworld", "Jeopardy!", "Jeopardy! Masters", 
      "Jersey Shore: Family Vacation", "Jerrod Carmichael Reality Show", "Jesse Watters Primetime", 
      "Jimmy Kimmel Live!", "The Joe Schmo Show", 
      "Joseline's Cabaret", "Journal Editorial Report", "Judy Justice", "Jurassic World: Chaos Theory", 
      "Justice for All with Judge Cristina Perez", "Judge Steve Harvey", "Karamo", "The Kardashians", 
      "Kids Baking Championship", "Kiff", "The Kelly Clarkson Show", "Kindergarten: The Musical", 
      "Kitchen Nightmares", 
      "La casa de los famosos", "Laid", "The Last Drive-in with Joe Bob Briggs", "The Last of Us", "The Last Thing He Told Me", 
      "Laura Coates Live", "Launchpad", "Law & Order", "Law & Order: Organized Crime", "Law & Order: Special Victims Unit", 
      "The Lead with Jake Tapper", 
      "Let's Make a Deal", "Leverage: Redemption", 
      "Life Below Zero", "Life, Liberty & Levin", 
      "Lingo", 
      "Little People, Big World", "Live with...", 
      "Loot", "Lopez vs Lopez", 
      "The Lord of the Rings: The Rings of Power", "Los 50", "The Loud House", "Love & Hip Hop: Atlanta", 
      "Love & Hip Hop: Miami", "Love After Lockup", "Love Is Blind", "Love Island", 
      "Love on the Spectrum", "Lovers and Liars", 
      "Lyla in the Loop", 
      "Mad Money", "Made in Hollywood", 
      "Maine Cabin Masters", "Major League Baseball Game of the Week", 
      "Major League Baseball on Fox", "Major League Baseball on TBS", "Mama June: From Not to Hot", "The Mandalorian", 
      "Manningcast", "Married at First Sight", "Married to Medicine", "Marvel Studios: Assembled", 
      "The Masked Singer", "MasterChef", 
      "MasterChef Junior", "Masters of Illusion", "Masterpiece", 
      "Matter of Fact with Soledad O'Brien", "Matlock", "Max & the Midknights", "Mayor of Kingstown", 
      "Mayfair Witches", "Media Buzz", "Megamind Rules!", "Meet the Press", 
      "Mid-Century Modern", "Mickey Mouse Funhouse", 
      "MILF Manor", "Million Dollar Listing Los Angeles", "Mira quién baila", 
      "Miss Pat Settles It", "Missing", 
      "MLB Network Showcase", "MLB Sunday Leadoff", "MLB Tonight", 
      "MLS on Fox", "MobLand", "The Mole", "Molly of Denali", 
      "Monday Night Countdown", "Monday Night Football", 
      "Monarch: Legacy of Monsters", "Monsters at Work", 
      "Moonshiners", 
      "Morning Joe", "The Morning Show", "MotorWeek", 
      "Mountain Men", "Mr. & Mrs. Smith", 
      "Mr. Throwback", 
      "The Ms. Pat Show", "MSNBC Reports", "MTV Unplugged", 
      "My 600-lb Life", "My Adventures with Superman", "My Big Fat Fabulous Life", "My Life with the Walter Boys", 
      "My Lottery Dream Home", "My Next Guest Needs No Introduction with David Letterman", "Mystery Science Theater 3000", 
      "Mysteries Decoded", "Mythic Quest", "NASCAR on Fox", "NASCAR on NBC", "NASCAR on The CW", "NASCAR on USA", 
      "NASCAR RaceDay", "Nailed It!", "Naked and Afraid", "Naked and Afraid XL", "Name That Tune", 
      "The National Desk", "Nature", "NBA Action", "NBA Countdown", "NBA Gametime Live", "NBA on ABC", "NBA on ESPN", 
      "NBA Today", "NBC News Daily", "NBC Nightly News", "NBC Sunday Night Football", "NCAA March Madness", 
      "NCIS", "NCIS: Origins", 
      "The New Look", "The New York Times Presents", 
      "NewsNation Prime", "Next Level Chef", "NFL Live", "NFL Matchup", "NFL on CBS", "NFL on Fox", "NFL on NBC", 
      "NFL on Nickelodeon", "NFL on Prime Video", "NFL Primetime", "The NFL Today", "NFL Slimetime", "NFL Top 100", 
      "NHL on ABC", "NHL on ESPN", "NHL on TNT", "NHL Tonight", "Nick Cannon Presents: Wild 'N Out", "Nick News", 
      "Night Court", "Nightline", "Nine Bodies in a Mexican Morgue", "Nine Perfect Strangers", "No Good Deed", 
      "Nobody Wants This", "Notre Dame Football on NBC", "Noticias Telemundo", "Noticiero Univision", "Nova", 
      "Nuestra Belleza Latina", 
      "Odd Squad", "Off Base", 
      "On Call", 
      "One Nation with Brian Kilmeade", "The 1% Club", "100 Days to Indy", "100 Foot Wave", "1000-lb Sisters", "On Patrol: Live", 
      "One Piece", "On the Case with Paula Zahn", "Only Murders in the Building", "The Open Mind", "Outlast", 
      "OutDaughtered", 
      "The Oval", "Outnumbered", 
      "Owning Manhattan", "Pachinko", "Palm Royale", "PAW Patrol", "Paradise", 
      "Pardon the Interruption", "Paris in Love", 
      "Password", "The Patrick Star Show", "Patti Stanger: The Matchmaker", 
      "P-Valley", "Pawn Stars", "PBA on Fox", "PBS NewsHour", "Peacemaker", "Penelope", "Penn & Teller: Fool Us", 
      "Perfect Match", "Percy Jackson and the Olympians", "PGA Tour on CBS", 
      "The Pioneer Woman", "Pinkalicious & Peterrific", "The Pit", 
      "Platonic", 
      "Poker Face", "Police 24/7", "PoliticsNation with Al Sharpton", "Poppa's House", 
      "Power Book III: Raising Kanan", "Power Lunch", "POV", "Praise", 
      "Premier Boxing Champions", 
      "Premier League on NBC", "Press Your Luck", "Presumed Innocent", "The Price Is Right", "Primer Impacto", 
      "Primal", "Primos", 
      "Princess Power", "Project Runway", "The Proud Family: Louder and Prouder", 
      "Puppy Bowl", "Pupstruction", "Pyramid", "Q&A", 
      "Queer Eye", "Quick Pitch", "The Quiz with Balls",
      "The Rachel Maddow Show", "Raid the Cage", "Reacher", "The Ready Room", "The Real", "The Real CSI: Miami", 
      "The Real Housewives of Atlanta", "The Real Housewives of Beverly Hills", "The Real Housewives of Dubai", 
      "The Real Housewives of Miami", "The Real Housewives of New Jersey", "The Real Housewives of New York City", 
      "The Real Housewives of Orange County", "The Real Housewives of Potomac", "The Real Housewives of Salt Lake City", 
      "The Real Housewives Ultimate Girls Trip", "Real Time with Bill Maher", "Reasonable Doubt", 
      "The Rehearsal", 
      "Resident Alien", "Rescue: HI-Surf", "The Residence", 
      "The Reluctant Traveler", 
      "Rick Steves' Europe", 
      "Ridiculousness", "Rhythm + Flow", 
      "Rock Paper Scissors", "The Rookie", 
      "Royal Rules of Ohio", "Running Point", "Running Wild with Bear Grylls", "RuPaul's Drag Race", 
      "RuPaul's Drag Race All Stars", "RuPaul's Drag Race: Untucked", "Ruthless", 
      "Sanctuary: A Witch's Tale", 
      "Saturday Night Football", "Saturday Night Live", 
      "Say Yes to the Dress", 
      "Scam Goddess", "Scare Tactics", "Scrabble", "School Spirits", 
      "Secrets of the Dead", 
      "Secret Celebrity Renovation", "Secret Level", "The Secret Lives of Mormon Wives", 
      "The Secret of Skinwalker Ranch", "SEC Nation", 
      "Selling Sunset", "Selling the City", "Selling the OC", "Sesame Street", 
      "Severance", "Shaqtin' a Fool", "Shark Tank", 
      "Sherri", "Shifting Gears", "Shōgun", 
      "Shrinking", "The Situation Room with Wolf Blitzer", "Silo", "Sister Wives", 
      "Sistas", "Sit and Be Fit", "Snapped", 
      "Snapped: Killer Couples", "Soccer on Fox Sports", "Somebody Feed Phil", 
      "Southern Charm", "Southern Hospitality", 
      "Special Forces: World's Toughest Test", 
      "Special Ops: Lioness", "Special Report", "Speak for Yourself with Cowherd & Whitlock", "Split Second", 
      "The Spiderwick Chronicles", "Spidey and His Amazing Friends", 
      "Squawk Box", "Squawk on the Street", "St. Denis Medical", "Star Gazers", 
      "Star Trek: Strange New Worlds", "Star Wars: Skeleton Crew", "Star Wars: Visions", "Star Wars: Young Jedi Adventures", 
      "State of the Union with Jake Tapper", "The Steve Wilkos Show", 
      "The Sticky", "The Story with Martha MacCallum", "Storage Wars", 
      "The Studio", "StuGo", "Stupid Pet Tricks", 
      "Sugar", "Suits LA", "Summer House", "Summer House: Martha's Vineyard", "The Summit", 
      "Sunday Morning Futures", "Sunday NFL Countdown", "Sunday Night Baseball", "Sunday Night in America with Trey Gowdy", 
      "Super Pumped", "SuperKitties", "Supermarket Stakeout", 
      "Surface", "The Surreal Life", "Survival of the Thickest", "Survivor", "Swamp People", "Sweet Magnolias", "Tales of the Jedi", 
      "Tales of the Teenage Mutant Ninja Turtles", "Tamron Hall", "Ted", "Ted Lasso", "Teen Mom: Family Reunion", 
      "Teen Mom: The Next Chapter", "Tell Me Lies", 
      "Temptation Island", "The Terminal List", "The Terror", 
      "They Call It Late Night with Jason Kelce", "This Old House", "This Week", "Thomas & Friends: All Engines Go", 
      "Thoroughbred Racing on Fox Sports", "Thoroughbred Racing on NBC", "Those About to Die", "The Tiny Chef Show", 
      "Tic-Tac-Dough", "Tires", "TMZ Investigates", "TMZ on TV", "Today", "Today with Hoda & Jenna", 
      "The Tonight Show", "Tomb Raider: The Legend of Lara Croft", "Toon In with Me", 
      "Top Chef", "Top Chef VIP", "Totally Funny Animals", "Totally Funny Kids", 
      "The Toys That Made Us", "Tournament of Champions", "The Tourist", "To the Contrary", "Tracker", "The Traitors", 
      "Transformers: EarthSpark", "Tribunal Justice", "Trivial Pursuit", 
      "The Trust: A Game of Greed", "Tulsa King", "Twin Love", "Twilight of the Gods", 
      "Twisted Metal", "Tyler Perry's Assisted Living", "Tyler Perry's House of Payne", "Tyler Perry's Young Dylan", 
      "The Ultimatum: Marry or Move On", "Unsung", 
      "Unsolved Mysteries", "The UnXplained", "U.S. Farm Report", "Vanderpump Rules", "Varney & Co.", 
      "The Valley", "Velshi", "The View", "The Vince Staples Show", 
      "Virgin River", "The Walking Dead: Daryl Dixon", "The Walking Dead: Dead City", 
      "The Wall", "Washington Journal", "Washington Week", "Watch What Happens Live with Andy Cohen", "The Watcher", 
      "Watson", "Way Too Early with Jonathan Lemire", "We Are Family", "We Baby Bears", "Weakest Link", 
      "The Wheel", "The Wheel of Time", "Welcome to Wrexham", "The West Coast Hustle", "What on Earth?", 
      "What Would You Do?", "When Calls the Heart", "Wheel of Fortune", 
      "Whose Line Is It Anyway?", "The White Lotus", "Who Wants to Be a Millionaire", "Will Trent", "Wild Kingdom", 
      "Wild Kratts", "With Love, Meghan", "Wizards Beyond Waverly Place", "WNBA on ESPN", "WondLa", 
      "Work It Out Wombats!", "World News Now", "World's Funniest Animals", "Worldwide Exchange", 
      "Worst Cooks in America", "WWE Main Event", "WWE NXT", "WWE Raw", "WWE Rivals", 
      "WWE SmackDown", "WWE's Most Wanted Treasures", "Xavier Riddle and the Secret Museum", "X-Men '97", 
      "Your Friendly Neighborhood Spider-Man", "Zatima", "Zombies: The Re-Animated Series"
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
    rating: rating || null, // Ensure rating is null if empty
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