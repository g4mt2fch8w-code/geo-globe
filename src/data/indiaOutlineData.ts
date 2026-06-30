// GeoJSON formatted polygon coordinates for India's boundary and major forest zones
// Used to render extruded 3D carved landmass outlines on the globe

export const carvedOutlinePolygons = [
  {
    type: "Feature",
    properties: {
      name: "India Sovereign Boundary (Carved Relief)",
      altitude: 0.045,
      capColor: "rgba(16, 185, 129, 0.15)",
      sideColor: "rgba(251, 191, 36, 0.75)",
      strokeColor: "#34d399"
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [74.0, 37.0],
          [78.5, 35.5],
          [81.0, 31.0],
          [80.0, 28.8],
          [88.0, 27.5],
          [92.0, 27.8],
          [96.0, 28.5],
          [95.5, 26.5],
          [93.0, 24.0],
          [91.5, 23.8],
          [89.0, 26.0],
          [88.4, 22.0],
          [86.8, 20.3],
          [84.5, 18.2],
          [80.3, 15.5],
          [80.2, 13.0],
          [79.8, 10.5],
          [77.5, 8.1],
          [76.2, 9.5],
          [74.8, 13.0],
          [73.5, 16.0],
          [72.8, 19.0],
          [72.6, 21.5],
          [68.8, 22.3],
          [68.3, 23.7],
          [71.0, 24.5],
          [70.5, 27.5],
          [73.8, 30.0],
          [74.5, 32.5],
          [74.0, 37.0]
        ]
      ]
    }
  },
  {
    type: "Feature",
    properties: {
      name: "Western Ghats Biodiversity Spine (Extruded Plateau)",
      altitude: 0.075,
      capColor: "rgba(5, 150, 105, 0.35)",
      sideColor: "rgba(16, 185, 129, 0.85)",
      strokeColor: "#10b981"
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [73.5, 20.5],
          [74.0, 18.0],
          [74.5, 15.0],
          [75.5, 12.5],
          [76.8, 10.0],
          [77.2, 8.5],
          [76.6, 8.5],
          [76.0, 10.5],
          [74.8, 13.5],
          [73.8, 16.5],
          [73.0, 20.5]
        ]
      ]
    }
  },
  {
    type: "Feature",
    properties: {
      name: "Central Highlands & Satpura Topography",
      altitude: 0.065,
      capColor: "rgba(217, 119, 6, 0.32)",
      sideColor: "rgba(245, 158, 11, 0.8)",
      strokeColor: "#fbbf24"
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [76.5, 23.5],
          [80.5, 23.8],
          [83.5, 22.5],
          [81.5, 20.8],
          [77.5, 21.2],
          [76.5, 23.5]
        ]
      ]
    }
  },
  {
    type: "Feature",
    properties: {
      name: "Eastern Himalayas & Canopy Escarpment",
      altitude: 0.085,
      capColor: "rgba(59, 130, 246, 0.35)",
      sideColor: "rgba(96, 165, 250, 0.85)",
      strokeColor: "#60a5fa"
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [88.5, 27.2],
          [91.5, 28.2],
          [95.5, 28.5],
          [95.8, 27.2],
          [93.0, 25.5],
          [89.5, 26.2],
          [88.5, 27.2]
        ]
      ]
    }
  }
];

// Paths to draw glowing neon vector borders around the carved outlines
export const carvedOutlinePaths = carvedOutlinePolygons.map(feature => ({
  name: feature.properties.name,
  coords: feature.geometry.coordinates[0],
  color: feature.properties.strokeColor,
  width: 4.0
}));
