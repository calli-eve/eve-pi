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
  PI_TYPES_ARRAY.filter(
    (t) =>
      t.name.indexOf("Industry Facility") !== -1 ||
      t.name.indexOf("High-Tech Production Plant") !== -1
  );

export const STORAGE_IDS = () =>
  PI_TYPES_ARRAY.filter(
    (t) =>
      t.name.indexOf("Storage Facility") !== -1 ||
      t.name.indexOf("Launchpad") !== -1
  );

export const PI_PRODUCT_VOLUMES: Record<number, number> = {
  44: 0.75, // Enriched Uranium
  2073: 0.005, // Microorganisms
  2256: 0.0, // Temperate Launchpad
  2257: 0.0, // Ice Storage Facility
  2267: 0.005, // Base Metals
  2268: 0.005, // Aqueous Liquids
  2270: 0.005, // Noble Metals
  2272: 0.005, // Heavy Metals
  2286: 0.005, // Planktic Colonies
  2287: 0.005, // Complex Organisms
  2288: 0.005, // Carbon Compounds
  2305: 0.005, // Autotrophs
  2306: 0.005, // Non-CS Crystals
  2307: 0.005, // Felsic Magma
  2308: 0.005, // Suspended Plasma
  2309: 0.005, // Ionic Solutions
  2310: 0.005, // Noble Gas
  2311: 0.005, // Reactive Gas
  2312: 0.75, // Supertensile Plastics
  2317: 0.75, // Oxides
  2319: 0.75, // Test Cultures
  2321: 0.75, // Polyaramids
  2327: 0.75, // Microfiber Shielding
  2328: 0.75, // Water-Cooled CPU
  2329: 0.75, // Biocells
  2344: 3.0, // Condensates
  2345: 3.0, // Camera Drones
  2346: 3.0, // Synthetic Synapses
  2348: 3.0, // Gel-Matrix Biopaste
  2349: 3.0, // Supercomputers
  2351: 3.0, // Smartfab Units
  2352: 3.0, // Nuclear Reactors
  2354: 3.0, // Neocoms
  2358: 3.0, // Biotech Research Reports
  2360: 3.0, // Industrial Explosives
  2361: 3.0, // Hermetic Membranes
  2366: 3.0, // Hazmat Detection Systems
  2367: 3.0, // Cryoprotectant Solution
  2389: 0.19, // Plasmoids
  2390: 0.19, // Electrolytes
  2392: 0.19, // Oxidizing Compound
  2393: 0.19, // Bacteria
  2395: 0.19, // Proteins
  2396: 0.19, // Biofuels
  2397: 0.19, // Industrial Fibers
  2398: 0.19, // Reactive Metals
  2399: 0.19, // Precious Metals
  2400: 0.19, // Toxic Metals
  2401: 0.19, // Chiral Structures
  2463: 0.75, // Nanites
  2469: 0.0, // Lava Basic Industry Facility
  2470: 0.0, // Lava Advanced Industry Facility
  2471: 0.0, // Plasma Basic Industry Facility
  2472: 0.0, // Plasma Advanced Industry Facility
  2473: 0.0, // Barren Basic Industry Facility
  2474: 0.0, // Barren Advanced Industry Facility
  2475: 0.0, // Barren High-Tech Production Plant
  2480: 0.0, // Temperate Advanced Industry Facility
  2481: 0.0, // Temperate Basic Industry Facility
  2482: 0.0, // Temperate High-Tech Production Plant
  2483: 0.0, // Storm Basic Industry Facility
  2484: 0.0, // Storm Advanced Industry Facility
  2485: 0.0, // Oceanic Advanced Industry Facility
  2490: 0.0, // Oceanic Basic Industry Facility
  2491: 0.0, // Ice Advanced Industry Facility
  2492: 0.0, // Gas Basic Industry Facility
  2493: 0.0, // Ice Basic Industry Facility
  2494: 0.0, // Gas Advanced Industry Facility
  2535: 0.0, // Oceanic Storage Facility
  2536: 0.0, // Gas Storage Facility
  2541: 0.0, // Barren Storage Facility
  2542: 0.0, // Oceanic Launchpad
  2543: 0.0, // Gas Launchpad
  2544: 0.0, // Barren Launchpad
  2552: 0.0, // Ice Launchpad
  2555: 0.0, // Lava Launchpad
  2556: 0.0, // Plasma Launchpad
  2557: 0.0, // Storm Launchpad
  2558: 0.0, // Lava Storage Facility
  2560: 0.0, // Plasma Storage Facility
  2561: 0.0, // Storm Storage Facility
  2562: 0.0, // Temperate Storage Facility
  2848: 0.0, // Barren Extractor Control Unit
  2867: 50.0, // Broadcast Node
  2868: 50.0, // Integrity Response Drones
  2869: 50.0, // Nano-Factory
  2870: 50.0, // Organic Mortar Applicators
  2871: 50.0, // Recursive Computing Module
  2872: 50.0, // Self-Harmonizing Power Core
  2875: 50.0, // Sterile Conduits
  2876: 50.0, // Wetware Mainframe
  3060: 0.0, // Gas Extractor Control Unit
  3061: 0.0, // Ice Extractor Control Unit
  3062: 0.0, // Lava Extractor Control Unit
  3063: 0.0, // Oceanic Extractor Control Unit
  3064: 0.0, // Plasma Extractor Control Unit
  3067: 0.0, // Storm Extractor Control Unit
  3068: 0.0, // Temperate Extractor Control Unit
  3645: 0.19, // Water
  3683: 0.19, // Oxygen
  3689: 0.75, // Mechanical Parts
  3691: 0.75, // Synthetic Oil
  3693: 0.75, // Fertilizer
  3695: 0.75, // Polytextiles
  3697: 0.75, // Silicate Glass
  3725: 0.75, // Livestock
  3775: 0.75, // Viral Agent
  3779: 0.19, // Biomass
  3828: 0.75, // Construction Blocks
  9828: 0.19, // Silicon
  9830: 0.75, // Rocket Fuel
  9832: 0.75, // Coolant
  9834: 3.0, // Guidance Systems
  9836: 0.75, // Consumer Electronics
  9838: 0.75, // Superconductors
  9840: 0.75, // Transmitter
  9842: 0.75, // Miniature Electronics
  9846: 3.0, // Planetary Vehicles
  9848: 3.0, // Robotics
  12836: 3.0, // Transcranial Microcontrollers
  15317: 0.75, // Genetically Enhanced Livestock
  17136: 3.0, // Ukomi Superconductors
  17392: 3.0, // Data Chips
  17898: 3.0, // High-Tech Transmitters
  28974: 3.0, // Vaccines
};

export const STORAGE_CAPACITIES: Record<number, number> = {
  2257: 12000, // Ice Storage Facility
  2535: 12000, // Oceanic Storage Facility
  2536: 12000, // Gas Storage Facility
  2541: 12000, // Barren Storage Facility
  2558: 12000, // Lava Storage Facility
  2560: 12000, // Plasma Storage Facility
  2561: 12000, // Storm Storage Facility
  2562: 12000, // Temperate Storage Facility
  2256: 10000, // Temperate Launchpad
  2542: 10000, // Oceanic Launchpad
  2543: 10000, // Gas Launchpad
  2544: 10000, // Barren Launchpad
  2552: 10000, // Ice Launchpad
  2555: 10000, // Lava Launchpad
  2556: 10000, // Plasma Launchpad
  2557: 10000, // Storm Launchpad
};

export const LAUNCHPAD_IDS = [2256, 2542, 2543, 2544, 2552, 2555, 2556, 2557];
