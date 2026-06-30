export interface SyllabusReserve {
  id: string;
  name: string;
  state: string;
  type: string;
  established: number;
  forestType: string;
  keySpecies: string[];
  altitude: string;
  rainfall: number;
}

export const syllabusReserves: SyllabusReserve[] = [
  {
    id: 'corbett',
    name: 'Jim Corbett Tiger Reserve',
    state: 'Uttarakhand',
    type: 'Project Tiger Pioneer',
    established: 1973,
    forestType: '3C/C2a Shivalik Sal & Northern Tropical Dry Deciduous',
    keySpecies: ['Bengal Tiger', 'Asiatic Elephant', 'Sal (Shorea robusta)', 'Rohini (Mallotus philippensis)', 'Gharial'],
    altitude: '385m - 1100m ASL',
    rainfall: 1500
  },
  {
    id: 'bandipur',
    name: 'Bandipur Tiger Reserve',
    state: 'Karnataka',
    type: 'Project Tiger Pioneer',
    established: 1973,
    forestType: '5A/C2 Southern Tropical Dry Deciduous & Scrub',
    keySpecies: ['Bengal Tiger', 'Indian Gaur', 'Teak (Tectona grandis)', 'Rosewood (Dalbergia latifolia)', 'Dhole'],
    altitude: '680m - 1454m ASL',
    rainfall: 1100
  },
  {
    id: 'kanha',
    name: 'Kanha Tiger Reserve',
    state: 'Madhya Pradesh',
    type: 'Project Tiger Pioneer',
    established: 1973,
    forestType: '3B/C1C Moist Peninsular Sal & Dry Deciduous Meadow',
    keySpecies: ['Hardground Barasingha', 'Bengal Tiger', 'Sal (Shorea robusta)', 'Saj (Terminalia tomentosa)', 'Indian Leopard'],
    altitude: '450m - 900m ASL',
    rainfall: 1400
  },
  {
    id: 'manas',
    name: 'Manas Tiger Reserve',
    state: 'Assam',
    type: 'Project Tiger Pioneer',
    established: 1973,
    forestType: '1B/C2 Upper Sub-Himalayan Wet Alluvial Grassland & Semi-Evergreen',
    keySpecies: ['Pygmy Hog', 'Golden Langur', 'Assam Roofed Turtle', 'Bonsum (Phoebe goalparensis)', 'Hispid Hare'],
    altitude: '61m - 500m ASL',
    rainfall: 3300
  },
  {
    id: 'melghat',
    name: 'Melghat Tiger Reserve',
    state: 'Maharashtra',
    type: 'Project Tiger Pioneer',
    established: 1973,
    forestType: '5A/C1b Southern Tropical Dry Deciduous Teak Forest',
    keySpecies: ['Bengal Tiger', 'Forest Owlet', 'Teak (Tectona grandis)', 'Tiwas (Ougeinia oojeinensis)', 'Sloth Bear'],
    altitude: '312m - 1178m ASL (Gavilgarh Hills)',
    rainfall: 1350
  },
  {
    id: 'palamau',
    name: 'Palamau Tiger Reserve',
    state: 'Jharkhand',
    type: 'Project Tiger Pioneer',
    established: 1973,
    forestType: '3B/C2 Dry Peninsular Sal & Northern Dry Deciduous',
    keySpecies: ['Bengal Tiger', 'Indian Wolf', 'Sal (Shorea robusta)', 'Palash (Butea monosperma)', 'Four-horned Antelope'],
    altitude: '300m - 1140m ASL',
    rainfall: 1200
  },
  {
    id: 'ranthambore',
    name: 'Ranthambore Tiger Reserve',
    state: 'Rajasthan',
    type: 'Project Tiger Pioneer',
    established: 1973,
    forestType: '5B/C2 Northern Tropical Dry Deciduous & Anogeissus Scrub',
    keySpecies: ['Bengal Tiger', 'Dhok (Anogeissus pendula)', 'Mugger Crocodile', 'Banyan (Ficus benghalensis)', 'Caracal'],
    altitude: '215m - 505m ASL',
    rainfall: 800
  },
  {
    id: 'similipal',
    name: 'Similipal Tiger Reserve',
    state: 'Odisha',
    type: 'Project Tiger Pioneer',
    established: 1973,
    forestType: '3C/C2e Eastern Peninsular Moist Deciduous Sal & Semi-Evergreen',
    keySpecies: ['Melanistic Bengal Tiger', 'Asiatic Elephant', 'Sal (Shorea robusta)', 'Champa (Michelia champaca)', 'Mugger'],
    altitude: '40m - 1168m ASL (Meghasani Peak)',
    rainfall: 1800
  },
  {
    id: 'sundarbans',
    name: 'Sundarbans Tiger Reserve',
    state: 'West Bengal',
    type: 'Project Tiger Pioneer',
    established: 1973,
    forestType: '4B/TS2 Mangrove Littoral & Tidal Swamp Forest',
    keySpecies: ['Royal Bengal Tiger', 'Estuarine Crocodile', 'Sundari (Heritiera fomes)', 'Goran (Ceriops decandra)', 'Water Monitor'],
    altitude: '0m - 10m ASL (Sea Level Estuary)',
    rainfall: 1900
  },
  {
    id: 'periyar',
    name: 'Periyar Tiger Reserve',
    state: 'Kerala',
    type: 'Expansion Phase I',
    established: 1978,
    forestType: '1A/C3 West Coast Tropical Wet Evergreen & Moist Deciduous',
    keySpecies: ['Asiatic Elephant', 'Nilgiri Langur', 'Vellapine (Vateria indica)', 'Rosewood', 'Travancore Flying Squirrel'],
    altitude: '100m - 2019m ASL',
    rainfall: 2500
  },
  {
    id: 'sariska',
    name: 'Sariska Tiger Reserve',
    state: 'Rajasthan',
    type: 'Expansion Phase I',
    established: 1978,
    forestType: '5B/C1 Northern Tropical Dry Deciduous & Scrub',
    keySpecies: ['Bengal Tiger', 'Dhok (Anogeissus pendula)', 'Salar (Boswellia serrata)', 'Golden Jackal', 'Peafowl'],
    altitude: '300m - 740m ASL',
    rainfall: 650
  },
  {
    id: 'buxa',
    name: 'Buxa Tiger Reserve',
    state: 'West Bengal',
    type: 'Expansion Phase II',
    established: 1982,
    forestType: '3C/C1b Sub-Himalayan Secondary Moist Deciduous & Riverine',
    keySpecies: ['Clouded Leopard', 'Assamese Macaque', 'Sal (Shorea robusta)', 'Simul (Bombax ceiba)', 'Asian Elephant'],
    altitude: '60m - 1750m ASL',
    rainfall: 4100
  },
  {
    id: 'indravati',
    name: 'Indravati Tiger Reserve',
    state: 'Chhattisgarh',
    type: 'Expansion Phase II',
    established: 1982,
    forestType: '3B/C1C Slightly Moist Teak & Dry Mixed Deciduous',
    keySpecies: ['Wild Water Buffalo (Bubalus arnee)', 'Bengal Tiger', 'Teak (Tectona grandis)', 'Lendia (Lagerstroemia)', 'Hill Myna'],
    altitude: '177m - 599m ASL',
    rainfall: 1550
  },
  {
    id: 'nagarjunasagar',
    name: 'Nagarjunasagar Srisailam Reserve',
    state: 'Andhra Pradesh',
    type: 'Largest Tiger Reserve',
    established: 1982,
    forestType: '5A/C3 Southern Tropical Dry Mixed Deciduous & Hardwickia Tracts',
    keySpecies: ['Bengal Tiger', 'Indian Leopard', 'Hardwickia binata', 'Anjan', 'Sloth Bear'],
    altitude: '100m - 917m ASL (Nallamala Hills)',
    rainfall: 1000
  },
  {
    id: 'namdapha',
    name: 'Namdapha Tiger Reserve',
    state: 'Arunachal Pradesh',
    type: 'Eastern Himalaya Dipterocarp',
    established: 1982,
    forestType: '1B/C1 Northern Tropical Wet Evergreen Dipterocarp Forest',
    keySpecies: ['Snow Leopard', 'Clouded Leopard', 'Hoolock Gibbon', 'Hollong (Dipterocarpus macrocarpus)', 'Hornbill'],
    altitude: '200m - 4571m ASL',
    rainfall: 3500
  },
  {
    id: 'dudhwa',
    name: 'Dudhwa Tiger Reserve',
    state: 'Uttar Pradesh',
    type: 'Terai Arc Landscape',
    established: 1987,
    forestType: '3C/C2b Terai Alluvial Sal & Moist Tall Grassland',
    keySpecies: ['One-horned Rhinoceros', 'Swamp Deer (Barasingha)', 'Sal (Shorea robusta)', 'Sissoo (Dalbergia sissoo)', 'Bengal Florican'],
    altitude: '150m - 182m ASL',
    rainfall: 1600
  },
  {
    id: 'kalakad',
    name: 'Kalakad Mundanthurai Tiger Reserve',
    state: 'Tamil Nadu',
    type: 'Agasthyamalai Southern Ghats',
    established: 1988,
    forestType: '1A/C4 West Coast Tropical Wet Evergreen Sholas & Pods',
    keySpecies: ['Lion-tailed Macaque', 'Nilgiri Tahr', 'Cullenia exarillata', 'Aglaia elaeagnoidea', 'Leopard Cat'],
    altitude: '40m - 1868m ASL',
    rainfall: 2800
  },
  {
    id: 'valmiki',
    name: 'Valmiki Tiger Reserve',
    state: 'Bihar',
    type: 'Shivalik Terai Belt',
    established: 1989,
    forestType: '3C/C2b Bhabar Alluvial Sal & Moist Mixed Deciduous',
    keySpecies: ['Bengal Tiger', 'Indian Flying Fox', 'Sal (Shorea robusta)', 'Asan (Terminalia elliptica)', 'Sloth Bear'],
    altitude: '125m - 880m ASL',
    rainfall: 1450
  },
  {
    id: 'pench-mp',
    name: 'Pench Tiger Reserve (MP)',
    state: 'Madhya Pradesh',
    type: 'Satpura-Maikal Corridor',
    established: 1992,
    forestType: '5A/C1b Southern Tropical Dry Deciduous Teak Forest',
    keySpecies: ['Bengal Tiger', 'Indian Wild Dog (Dhole)', 'Teak (Tectona grandis)', 'Mahua (Madhuca indica)', 'Indian Gaur'],
    altitude: '425m - 620m ASL',
    rainfall: 1300
  },
  {
    id: 'tadoba',
    name: 'Tadoba Andhari Tiger Reserve',
    state: 'Maharashtra',
    type: 'Central Indian Landscape',
    established: 1993,
    forestType: '5A/C1b Southern Tropical Dry Deciduous Teak & Bamboo Tracts',
    keySpecies: ['Bengal Tiger', 'Marsh Crocodile', 'Teak (Tectona grandis)', 'Ain (Terminalia elliptica)', 'Dendrocalamus strictus'],
    altitude: '200m - 350m ASL',
    rainfall: 1175
  },
  {
    id: 'bandhavgarh',
    name: 'Bandhavgarh Tiger Reserve',
    state: 'Madhya Pradesh',
    type: 'High Density Habitat',
    established: 1993,
    forestType: '3B/C1C Moist Peninsular Sal & Bamboo Meadows',
    keySpecies: ['Bengal Tiger', 'Indian Gaur (Reintroduced)', 'Sal (Shorea robusta)', 'Saj (Terminalia alata)', 'Vulture'],
    altitude: '440m - 811m ASL',
    rainfall: 1180
  },
  {
    id: 'panna',
    name: 'Panna Tiger Reserve',
    state: 'Madhya Pradesh',
    type: 'Vindhyan Range Recovery',
    established: 1994,
    forestType: '5B/C1C Northern Tropical Dry Deciduous Mixed Forest',
    keySpecies: ['Bengal Tiger', 'Gharial (Ken River)', 'Kardhai (Anogeissus pendula)', 'Khair (Acacia catechu)', 'Sloth Bear'],
    altitude: '212m - 520m ASL',
    rainfall: 1100
  },
  {
    id: 'pakke',
    name: 'Pakke Tiger Reserve',
    state: 'Arunachal Pradesh',
    type: 'Eastern Himalaya Biodiversity',
    established: 1999,
    forestType: '2B/C1 Assam Valley Tropical Semi-Evergreen Forest',
    keySpecies: ['Wreathed Hornbill', 'Clouded Leopard', 'Tetrameles nudiflora', 'Terminalia myriocarpa', 'Capped Langur'],
    altitude: '150m - 2000m ASL',
    rainfall: 2500
  },
  {
    id: 'satpura',
    name: 'Satpura Tiger Reserve',
    state: 'Madhya Pradesh',
    type: 'Pachmarhi Biosphere Core',
    established: 1999,
    forestType: '3B/C2 Central Indian Moist Deciduous Sal & Teak Transition',
    keySpecies: ['Indian Giant Squirrel', 'Bengal Tiger', 'Sal (Shorea robusta)', 'Teak (Tectona grandis)', 'Tree Fern (Cyathea)'],
    altitude: '300m - 1352m ASL (Dhupgarh Peak)',
    rainfall: 1550
  },
  {
    id: 'kaziranga',
    name: 'Kaziranga Tiger Reserve',
    state: 'Assam',
    type: 'Brahmaputra Floodplain Core',
    established: 2008,
    forestType: '4D/SS2 Eastern Wet Alluvial Grassland & Semi-Evergreen',
    keySpecies: ['Great Indian One-horned Rhinoceros', 'Bengal Tiger', 'Elephant Grass (Saccharum)', 'Simul (Bombax ceiba)', 'Swamp Deer'],
    altitude: '40m - 80m ASL',
    rainfall: 2200
  },
  {
    id: 'mudumalai',
    name: 'Mudumalai Tiger Reserve',
    state: 'Tamil Nadu',
    type: 'Nilgiri Biosphere Tri-Junction',
    established: 2008,
    forestType: '3B/C2 Southern Moist Mixed Deciduous & Tropical Thorn Scrub',
    keySpecies: ['Asiatic Elephant', 'Indian Leopard', 'Teak', 'Mathi (Terminalia crenulata)', 'Chital'],
    altitude: '960m - 1266m ASL',
    rainfall: 1400
  },
  {
    id: 'anamalai',
    name: 'Anamalai Tiger Reserve',
    state: 'Tamil Nadu',
    type: 'Southern Western Ghats',
    established: 2008,
    forestType: '1A/C4 Tropical Wet Evergreen Sholas & Montane Grasslands',
    keySpecies: ['Nilgiri Tahr', 'Lion-tailed Macaque', 'Mesua ferrea', 'Hopea parviflora', 'Great Hornbill'],
    altitude: '340m - 2513m ASL',
    rainfall: 3000
  },
  {
    id: 'sahyadri',
    name: 'Sahyadri Tiger Reserve',
    state: 'Maharashtra',
    type: 'Northern Western Ghats Crest',
    established: 2010,
    forestType: '2A/C2 West Coast Semi-Evergreen & Montane Scrub Shola',
    keySpecies: ['Bengal Tiger', 'Indian Giant Squirrel', 'Anjani (Memecylon umbellatum)', 'Jamun (Syzygium cumini)', 'Barking Deer'],
    altitude: '500m - 1180m ASL',
    rainfall: 3500
  },
  {
    id: 'pilibhit',
    name: 'Pilibhit Tiger Reserve',
    state: 'Uttar Pradesh',
    type: 'Upper Gangetic Plain Terai',
    established: 2014,
    forestType: '3C/C2b Alluvial Terai Sal & Tall Riverine Grasslands',
    keySpecies: ['Bengal Tiger', 'Hispid Hare', 'Sal (Shorea robusta)', 'Asna (Terminalia alata)', 'Sarus Crane'],
    altitude: '160m - 185m ASL',
    rainfall: 1300
  },
  {
    id: 'rajaji',
    name: 'Rajaji Tiger Reserve',
    state: 'Uttarakhand',
    type: 'Shivalik Elephant & Tiger Corridor',
    established: 2015,
    forestType: '5B/C2 Shivalik Tropical Dry Deciduous & Mixed Forest',
    keySpecies: ['Asiatic Elephant', 'King Cobra', 'Rohini (Mallotus philippensis)', 'Sal (Shorea robusta)', 'Goral'],
    altitude: '300m - 1350m ASL',
    rainfall: 1450
  },
  {
    id: 'kamlang',
    name: 'Kamlang Tiger Reserve',
    state: 'Arunachal Pradesh',
    type: 'Trans-Border Forest Complex',
    established: 2016,
    forestType: '1B/C1 Sub-Tropical Wet Evergreen Dipterocarp & Alpine Meadows',
    keySpecies: ['Hoolock Gibbon', 'Takao (Boudha)', 'Terminalia myriocarpa', 'Himalayan Black Bear', 'Blyth’s Tragopan'],
    altitude: '300m - 4500m ASL',
    rainfall: 3200
  },
  {
    id: 'ramgarh',
    name: 'Ramgarh Vishdhari Tiger Reserve',
    state: 'Rajasthan',
    type: 'Ranthambore-Mukundra Corridor',
    established: 2022,
    forestType: '5B/C2 Northern Tropical Dry Deciduous Scrub & Dhok Tracts',
    keySpecies: ['Bengal Tiger', 'Sloth Bear', 'Dhok (Anogeissus pendula)', 'Khair (Acacia catechu)', 'Indian Wolf'],
    altitude: '230m - 500m ASL',
    rainfall: 700
  },
  {
    id: 'veerangana',
    name: 'Veerangana Durgavati Tiger Reserve',
    state: 'Madhya Pradesh',
    type: 'Nauradehi-Durgavati Link',
    established: 2023,
    forestType: '5A/C1b Southern Mixed Dry Deciduous Teak & Scrub',
    keySpecies: ['Bengal Tiger', 'Indian Wolf', 'Teak (Tectona grandis)', 'Tendu (Diospyros melanoxylon)', 'Chinkara'],
    altitude: '350m - 680m ASL',
    rainfall: 1150
  },
  {
    id: 'guru-ghasidas',
    name: 'Guru Ghasidas - Tamor Pingla Reserve',
    state: 'Chhattisgarh',
    type: '55th Official NTCA Reserve',
    established: 2024,
    forestType: '3B/C1C Central Peninsular Moist & Dry Mixed Sal Forest',
    keySpecies: ['Bengal Tiger', 'Asiatic Elephant', 'Sal (Shorea robusta)', 'Mahua (Madhuca longifolia)', 'Four-horned Antelope'],
    altitude: '300m - 1033m ASL',
    rainfall: 1400
  }
];
