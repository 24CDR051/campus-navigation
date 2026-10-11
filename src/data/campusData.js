// Campus Navigator - Curated Demonstration Campus Dataset
// Clear Demonstration Campus: Apex Institute of Technology & Science (Demonstration Model)
// Coordinates positioned on an open collegiate campus footprint with OpenStreetMap tiles

export const CAMPUS_INFO = {
  name: "Apex University Campus",
  tagline: "Demonstration Campus Navigator",
  center: [37.4278, -122.1700],
  defaultZoom: 16,
  isDemo: true,
  announcement: "Demonstration Dataset • Verified coordinates on standard OpenStreetMap cartography. Built for college student navigation."
};

export const CATEGORIES = [
  { id: "all", name: "All Locations", icon: "Grid", count: 14, color: "#2563eb" },
  { id: "academic", name: "Academic & Departments", icon: "GraduationCap", count: 4, color: "#1d4ed8" },
  { id: "laboratories", name: "Laboratories & Research", icon: "FlaskConical", count: 3, color: "#0891b2" },
  { id: "library", name: "Library & Study", icon: "BookOpen", count: 1, color: "#7c3aed" },
  { id: "dining", name: "Canteen & Dining", icon: "Utensils", count: 2, color: "#ea580c" },
  { id: "classrooms", name: "Classrooms & Halls", icon: "Presentation", count: 2, color: "#0284c7" },
  { id: "sports", name: "Sports & Recreation", icon: "Trophy", count: 1, color: "#059669" },
  { id: "student-services", name: "Student Services", icon: "HeartHandshake", count: 2, color: "#db2777" },
  { id: "administration", name: "Administration", icon: "Building2", count: 1, color: "#475569" },
  { id: "housing", name: "Hostels & Housing", icon: "Home", count: 1, color: "#d97706" },
  { id: "gates", name: "Gates & Transit", icon: "Navigation", count: 2, color: "#4f46e5" }
];

export const AMENITIES_LIST = [
  "Wheelchair Accessible",
  "High-Speed Wi-Fi",
  "Restrooms",
  "Elevator",
  "Silent Study",
  "Printing & Scanning",
  "Cafe / Food",
  "Water Dispenser",
  "EV Charging",
  "Air Conditioned"
];

export const CAMPUS_LOCATIONS = [
  {
    id: "lib-01",
    name: "Dr. Vikram Sarabhai Central Library",
    code: "LIB-01",
    category: "library",
    categoryName: "Library & Study",
    coordinates: [37.4275, -122.1695],
    popular: true,
    rating: 4.9,
    description: "The primary academic resource center with over 180,000 volumes, 24/7 digital hub, quiet collaborative pods, thesis archives, and private discussion chambers.",
    shortDesc: "5-storey knowledge hub with quiet study spaces and digital archives",
    openHours: "08:00 AM - 11:00 PM (Daily)",
    openDays: "Mon - Sun",
    isOpenNow: true,
    floors: [
      { level: "Ground Floor", highlights: "Information Desk, Book Issue/Return Kiosks, Campus Coffee Bar, Printing Corner" },
      { level: "1st Floor", highlights: "Science & Technology Stack, Open Reading Hall (250 seats)" },
      { level: "2nd Floor", highlights: "Humanities & Social Sciences, Group Discussion Pods" },
      { level: "3rd Floor", highlights: "Strictly Silent Research Chamber, Scholar Cubicles" },
      { level: "4th Floor", highlights: "University Digital Archive & Special Rare Collections" }
    ],
    facilities: [
      "Wheelchair Accessible",
      "High-Speed Wi-Fi",
      "Silent Study",
      "Printing & Scanning",
      "Elevator",
      "Restrooms",
      "Water Dispenser",
      "Cafe / Food",
      "Air Conditioned"
    ],
    departments: [
      "University Library Services",
      "Digital Knowledge Repository",
      "Inter-library Loan Office"
    ],
    contact: {
      phone: "+1 (555) 234-5601",
      email: "library@apex-univ.edu",
      head: "Chief Librarian Dr. M. Sullivan"
    },
    accessibility: "Full step-free access via East and South ramps, braille tactile signage, wide elevators, and accessible restrooms on every floor.",
    studentTips: "Desk power outlets are most abundant on the 2nd and 3rd floors. Book individual study carrels 24h ahead during finals week."
  },
  {
    id: "cs-b",
    name: "Alan Turing Computer Science & AI Complex",
    code: "CS-B",
    category: "laboratories",
    categoryName: "Laboratories & Research",
    coordinates: [37.4300, -122.1730],
    popular: true,
    rating: 4.8,
    description: "State-of-the-art computational center housing the department of Computer Science, Autonomous Robotics Labs, High-Performance GPU clusters, and modern software studios.",
    shortDesc: "Computer science headquarters, robotics arena, and GPU labs",
    openHours: "07:30 AM - 10:00 PM (Mon-Sat)",
    openDays: "Mon - Sat",
    isOpenNow: true,
    floors: [
      { level: "Basement Level", highlights: "Robotics Testing Arena & Embedded Systems Workshop" },
      { level: "Ground Floor", highlights: "Main Atrium, Hackathon Lounge, Student Helpdesk, Lab CS-101" },
      { level: "1st Floor", highlights: "Artificial Intelligence Lab, Advanced Computer Vision Center" },
      { level: "2nd Floor", highlights: "Faculty Offices, Graduate Seminars, Cloud Computing Lab" },
      { level: "3rd Floor", highlights: "Cybersecurity Defense Lab, VR & Spatial Computing Sandbox" }
    ],
    facilities: [
      "High-Speed Wi-Fi",
      "Wheelchair Accessible",
      "Elevator",
      "Restrooms",
      "Water Dispenser",
      "Air Conditioned",
      "Printing & Scanning"
    ],
    departments: [
      "Department of Computer Science & Engineering",
      "Center for Artificial Intelligence Research",
      "Software Development Guild"
    ],
    contact: {
      phone: "+1 (555) 234-5602",
      email: "cs-dept@apex-univ.edu",
      head: "Chair: Prof. Elena Rostova"
    },
    accessibility: "Automated magnetic glass doors at primary entrance, elevator servicing all 4 levels, dedicated wheelchair desks in Lab 101.",
    studentTips: "The 24-hour coding lounge on the ground floor is accessible using your Student ID NFC tag after 8:00 PM."
  },
  {
    id: "admin-hall",
    name: "Apex Central Administration Building",
    code: "AD-01",
    category: "administration",
    categoryName: "Administration",
    coordinates: [37.4285, -122.1708],
    popular: true,
    rating: 4.6,
    description: "The administrative heart of the university including the Office of the Registrar, Bursar & Fee Clearance, Dean of Students, Admissions, and Visitor Welcome Center.",
    shortDesc: "Registrar, admissions, fee payments, and Chancellor's office",
    openHours: "08:30 AM - 05:00 PM (Mon-Fri)",
    openDays: "Mon - Fri",
    isOpenNow: true,
    floors: [
      { level: "Ground Floor", highlights: "Visitor Information Desk, Student ID Card Issuance, Admissions Window" },
      { level: "1st Floor", highlights: "Registrar Counter, Fee Bursar, International Student Office" },
      { level: "2nd Floor", highlights: "Dean of Academic Affairs, Dean of Student Life" },
      { level: "3rd Floor", highlights: "Vice-Chancellor's Secretariat & University Council Chamber" }
    ],
    facilities: [
      "Wheelchair Accessible",
      "Elevator",
      "Restrooms",
      "Water Dispenser",
      "Air Conditioned"
    ],
    departments: [
      "Office of the Registrar",
      "Admissions & Financial Aid",
      "Student Records & Transcripts",
      "Bursar & Accounting"
    ],
    contact: {
      phone: "+1 (555) 234-5600",
      email: "admin@apex-univ.edu",
      head: "Registrar: Dr. Kenneth Clark"
    },
    accessibility: "Grade-level entrance ramp with double wide doors, audio elevator announcements, dedicated accessible service counter at Window 1.",
    studentTips: "Peak queue hours are 11 AM - 1 PM. Use the Campus Navigator portal to check your queue ticket status before heading over."
  },
  {
    id: "food-court",
    name: "Central Dining Hall & Food Pavilion",
    code: "FOOD-C",
    category: "dining",
    categoryName: "Canteen & Dining",
    coordinates: [37.4262, -122.1692],
    popular: true,
    rating: 4.7,
    description: "Two-level dining complex offering multi-cuisine healthy meals, vegetarian/vegan stations, sandwich deli, fresh juices, and outdoor sun terrace seating.",
    shortDesc: "Multi-cuisine food court, coffee bar, and student meal hall",
    openHours: "07:30 AM - 10:00 PM (Daily)",
    openDays: "Mon - Sun",
    isOpenNow: true,
    floors: [
      { level: "Ground Floor", highlights: "University Meal Plan Buffet, Salad & Grain Bar, South Asian Counter" },
      { level: "1st Floor", highlights: "Artisan Coffee Barista, Bakery & Smoothie Station, Terrace Dining" }
    ],
    facilities: [
      "Cafe / Food",
      "High-Speed Wi-Fi",
      "Wheelchair Accessible",
      "Restrooms",
      "Water Dispenser",
      "Air Conditioned"
    ],
    departments: [
      "Campus Dining Services",
      "Student Nutrition Advisory"
    ],
    contact: {
      phone: "+1 (555) 234-5620",
      email: "dining@apex-univ.edu",
      head: "Dining Director Chef Marcus Vance"
    },
    accessibility: "Ramped patio entrances, wide food line pathways, braille menus available at customer desk.",
    studentTips: "Meal card taps get a 10% discount compared to credit cards. Breakfast specials are served until 10:30 AM."
  },
  {
    id: "lec-newton",
    name: "Newton Lecture Hall Complex",
    code: "LEC-N",
    category: "classrooms",
    categoryName: "Classrooms & Halls",
    coordinates: [37.4290, -122.1668],
    popular: true,
    rating: 4.5,
    description: "Primary classroom hub featuring four 300-seat amphitheatre auditoriums (N101-N104) and eight 80-seat tiered smart classrooms equipped with dual 4K laser projectors.",
    shortDesc: "Tiered auditoriums N101-N104 and multimedia smart lecture halls",
    openHours: "08:00 AM - 08:30 PM (Mon-Fri)",
    openDays: "Mon - Fri",
    isOpenNow: true,
    floors: [
      { level: "Ground Floor", highlights: "Auditoriums N-101 and N-102, Main Foyer, Water Station" },
      { level: "1st Floor", highlights: "Auditoriums N-103 and N-104, Faculty Prep Green Rooms" },
      { level: "2nd Floor", highlights: "Smart Seminar Rooms N-201 through N-208" }
    ],
    facilities: [
      "Wheelchair Accessible",
      "High-Speed Wi-Fi",
      "Elevator",
      "Restrooms",
      "Water Dispenser",
      "Air Conditioned"
    ],
    departments: [
      "Central Classroom Scheduling",
      "Audio-Visual Technology Support"
    ],
    contact: {
      phone: "+1 (555) 234-5630",
      email: "classrooms@apex-univ.edu",
      head: "AV Services Lead: Rachel Kim"
    },
    accessibility: "Dedicated wheelchair spaces with companion seating in all front-row and middle-tier lecture aisles.",
    studentTips: "Lost and found for misplaced notebooks and chargers is located right beside Room N-101."
  },
  {
    id: "sports-pavilion",
    name: "Olympic Sports Pavilion & Aquatic Center",
    code: "SPORTS-1",
    category: "sports",
    categoryName: "Sports & Recreation",
    coordinates: [37.4255, -122.1630],
    popular: true,
    rating: 4.9,
    description: "World-class recreation hub boasting an indoor 50-meter Olympic swimming pool, 3 basketball/volleyball courts, 6 badminton courts, full strength gym, and yoga studios.",
    shortDesc: "Gymnasium, 50m Olympic pool, basketball courts, and fitness studios",
    openHours: "06:00 AM - 09:30 PM (Daily)",
    openDays: "Mon - Sun",
    isOpenNow: true,
    floors: [
      { level: "Ground Floor", highlights: "Main Arena, Olympic Swimming Pool, Locker Rooms & Showers" },
      { level: "1st Floor", highlights: "Cardio & Free-Weights Fitness Suite, Spin Studio" },
      { level: "2nd Floor", highlights: "Indoor Running Track, Yoga & Pilates Studio" }
    ],
    facilities: [
      "Wheelchair Accessible",
      "Elevator",
      "Restrooms",
      "Water Dispenser",
      "Air Conditioned"
    ],
    departments: [
      "Department of Physical Education & Athletics",
      "Campus Recreation Guild"
    ],
    contact: {
      phone: "+1 (555) 234-5645",
      email: "rec-sports@apex-univ.edu",
      head: "Athletics Director: Coach Dave Owens"
    },
    accessibility: "Pool lift chair available for swimmers with mobility requirements; accessible locker room cubicles and showers.",
    studentTips: "Student gym access is free with active student ID. Locker padlocks can be borrowed from the equipment check desk."
  },
  {
    id: "sci-physics",
    name: "Sir C.V. Raman Physics & Nanotechnology Center",
    code: "SCI-P",
    category: "laboratories",
    categoryName: "Laboratories & Research",
    coordinates: [37.4298, -122.1748],
    popular: false,
    rating: 4.7,
    description: "Dedicated science facility housing advanced optics tables, laser physics laboratories, cryogenic experimentation chambers, and class-100 cleanrooms.",
    shortDesc: "Advanced optics, laser physics, and material science laboratories",
    openHours: "08:30 AM - 06:30 PM (Mon-Fri)",
    openDays: "Mon - Fri",
    isOpenNow: true,
    floors: [
      { level: "Basement Level", highlights: "Vibration-Isolated Optical Tables & Laser Cleanrooms" },
      { level: "Ground Floor", highlights: "Undergraduate Physics Labs P-01 and P-02, Preparation Room" },
      { level: "1st Floor", highlights: "Solid State Physics, Condensed Matter Research" },
      { level: "2nd Floor", highlights: "Faculty Research Offices & Post-Doc Study Space" }
    ],
    facilities: [
      "High-Speed Wi-Fi",
      "Wheelchair Accessible",
      "Elevator",
      "Restrooms",
      "Water Dispenser",
      "Air Conditioned"
    ],
    departments: [
      "Department of Applied Physics",
      "Center for Quantum & Nano Materials"
    ],
    contact: {
      phone: "+1 (555) 234-5650",
      email: "physics@apex-univ.edu",
      head: "Chair: Dr. Priya Sengupta"
    },
    accessibility: "Ground ramp and heavy freight elevator with safety sensor stops.",
    studentTips: "Safety goggles and lab coats are mandatory beyond Room P-05. Lockers are situated outside every laboratory."
  },
  {
    id: "stu-wellness",
    name: "Student Union & Wellness Medical Center",
    code: "STU-WEL",
    category: "student-services",
    categoryName: "Student Services",
    coordinates: [37.4250, -122.1712],
    popular: true,
    rating: 4.8,
    description: "Comprehensive student support center providing outpatient medical consultations, 24/7 campus nurse triage, psychological counselling, student clubs headquarters, and international student advisory.",
    shortDesc: "Campus clinic, pharmacy, mental health counselling, and student clubs",
    openHours: "24/7 Nurse Triage • Clinic 08:30 AM - 06:00 PM",
    openDays: "Mon - Sun",
    isOpenNow: true,
    floors: [
      { level: "Ground Floor", highlights: "Medical Triage, Urgent First Aid, Campus Pharmacy, Rest Ward" },
      { level: "1st Floor", highlights: "Mental Health Counselling Suite, Meditation & Mindfulness Quiet Room" },
      { level: "2nd Floor", highlights: "Student Government Association (SGA) & Student Club Chambers" }
    ],
    facilities: [
      "Wheelchair Accessible",
      "High-Speed Wi-Fi",
      "Elevator",
      "Restrooms",
      "Water Dispenser",
      "Air Conditioned"
    ],
    departments: [
      "University Health & Wellness Service",
      "Counseling & Psychological Center",
      "Student Union Council"
    ],
    contact: {
      phone: "+1 (555) 234-5699",
      email: "wellness@apex-univ.edu",
      head: "Medical Director: Dr. Aris Thorne"
    },
    accessibility: "Ambulance ramp, low examination beds, barrier-free private consultation rooms.",
    studentTips: "Walk-in appointments are welcome for acute needs. Routine mental wellness sessions can be booked online confidentially."
  },
  {
    id: "gate-north",
    name: "North Campus Gateway & Transit Hub",
    code: "GATE-N",
    category: "gates",
    categoryName: "Gates & Transit",
    coordinates: [37.4320, -122.1690],
    popular: true,
    rating: 4.8,
    description: "The primary north entrance connecting to municipal transit lines, inter-campus shuttle stops, electric bike docking station, and security greeting station.",
    shortDesc: "Main public transit hub, shuttle terminal, and bicycle sharing",
    openHours: "Open 24/7",
    openDays: "Mon - Sun",
    isOpenNow: true,
    floors: [
      { level: "Street Level", highlights: "Bus Bays 1-4, Shuttle Pick-up, Bike Docking, 24h Guard Kiosk" }
    ],
    facilities: [
      "Wheelchair Accessible",
      "EV Charging",
      "High-Speed Wi-Fi",
      "Restrooms"
    ],
    departments: [
      "Campus Safety & Transportation Office",
      "Transit Services"
    ],
    contact: {
      phone: "+1 (555) 234-5670",
      email: "transit@apex-univ.edu",
      head: "Transit Coordinator: Greg Henderson"
    },
    accessibility: "Level street crossings with tactile blister paving and audible pedestrian signals.",
    studentTips: "Campus shuttle runs every 10 minutes from Bay 2 during class hours and is complimentary for all campus cardholders."
  },
  {
    id: "gate-south",
    name: "South Campus Gate & Visitor Parking",
    code: "GATE-S",
    category: "gates",
    categoryName: "Gates & Transit",
    coordinates: [37.4240, -122.1690],
    popular: false,
    rating: 4.6,
    description: "Southern vehicle gateway with 400-space multi-tier visitor parking garage, EV rapid chargers, rideshare pick-up shelter, and visitor day-pass checkpoint.",
    shortDesc: "Visitor parking structure, EV chargers, and south security gate",
    openHours: "Open 24/7",
    openDays: "Mon - Sun",
    isOpenNow: true,
    floors: [
      { level: "Level 1-3", highlights: "Student & Visitor Permit Parking, 16 EV Charging Stalls" }
    ],
    facilities: [
      "Wheelchair Accessible",
      "EV Charging",
      "Restrooms",
      "Elevator"
    ],
    departments: [
      "Parking & Commuter Services"
    ],
    contact: {
      phone: "+1 (555) 234-5671",
      email: "parking@apex-univ.edu",
      head: "Parking Officer: Sarah Jenkins"
    },
    accessibility: "Dedicated accessible parking spaces next to garage elevators and campus exit pathway.",
    studentTips: "Visitors can register parking in advance online to receive a barcode discount."
  },
  {
    id: "math-aryabhata",
    name: "Aryabhata Mathematics & Data Science Hall",
    code: "MATH-A",
    category: "academic",
    categoryName: "Academic & Departments",
    coordinates: [37.4292, -122.1685],
    popular: false,
    rating: 4.7,
    description: "Home of pure mathematics, statistics, data analytics studios, collaborative whiteboard labs, and computational modeling suites.",
    shortDesc: "Mathematics department, statistics labs, and whiteboard lounges",
    openHours: "08:00 AM - 07:30 PM (Mon-Fri)",
    openDays: "Mon - Fri",
    isOpenNow: true,
    floors: [
      { level: "Ground Floor", highlights: "Math Help Center (peer tutoring), Statistics Lab M-102" },
      { level: "1st Floor", highlights: "Data Science Visualization Hub, Seminar Room A" },
      { level: "2nd Floor", highlights: "Pure Mathematics Faculty Suites & Reading Room" }
    ],
    facilities: [
      "High-Speed Wi-Fi",
      "Wheelchair Accessible",
      "Elevator",
      "Restrooms",
      "Water Dispenser",
      "Air Conditioned"
    ],
    departments: [
      "Department of Mathematics",
      "Division of Statistical Sciences"
    ],
    contact: {
      phone: "+1 (555) 234-5660",
      email: "math@apex-univ.edu",
      head: "Prof. Ananya Sen"
    },
    accessibility: "Level entry from courtyard, braille floor indicators, elevator to all floors.",
    studentTips: "Free drop-in calculus and statistics peer tutoring is offered Monday through Thursday 1 PM - 5 PM on the ground floor."
  },
  {
    id: "eng-visvesvaraya",
    name: "M. Visvesvaraya Mechanical & Robotics Workshop",
    code: "ENG-W",
    category: "laboratories",
    categoryName: "Laboratories & Research",
    coordinates: [37.4312, -122.1715],
    popular: false,
    rating: 4.6,
    description: "Heavy engineering high-bay workspace equipped with 5-axis CNC mills, waterjet cutters, industrial 3D printing beds, wind tunnel, and automotive racing garage.",
    shortDesc: "Industrial prototyping workshop, 3D printing, and CNC machinery",
    openHours: "08:30 AM - 06:00 PM (Mon-Sat)",
    openDays: "Mon - Sat",
    isOpenNow: true,
    floors: [
      { level: "Ground Bay", highlights: "Machining Floor, High-Bay Welding, CNC Center, Formula SAE Garage" },
      { level: "Mezzanine", highlights: "CAD/CAM Workstation Lab, Rapid 3D Prototyping Suite" }
    ],
    facilities: [
      "Wheelchair Accessible",
      "Restrooms",
      "Water Dispenser",
      "Air Conditioned"
    ],
    departments: [
      "Department of Mechanical Engineering",
      "Center for Advanced Manufacturing"
    ],
    contact: {
      phone: "+1 (555) 234-5665",
      email: "mech@apex-univ.edu",
      head: "Workshop Superintendent: Carl Bradley"
    },
    accessibility: "Full ground roll-in access through industrial rolling doors and accessible observation deck.",
    studentTips: "Safety induction certification is required before operating equipment. Free safety workshops run every Tuesday."
  },
  {
    id: "dorms-oak",
    name: "Oak Grove Residential College & Dorms",
    code: "HOSTEL-A",
    category: "housing",
    categoryName: "Hostels & Housing",
    coordinates: [37.4235, -122.1725],
    popular: true,
    rating: 4.8,
    description: "Modern on-campus student housing community with comfortable single and double suites, communal kitchens, laundry lounges, music practice room, and quiet study lofts.",
    shortDesc: "Undergraduate residential community, communal kitchens, and lounges",
    openHours: "Residents: 24/7 • Guests: 09:00 AM - 09:00 PM",
    openDays: "Mon - Sun",
    isOpenNow: true,
    floors: [
      { level: "Ground Floor", highlights: "Residential Reception, Package Locker Hub, Main Lounge, Laundry" },
      { level: "Floors 1-4", highlights: "Student Residence Wings, Floor Study Lounges, Kitchenettes" }
    ],
    facilities: [
      "High-Speed Wi-Fi",
      "Wheelchair Accessible",
      "Elevator",
      "Restrooms",
      "Silent Study",
      "Air Conditioned"
    ],
    departments: [
      "Office of Residential Life & Housing",
      "Community Advising Team"
    ],
    contact: {
      phone: "+1 (555) 234-5680",
      email: "reslife@apex-univ.edu",
      head: "Resident Dean: Maria Santos"
    },
    accessibility: "ADA compliant student suites with automatic doors, barrier-free showers, and strobe fire alarms.",
    studentTips: "Quiet hours begin at 10 PM on weekdays. Automated parcel lockers can be accessed 24/7 with QR codes."
  },
  {
    id: "plaza-amphitheatre",
    name: "Central Quadrangle & Sun Amphitheatre",
    code: "PLAZA-01",
    category: "classrooms",
    categoryName: "Classrooms & Halls",
    coordinates: [37.4270, -122.1710],
    popular: true,
    rating: 4.9,
    description: "The scenic heart of the campus lawn with an open-air stone amphitheatre, shaded solar benches, seasonal farmer markets, student club rallies, and live cultural concerts.",
    shortDesc: "Open-air gathering hub, student festivals, and outdoor study lawns",
    openHours: "Open 24/7",
    openDays: "Mon - Sun",
    isOpenNow: true,
    floors: [
      { level: "Ground Level", highlights: "Open Stone Stage, Tiered Grass Seating, Solar Charging Station" }
    ],
    facilities: [
      "High-Speed Wi-Fi",
      "Wheelchair Accessible"
    ],
    departments: [
      "Campus Events & Public Programs"
    ],
    contact: {
      phone: "+1 (555) 234-5690",
      email: "events@apex-univ.edu",
      head: "Events Director: Liam O'Connor"
    },
    accessibility: "Smooth gently-sloping paved ramp encircling the entire lawn and amphitheatre stage.",
    studentTips: "Campus Wi-Fi covers the entire lawn. Excellent spot for outdoor group study between classes."
  }
];

export const EMERGENCY_CONTACTS = [
  {
    title: "Campus Police & Emergency",
    number: "911 / (555) 234-9999",
    description: "Immediate safety, fire or medical emergency response 24/7",
    color: "#ef4444",
    badge: "24/7 Immediate"
  },
  {
    title: "Campus Security Escort",
    number: "(555) 234-SAFE",
    description: "Free dusk-to-dawn walking escort anywhere on campus",
    color: "#2563eb",
    badge: "Available 24/7"
  },
  {
    title: "Health Clinic Triage",
    number: "(555) 234-5699",
    description: "Student medical advice & urgent clinic walk-ins",
    color: "#059669",
    badge: "Medical Center"
  },
  {
    title: "IT Helpdesk & Card Access",
    number: "(555) 234-HELP",
    description: "Student portal, password resets & building NFC keycards",
    color: "#7c3aed",
    badge: "8 AM - 8 PM"
  }
];
