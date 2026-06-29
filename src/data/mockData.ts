export interface GeoEntity {
  id: string;
  type: 'forest' | 'landmark';
  name: string;
  subtitle: string;
  lat: number;
  lng: number;
  areaOrElevation: string;
  facts: string[];
  geoJson?: any; // For polygons
}

// Simple polygon generator for dummy data (creates a rough circle of coordinates)
const generatePolygon = (centerLat: number, centerLng: number, radius: number) => {
  const points = 16;
  const coords = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    // adding some noise for organic shape
    const r = radius * (0.8 + Math.random() * 0.4);
    coords.push([
      centerLng + Math.cos(angle) * r,
      centerLat + Math.sin(angle) * r
    ]);
  }
  coords.push(coords[0]); // close polygon
  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [coords]
    }
  };
};

export const MOCK_ENTITIES: GeoEntity[] = [
  {
    id: "amazon",
    type: "forest",
    name: "Amazon Rainforest",
    subtitle: "The Lungs of the Earth",
    lat: -3.4653,
    lng: -62.2159,
    areaOrElevation: "6,700,000 sq km",
    facts: [
      "Produces 20% of the world's oxygen.",
      "Spans across 9 nations in South America.",
      "Contains an estimated 390 billion individual trees."
    ],
    geoJson: generatePolygon(-3.4653, -62.2159, 12)
  },
  {
    id: "boreal",
    type: "forest",
    name: "Taiga (Boreal Forest)",
    subtitle: "The Great Northern Crown",
    lat: 61.5240,
    lng: 105.3188,
    areaOrElevation: "17,000,000 sq km",
    facts: [
      "The largest land biome on Earth.",
      "Stores enormous quantities of carbon, more than temperate forests.",
      "Temperatures can drop below -50°C in winter."
    ],
    geoJson: generatePolygon(61.5240, 105.3188, 20)
  },
  {
    id: "everest",
    type: "landmark",
    name: "Mount Everest",
    subtitle: "The Roof of the World",
    lat: 27.9881,
    lng: 86.9250,
    areaOrElevation: "8,848 meters",
    facts: [
      "Earth's highest mountain above sea level.",
      "Located in the Mahalangur Himal sub-range of the Himalayas.",
      "Grows about 4mm every year due to tectonic shifting."
    ]
  },
  {
    id: "gbr",
    type: "landmark",
    name: "Great Barrier Reef",
    subtitle: "The Living Structure",
    lat: -18.2871,
    lng: 147.6992,
    areaOrElevation: "344,400 sq km",
    facts: [
      "The world's largest coral reef system.",
      "Visible from outer space.",
      "Composed of over 2,900 individual reefs."
    ]
  },
  {
    id: "congo",
    type: "forest",
    name: "Congo Basin",
    subtitle: "The Green Heart of Africa",
    lat: -0.2280,
    lng: 15.8277,
    areaOrElevation: "3,700,000 sq km",
    facts: [
      "The world's second-largest tropical forest.",
      "Spans across 6 countries.",
      "Home to endangered forest elephants and gorillas."
    ],
    geoJson: generatePolygon(-0.2280, 15.8277, 10)
  },
  {
    id: "daintree",
    type: "forest",
    name: "Daintree Rainforest",
    subtitle: "Ancient Australian Jungle",
    lat: -16.1700,
    lng: 145.4185,
    areaOrElevation: "1,200 sq km",
    facts: [
      "Estimated to be 180 million years old.",
      "The oldest continuously surviving tropical rainforest in the world.",
      "Meets the Great Barrier Reef at the coast."
    ],
    geoJson: generatePolygon(-16.1700, 145.4185, 2)
  }
];
