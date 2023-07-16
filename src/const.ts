export const EVE_IMAGE_URL = "https://images.evetech.net";
export const EXTRACTOR_TYPE_IDS = [
  2848, 3060, 3061, 3062, 3063, 3064, 3067, 3068,
];

export const PI_TYPES_MAP: Record<number, { group_id: number; name: string }> =
  {
    44: { group_id: 1034, name: "Enriched Uranium" },
    2073: { group_id: 1035, name: "Microorganisms" },
    2256: { group_id: 1030, name: "Temperate Launchpad" },
    2257: { group_id: 1029, name: "Ice Storage Facility" },
    2267: { group_id: 1032, name: "Base Metals" },
    2268: { group_id: 1033, name: "Aqueous Liquids" },
    2270: { group_id: 1032, name: "Noble Metals" },
    2272: { group_id: 1032, name: "Heavy Metals" },
    2286: { group_id: 1035, name: "Planktic Colonies" },
    2287: { group_id: 1035, name: "Complex Organisms" },
    2288: { group_id: 1035, name: "Carbon Compounds" },
    2305: { group_id: 1035, name: "Autotrophs" },
    2306: { group_id: 1032, name: "Non-CS Crystals" },
    2307: { group_id: 1032, name: "Felsic Magma" },
    2308: { group_id: 1033, name: "Suspended Plasma" },
    2309: { group_id: 1033, name: "Ionic Solutions" },
    2310: { group_id: 1033, name: "Noble Gas" },
    2311: { group_id: 1033, name: "Reactive Gas" },
    2312: { group_id: 1034, name: "Supertensile Plastics" },
    2317: { group_id: 1034, name: "Oxides" },
    2319: { group_id: 1034, name: "Test Cultures" },
    2321: { group_id: 1034, name: "Polyaramids" },
    2327: { group_id: 1034, name: "Microfiber Shielding" },
    2328: { group_id: 1034, name: "Water-Cooled CPU" },
    2329: { group_id: 1034, name: "Biocells" },
    2344: { group_id: 1040, name: "Condensates" },
    2345: { group_id: 1040, name: "Camera Drones" },
    2346: { group_id: 1040, name: "Synthetic Synapses" },
    2348: { group_id: 1040, name: "Gel-Matrix Biopaste" },
    2349: { group_id: 1040, name: "Supercomputers" },
    2351: { group_id: 1040, name: "Smartfab Units" },
    2352: { group_id: 1040, name: "Nuclear Reactors" },
    2354: { group_id: 1040, name: "Neocoms" },
    2358: { group_id: 1040, name: "Biotech Research Reports" },
    2360: { group_id: 1040, name: "Industrial Explosives" },
    2361: { group_id: 1040, name: "Hermetic Membranes" },
    2366: { group_id: 1040, name: "Hazmat Detection Systems" },
    2367: { group_id: 1040, name: "Cryoprotectant Solution" },
    2389: { group_id: 1042, name: "Plasmoids" },
    2390: { group_id: 1042, name: "Electrolytes" },
    2392: { group_id: 1042, name: "Oxidizing Compound" },
    2393: { group_id: 1042, name: "Bacteria" },
    2395: { group_id: 1042, name: "Proteins" },
    2396: { group_id: 1042, name: "Biofuels" },
    2397: { group_id: 1042, name: "Industrial Fibers" },
    2398: { group_id: 1042, name: "Reactive Metals" },
    2399: { group_id: 1042, name: "Precious Metals" },
    2400: { group_id: 1042, name: "Toxic Metals" },
    2401: { group_id: 1042, name: "Chiral Structures" },
    2463: { group_id: 1034, name: "Nanites" },
    2469: { group_id: 1028, name: "Lava Basic Industry Facility" },
    2470: { group_id: 1028, name: "Lava Advanced Industry Facility" },
    2471: { group_id: 1028, name: "Plasma Basic Industry Facility" },
    2472: { group_id: 1028, name: "Plasma Advanced Industry Facility" },
    2473: { group_id: 1028, name: "Barren Basic Industry Facility" },
    2474: { group_id: 1028, name: "Barren Advanced Industry Facility" },
    2475: { group_id: 1028, name: "Barren High-Tech Production Plant" },
    2480: { group_id: 1028, name: "Temperate Advanced Industry Facility" },
    2481: { group_id: 1028, name: "Temperate Basic Industry Facility" },
    2482: { group_id: 1028, name: "Temperate High-Tech Production Plant" },
    2483: { group_id: 1028, name: "Storm Basic Industry Facility" },
    2484: { group_id: 1028, name: "Storm Advanced Industry Facility" },
    2485: { group_id: 1028, name: "Oceanic Advanced Industry Facility" },
    2490: { group_id: 1028, name: "Oceanic Basic Industry Facility" },
    2491: { group_id: 1028, name: "Ice Advanced Industry Facility" },
    2492: { group_id: 1028, name: "Gas Basic Industry Facility" },
    2493: { group_id: 1028, name: "Ice Basic Industry Facility" },
    2494: { group_id: 1028, name: "Gas Advanced Industry Facility" },
    2535: { group_id: 1029, name: "Oceanic Storage Facility" },
    2536: { group_id: 1029, name: "Gas Storage Facility" },
    2541: { group_id: 1029, name: "Barren Storage Facility" },
    2542: { group_id: 1030, name: "Oceanic Launchpad" },
    2543: { group_id: 1030, name: "Gas Launchpad" },
    2544: { group_id: 1030, name: "Barren Launchpad" },
    2552: { group_id: 1030, name: "Ice Launchpad" },
    2555: { group_id: 1030, name: "Lava Launchpad" },
    2556: { group_id: 1030, name: "Plasma Launchpad" },
    2557: { group_id: 1030, name: "Storm Launchpad" },
    2558: { group_id: 1029, name: "Lava Storage Facility" },
    2560: { group_id: 1029, name: "Plasma Storage Facility" },
    2561: { group_id: 1029, name: "Storm Storage Facility" },
    2562: { group_id: 1029, name: "Temperate Storage Facility" },
    2848: { group_id: 1063, name: "Barren Extractor Control Unit" },
    2867: { group_id: 1041, name: "Broadcast Node" },
    2868: { group_id: 1041, name: "Integrity Response Drones" },
    2869: { group_id: 1041, name: "Nano-Factory" },
    2870: { group_id: 1041, name: "Organic Mortar Applicators" },
    2871: { group_id: 1041, name: "Recursive Computing Module" },
    2872: { group_id: 1041, name: "Self-Harmonizing Power Core" },
    2875: { group_id: 1041, name: "Sterile Conduits" },
    2876: { group_id: 1041, name: "Wetware Mainframe" },
    3060: { group_id: 1063, name: "Gas Extractor Control Unit" },
    3061: { group_id: 1063, name: "Ice Extractor Control Unit" },
    3062: { group_id: 1063, name: "Lava Extractor Control Unit" },
    3063: { group_id: 1063, name: "Oceanic Extractor Control Unit" },
    3064: { group_id: 1063, name: "Plasma Extractor Control Unit" },
    3067: { group_id: 1063, name: "Storm Extractor Control Unit" },
    3068: { group_id: 1063, name: "Temperate Extractor Control Unit" },
    3645: { group_id: 1042, name: "Water" },
    3683: { group_id: 1042, name: "Oxygen" },
    3689: { group_id: 1034, name: "Mechanical Parts" },
    3691: { group_id: 1034, name: "Synthetic Oil" },
    3693: { group_id: 1034, name: "Fertilizer" },
    3695: { group_id: 1034, name: "Polytextiles" },
    3697: { group_id: 1034, name: "Silicate Glass" },
    3725: { group_id: 1034, name: "Livestock" },
    3775: { group_id: 1034, name: "Viral Agent" },
    3779: { group_id: 1042, name: "Biomass" },
    3828: { group_id: 1034, name: "Construction Blocks" },
    9828: { group_id: 1042, name: "Silicon" },
    9830: { group_id: 1034, name: "Rocket Fuel" },
    9832: { group_id: 1034, name: "Coolant" },
    9834: { group_id: 1040, name: "Guidance Systems" },
    9836: { group_id: 1034, name: "Consumer Electronics" },
    9838: { group_id: 1034, name: "Superconductors" },
    9840: { group_id: 1034, name: "Transmitter" },
    9842: { group_id: 1034, name: "Miniature Electronics" },
    9846: { group_id: 1040, name: "Planetary Vehicles" },
    9848: { group_id: 1040, name: "Robotics" },
    12836: { group_id: 1040, name: "Transcranial Microcontrollers" },
    15317: { group_id: 1034, name: "Genetically Enhanced Livestock" },
    17136: { group_id: 1040, name: "Ukomi Superconductors" },
    17392: { group_id: 1040, name: "Data Chips" },
    17898: { group_id: 1040, name: "High-Tech Transmitters" },
    28974: { group_id: 1040, name: "Vaccines" },
  };

export const PI_TYPES_ARRAY = [
  { type_id: 2469, group_id: 1028, name: "Lava Basic Industry Facility" },
  { type_id: 2470, group_id: 1028, name: "Lava Advanced Industry Facility" },
  { type_id: 2471, group_id: 1028, name: "Plasma Basic Industry Facility" },
  { type_id: 2472, group_id: 1028, name: "Plasma Advanced Industry Facility" },
  { type_id: 2473, group_id: 1028, name: "Barren Basic Industry Facility" },
  { type_id: 2474, group_id: 1028, name: "Barren Advanced Industry Facility" },
  { type_id: 2475, group_id: 1028, name: "Barren High-Tech Production Plant" },
  {
    type_id: 2480,
    group_id: 1028,
    name: "Temperate Advanced Industry Facility",
  },
  { type_id: 2481, group_id: 1028, name: "Temperate Basic Industry Facility" },
  {
    type_id: 2482,
    group_id: 1028,
    name: "Temperate High-Tech Production Plant",
  },
  { type_id: 2483, group_id: 1028, name: "Storm Basic Industry Facility" },
  { type_id: 2484, group_id: 1028, name: "Storm Advanced Industry Facility" },
  { type_id: 2485, group_id: 1028, name: "Oceanic Advanced Industry Facility" },
  { type_id: 2490, group_id: 1028, name: "Oceanic Basic Industry Facility" },
  { type_id: 2491, group_id: 1028, name: "Ice Advanced Industry Facility" },
  { type_id: 2492, group_id: 1028, name: "Gas Basic Industry Facility" },
  { type_id: 2493, group_id: 1028, name: "Ice Basic Industry Facility" },
  { type_id: 2494, group_id: 1028, name: "Gas Advanced Industry Facility" },
  { type_id: 2848, group_id: 1063, name: "Barren Extractor Control Unit" },
  { type_id: 3060, group_id: 1063, name: "Gas Extractor Control Unit" },
  { type_id: 3061, group_id: 1063, name: "Ice Extractor Control Unit" },
  { type_id: 3062, group_id: 1063, name: "Lava Extractor Control Unit" },
  { type_id: 3063, group_id: 1063, name: "Oceanic Extractor Control Unit" },
  { type_id: 3064, group_id: 1063, name: "Plasma Extractor Control Unit" },
  { type_id: 3067, group_id: 1063, name: "Storm Extractor Control Unit" },
  { type_id: 3068, group_id: 1063, name: "Temperate Extractor Control Unit" },
  { type_id: 2257, group_id: 1029, name: "Ice Storage Facility" },
  { type_id: 2535, group_id: 1029, name: "Oceanic Storage Facility" },
  { type_id: 2536, group_id: 1029, name: "Gas Storage Facility" },
  { type_id: 2541, group_id: 1029, name: "Barren Storage Facility" },
  { type_id: 2558, group_id: 1029, name: "Lava Storage Facility" },
  { type_id: 2560, group_id: 1029, name: "Plasma Storage Facility" },
  { type_id: 2561, group_id: 1029, name: "Storm Storage Facility" },
  { type_id: 2562, group_id: 1029, name: "Temperate Storage Facility" },
  { type_id: 2256, group_id: 1030, name: "Temperate Launchpad" },
  { type_id: 2542, group_id: 1030, name: "Oceanic Launchpad" },
  { type_id: 2543, group_id: 1030, name: "Gas Launchpad" },
  { type_id: 2544, group_id: 1030, name: "Barren Launchpad" },
  { type_id: 2552, group_id: 1030, name: "Ice Launchpad" },
  { type_id: 2555, group_id: 1030, name: "Lava Launchpad" },
  { type_id: 2556, group_id: 1030, name: "Plasma Launchpad" },
  { type_id: 2557, group_id: 1030, name: "Storm Launchpad" },
  { type_id: 2267, group_id: 1032, name: "Base Metals" },
  { type_id: 2270, group_id: 1032, name: "Noble Metals" },
  { type_id: 2272, group_id: 1032, name: "Heavy Metals" },
  { type_id: 2306, group_id: 1032, name: "Non-CS Crystals" },
  { type_id: 2307, group_id: 1032, name: "Felsic Magma" },
  { type_id: 2268, group_id: 1033, name: "Aqueous Liquids" },
  { type_id: 2308, group_id: 1033, name: "Suspended Plasma" },
  { type_id: 2309, group_id: 1033, name: "Ionic Solutions" },
  { type_id: 2310, group_id: 1033, name: "Noble Gas" },
  { type_id: 2311, group_id: 1033, name: "Reactive Gas" },
  { type_id: 44, group_id: 1034, name: "Enriched Uranium" },
  { type_id: 2312, group_id: 1034, name: "Supertensile Plastics" },
  { type_id: 2317, group_id: 1034, name: "Oxides" },
  { type_id: 2319, group_id: 1034, name: "Test Cultures" },
  { type_id: 2321, group_id: 1034, name: "Polyaramids" },
  { type_id: 2327, group_id: 1034, name: "Microfiber Shielding" },
  { type_id: 2328, group_id: 1034, name: "Water-Cooled CPU" },
  { type_id: 2329, group_id: 1034, name: "Biocells" },
  { type_id: 2463, group_id: 1034, name: "Nanites" },
  { type_id: 3689, group_id: 1034, name: "Mechanical Parts" },
  { type_id: 3691, group_id: 1034, name: "Synthetic Oil" },
  { type_id: 3693, group_id: 1034, name: "Fertilizer" },
  { type_id: 3695, group_id: 1034, name: "Polytextiles" },
  { type_id: 3697, group_id: 1034, name: "Silicate Glass" },
  { type_id: 3725, group_id: 1034, name: "Livestock" },
  { type_id: 3775, group_id: 1034, name: "Viral Agent" },
  { type_id: 3828, group_id: 1034, name: "Construction Blocks" },
  { type_id: 9830, group_id: 1034, name: "Rocket Fuel" },
  { type_id: 9832, group_id: 1034, name: "Coolant" },
  { type_id: 9836, group_id: 1034, name: "Consumer Electronics" },
  { type_id: 9838, group_id: 1034, name: "Superconductors" },
  { type_id: 9840, group_id: 1034, name: "Transmitter" },
  { type_id: 9842, group_id: 1034, name: "Miniature Electronics" },
  { type_id: 15317, group_id: 1034, name: "Genetically Enhanced Livestock" },
  { type_id: 2073, group_id: 1035, name: "Microorganisms" },
  { type_id: 2286, group_id: 1035, name: "Planktic Colonies" },
  { type_id: 2287, group_id: 1035, name: "Complex Organisms" },
  { type_id: 2288, group_id: 1035, name: "Carbon Compounds" },
  { type_id: 2305, group_id: 1035, name: "Autotrophs" },
  { type_id: 2344, group_id: 1040, name: "Condensates" },
  { type_id: 2345, group_id: 1040, name: "Camera Drones" },
  { type_id: 2346, group_id: 1040, name: "Synthetic Synapses" },
  { type_id: 2348, group_id: 1040, name: "Gel-Matrix Biopaste" },
  { type_id: 2349, group_id: 1040, name: "Supercomputers" },
  { type_id: 2351, group_id: 1040, name: "Smartfab Units" },
  { type_id: 2352, group_id: 1040, name: "Nuclear Reactors" },
  { type_id: 2354, group_id: 1040, name: "Neocoms" },
  { type_id: 2358, group_id: 1040, name: "Biotech Research Reports" },
  { type_id: 2360, group_id: 1040, name: "Industrial Explosives" },
  { type_id: 2361, group_id: 1040, name: "Hermetic Membranes" },
  { type_id: 2366, group_id: 1040, name: "Hazmat Detection Systems" },
  { type_id: 2367, group_id: 1040, name: "Cryoprotectant Solution" },
  { type_id: 9834, group_id: 1040, name: "Guidance Systems" },
  { type_id: 9846, group_id: 1040, name: "Planetary Vehicles" },
  { type_id: 9848, group_id: 1040, name: "Robotics" },
  { type_id: 12836, group_id: 1040, name: "Transcranial Microcontrollers" },
  { type_id: 17136, group_id: 1040, name: "Ukomi Superconductors" },
  { type_id: 17392, group_id: 1040, name: "Data Chips" },
  { type_id: 17898, group_id: 1040, name: "High-Tech Transmitters" },
  { type_id: 28974, group_id: 1040, name: "Vaccines" },
  { type_id: 2867, group_id: 1041, name: "Broadcast Node" },
  { type_id: 2868, group_id: 1041, name: "Integrity Response Drones" },
  { type_id: 2869, group_id: 1041, name: "Nano-Factory" },
  { type_id: 2870, group_id: 1041, name: "Organic Mortar Applicators" },
  { type_id: 2871, group_id: 1041, name: "Recursive Computing Module" },
  { type_id: 2872, group_id: 1041, name: "Self-Harmonizing Power Core" },
  { type_id: 2875, group_id: 1041, name: "Sterile Conduits" },
  { type_id: 2876, group_id: 1041, name: "Wetware Mainframe" },
  { type_id: 2389, group_id: 1042, name: "Plasmoids" },
  { type_id: 2390, group_id: 1042, name: "Electrolytes" },
  { type_id: 2392, group_id: 1042, name: "Oxidizing Compound" },
  { type_id: 2393, group_id: 1042, name: "Bacteria" },
  { type_id: 2395, group_id: 1042, name: "Proteins" },
  { type_id: 2396, group_id: 1042, name: "Biofuels" },
  { type_id: 2397, group_id: 1042, name: "Industrial Fibers" },
  { type_id: 2398, group_id: 1042, name: "Reactive Metals" },
  { type_id: 2399, group_id: 1042, name: "Precious Metals" },
  { type_id: 2400, group_id: 1042, name: "Toxic Metals" },
  { type_id: 2401, group_id: 1042, name: "Chiral Structures" },
  { type_id: 3645, group_id: 1042, name: "Water" },
  { type_id: 3683, group_id: 1042, name: "Oxygen" },
  { type_id: 3779, group_id: 1042, name: "Biomass" },
  { type_id: 9828, group_id: 1042, name: "Silicon" },
];

export const PI_SCHEMATICS = [
  {
    name: "Superconductors",
    cycle_time: 3600,
    schematic_id: 65,
    inputs: [
      { schematic_id: 65, type_id: 2389, quantity: 40, is_input: 1 },
      { schematic_id: 65, type_id: 3645, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 65, type_id: 9838, quantity: 5, is_input: 0 }],
  },
  {
    name: "Coolant",
    cycle_time: 3600,
    schematic_id: 66,
    inputs: [
      { schematic_id: 66, type_id: 3645, quantity: 40, is_input: 1 },
      { schematic_id: 66, type_id: 2390, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 66, type_id: 9832, quantity: 5, is_input: 0 }],
  },
  {
    name: "Rocket Fuel",
    cycle_time: 3600,
    schematic_id: 67,
    inputs: [
      { schematic_id: 67, type_id: 2390, quantity: 40, is_input: 1 },
      { schematic_id: 67, type_id: 2389, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 67, type_id: 9830, quantity: 5, is_input: 0 }],
  },
  {
    name: "Synthetic Oil",
    cycle_time: 3600,
    schematic_id: 68,
    inputs: [
      { schematic_id: 68, type_id: 3683, quantity: 40, is_input: 1 },
      { schematic_id: 68, type_id: 2390, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 68, type_id: 3691, quantity: 5, is_input: 0 }],
  },
  {
    name: "Oxides",
    cycle_time: 3600,
    schematic_id: 69,
    inputs: [
      { schematic_id: 69, type_id: 2392, quantity: 40, is_input: 1 },
      { schematic_id: 69, type_id: 3683, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 69, type_id: 2317, quantity: 5, is_input: 0 }],
  },
  {
    name: "Silicate Glass",
    cycle_time: 3600,
    schematic_id: 70,
    inputs: [
      { schematic_id: 70, type_id: 2392, quantity: 40, is_input: 1 },
      { schematic_id: 70, type_id: 9828, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 70, type_id: 3697, quantity: 5, is_input: 0 }],
  },
  {
    name: "Transmitter",
    cycle_time: 3600,
    schematic_id: 71,
    inputs: [
      { schematic_id: 71, type_id: 2401, quantity: 40, is_input: 1 },
      { schematic_id: 71, type_id: 2389, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 71, type_id: 9840, quantity: 5, is_input: 0 }],
  },
  {
    name: "Water-Cooled CPU",
    cycle_time: 3600,
    schematic_id: 72,
    inputs: [
      { schematic_id: 72, type_id: 3645, quantity: 40, is_input: 1 },
      { schematic_id: 72, type_id: 2398, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 72, type_id: 2328, quantity: 5, is_input: 0 }],
  },
  {
    name: "Mechanical Parts",
    cycle_time: 3600,
    schematic_id: 73,
    inputs: [
      { schematic_id: 73, type_id: 2398, quantity: 40, is_input: 1 },
      { schematic_id: 73, type_id: 2399, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 73, type_id: 3689, quantity: 5, is_input: 0 }],
  },
  {
    name: "Construction Blocks",
    cycle_time: 3600,
    schematic_id: 74,
    inputs: [
      { schematic_id: 74, type_id: 2400, quantity: 40, is_input: 1 },
      { schematic_id: 74, type_id: 2398, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 74, type_id: 3828, quantity: 5, is_input: 0 }],
  },
  {
    name: "Enriched Uranium",
    cycle_time: 3600,
    schematic_id: 75,
    inputs: [
      { schematic_id: 75, type_id: 2400, quantity: 40, is_input: 1 },
      { schematic_id: 75, type_id: 2399, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 75, type_id: 44, quantity: 5, is_input: 0 }],
  },
  {
    name: "Consumer Electronics",
    cycle_time: 3600,
    schematic_id: 76,
    inputs: [
      { schematic_id: 76, type_id: 2400, quantity: 40, is_input: 1 },
      { schematic_id: 76, type_id: 2401, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 76, type_id: 9836, quantity: 5, is_input: 0 }],
  },
  {
    name: "Miniature Electronics",
    cycle_time: 3600,
    schematic_id: 77,
    inputs: [
      { schematic_id: 77, type_id: 2401, quantity: 40, is_input: 1 },
      { schematic_id: 77, type_id: 9828, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 77, type_id: 9842, quantity: 5, is_input: 0 }],
  },
  {
    name: "Nanites",
    cycle_time: 3600,
    schematic_id: 78,
    inputs: [
      { schematic_id: 78, type_id: 2393, quantity: 40, is_input: 1 },
      { schematic_id: 78, type_id: 2398, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 78, type_id: 2463, quantity: 5, is_input: 0 }],
  },
  {
    name: "Biocells",
    cycle_time: 3600,
    schematic_id: 79,
    inputs: [
      { schematic_id: 79, type_id: 2396, quantity: 40, is_input: 1 },
      { schematic_id: 79, type_id: 2399, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 79, type_id: 2329, quantity: 5, is_input: 0 }],
  },
  {
    name: "Microfiber Shielding",
    cycle_time: 3600,
    schematic_id: 80,
    inputs: [
      { schematic_id: 80, type_id: 9828, quantity: 40, is_input: 1 },
      { schematic_id: 80, type_id: 2397, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 80, type_id: 2327, quantity: 5, is_input: 0 }],
  },
  {
    name: "Viral Agent",
    cycle_time: 3600,
    schematic_id: 81,
    inputs: [
      { schematic_id: 81, type_id: 2393, quantity: 40, is_input: 1 },
      { schematic_id: 81, type_id: 3779, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 81, type_id: 3775, quantity: 5, is_input: 0 }],
  },
  {
    name: "Fertilizer",
    cycle_time: 3600,
    schematic_id: 82,
    inputs: [
      { schematic_id: 82, type_id: 2393, quantity: 40, is_input: 1 },
      { schematic_id: 82, type_id: 2395, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 82, type_id: 3693, quantity: 5, is_input: 0 }],
  },
  {
    name: "Genetically Enhanced Livestock",
    cycle_time: 3600,
    schematic_id: 83,
    inputs: [
      { schematic_id: 83, type_id: 2395, quantity: 40, is_input: 1 },
      { schematic_id: 83, type_id: 3779, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 83, type_id: 15317, quantity: 5, is_input: 0 }],
  },
  {
    name: "Livestock",
    cycle_time: 3600,
    schematic_id: 84,
    inputs: [
      { schematic_id: 84, type_id: 2395, quantity: 40, is_input: 1 },
      { schematic_id: 84, type_id: 2396, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 84, type_id: 3725, quantity: 5, is_input: 0 }],
  },
  {
    name: "Polytextiles",
    cycle_time: 3600,
    schematic_id: 85,
    inputs: [
      { schematic_id: 85, type_id: 2396, quantity: 40, is_input: 1 },
      { schematic_id: 85, type_id: 2397, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 85, type_id: 3695, quantity: 5, is_input: 0 }],
  },
  {
    name: "Test Cultures",
    cycle_time: 3600,
    schematic_id: 86,
    inputs: [
      { schematic_id: 86, type_id: 2393, quantity: 40, is_input: 1 },
      { schematic_id: 86, type_id: 3645, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 86, type_id: 2319, quantity: 5, is_input: 0 }],
  },
  {
    name: "Supertensile Plastics",
    cycle_time: 3600,
    schematic_id: 87,
    inputs: [
      { schematic_id: 87, type_id: 3683, quantity: 40, is_input: 1 },
      { schematic_id: 87, type_id: 3779, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 87, type_id: 2312, quantity: 5, is_input: 0 }],
  },
  {
    name: "Polyaramids",
    cycle_time: 3600,
    schematic_id: 88,
    inputs: [
      { schematic_id: 88, type_id: 2392, quantity: 40, is_input: 1 },
      { schematic_id: 88, type_id: 2397, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 88, type_id: 2321, quantity: 5, is_input: 0 }],
  },
  {
    name: "Ukomi Superconductor",
    cycle_time: 3600,
    schematic_id: 89,
    inputs: [
      { schematic_id: 89, type_id: 3691, quantity: 10, is_input: 1 },
      { schematic_id: 89, type_id: 9838, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 89, type_id: 17136, quantity: 3, is_input: 0 }],
  },
  {
    name: "Condensates",
    cycle_time: 3600,
    schematic_id: 90,
    inputs: [
      { schematic_id: 90, type_id: 9832, quantity: 10, is_input: 1 },
      { schematic_id: 90, type_id: 2317, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 90, type_id: 2344, quantity: 3, is_input: 0 }],
  },
  {
    name: "Camera Drones",
    cycle_time: 3600,
    schematic_id: 91,
    inputs: [
      { schematic_id: 91, type_id: 9830, quantity: 10, is_input: 1 },
      { schematic_id: 91, type_id: 3697, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 91, type_id: 2345, quantity: 3, is_input: 0 }],
  },
  {
    name: "Synthetic Synapses",
    cycle_time: 3600,
    schematic_id: 92,
    inputs: [
      { schematic_id: 92, type_id: 2312, quantity: 10, is_input: 1 },
      { schematic_id: 92, type_id: 2319, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 92, type_id: 2346, quantity: 3, is_input: 0 }],
  },
  {
    name: "High-Tech Transmitter",
    cycle_time: 3600,
    schematic_id: 94,
    inputs: [
      { schematic_id: 94, type_id: 9840, quantity: 10, is_input: 1 },
      { schematic_id: 94, type_id: 2321, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 94, type_id: 17898, quantity: 3, is_input: 0 }],
  },
  {
    name: "Gel-Matrix Biopaste",
    cycle_time: 3600,
    schematic_id: 95,
    inputs: [
      { schematic_id: 95, type_id: 2329, quantity: 10, is_input: 1 },
      { schematic_id: 95, type_id: 2317, quantity: 10, is_input: 1 },
      { schematic_id: 95, type_id: 9838, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 95, type_id: 2348, quantity: 3, is_input: 0 }],
  },
  {
    name: "Supercomputers",
    cycle_time: 3600,
    schematic_id: 96,
    inputs: [
      { schematic_id: 96, type_id: 2328, quantity: 10, is_input: 1 },
      { schematic_id: 96, type_id: 9832, quantity: 10, is_input: 1 },
      { schematic_id: 96, type_id: 9836, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 96, type_id: 2349, quantity: 3, is_input: 0 }],
  },
  {
    name: "Robotics",
    cycle_time: 3600,
    schematic_id: 97,
    inputs: [
      { schematic_id: 97, type_id: 3689, quantity: 10, is_input: 1 },
      { schematic_id: 97, type_id: 9836, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 97, type_id: 9848, quantity: 3, is_input: 0 }],
  },
  {
    name: "Smartfab Units",
    cycle_time: 3600,
    schematic_id: 98,
    inputs: [
      { schematic_id: 98, type_id: 9842, quantity: 10, is_input: 1 },
      { schematic_id: 98, type_id: 3828, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 98, type_id: 2351, quantity: 3, is_input: 0 }],
  },
  {
    name: "Nuclear Reactors",
    cycle_time: 3600,
    schematic_id: 99,
    inputs: [
      { schematic_id: 99, type_id: 44, quantity: 10, is_input: 1 },
      { schematic_id: 99, type_id: 2327, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 99, type_id: 2352, quantity: 3, is_input: 0 }],
  },
  {
    name: "Guidance Systems",
    cycle_time: 3600,
    schematic_id: 100,
    inputs: [
      { schematic_id: 100, type_id: 2328, quantity: 10, is_input: 1 },
      { schematic_id: 100, type_id: 9840, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 100, type_id: 9834, quantity: 3, is_input: 0 }],
  },
  {
    name: "Neocoms",
    cycle_time: 3600,
    schematic_id: 102,
    inputs: [
      { schematic_id: 102, type_id: 2329, quantity: 10, is_input: 1 },
      { schematic_id: 102, type_id: 3697, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 102, type_id: 2354, quantity: 3, is_input: 0 }],
  },
  {
    name: "Planetary Vehicles",
    cycle_time: 3600,
    schematic_id: 103,
    inputs: [
      { schematic_id: 103, type_id: 2312, quantity: 10, is_input: 1 },
      { schematic_id: 103, type_id: 3689, quantity: 10, is_input: 1 },
      { schematic_id: 103, type_id: 9842, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 103, type_id: 9846, quantity: 3, is_input: 0 }],
  },
  {
    name: "Biotech Research Reports",
    cycle_time: 3600,
    schematic_id: 104,
    inputs: [
      { schematic_id: 104, type_id: 3828, quantity: 10, is_input: 1 },
      { schematic_id: 104, type_id: 3725, quantity: 10, is_input: 1 },
      { schematic_id: 104, type_id: 2463, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 104, type_id: 2358, quantity: 3, is_input: 0 }],
  },
  {
    name: "Vaccines",
    cycle_time: 3600,
    schematic_id: 105,
    inputs: [
      { schematic_id: 105, type_id: 3725, quantity: 10, is_input: 1 },
      { schematic_id: 105, type_id: 3775, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 105, type_id: 28974, quantity: 3, is_input: 0 }],
  },
  {
    name: "Industrial Explosives",
    cycle_time: 3600,
    schematic_id: 106,
    inputs: [
      { schematic_id: 106, type_id: 3693, quantity: 10, is_input: 1 },
      { schematic_id: 106, type_id: 3695, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 106, type_id: 2360, quantity: 3, is_input: 0 }],
  },
  {
    name: "Hermetic Membranes",
    cycle_time: 3600,
    schematic_id: 107,
    inputs: [
      { schematic_id: 107, type_id: 2321, quantity: 10, is_input: 1 },
      { schematic_id: 107, type_id: 15317, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 107, type_id: 2361, quantity: 3, is_input: 0 }],
  },
  {
    name: "Transcranial Microcontroller",
    cycle_time: 3600,
    schematic_id: 108,
    inputs: [
      { schematic_id: 108, type_id: 2329, quantity: 10, is_input: 1 },
      { schematic_id: 108, type_id: 2463, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 108, type_id: 12836, quantity: 3, is_input: 0 }],
  },
  {
    name: "Data Chips",
    cycle_time: 3600,
    schematic_id: 109,
    inputs: [
      { schematic_id: 109, type_id: 2312, quantity: 10, is_input: 1 },
      { schematic_id: 109, type_id: 2327, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 109, type_id: 17392, quantity: 3, is_input: 0 }],
  },
  {
    name: "Hazmat Detection Systems",
    cycle_time: 3600,
    schematic_id: 110,
    inputs: [
      { schematic_id: 110, type_id: 9840, quantity: 10, is_input: 1 },
      { schematic_id: 110, type_id: 3695, quantity: 10, is_input: 1 },
      { schematic_id: 110, type_id: 3775, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 110, type_id: 2366, quantity: 3, is_input: 0 }],
  },
  {
    name: "Cryoprotectant Solution",
    cycle_time: 3600,
    schematic_id: 111,
    inputs: [
      { schematic_id: 111, type_id: 2319, quantity: 10, is_input: 1 },
      { schematic_id: 111, type_id: 3691, quantity: 10, is_input: 1 },
      { schematic_id: 111, type_id: 3693, quantity: 10, is_input: 1 },
    ],
    outputs: [{ schematic_id: 111, type_id: 2367, quantity: 3, is_input: 0 }],
  },
  {
    name: "Organic Mortar Applicators",
    cycle_time: 3600,
    schematic_id: 112,
    inputs: [
      { schematic_id: 112, type_id: 2344, quantity: 6, is_input: 1 },
      { schematic_id: 112, type_id: 2393, quantity: 40, is_input: 1 },
      { schematic_id: 112, type_id: 9848, quantity: 6, is_input: 1 },
    ],
    outputs: [{ schematic_id: 112, type_id: 2870, quantity: 1, is_input: 0 }],
  },
  {
    name: "Sterile Conduits",
    cycle_time: 3600,
    schematic_id: 113,
    inputs: [
      { schematic_id: 113, type_id: 3645, quantity: 40, is_input: 1 },
      { schematic_id: 113, type_id: 28974, quantity: 6, is_input: 1 },
      { schematic_id: 113, type_id: 2351, quantity: 6, is_input: 1 },
    ],
    outputs: [{ schematic_id: 113, type_id: 2875, quantity: 1, is_input: 0 }],
  },
  {
    name: "Nano-Factory",
    cycle_time: 3600,
    schematic_id: 114,
    inputs: [
      { schematic_id: 114, type_id: 2360, quantity: 6, is_input: 1 },
      { schematic_id: 114, type_id: 17136, quantity: 6, is_input: 1 },
      { schematic_id: 114, type_id: 2398, quantity: 40, is_input: 1 },
    ],
    outputs: [{ schematic_id: 114, type_id: 2869, quantity: 1, is_input: 0 }],
  },
  {
    name: "Self-Harmonizing Power Core",
    cycle_time: 3600,
    schematic_id: 115,
    inputs: [
      { schematic_id: 115, type_id: 2352, quantity: 6, is_input: 1 },
      { schematic_id: 115, type_id: 2345, quantity: 6, is_input: 1 },
      { schematic_id: 115, type_id: 2361, quantity: 6, is_input: 1 },
    ],
    outputs: [{ schematic_id: 115, type_id: 2872, quantity: 1, is_input: 0 }],
  },
  {
    name: "Recursive Computing Module",
    cycle_time: 3600,
    schematic_id: 116,
    inputs: [
      { schematic_id: 116, type_id: 2346, quantity: 6, is_input: 1 },
      { schematic_id: 116, type_id: 12836, quantity: 6, is_input: 1 },
      { schematic_id: 116, type_id: 9834, quantity: 6, is_input: 1 },
    ],
    outputs: [{ schematic_id: 116, type_id: 2871, quantity: 1, is_input: 0 }],
  },
  {
    name: "Broadcast Node",
    cycle_time: 3600,
    schematic_id: 117,
    inputs: [
      { schematic_id: 117, type_id: 17392, quantity: 6, is_input: 1 },
      { schematic_id: 117, type_id: 2354, quantity: 6, is_input: 1 },
      { schematic_id: 117, type_id: 17898, quantity: 6, is_input: 1 },
    ],
    outputs: [{ schematic_id: 117, type_id: 2867, quantity: 1, is_input: 0 }],
  },
  {
    name: "Integrity Response Drones",
    cycle_time: 3600,
    schematic_id: 118,
    inputs: [
      { schematic_id: 118, type_id: 2348, quantity: 6, is_input: 1 },
      { schematic_id: 118, type_id: 2366, quantity: 6, is_input: 1 },
      { schematic_id: 118, type_id: 9846, quantity: 6, is_input: 1 },
    ],
    outputs: [{ schematic_id: 118, type_id: 2868, quantity: 1, is_input: 0 }],
  },
  {
    name: "Wetware Mainframe",
    cycle_time: 3600,
    schematic_id: 119,
    inputs: [
      { schematic_id: 119, type_id: 2349, quantity: 6, is_input: 1 },
      { schematic_id: 119, type_id: 2358, quantity: 6, is_input: 1 },
      { schematic_id: 119, type_id: 2367, quantity: 6, is_input: 1 },
    ],
    outputs: [{ schematic_id: 119, type_id: 2876, quantity: 1, is_input: 0 }],
  },
  {
    name: "Water",
    cycle_time: 1800,
    schematic_id: 121,
    inputs: [{ schematic_id: 121, type_id: 2268, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 121, type_id: 3645, quantity: 20, is_input: 0 }],
  },
  {
    name: "Plasmoids",
    cycle_time: 1800,
    schematic_id: 122,
    inputs: [{ schematic_id: 122, type_id: 2308, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 122, type_id: 2389, quantity: 20, is_input: 0 }],
  },
  {
    name: "Electrolytes",
    cycle_time: 1800,
    schematic_id: 123,
    inputs: [{ schematic_id: 123, type_id: 2309, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 123, type_id: 2390, quantity: 20, is_input: 0 }],
  },
  {
    name: "Oxygen",
    cycle_time: 1800,
    schematic_id: 124,
    inputs: [{ schematic_id: 124, type_id: 2310, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 124, type_id: 3683, quantity: 20, is_input: 0 }],
  },
  {
    name: "Oxidizing Compound",
    cycle_time: 1800,
    schematic_id: 125,
    inputs: [{ schematic_id: 125, type_id: 2311, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 125, type_id: 2392, quantity: 20, is_input: 0 }],
  },
  {
    name: "Reactive Metals",
    cycle_time: 1800,
    schematic_id: 126,
    inputs: [{ schematic_id: 126, type_id: 2267, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 126, type_id: 2398, quantity: 20, is_input: 0 }],
  },
  {
    name: "Precious Metals",
    cycle_time: 1800,
    schematic_id: 127,
    inputs: [{ schematic_id: 127, type_id: 2270, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 127, type_id: 2399, quantity: 20, is_input: 0 }],
  },
  {
    name: "Toxic Metals",
    cycle_time: 1800,
    schematic_id: 128,
    inputs: [{ schematic_id: 128, type_id: 2272, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 128, type_id: 2400, quantity: 20, is_input: 0 }],
  },
  {
    name: "Chiral Structures",
    cycle_time: 1800,
    schematic_id: 129,
    inputs: [{ schematic_id: 129, type_id: 2306, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 129, type_id: 2401, quantity: 20, is_input: 0 }],
  },
  {
    name: "Silicon",
    cycle_time: 1800,
    schematic_id: 130,
    inputs: [{ schematic_id: 130, type_id: 2307, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 130, type_id: 9828, quantity: 20, is_input: 0 }],
  },
  {
    name: "Bacteria",
    cycle_time: 1800,
    schematic_id: 131,
    inputs: [{ schematic_id: 131, type_id: 2073, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 131, type_id: 2393, quantity: 20, is_input: 0 }],
  },
  {
    name: "Biomass",
    cycle_time: 1800,
    schematic_id: 132,
    inputs: [{ schematic_id: 132, type_id: 2286, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 132, type_id: 3779, quantity: 20, is_input: 0 }],
  },
  {
    name: "Proteins",
    cycle_time: 1800,
    schematic_id: 133,
    inputs: [{ schematic_id: 133, type_id: 2287, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 133, type_id: 2395, quantity: 20, is_input: 0 }],
  },
  {
    name: "Biofuels",
    cycle_time: 1800,
    schematic_id: 134,
    inputs: [{ schematic_id: 134, type_id: 2288, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 134, type_id: 2396, quantity: 20, is_input: 0 }],
  },
  {
    name: "Industrial Fibers",
    cycle_time: 1800,
    schematic_id: 135,
    inputs: [{ schematic_id: 135, type_id: 2305, quantity: 3000, is_input: 1 }],
    outputs: [{ schematic_id: 135, type_id: 2397, quantity: 20, is_input: 0 }],
  },
];

export const FACTORY_IDS = () =>
  PI_TYPES_ARRAY.filter((t) => t.name.indexOf("Industry Facility") !== -1);

export const STORAGE_IDS = () =>
  PI_TYPES_ARRAY.filter(
    (t) =>
      t.name.indexOf("Storage Facility") !== -1 ||
      t.name.indexOf("Launchpad") !== -1
  );

/*
schematic_id,type_id,quantity,is_input
65,2389,40,1
65,9838,5,0
65,3645,40,1
66,9832,5,0
66,3645,40,1
66,2390,40,1
67,2390,40,1
67,2389,40,1
67,9830,5,0
68,3683,40,1
68,3691,5,0
68,2390,40,1
69,2392,40,1
69,3683,40,1
69,2317,5,0
70,2392,40,1
70,3697,5,0
70,9828,40,1
71,9840,5,0
71,2401,40,1
71,2389,40,1
72,2328,5,0
72,3645,40,1
72,2398,40,1
73,3689,5,0
73,2398,40,1
73,2399,40,1
74,2400,40,1
74,3828,5,0
74,2398,40,1
75,2400,40,1
75,44,5,0
75,2399,40,1
76,2400,40,1
76,2401,40,1
76,9836,5,0
77,2401,40,1
77,9842,5,0
77,9828,40,1
78,2393,40,1
78,2398,40,1
78,2463,5,0
79,2329,5,0
79,2396,40,1
79,2399,40,1
80,9828,40,1
80,2397,40,1
80,2327,5,0
81,2393,40,1
81,3779,40,1
81,3775,5,0
82,2393,40,1
82,2395,40,1
82,3693,5,0
83,2395,40,1
83,15317,5,0
83,3779,40,1
84,2395,40,1
84,2396,40,1
84,3725,5,0
85,2396,40,1
85,2397,40,1
85,3695,5,0
86,2393,40,1
86,3645,40,1
86,2319,5,0
87,2312,5,0
87,3683,40,1
87,3779,40,1
88,2392,40,1
88,2321,5,0
88,2397,40,1
89,17136,3,0
89,3691,10,1
89,9838,10,1
90,2344,3,0
90,9832,10,1
90,2317,10,1
91,2345,3,0
91,9830,10,1
91,3697,10,1
92,2312,10,1
92,2346,3,0
92,2319,10,1
94,9840,10,1
94,2321,10,1
94,17898,3,0
95,2329,10,1
95,2348,3,0
95,2317,10,1
95,9838,10,1
96,2328,10,1
96,9832,10,1
96,9836,10,1
96,2349,3,0
97,9848,3,0
97,3689,10,1
97,9836,10,1
98,9842,10,1
98,3828,10,1
98,2351,3,0
99,2352,3,0
99,44,10,1
99,2327,10,1
100,2328,10,1
100,9840,10,1
100,9834,3,0
102,2329,10,1
102,2354,3,0
102,3697,10,1
103,2312,10,1
103,3689,10,1
103,9842,10,1
103,9846,3,0
104,3828,10,1
104,3725,10,1
104,2358,3,0
104,2463,10,1
105,3725,10,1
105,28974,3,0
105,3775,10,1
106,2360,3,0
106,3693,10,1
106,3695,10,1
107,2321,10,1
107,15317,10,1
107,2361,3,0
108,2329,10,1
108,12836,3,0
108,2463,10,1
109,2312,10,1
109,17392,3,0
109,2327,10,1
110,9840,10,1
110,3695,10,1
110,2366,3,0
110,3775,10,1
111,2319,10,1
111,3691,10,1
111,3693,10,1
111,2367,3,0
112,2344,6,1
112,2393,40,1
112,2870,1,0
112,9848,6,1
113,2875,1,0
113,3645,40,1
113,28974,6,1
113,2351,6,1
114,2360,6,1
114,17136,6,1
114,2869,1,0
114,2398,40,1
115,2352,6,1
115,2345,6,1
115,2361,6,1
115,2872,1,0
116,2346,6,1
116,12836,6,1
116,9834,6,1
116,2871,1,0
117,17392,6,1
117,2354,6,1
117,2867,1,0
117,17898,6,1
118,2348,6,1
118,2868,1,0
118,2366,6,1
118,9846,6,1
119,2876,1,0
119,2349,6,1
119,2358,6,1
119,2367,6,1
121,2268,3000,1
121,3645,20,0
122,2308,3000,1
122,2389,20,0
123,2309,3000,1
123,2390,20,0
124,3683,20,0
124,2310,3000,1
125,2392,20,0
125,2311,3000,1
126,2267,3000,1
126,2398,20,0
127,2270,3000,1
127,2399,20,0
128,2272,3000,1
128,2400,20,0
129,2401,20,0
129,2306,3000,1
130,2307,3000,1
130,9828,20,0
131,2073,3000,1
131,2393,20,0
132,3779,20,0
132,2286,3000,1
133,2395,20,0
133,2287,3000,1
134,2288,3000,1
134,2396,20,0
135,2305,3000,1
135,2397,20,0 
*/

/*
type_id,group_id,name
2469,1028,Lava Basic Industry Facility
2470,1028,Lava Advanced Industry Facility
2471,1028,Plasma Basic Industry Facility
2472,1028,Plasma Advanced Industry Facility
2473,1028,Barren Basic Industry Facility
2474,1028,Barren Advanced Industry Facility
2475,1028,Barren High-Tech Production Plant
2480,1028,Temperate Advanced Industry Facility
2481,1028,Temperate Basic Industry Facility
2482,1028,Temperate High-Tech Production Plant
2483,1028,Storm Basic Industry Facility
2484,1028,Storm Advanced Industry Facility
2485,1028,Oceanic Advanced Industry Facility
2490,1028,Oceanic Basic Industry Facility
2491,1028,Ice Advanced Industry Facility
2492,1028,Gas Basic Industry Facility
2493,1028,Ice Basic Industry Facility
2494,1028,Gas Advanced Industry Facility
2848,1063,Barren Extractor Control Unit
3060,1063,Gas Extractor Control Unit
3061,1063,Ice Extractor Control Unit
3062,1063,Lava Extractor Control Unit
3063,1063,Oceanic Extractor Control Unit
3064,1063,Plasma Extractor Control Unit
3067,1063,Storm Extractor Control Unit
3068,1063,Temperate Extractor Control Unit
2257,1029,Ice Storage Facility
2535,1029,Oceanic Storage Facility
2536,1029,Gas Storage Facility
2541,1029,Barren Storage Facility
2558,1029,Lava Storage Facility
2560,1029,Plasma Storage Facility
2561,1029,Storm Storage Facility
2562,1029,Temperate Storage Facility
2256,1030,Temperate Launchpad
2542,1030,Oceanic Launchpad
2543,1030,Gas Launchpad
2544,1030,Barren Launchpad
2552,1030,Ice Launchpad
2555,1030,Lava Launchpad
2556,1030,Plasma Launchpad
2557,1030,Storm Launchpad
2267,1032,Base Metals
2270,1032,Noble Metals
2272,1032,Heavy Metals
2306,1032,Non-CS Crystals
2307,1032,Felsic Magma
2268,1033,Aqueous Liquids
2308,1033,Suspended Plasma
2309,1033,Ionic Solutions
2310,1033,Noble Gas
2311,1033,Reactive Gas
44,1034,Enriched Uranium
2312,1034,Supertensile Plastics
2317,1034,Oxides
2319,1034,Test Cultures
2321,1034,Polyaramids
2327,1034,Microfiber Shielding
2328,1034,Water-Cooled CPU
2329,1034,Biocells
2463,1034,Nanites
3689,1034,Mechanical Parts
3691,1034,Synthetic Oil
3693,1034,Fertilizer
3695,1034,Polytextiles
3697,1034,Silicate Glass
3725,1034,Livestock
3775,1034,Viral Agent
3828,1034,Construction Blocks
9830,1034,Rocket Fuel
9832,1034,Coolant
9836,1034,Consumer Electronics
9838,1034,Superconductors
9840,1034,Transmitter
9842,1034,Miniature Electronics
15317,1034,Genetically Enhanced Livestock
2073,1035,Microorganisms
2286,1035,Planktic Colonies
2287,1035,Complex Organisms
2288,1035,Carbon Compounds
2305,1035,Autotrophs
2344,1040,Condensates
2345,1040,Camera Drones
2346,1040,Synthetic Synapses
2348,1040,Gel-Matrix Biopaste
2349,1040,Supercomputers
2351,1040,Smartfab Units
2352,1040,Nuclear Reactors
2354,1040,Neocoms
2358,1040,Biotech Research Reports
2360,1040,Industrial Explosives
2361,1040,Hermetic Membranes
2366,1040,Hazmat Detection Systems
2367,1040,Cryoprotectant Solution
9834,1040,Guidance Systems
9846,1040,Planetary Vehicles
9848,1040,Robotics
12836,1040,Transcranial Microcontrollers
17136,1040,Ukomi Superconductors
17392,1040,Data Chips
17898,1040,High-Tech Transmitters
28974,1040,Vaccines
2867,1041,Broadcast Node
2868,1041,Integrity Response Drones
2869,1041,Nano-Factory
2870,1041,Organic Mortar Applicators
2871,1041,Recursive Computing Module
2872,1041,Self-Harmonizing Power Core
2875,1041,Sterile Conduits
2876,1041,Wetware Mainframe
2389,1042,Plasmoids
2390,1042,Electrolytes
2392,1042,Oxidizing Compound
2393,1042,Bacteria
2395,1042,Proteins
2396,1042,Biofuels
2397,1042,Industrial Fibers
2398,1042,Reactive Metals
2399,1042,Precious Metals
2400,1042,Toxic Metals
2401,1042,Chiral Structures
3645,1042,Water
3683,1042,Oxygen
3779,1042,Biomass
9828,1042,Silicon
 */

/*
schematic_id,name,cycle_time
65,Superconductors,3600
66,Coolant,3600
67,Rocket Fuel,3600
68,Synthetic Oil,3600
69,Oxides,3600
70,Silicate Glass,3600
71,Transmitter,3600
72,Water-Cooled CPU,3600
73,Mechanical Parts,3600
74,Construction Blocks,3600
75,Enriched Uranium,3600
76,Consumer Electronics,3600
77,Miniature Electronics,3600
78,Nanites,3600
79,Biocells,3600
80,Microfiber Shielding,3600
81,Viral Agent,3600
82,Fertilizer,3600
83,Genetically Enhanced Livestock,3600
84,Livestock,3600
85,Polytextiles,3600
86,Test Cultures,3600
87,Supertensile Plastics,3600
88,Polyaramids,3600
89,Ukomi Superconductor,3600
90,Condensates,3600
91,Camera Drones,3600
92,Synthetic Synapses,3600
94,High-Tech Transmitter,3600
95,Gel-Matrix Biopaste,3600
96,Supercomputers,3600
97,Robotics,3600
98,Smartfab Units,3600
99,Nuclear Reactors,3600
100,Guidance Systems,3600
102,Neocoms,3600
103,Planetary Vehicles,3600
104,Biotech Research Reports,3600
105,Vaccines,3600
106,Industrial Explosives,3600
107,Hermetic Membranes,3600
108,Transcranial Microcontroller,3600
109,Data Chips,3600
110,Hazmat Detection Systems,3600
111,Cryoprotectant Solution,3600
112,Organic Mortar Applicators,3600
113,Sterile Conduits,3600
114,Nano-Factory,3600
115,Self-Harmonizing Power Core,3600
116,Recursive Computing Module,3600
117,Broadcast Node,3600
118,Integrity Response Drones,3600
119,Wetware Mainframe,3600
121,Water,1800
122,Plasmoids,1800
123,Electrolytes,1800
124,Oxygen,1800
125,Oxidizing Compound,1800
126,Reactive Metals,1800
127,Precious Metals,1800
128,Toxic Metals,1800
129,Chiral Structures,1800
130,Silicon,1800
131,Bacteria,1800
132,Biomass,1800
133,Proteins,1800
134,Biofuels,1800
135,Industrial Fibers,1800
 */
