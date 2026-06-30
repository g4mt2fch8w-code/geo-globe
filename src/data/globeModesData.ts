// Data definitions for the 4 interactive Globe Modes
// Source: National Tiger Conservation Authority (NTCA), MoEFCC, Government of India
// Last verified: June 2026

export interface TimelineReserve {
  id: string;
  name: string;
  lat: number;
  lng: number;
  year: number;
  state: string;
  type: string;
  areaSqKm: number;
  notifiedAct: string;
}

export const timelineReserves: TimelineReserve[] = [
  // ── Original 9 Project Tiger Reserves (1973-74) ──
  { id: 'corbett', name: '1. Jim Corbett Tiger Reserve', lat: 29.53, lng: 78.77, year: 1973, state: 'Uttarakhand', type: 'Project Tiger Pioneer', areaSqKm: 1288, notifiedAct: 'Project Tiger Launch (1st Reserve, 1973-74)' },
  { id: 'bandipur', name: '2. Bandipur Tiger Reserve', lat: 11.66, lng: 76.62, year: 1973, state: 'Karnataka', type: 'Project Tiger Pioneer', areaSqKm: 874, notifiedAct: 'Project Tiger 1973-74' },
  { id: 'kanha', name: '3. Kanha Tiger Reserve', lat: 22.33, lng: 80.61, year: 1973, state: 'Madhya Pradesh', type: 'Project Tiger Pioneer', areaSqKm: 1945, notifiedAct: 'Project Tiger 1973-74' },
  { id: 'manas', name: '4. Manas Tiger Reserve', lat: 26.71, lng: 90.93, year: 1973, state: 'Assam', type: 'Project Tiger Pioneer', areaSqKm: 2837, notifiedAct: 'Project Tiger 1973-74' },
  { id: 'melghat', name: '5. Melghat Tiger Reserve', lat: 21.48, lng: 77.21, year: 1973, state: 'Maharashtra', type: 'Project Tiger Pioneer', areaSqKm: 2768, notifiedAct: 'Project Tiger 1973-74 (Satpura Crest)' },
  { id: 'palamau', name: '6. Palamau Tiger Reserve', lat: 23.83, lng: 84.23, year: 1973, state: 'Jharkhand', type: 'Project Tiger Pioneer', areaSqKm: 1129, notifiedAct: 'Project Tiger 1973-74 (Chota Nagpur)' },
  { id: 'ranthambore', name: '7. Ranthambore Tiger Reserve', lat: 26.01, lng: 76.50, year: 1973, state: 'Rajasthan', type: 'Project Tiger Pioneer', areaSqKm: 1411, notifiedAct: 'Project Tiger 1973-74' },
  { id: 'similipal', name: '8. Similipal Tiger Reserve', lat: 21.93, lng: 86.33, year: 1973, state: 'Odisha', type: 'Project Tiger Pioneer', areaSqKm: 2750, notifiedAct: 'Project Tiger 1973-74' },
  { id: 'sundarbans', name: '9. Sundarbans Tiger Reserve', lat: 21.94, lng: 88.89, year: 1973, state: 'West Bengal', type: 'Project Tiger Pioneer', areaSqKm: 2585, notifiedAct: 'Project Tiger 1973-74 (Mangrove Delta)' },

  // ── Phase I Expansion (1978-79) ──
  { id: 'periyar', name: '10. Periyar Tiger Reserve', lat: 9.46, lng: 77.23, year: 1978, state: 'Kerala', type: 'Expansion Phase I', areaSqKm: 925, notifiedAct: 'Project Tiger Expansion 1978-79' },
  { id: 'sariska', name: '11. Sariska Tiger Reserve', lat: 27.31, lng: 76.43, year: 1978, state: 'Rajasthan', type: 'Expansion Phase I', areaSqKm: 881, notifiedAct: 'Project Tiger Expansion 1978-79' },

  // ── Phase II Expansion (1982-83) ──
  { id: 'buxa', name: '12. Buxa Tiger Reserve', lat: 26.65, lng: 89.58, year: 1983, state: 'West Bengal', type: 'Expansion Phase II', areaSqKm: 760, notifiedAct: 'Project Tiger 1982-83 (Terai-Duar)' },
  { id: 'indravati', name: '13. Indravati Tiger Reserve', lat: 18.95, lng: 80.35, year: 1983, state: 'Chhattisgarh', type: 'Expansion Phase II', areaSqKm: 2799, notifiedAct: 'Project Tiger 1982-83 (Bastar)' },
  { id: 'nagarjunasagar', name: '14. Nagarjunasagar-Srisailam TR', lat: 16.33, lng: 78.86, year: 1982, state: 'Andhra Pradesh/Telangana', type: 'Largest Tiger Reserve', areaSqKm: 3728, notifiedAct: 'Project Tiger 1982-83' },
  { id: 'namdapha', name: '15. Namdapha Tiger Reserve', lat: 27.50, lng: 96.39, year: 1982, state: 'Arunachal Pradesh', type: 'Eastern Himalaya Dipterocarp', areaSqKm: 1985, notifiedAct: 'Project Tiger 1982-83' },

  // ── Phase III (1987-1995) ──
  { id: 'dudhwa', name: '16. Dudhwa Tiger Reserve', lat: 28.49, lng: 80.65, year: 1987, state: 'Uttar Pradesh', type: 'Terai Arc Landscape', areaSqKm: 2201, notifiedAct: 'Project Tiger 1987-88' },
  { id: 'kalakad', name: '17. Kalakad Mundanthurai TR', lat: 8.67, lng: 77.35, year: 1988, state: 'Tamil Nadu', type: 'Agasthyamalai Southern Ghats', areaSqKm: 1601, notifiedAct: 'Project Tiger 1988-89' },
  { id: 'valmiki', name: '18. Valmiki Tiger Reserve', lat: 27.31, lng: 84.14, year: 1989, state: 'Bihar', type: 'Shivalik Terai Belt', areaSqKm: 899, notifiedAct: 'Project Tiger 1989-90' },
  { id: 'pench-mp', name: '19. Pench Tiger Reserve (MP)', lat: 21.67, lng: 79.31, year: 1992, state: 'Madhya Pradesh', type: 'Satpura-Maikal Corridor', areaSqKm: 1179, notifiedAct: 'Project Tiger 1992-93' },
  { id: 'tadoba', name: '20. Tadoba-Andhari Tiger Reserve', lat: 20.21, lng: 79.39, year: 1993, state: 'Maharashtra', type: 'Central Indian Landscape', areaSqKm: 1727, notifiedAct: 'Project Tiger 1993-94' },
  { id: 'bandhavgarh', name: '21. Bandhavgarh Tiger Reserve', lat: 23.72, lng: 81.02, year: 1993, state: 'Madhya Pradesh', type: 'High Density Habitat', areaSqKm: 1536, notifiedAct: 'Project Tiger 1993-94' },
  { id: 'panna', name: '22. Panna Tiger Reserve', lat: 24.71, lng: 80.18, year: 1994, state: 'Madhya Pradesh', type: 'Vindhyan Range Recovery', areaSqKm: 1598, notifiedAct: 'Project Tiger 1994-95' },
  { id: 'dampa', name: '23. Dampa Tiger Reserve', lat: 23.42, lng: 92.35, year: 1994, state: 'Mizoram', type: 'Lushai Hills Rain Forest', areaSqKm: 500, notifiedAct: 'Project Tiger 1994-95' },

  // ── Phase IV (1998-2000) ──
  { id: 'bhadra', name: '24. Bhadra Tiger Reserve', lat: 13.57, lng: 75.62, year: 1998, state: 'Karnataka', type: 'Baba Budanagiri Western Ghats', areaSqKm: 1064, notifiedAct: 'Project Tiger 1998-99 (Sec 38V WLPA)' },
  { id: 'pench-mh', name: '25. Pench Tiger Reserve (MH)', lat: 21.40, lng: 79.25, year: 1998, state: 'Maharashtra', type: 'Southern Pench Extension', areaSqKm: 741, notifiedAct: 'Project Tiger 1998-99' },
  { id: 'pakke', name: '26. Pakke Tiger Reserve', lat: 27.03, lng: 92.86, year: 1999, state: 'Arunachal Pradesh', type: 'Eastern Himalaya Biodiversity', areaSqKm: 862, notifiedAct: 'Project Tiger 1999-2000' },
  { id: 'nameri', name: '27. Nameri Tiger Reserve', lat: 26.93, lng: 92.85, year: 1999, state: 'Assam', type: 'Jia-Bhoroli Floodplain', areaSqKm: 344, notifiedAct: 'Project Tiger 1999-2000' },
  { id: 'satpura', name: '28. Satpura Tiger Reserve', lat: 22.46, lng: 78.43, year: 1999, state: 'Madhya Pradesh', type: 'Pachmarhi Biosphere Core', areaSqKm: 2133, notifiedAct: 'Project Tiger 1999-2000' },

  // ── NTCA Phase V (2008-09) ──
  { id: 'anamalai', name: '29. Anamalai Tiger Reserve', lat: 10.43, lng: 77.01, year: 2008, state: 'Tamil Nadu', type: 'Southern Western Ghats', areaSqKm: 1479, notifiedAct: 'NTCA 2008-09 (Sec 38V WLPA)' },
  { id: 'udanti', name: '30. Udanti-Sitanadi Tiger Reserve', lat: 20.15, lng: 82.15, year: 2008, state: 'Chhattisgarh', type: 'Eastern Ghats Deciduous Tract', areaSqKm: 1842, notifiedAct: 'NTCA 2008-09' },
  { id: 'satkosia', name: '31. Satkosia Tiger Reserve', lat: 20.58, lng: 84.85, year: 2008, state: 'Odisha', type: 'Mahanadi Gorge Ecosystem', areaSqKm: 963, notifiedAct: 'NTCA 2008-09' },
  { id: 'kaziranga', name: '32. Kaziranga Tiger Reserve', lat: 26.58, lng: 93.17, year: 2008, state: 'Assam', type: 'Brahmaputra Floodplain Core', areaSqKm: 1055, notifiedAct: 'NTCA 2008-09' },
  { id: 'achanakmar', name: '33. Achanakmar Tiger Reserve', lat: 22.47, lng: 81.71, year: 2008, state: 'Chhattisgarh', type: 'Maikal Range Biosphere', areaSqKm: 914, notifiedAct: 'NTCA 2008-09' },
  { id: 'kali', name: '34. Dandeli-Anshi (Kali) Tiger Reserve', lat: 15.17, lng: 74.52, year: 2008, state: 'Karnataka', type: 'North Western Ghats Canopy', areaSqKm: 1300, notifiedAct: 'NTCA 2008-09' },
  { id: 'sanjay-dubri', name: '35. Sanjay-Dubri Tiger Reserve', lat: 23.98, lng: 81.85, year: 2008, state: 'Madhya Pradesh', type: 'Baghelkhand Sal Tract', areaSqKm: 1674, notifiedAct: 'NTCA 2008-09' },
  { id: 'mudumalai', name: '36. Mudumalai Tiger Reserve', lat: 11.56, lng: 76.56, year: 2008, state: 'Tamil Nadu', type: 'Nilgiri Biosphere Tri-Junction', areaSqKm: 688, notifiedAct: 'NTCA 2008-09' },
  { id: 'nagarahole', name: '37. Nagarahole Tiger Reserve', lat: 12.03, lng: 76.15, year: 2008, state: 'Karnataka', type: 'Kabini River Ecosystem', areaSqKm: 1205, notifiedAct: 'NTCA 2008-09' },
  { id: 'parambikulam', name: '38. Parambikulam Tiger Reserve', lat: 10.43, lng: 76.78, year: 2008, state: 'Kerala', type: 'Sungam Valley Teak Forest', areaSqKm: 643, notifiedAct: 'NTCA 2008-09' },

  // ── NTCA Phase VI (2009-2017) ──
  { id: 'sahyadri', name: '39. Sahyadri Tiger Reserve', lat: 17.38, lng: 73.74, year: 2009, state: 'Maharashtra', type: 'Northern Western Ghats Crest', areaSqKm: 1165, notifiedAct: 'NTCA 2009-10' },
  { id: 'brt', name: '40. Biligiri Ranganatha Temple (BRT) TR', lat: 11.98, lng: 77.13, year: 2010, state: 'Karnataka', type: 'Eastern-Western Ghats Bridge', areaSqKm: 574, notifiedAct: 'NTCA 2010-11' },
  { id: 'kawal', name: '41. Kawal Tiger Reserve', lat: 19.15, lng: 78.85, year: 2012, state: 'Telangana', type: 'Godavari Basin Teak Forest', areaSqKm: 2015, notifiedAct: 'NTCA 2012-13' },
  { id: 'sathyamangalam', name: '42. Sathyamangalam Tiger Reserve', lat: 11.52, lng: 77.24, year: 2013, state: 'Tamil Nadu', type: 'Nilgiri Eastern Rain-Shadow', areaSqKm: 1408, notifiedAct: 'NTCA 2013-14' },
  { id: 'mukundra', name: '43. Mukundra Hills Tiger Reserve', lat: 24.95, lng: 75.88, year: 2013, state: 'Rajasthan', type: 'Chambal Ravine Ecosystem', areaSqKm: 759, notifiedAct: 'NTCA 2013-14' },
  { id: 'navegaon', name: '44. Navegaon-Nagzira Tiger Reserve', lat: 21.25, lng: 80.03, year: 2013, state: 'Maharashtra', type: 'Vidarbha Basin Corridor', areaSqKm: 655, notifiedAct: 'NTCA 2013' },
  { id: 'amrabad', name: '45. Amrabad Tiger Reserve', lat: 16.34, lng: 79.01, year: 2014, state: 'Telangana', type: 'Nallamala Hills Dry Scrub', areaSqKm: 2611, notifiedAct: 'NTCA 2014 (Bifurcated from Nagarjunasagar)' },
  { id: 'pilibhit', name: '46. Pilibhit Tiger Reserve', lat: 28.64, lng: 79.95, year: 2014, state: 'Uttar Pradesh', type: 'Upper Gangetic Plain Terai', areaSqKm: 730, notifiedAct: 'NTCA 2014' },
  { id: 'bor', name: '47. Bor Tiger Reserve', lat: 21.01, lng: 78.61, year: 2014, state: 'Maharashtra', type: 'Wardha Valley Link', areaSqKm: 138, notifiedAct: 'NTCA 2014 (Smallest Reserve)' },
  { id: 'rajaji', name: '48. Rajaji Tiger Reserve', lat: 30.01, lng: 78.18, year: 2015, state: 'Uttarakhand', type: 'Shivalik Elephant & Tiger Corridor', areaSqKm: 1075, notifiedAct: 'NTCA 2015' },
  { id: 'orang', name: '49. Orang Tiger Reserve', lat: 26.55, lng: 92.28, year: 2016, state: 'Assam', type: 'Mini Kaziranga Riverine Grassland', areaSqKm: 492, notifiedAct: 'NTCA 2016' },
  { id: 'kamlang', name: '50. Kamlang Tiger Reserve', lat: 27.68, lng: 96.38, year: 2016, state: 'Arunachal Pradesh', type: 'Trans-Border Forest Complex', areaSqKm: 783, notifiedAct: 'NTCA 2016-17' },

  // ── NTCA Phase VII (2021-Present) ──
  { id: 'srivilliputhur', name: '51. Srivilliputhur Megamalai TR', lat: 9.60, lng: 77.45, year: 2021, state: 'Tamil Nadu', type: 'Vaigai River Catchment Sholas', areaSqKm: 1016, notifiedAct: 'NTCA 2021 (51st Reserve)' },
  { id: 'ramgarh', name: '52. Ramgarh Vishdhari Tiger Reserve', lat: 25.33, lng: 75.86, year: 2022, state: 'Rajasthan', type: 'Ranthambore-Mukundra Corridor', areaSqKm: 1501, notifiedAct: 'NTCA 2022 (52nd Reserve)' },
  { id: 'ranipur', name: '53. Ranipur Tiger Reserve', lat: 25.08, lng: 81.18, year: 2022, state: 'Uttar Pradesh', type: 'Bundelkhand Tropical Dry Forest', areaSqKm: 529, notifiedAct: 'NTCA 2022 (53rd Reserve)' },
  { id: 'veerangana', name: '54. Veerangana Durgavati Tiger Reserve', lat: 23.45, lng: 79.44, year: 2023, state: 'Madhya Pradesh', type: 'Nauradehi-Durgavati Link', areaSqKm: 2339, notifiedAct: 'NTCA 2023 (54th Reserve)' },
  { id: 'dholpur-karauli', name: '55. Dholpur-Karauli Tiger Reserve', lat: 26.70, lng: 77.07, year: 2023, state: 'Rajasthan', type: 'Chambal Ravine-Ranthambore Link', areaSqKm: 1058, notifiedAct: 'NTCA 2023 (55th Reserve)' },
  { id: 'guru-ghasidas', name: '56. Guru Ghasidas-Tamor Pingla TR', lat: 23.80, lng: 82.50, year: 2024, state: 'Chhattisgarh', type: 'Chota Nagpur-Baghelkhand Bridge', areaSqKm: 2829, notifiedAct: 'NTCA 2024 (56th Reserve)' },
  { id: 'ratapani', name: '57. Ratapani Tiger Reserve', lat: 23.20, lng: 77.60, year: 2024, state: 'Madhya Pradesh', type: 'Vindhyan Narmada Deciduous Belt', areaSqKm: 1272, notifiedAct: 'NTCA 2024 (57th Reserve)' },
  { id: 'madhav', name: '58. Madhav Tiger Reserve', lat: 25.35, lng: 77.45, year: 2025, state: 'Madhya Pradesh', type: 'Shivpuri-Kuno Connectivity', areaSqKm: 1070, notifiedAct: 'NTCA 2025 (58th Reserve)' },
];


export interface BiogeographicZone {
  id: string;
  name: string;
  zoneCode: string;
  percentArea: number;
  lat: number;
  lng: number;
  radiusKm: number;
  color: string;
  primaryForestType: string;
  flagshipFauna: string;
  climateSummary: string;
}

export const biogeographicZones: BiogeographicZone[] = [
  { id: 'zone-1', name: 'Trans-Himalaya', zoneCode: '1A / 1B (Ladakh & Tibetan Plateau)', percentArea: 5.6, lat: 34.20, lng: 77.58, radiusKm: 320, color: '#93C5FD', primaryForestType: 'Alpine Dry Scrub & Cold Desert Steppe', flagshipFauna: 'Snow Leopard (Panthera uncia), Tibetan Wolf, Kiang', climateSummary: 'Arid frigid climate, annual precipitation < 150mm, extreme frost weathering.' },
  { id: 'zone-2', name: 'The Himalaya', zoneCode: '2A - 2D (North-West, West, Central, East)', percentArea: 6.4, lat: 30.50, lng: 79.20, radiusKm: 450, color: '#38BDF8', primaryForestType: 'Himalayan Moist Temperate & Sub-Alpine Coniferous', flagshipFauna: 'Himalayan Musk Deer, Red Panda, Western Tragopan, Himalayan Tahr', climateSummary: 'Altitudinal zonation from sub-tropical valleys to perpetual nival ice cap.' },
  { id: 'zone-3', name: 'The Indian Desert', zoneCode: '3A / 3B (Thar & Kutch Salt Flats)', percentArea: 6.6, lat: 26.85, lng: 70.92, radiusKm: 340, color: '#FDE047', primaryForestType: 'Tropical Thorn Forests (Prosopis-Salvadora)', flagshipFauna: 'Great Indian Bustard (Ardeotis nigriceps), Indian Wild Ass (Khur), Desert Fox', climateSummary: 'Hyper-arid high thermal variance, potential evapotranspiration exceeds rainfall 5x.' },
  { id: 'zone-4', name: 'The Semi-Arid', zoneCode: '4A / 4B (Punjab Plains & Gujarat Rajputana)', percentArea: 16.6, lat: 25.40, lng: 74.80, radiusKm: 480, color: '#FACC15', primaryForestType: 'Dry Scrub & Tropical Thorn Grasslands', flagshipFauna: 'Asiatic Lion (Panthera leo persica), Blackbuck, Indian Wolf, Striped Hyena', climateSummary: 'Transitional ecotone buffering desert aridity from monsoon plateau rain.' },
  { id: 'zone-5', name: 'Western Ghats', zoneCode: '5A / 5B (Malabar Plains & Western Ghats Mountains)', percentArea: 4.0, lat: 13.80, lng: 75.30, radiusKm: 520, color: '#10B981', primaryForestType: 'Tropical Wet Evergreen (Southern Hill Top Shola)', flagshipFauna: 'Lion-Tailed Macaque (Macaca silenus), Nilgiri Tahr, Malabar Giant Squirrel', climateSummary: 'Orographic heavy monsoon rainfall (2500–6000mm annually), global biodiversity hotspot.' },
  { id: 'zone-6', name: 'Deccan Peninsula', zoneCode: '6A - 6E (Central Highlands, Chota Nagpur, Eastern Ghats)', percentArea: 42.0, lat: 19.50, lng: 78.80, radiusKm: 720, color: '#84CC16', primaryForestType: 'Southern & Northern Tropical Dry/Moist Deciduous (Teak & Sal)', flagshipFauna: 'Bengal Tiger (Panthera tigris tigris), Gaur (Indian Bison), Hardground Barasingha', climateSummary: 'Ancient stable geological shield, seasonal tropical rainfall with distinct dry spell.' },
  { id: 'zone-7', name: 'Gangetic Plain', zoneCode: '7A / 7B (Upper & Lower Gangetic Alluvial Basin)', percentArea: 10.8, lat: 26.20, lng: 83.50, radiusKm: 480, color: '#4ADE80', primaryForestType: 'Tropical Moist Deciduous & Riparian Terai Grasslands', flagshipFauna: 'One-Horned Rhinoceros, Gangetic River Dolphin, Swamp Deer (Rucervus duvaucelii)', climateSummary: 'Deep fertile alluvial silt deposits, intense seasonal inundation & monsoon flooding.' },
  { id: 'zone-8', name: 'Coasts', zoneCode: '8A - 8C (West Coast, East Coast, Lakshadweep)', percentArea: 2.5, lat: 16.00, lng: 81.80, radiusKm: 380, color: '#06B6D4', primaryForestType: 'Littoral & Swamp Forests (Mangrove Tidal Ecosystems)', flagshipFauna: 'Estuarine Crocodile (Crocodylus porosus), Olive Ridley Sea Turtle, Mudskipper', climateSummary: 'Saline intertidal fluctuation, high humidity, cyclone-prone littoral interface.' },
  { id: 'zone-9', name: 'North-East India', zoneCode: '9A / 9B (Brahmaputra Valley & North-East Hills)', percentArea: 5.2, lat: 25.80, lng: 93.80, radiusKm: 350, color: '#059669', primaryForestType: 'Northern Tropical Wet Evergreen & Sub-Tropical Pine', flagshipFauna: 'Hoolock Gibbon (Western/Eastern), Clouded Leopard, Marbled Cat, Golden Langur', climateSummary: 'Ultra-humid Indo-Burma biodiversity hotspot interface, torrential summer rains.' },
  { id: 'zone-10', name: 'The Islands', zoneCode: '10A / 10B (Andaman & Nicobar Archipelago)', percentArea: 0.3, lat: 11.50, lng: 92.70, radiusKm: 280, color: '#6366F1', primaryForestType: 'Andaman Tropical Wet Evergreen & Coastal Mangrove', flagshipFauna: 'Nicobar Megapode, Andaman Wild Pig, Narcondam Hornbill, Robber Crab', climateSummary: 'Equatorial oceanic climate, perennial atmospheric moisture and endemic insular speciation.' }
];

export interface ThreatHotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  threatType: 'Invasive Flora Heatmap' | 'Linear Infrastructure Corridor';
  invasiveSpecies?: 'Lantana camara' | 'Prosopis juliflora' | 'Mikania micrantha';
  infrastructureDetails?: string;
  impactLevel: 'Critical' | 'Severe' | 'High';
  summary: string;
}

export const threatMatrixData: ThreatHotspot[] = [
  { id: 'threat-1', name: 'Bandipur-Nagarhole Lantana Infestation Zone', lat: 11.72, lng: 76.48, threatType: 'Invasive Flora Heatmap', invasiveSpecies: 'Lantana camara', impactLevel: 'Critical', summary: 'Dense understory smothering by Lantana camara inhibits native fodder grass regeneration, intensifying elephant push toward agricultural periphery.' },
  { id: 'threat-2', name: 'Sariska & Ranthambore Juliflora Invasion', lat: 26.50, lng: 76.45, threatType: 'Invasive Flora Heatmap', invasiveSpecies: 'Prosopis juliflora', impactLevel: 'Severe', summary: 'Aggressive root competition and allelopathy displace native Anogeissus pendula and Acacia thorn scrub, drying surface watering holes.' },
  { id: 'threat-3', name: 'Kaziranga Mikania Smothering Belt', lat: 26.62, lng: 93.25, threatType: 'Invasive Flora Heatmap', invasiveSpecies: 'Mikania micrantha', impactLevel: 'Severe', summary: '"Mile-a-minute" weed chokes alluvial tall elephant grass beds after seasonal flood recession.' },
  { id: 'threat-4', name: 'Siliguri Elephant Corridor Railway Intersection (NH-27 / NFR)', lat: 26.78, lng: 88.42, threatType: 'Linear Infrastructure Corridor', infrastructureDetails: 'Double-track high-speed Northeast Frontier Railway cutting across Mahananda-Apuludong corridor', impactLevel: 'Critical', summary: 'Major bottleneck creating acute human-elephant conflict and frequent train collision mortalities during seasonal migration across North Bengal.' },
  { id: 'threat-5', name: 'Rajaji-Corbett Shivalik Highway & Rail Fragment', lat: 29.95, lng: 78.25, threatType: 'Linear Infrastructure Corridor', infrastructureDetails: 'Haridwar-Dehradun railway & four-lane national highway bisection across Motichur-Kansrao corridor', impactLevel: 'Critical', summary: 'Severely impedes genetic exchange between Western and Eastern bull elephant populations across the Ganges riparian corridor.' },
  { id: 'threat-6', name: 'NH-766 Bandipur Night Traffic Fragmentation', lat: 11.68, lng: 76.58, threatType: 'Linear Infrastructure Corridor', infrastructureDetails: 'Interstate highway through core critical tiger habitat requiring dusk-to-dawn vehicular restrictions', impactLevel: 'High', summary: 'Night traffic restrictions act as vital mitigation against vehicular mortality of nocturnal carnivores and ungulates.' }
];
