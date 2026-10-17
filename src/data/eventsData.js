export const CATEGORIES = [
  { id: 'all', label: 'All Operations' },
  { id: 'esports', label: 'Esports Arena' },
  { id: 'btech', label: 'B.Tech & Coding' },
  { id: 'robotics', label: 'RoboWars & Hardware' },
  { id: 'workshops', label: 'Masterclasses' },
  { id: 'pronites', label: 'Pro-Nites & Shows' },
];

export const FEST_STATS = [
  { label: 'Total Prize Pool', value: '₹25,00,000+' },
  { label: 'Colleges Participating', value: '350+' },
  { label: 'Active Competitions', value: '42+' },
  { label: 'Footfall Expected', value: '45,000+' },
];

export const EVENTS_DATA = [
  // ESPORTS
  {
    id: 'valorant-phoenix',
    title: 'VALORANT: PHOENIX ASCENSION',
    category: 'esports',
    tag: 'Flagship Esports',
    prizePool: '₹3,00,000',
    teamSize: '5 Players + 1 Sub',
    date: 'March 27 - 28, 2026',
    venue: 'Sector Gamma - Cyber Dome',
    banner: '/assets/esports-arena.jpg',
    difficulty: 'Elite',
    registrationFee: 'Free Entry',
    seatsLeft: 8,
    shortDesc: 'The apex 5v5 tactical shooter tournament. Battle on LAN with 240Hz tournament pods and live shoutcasting.',
    fullDesc: 'Prepare for adrenaline-pumping collegiate tactical warfare. 64 elite university squads battle through double-elimination brackets on official Riot-spec tournament server infrastructure with broadcast-grade stage production.',
    rounds: [
      { name: 'Qualifier Round', detail: 'Best of 1 - Single Elimination across 64 collegiate rosters.' },
      { name: 'Quarter & Semi-Finals', detail: 'Best of 3 - Double elimination bracket with pick & ban phase.' },
      { name: 'Grand Arena Finals', detail: 'Best of 5 on the Main Stage Cyber Dome with live LAN crowd.' }
    ],
    rules: [
      'Official Riot Games tournament rulebook applies.',
      'All players must hold valid university/college student IDs.',
      'Hardware provided: 240Hz monitors, mechanical peripherals permitted upon inspection.',
      'Toxic conduct or unsportsmanlike behavior results in instant disqualification.'
    ],
    eligibility: 'Open to all enrolled undergraduate & postgraduate students nationwide.'
  },
  {
    id: 'bgmi-cyber-royale',
    title: 'BGMI: CYBER ROYALE INVITATIONAL',
    category: 'esports',
    tag: 'Battle Royale',
    prizePool: '₹2,50,00,000' && '₹2,50,000',
    teamSize: 'Squad (4 Players)',
    date: 'March 28, 2026',
    venue: 'Sector Gamma - Arena B',
    banner: '/assets/esports-arena.jpg',
    difficulty: 'Hard',
    registrationFee: 'Free Entry',
    seatsLeft: 14,
    shortDesc: 'Survival of the fiercest squads in Erangel and Miramar with custom telemetry scoring.',
    fullDesc: 'Drop in, gear up, and dominate. Experience custom scrim lobbies broadcasted with live casting and instant heat-map analytics for each drop zone.',
    rounds: [
      { name: 'Lobby Heats', detail: '4 Classic matches (Erangel, Miramar, Sanhok). Top 16 advance.' },
      { name: 'Grand Finals', detail: '6 matches back-to-back with official point matrix.' }
    ],
    rules: [
      'Mobile devices only. Emulators, iPads, triggers strictly prohibited.',
      'In-game anti-cheat monitoring enforced alongside on-site referee supervision.'
    ],
    eligibility: 'Registered university students with BGMI level 40+.'
  },
  {
    id: 'ea-fc-champions',
    title: 'EA SPORTS FC 26 CYBER CUP',
    category: 'esports',
    tag: 'Sports Sim',
    prizePool: '₹1,00,000',
    teamSize: 'Solo (1v1)',
    date: 'March 27, 2026',
    venue: 'Sector Gamma - PlayStation Lounge',
    banner: '/assets/esports-arena.jpg',
    difficulty: 'Medium',
    registrationFee: 'Free Entry',
    seatsLeft: 22,
    shortDesc: 'PS5 1v1 virtual football showdown. Tactical custom tactics, precision dribbling, and golden-goal thrill.',
    fullDesc: 'Step onto the virtual pitch with next-gen HyperMotion V technology. Compete against the best collegiate FIFA pros on ultra-low latency PS5 setups.',
    rounds: [
      { name: 'Knockout Stages', detail: 'Single Elimination 6-minute halves.' },
      { name: 'Championship Match', detail: 'Best of 3 series in the Cyber Dome amphitheater.' }
    ],
    rules: [
      'Tactical defending mandatory. 95-rated squads or standard kick-off mode (decided per round).',
      'Custom controllers allowed after hardware diagnostic check.'
    ],
    eligibility: 'Open to all students.'
  },

  // B.TECH & CODING
  {
    id: 'neural-hack-36h',
    title: 'NEURALHACK: 36-HOUR AI ODYSSEY',
    category: 'btech',
    tag: 'Flagship Hackathon',
    prizePool: '₹4,50,000',
    teamSize: '2 - 4 Engineers',
    date: 'March 27 - 28, 2026',
    venue: 'Sector Delta - Turing Innovation Hub',
    banner: '/assets/hackathon-lab.jpg',
    difficulty: 'Elite',
    registrationFee: 'Free (Shortlist Based)',
    seatsLeft: 5,
    shortDesc: 'Build autonomous AI agents, multi-modal LLM pipelines, and frontier applications non-stop for 36 hours.',
    fullDesc: 'An intense, caffeine-fueled crucible where India’s top B.Tech builders converge. Solve real-world problem statements across Autonomous AI Systems, Decentralized Compute, HealthTech diagnostics, and Smart Planetary Infrastructure.',
    rounds: [
      { name: 'Abstract & Architecture Screening', detail: 'Submit pitch deck & system design document.' },
      { name: 'The 36-Hour Sprint', detail: 'On-site overnight prototyping with mentor check-ins at 12h, 24h, and 30h mark.' },
      { name: 'Pitch to VCs & Google/DeepMind Jury', detail: '5-minute live demo and 3-minute technical defense.' }
    ],
    rules: [
      'All code must be written during the hackathon timeline. Pre-built libraries and open-source APIs permitted with disclosure.',
      'Repository must be public with continuous GitHub commits.',
      'Sponsors provide API credits (NVIDIA NIM, Google Gemini, OpenAI).'
    ],
    eligibility: 'B.Tech, B.E., BCA, M.Tech students.'
  },
  {
    id: 'zero-day-ctf',
    title: 'ZERO-DAY PROTOCOL: 24H CYBER CTF',
    category: 'btech',
    tag: 'CyberSecurity & Web3',
    prizePool: '₹2,00,000',
    teamSize: '1 - 3 Hackers',
    date: 'March 28, 2026',
    venue: 'Sector Delta - Cyber Threat Lab',
    banner: '/assets/hackathon-lab.jpg',
    difficulty: 'Elite',
    registrationFee: 'Free Entry',
    seatsLeft: 12,
    shortDesc: 'Jeopardy-style and Attack-Defense challenges in Binary Exploitation, Cryptography, Reverse Engineering, and Smart Contract Hacking.',
    fullDesc: 'Step into the shoes of elite offensive and defensive security researchers. Deconstruct obfuscated binaries, exploit memory buffer overflows, crack cryptographic ciphers, and audit Ethereum EVM contracts for reentrancy bugs.',
    rounds: [
      { name: 'Flag Infiltration', detail: 'Jeopardy boards spanning Web, Pwn, Crypto, Forensics, Smart Contracts.' },
      { name: 'King of the Hill (Final 6 Teams)', detail: 'Live attack-defense servers with dynamic flags.' }
    ],
    rules: [
      'Denial of service against competition scoring infrastructure is forbidden.',
      'Sharing flags or colluding between teams will result in permanent disqualification.'
    ],
    eligibility: 'All collegiate cybersecurity enthusiasts.'
  },
  {
    id: 'code-renaissance',
    title: 'CODE RENAISSANCE: ALGORITHMIC DUEL',
    category: 'btech',
    tag: 'Competitive Programming',
    prizePool: '₹1,50,000',
    teamSize: 'Individual (Solo)',
    date: 'March 29, 2026',
    venue: 'Sector Delta - Lab 404',
    banner: '/assets/hackathon-lab.jpg',
    difficulty: 'Hard',
    registrationFee: 'Free Entry',
    seatsLeft: 35,
    shortDesc: 'Speed competitive programming on complex graph theory, dynamic programming, and computational geometry.',
    fullDesc: 'Test your algorithmic muscle against top Codeforces and ICPC grandmasters. 2.5 hours, 7 mind-bending mathematical and computer science algorithmic challenges.',
    rounds: [
      { name: 'The Gauntlet', detail: '7 ICPC-style problems evaluated with sub-millisecond execution constraints.' }
    ],
    rules: [
      'Standard ICPC scoring: time penalty per incorrect submission.',
      'Languages supported: C++, Java, Python 3, Rust.'
    ],
    eligibility: 'Any college student with a penchant for high-speed problem solving.'
  },

  // ROBOTICS & HARDWARE
  {
    id: 'robowars-titan',
    title: 'ROBOWARS: TITAN HAVOC (30KG)',
    category: 'robotics',
    tag: 'Flagship Combat Robotics',
    prizePool: '₹3,50,000',
    teamSize: 'Up to 6 Engineers',
    date: 'March 28 - 29, 2026',
    venue: 'Sector Beta - Titan Coliseum',
    banner: '/assets/robowars-arena.jpg',
    difficulty: 'Elite',
    registrationFee: 'Free Entry',
    seatsLeft: 4,
    shortDesc: 'High-energy 30kg combat robotics inside a reinforced bulletproof lexan arena. Spinning blades, lifters, and pneumatic crushers.',
    fullDesc: 'Witness mechanical fury. Heavyweight 30kg remote-controlled and autonomous gladiator bots clash with 10,000 RPM titanium spinning drums, hardened steel wedges, and high-pressure pneumatic flippers in an armored cage.',
    rounds: [
      { name: 'Technical & Weapon Inspection', detail: 'Failsafe RF testing, weight verification, and containment safety audit.' },
      { name: 'Arena Group Stage', detail: '3-minute destructive rounds scored on Aggression, Damage, and Control.' },
      { name: 'The Deathmatch Final', detail: 'Full-power destruction until immobilization or knock-out.' }
    ],
    rules: [
      'Active weapon mandatory (drum, vertical/horizontal spinner, flipper, hammer).',
      'Failsafe power cut-off switch must disconnect main battery within 1 second of signal loss.'
    ],
    eligibility: 'College engineering teams with custom-fabricated combat bots.'
  },
  {
    id: 'neon-drone-prix',
    title: 'NEON VELOCITY: FPV DRONE GRAND PRIX',
    category: 'robotics',
    tag: 'Drone Racing',
    prizePool: '₹2,00,000',
    teamSize: '1 Pilot + 1 Pit Crew',
    date: 'March 27, 2026',
    venue: 'Sector Beta - Sky Cage',
    banner: '/assets/robowars-arena.jpg',
    difficulty: 'Hard',
    registrationFee: 'Free Entry',
    seatsLeft: 9,
    shortDesc: 'High-speed FPV quadcopter racing through LED neon gates, air spirals, and subterranean tunnels.',
    fullDesc: 'Pilots wearing HD FPV goggles navigate custom carbon-fiber racing drones reaching speeds over 140 km/h through an illuminated 3-dimensional obstacle course.',
    rounds: [
      { name: 'Time Trials', detail: 'Fastest 3-lap qualifier to establish grid positioning.' },
      { name: '4-Drone Heat Elimination', detail: 'Head-to-head sprint through neon air-gates.' }
    ],
    rules: [
      'Standard 5-inch prop class, 4S-6S LiPo battery limitation.',
      'Digital HD video systems (DJI O3, Walksnail, HDZero) supported.'
    ],
    eligibility: 'Certified collegiate FPV pilots.'
  },
  {
    id: 'autonomous-mars-rover',
    title: 'CHRONOS: AUTONOMOUS ROVER CHALLENGE',
    category: 'robotics',
    tag: 'Autonomous Navigation',
    prizePool: '₹1,50,000',
    teamSize: '3 - 5 Engineers',
    date: 'March 29, 2026',
    venue: 'Sector Beta - Martian Simulated Terrain',
    banner: '/assets/robowars-arena.jpg',
    difficulty: 'Medium',
    registrationFee: 'Free Entry',
    seatsLeft: 11,
    shortDesc: 'Design an autonomous wheeled rover capable of SLAM mapping, sample collection, and obstacle avoidance in simulated Martian dirt.',
    fullDesc: 'Based on University Rover Challenge standards. Test computer vision, ROS 2 navigation stacks, and robotic arm kinematics on unpredictable terrain.',
    rounds: [
      { name: 'Autonomous Traversing', detail: 'Navigate between GPS/Visual AprilTag waypoints without human telemetry.' },
      { name: 'Manipulation Task', detail: 'Pick and place scientific soil canisters with robotic end-effector.' }
    ],
    rules: [
      'Rover footprint must not exceed 1.2m x 1.2m.',
      'Fully autonomous mode awards 2x multiplier score.'
    ],
    eligibility: 'B.Tech Mechatronics, Robotics, CSE & Mechanical teams.'
  },

  // WORKSHOPS & MASTERCLASSES
  {
    id: 'workshop-ue5',
    title: 'UNREAL ENGINE 5: NEXT-GEN WORLDBUILDING',
    category: 'workshops',
    tag: 'Masterclass with Epic Lead',
    prizePool: 'Certified by Epic Games',
    teamSize: 'Individual',
    date: 'March 27, 2026 (10:00 AM - 4:00 PM)',
    venue: 'Sector Epsilon - Virtual Reality Holodeck',
    banner: '/assets/hero-citadel.jpg',
    difficulty: 'All Levels',
    registrationFee: '₹499 (Kit Included)',
    seatsLeft: 18,
    shortDesc: 'Deep dive into Nanite geometry, Lumen real-time global illumination, and procedural level generation.',
    fullDesc: 'Learn AAA game development straight from veteran game directors. Build a photorealistic playable fantasy realm with cinematic lighting and custom character physics.',
    rounds: [
      { name: 'Session 1: Architectural Foundations', detail: 'Nanite virtualization and asset optimization.' },
      { name: 'Session 2: Lumen & Post-Processing', detail: 'Atmospheric volumetric fog and real-time ray-traced lighting.' },
      { name: 'Session 3: Blueprint Gameplay Systems', detail: 'Hooking up character controller, state machines, and sound design.' }
    ],
    rules: [
      'Bring a laptop with minimum RTX 3060 or equivalent GPU (cloud virtual machines provided for attendees if required).'
    ],
    eligibility: 'Open to all students interested in Game Dev, 3D Art, and VFX.'
  },
  {
    id: 'workshop-genai-agents',
    title: 'AGENTIC AI: FROM TRANSFORMERS TO AUTONOMOUS SWARMS',
    category: 'workshops',
    tag: 'AI Masterclass by DeepMind Fellow',
    prizePool: 'Google Cloud Credits + Cert',
    teamSize: 'Individual',
    date: 'March 28, 2026 (11:00 AM - 5:00 PM)',
    venue: 'Sector Epsilon - Auditorium Alpha',
    banner: '/assets/hackathon-lab.jpg',
    difficulty: 'Intermediate',
    registrationFee: '₹599 (Includes $100 Cloud Credits)',
    seatsLeft: 6,
    shortDesc: 'Architect multi-agent autonomous swarms, function calling, tool use, and memory retrieval with LangGraph & Gemini API.',
    fullDesc: 'Move beyond basic prompt engineering. Learn the cutting-edge science of reasoning-centric AI agents capable of planning, code execution, web synthesis, and self-correction.',
    rounds: [
      { name: 'Module 1', detail: 'Attention mechanisms, KV-caching, and reasoning tokens under the hood.' },
      { name: 'Module 2', detail: 'Building deterministic tool-calling pipelines with vector memory and RAG.' },
      { name: 'Module 3', detail: 'Deploying multi-agent collaborative workflows with human-in-the-loop fallback.' }
    ],
    rules: [
      'Basic knowledge of Python and asynchronous programming recommended.'
    ],
    eligibility: 'Computer Science, AI/ML, and Data Science students.'
  },

  // PRO-NITES & CULTURAL
  {
    id: 'cybersymphony-pronite',
    title: 'CYBERSYMPHONY: THE APEX EDM PRO-NITE',
    category: 'pronites',
    tag: 'Flagship Concert',
    prizePool: 'Star Lineup + EDM Arena',
    teamSize: 'All Attendees',
    date: 'March 29, 2026 (7:00 PM Onwards)',
    venue: 'Sector Alpha - Grand Amphitheatre',
    banner: '/assets/hero-citadel.jpg',
    difficulty: 'Fest Finale',
    registrationFee: 'Included in Fest Pass',
    seatsLeft: 120,
    shortDesc: 'International electronic duo + Nucleya live with holographic laser synthesis and 1,000 drone light aerial display.',
    fullDesc: 'The climax of Aetheria 2026. A 5-hour visual and acoustic spectacle featuring colossal LED towers, live pyrotechnics, synchronized drone light formations in the night sky, and earth-shattering bass.',
    rounds: [
      { name: 'Act 1: Synapse DJ Clash', detail: 'Top student DJ finalists open the stage.' },
      { name: 'Act 2: 1,000 Drone Aerial Symphony', detail: 'Synchronized choreographies illuminating the night sky.' },
      { name: 'Act 3: Headlining International Act', detail: '3-hour non-stop electronic festival anthem set.' }
    ],
    rules: [
      'College ID card or Fest Pass QR code mandatory for entrance.',
      'Gates close at 8:30 PM sharp.'
    ],
    eligibility: 'All registered Aetheria delegates and attendees.'
  }
];

export const FESTIVAL_SECTORS = [
  {
    id: 'alpha',
    name: 'Sector Alpha',
    title: 'The Grand Amphitheatre',
    desc: 'Main stage for international pro-nites, drone light shows, and ceremonial keynotes.',
    eventsCount: '3 Major Shows',
    capacity: '15,000 People',
    status: 'ACTIVE - STAGE CALIBRATION'
  },
  {
    id: 'beta',
    name: 'Sector Beta',
    title: 'Titan Coliseum & Drone Cage',
    desc: 'Heavy reinforced bulletproof lexan arena for 30kg RoboWars and FPV Drone Grand Prix.',
    eventsCount: '8 Combat Heats',
    capacity: '4,500 Spectators',
    status: 'ACTIVE - SAFETY PROTOCOL GREEN'
  },
  {
    id: 'gamma',
    name: 'Sector Gamma',
    title: 'Cyber Dome & Esports Arena',
    desc: 'Tournament-spec 240Hz LAN pods, broadcast shoutcasting desk, and console battle lounge.',
    eventsCount: '5 Tournaments',
    capacity: '2,200 Gamers',
    status: 'ACTIVE - FIBER OPTIC GIGABIT'
  },
  {
    id: 'delta',
    name: 'Sector Delta',
    title: 'Turing Innovation Hub',
    desc: '36-hour hackathons, ethical hacking CTF labs, and competitive programming gauntlets.',
    eventsCount: '12 Challenges',
    capacity: '1,800 Builders',
    status: 'ACTIVE - POWER & NETWORK BACKUP'
  },
  {
    id: 'epsilon',
    name: 'Sector Epsilon',
    title: 'Quantum Masterclass Lab',
    desc: 'High-compute training facility for Unreal Engine 5, Agentic AI, and hardware robotics.',
    eventsCount: '6 Masterclasses',
    capacity: '800 Scholars',
    status: 'ACTIVE - WORKSTATIONS READY'
  }
];

export const SPONSORS = [
  { name: 'Google Cloud', tier: 'Title Cloud Partner', role: 'Compute & AI Sponsor' },
  { name: 'NVIDIA', tier: 'Deep Learning Partner', role: 'GPU Computing & NIMs' },
  { name: 'Epic Games', tier: 'Interactive 3D Partner', role: 'Unreal Engine Keynote' },
  { name: 'Razer', tier: 'Official Esports Gear', role: 'Tournament Hardware' },
  { name: 'Intel', tier: 'Processor Innovation', role: 'Lab Infrastructure' },
  { name: 'Red Bull', tier: 'Official Energy Drink', role: 'Gaming Fuel' },
  { name: 'GitHub', tier: 'Developer Ecosystem', role: 'Hackathon Partner' },
  { name: 'Discord', tier: 'Community Partner', role: 'Official Communications' },
];
