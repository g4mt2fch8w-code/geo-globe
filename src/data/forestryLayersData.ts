export interface ForestTypeZone {
  id: string;
  name: string;
  category: string;
  color: string;
  altitudeRange: string;
  annualRainfall: string;
  keyFlora: string[];
  keyFauna: string[];
  description: string;
  // Approximate polygon boundary circles or bounding zones for visual rendering
  lat: number;
  lng: number;
  radiusKm: number;
}

export interface RiverWatershed {
  id: string;
  name: string;
  basinAreaSqKm: number;
  origin: string;
  color: string;
  coords: [number, number][]; // Array of [lat, lng] along river course
}

export interface SoilClimateGrid {
  id: string;
  soilType: string;
  rainfallIsohyet: string;
  color: string;
  lat: number;
  lng: number;
  regions: string;
  characteristics: string;
}

export const championForestTypes: ForestTypeZone[] = [
  {
    id: "wet-evergreen-wg",
    name: "Tropical Wet Evergreen (Western Ghats & NE)",
    category: "Group 1: Tropical Wet Evergreen",
    color: "#059669", // emerald-600
    altitudeRange: "0 - 1000m",
    annualRainfall: "> 250 cm",
    keyFlora: ["Dipterocarpus", "Mesua ferrea", "Hopea parviflora", "Calophyllum"],
    keyFauna: ["Lion-tailed Macaque", "Malabar Giant Squirrel", "Great Hornbill"],
    description: "Dense multi-layered canopy structure with lofty trees exceeding 45m in height. Characteristic of the windward side of the Western Ghats, Upper Assam, and Andaman & Nicobar Islands.",
    lat: 11.25,
    lng: 76.25,
    radiusKm: 180
  },
  {
    id: "moist-deciduous-central",
    name: "Tropical Moist Deciduous (Central & Shivaliks)",
    category: "Group 3: Tropical Moist Deciduous",
    color: "#10b981", // emerald-500
    altitudeRange: "100 - 1200m",
    annualRainfall: "150 - 200 cm",
    keyFlora: ["Shorea robusta (Sal)", "Tectona grandis (Teak)", "Terminalia elliptica", "Dalbergia latifolia (Rosewood)"],
    keyFauna: ["Royal Bengal Tiger", "Asian Elephant", "Gaur (Indian Bison)", "Chital"],
    description: "Trees shed leaves briefly in spring (March-April). Forms the most commercially valuable timber belt across Madhya Pradesh, Odisha, Chhattisgarh, and the Shivalik foothills.",
    lat: 22.35,
    lng: 80.65,
    radiusKm: 280
  },
  {
    id: "dry-deciduous-penins",
    name: "Tropical Dry Deciduous (Peninsular Plateau)",
    category: "Group 5: Tropical Dry Deciduous",
    color: "#d97706", // amber-600
    altitudeRange: "200 - 900m",
    annualRainfall: "75 - 125 cm",
    keyFlora: ["Anogeissus latifolia", "Boswellia serrata", "Acacia catechu", "Butea monosperma (Flame of the Forest)"],
    keyFauna: ["Indian Leopard", "Sloth Bear", "Nilgai", "Four-horned Antelope"],
    description: "Covers nearly 38% of India's forest area. Adapted to long dry periods with deep root systems and fire-resistant bark structure.",
    lat: 19.50,
    lng: 77.80,
    radiusKm: 320
  },
  {
    id: "montane-temperate-him",
    name: "Montane Wet Temperate & Sholas (Himalayas & Nilgiris)",
    category: "Group 11/12: Montane Temperate Forests",
    color: "#3b82f6", // blue-500
    altitudeRange: "1800 - 3200m",
    annualRainfall: "150 - 300 cm",
    keyFlora: ["Quercus (Oak)", "Rhododendron arboreum", "Cedrus deodara (Deodar)", "Magnolia"],
    keyFauna: ["Red Panda", "Himalayan Musk Deer", "Nilgiri Tahr", "Satyr Tragopan"],
    description: "Characterized by mossy trunks, abundant epiphytes, and temperate broadleaved evergreen species mingling with coniferous stands.",
    lat: 30.40,
    lng: 79.30,
    radiusKm: 210
  },
  {
    id: "alpine-scrub-trans",
    name: "Sub-Alpine & Alpine Scrub (High Himalayas)",
    category: "Group 15/16: Alpine Forests & Scrub",
    color: "#8b5cf6", // purple-500
    altitudeRange: "3200 - 4800m",
    annualRainfall: "Snowfall dominant / < 80 cm rain",
    keyFlora: ["Betula utilis (Bhojpatra)", "Abies spectabilis (Silver Fir)", "Juniperus squamata", "Alpine meadows (Bugyals)"],
    keyFauna: ["Snow Leopard", "Himalayan Blue Sheep (Bharal)", "Tibetan Wolf", "Himalayan Monal"],
    description: "Forms the treeline transition zone into alpine meadows and permanent glacial snows above 4000 meters.",
    lat: 33.20,
    lng: 77.50,
    radiusKm: 160
  }
];

export const hydrologicalWatersheds: RiverWatershed[] = [
  {
    id: "ganga-basin",
    name: "Ganga River Basin Network",
    basinAreaSqKm: 861452,
    origin: "Gangotri Glacier, Uttarakhand (3,892m)",
    color: "#38bdf8", // sky-400
    coords: [
      [30.99, 78.93], // Gangotri / Gaumukh
      [30.73, 78.60], // Uttarkashi
      [30.08, 78.26], // Rishikesh
      [29.47, 78.13], // Haridwar
      [27.38, 79.58], // Farrukhabad
      [26.44, 80.33], // Kanpur
      [25.43, 81.84], // Prayagraj (Sangam)
      [25.15, 82.58], // Mirzapur
      [25.31, 83.00], // Varanasi
      [25.56, 83.98], // Buxar
      [25.59, 85.13], // Patna
      [25.37, 86.47], // Munger
      [25.24, 87.27], // Bhagalpur
      [25.00, 87.85], // Rajmahal
      [23.90, 88.25], // Farakka
      [23.00, 88.42], // Nabadwip
      [22.57, 88.36], // Kolkata / Hooghly Delta
      [21.80, 88.10], // Bay of Bengal (Sundarbans)
      [21.20, 88.50], // Deep sea
    ]
  },
  {
    id: "brahmaputra-basin",
    name: "Brahmaputra (Siang-Dihang) Basin",
    basinAreaSqKm: 194413,
    origin: "Angsi Glacier, Himalayas",
    color: "#06b6d4", // cyan-500
    coords: [
      [28.50, 95.35], // Pasighat entry
      [27.47, 94.91], // Dibrugarh
      [26.93, 94.75], // Sivasagar
      [26.75, 94.20], // Jorhat / Majuli Island
      [26.63, 92.83], // Tezpur
      [26.18, 91.74], // Guwahati
      [26.12, 90.62], // Goalpara
      [26.02, 89.98], // Dhubri (exiting India)
      [24.50, 89.70], // Through Bangladesh
      [23.00, 90.40], // Meghna Estuary
      [21.50, 90.50], // Bay of Bengal
    ]
  },
  {
    id: "narmada-basin",
    name: "Narmada Rift Valley Basin",
    basinAreaSqKm: 98796,
    origin: "Amarkantak Plateau, MP (1,057m)",
    color: "#22c55e", // green-500
    coords: [
      [22.67, 81.75], // Amarkantak
      [22.85, 80.52], // Mandla
      [23.18, 79.93], // Jabalpur (Marble Rocks)
      [22.95, 78.80], // Narsinghpur
      [22.75, 77.72], // Hoshangabad
      [22.18, 75.83], // Maheshwar / Omkareshwar
      [21.83, 73.72], // Rajpipla
      [21.70, 72.98], // Bharuch Estuary (Arabian Sea)
      [21.60, 72.40], // Deep sea
    ]
  },
  {
    id: "godavari-basin",
    name: "Godavari (Dakshin Ganga) Basin",
    basinAreaSqKm: 312812,
    origin: "Trimbakeshwar, Nashik (1,067m)",
    color: "#a855f7", // purple-500
    coords: [
      [19.93, 73.53], // Trimbakeshwar
      [19.68, 75.33], // Paithan
      [19.14, 77.30], // Nanded
      [18.75, 79.45], // Nizamabad / Sriram Sagar
      [18.83, 79.82], // Manthani
      [18.00, 80.88], // Bhadrachalam
      [17.00, 81.80], // Rajahmundry Delta (Bay of Bengal)
      [16.50, 82.20], // Deep sea
    ]
  },
  {
    id: "kaveri-basin",
    name: "Kaveri River Watershed",
    basinAreaSqKm: 81155,
    origin: "Talakaveri, Brahmagiri Hills (1,276m)",
    color: "#f59e0b", // amber-500
    coords: [
      [12.38, 75.48], // Talakaveri
      [12.42, 76.36], // KRS Dam / Mysuru
      [12.28, 77.16], // Shivanasamudra
      [11.93, 77.80], // Mettur Dam
      [11.08, 78.13], // Karur
      [10.85, 78.68], // Tiruchirappalli
      [10.78, 79.13], // Thanjavur
      [11.15, 79.85], // Poompuhar Delta
      [11.00, 80.00], // Deep sea
    ]
  }
];

export const soilClimateGrids: SoilClimateGrid[] = [
  {
    id: "alluvial-gangetic",
    soilType: "Alluvial Soil (Khadar & Bhangar)",
    rainfallIsohyet: "100 - 200 cm Isohyet",
    color: "#facc15", // yellow-400
    lat: 26.85,
    lng: 81.00,
    regions: "Indo-Gangetic Plains, Brahmaputra Valley, Coastal Deltas",
    characteristics: "Rich in potash and loam, low in phosphorus. Forms highly productive agro-forestry belts."
  },
  {
    id: "black-regur-deccan",
    soilType: "Black Cotton Soil (Regur / Vertisol)",
    rainfallIsohyet: "60 - 100 cm Isohyet",
    color: "#64748b", // slate-500
    lat: 19.80,
    lng: 75.30,
    regions: "Deccan Trap (Maharashtra, Malwa, North Karnataka, Gujarat)",
    characteristics: "High clay content with self-plowing deep cracks during dry season. Exceptional moisture retention capacity."
  },
  {
    id: "red-yellow-peninsular",
    soilType: "Red & Yellow Soil (Alfisol)",
    rainfallIsohyet: "75 - 150 cm Isohyet",
    color: "#ef4444", // red-500
    lat: 15.40,
    lng: 78.60,
    regions: "Eastern & Southern Deccan Plateau, Chota Nagpur, Odisha",
    characteristics: "Red color due to ferric oxide diffusion in crystalline rocks. Rich in iron, porous structure."
  },
  {
    id: "laterite-monsoon",
    soilType: "Laterite Soil (Oxisol)",
    rainfallIsohyet: "> 250 cm Heavy Monsoon Isohyet",
    color: "#b45309", // amber-700
    lat: 12.80,
    lng: 75.20,
    regions: "Western Ghats summits, Eastern Ghats highlands, Meghalaya Plateau",
    characteristics: "Formed by intense tropical leaching where silica washes out leaving iron and aluminum oxides behind."
  }
];
