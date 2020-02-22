export const sortEquipment = (equipment, objectBool = true) => {
	let oB = objectBool;

	var sortedEquipment, mythics = {}, legendaries = {};

	if (oB) {
		sortedEquipment= {
			mainhands: {},
			offhands: {},
			heads: {},
			bodies: {},
			necklaces: {},
			rings: {},
			accessories: {},
			pets: {}
		  }
	} else {
		sortedEquipment =  {
			mainhands: [],
			offhands: [],
			heads: [],
			bodies: [],
			necklaces: [],
			rings: [],
			accessories: [],
			pets: []
		};
	}

	Object.keys(equipment).forEach( (x) => {

		equipment[x].image = `${x}.png`

		if (equipment[x].type === "mythic") {
			mythics[x] = equipment[x];
		} else if (equipment[x].type ==="legendary") {
			legendaries[x] = equipment[x];
		}

		switch(equipment[x].slot) {
			case 'Offhand':
				!oB ? sortedEquipment.offhands.push(equipment[x]) : sortedEquipment.offhands[x] = equipment[x];
				break;
			case 'Body':
				!oB ? sortedEquipment.bodies.push(equipment[x]) : sortedEquipment.bodies[x] = equipment[x];
				break;
			case 'Head':
				!oB ? sortedEquipment.heads.push(equipment[x]) : sortedEquipment.heads[x] = equipment[x];
				break;
			case 'Ring':
				!oB ? sortedEquipment.rings.push(equipment[x]) : sortedEquipment.rings[x] = equipment[x];
				break;
			case 'Necklace':
				!oB ? sortedEquipment.necklaces.push(equipment[x]) : sortedEquipment.necklaces[x] = equipment[x];
				break;
			case 'Pet':
				!oB ? sortedEquipment.pets.push(equipment[x]) : sortedEquipment.pets[x] = equipment[x];
				break;
			case 'Accessory':
				!oB ? sortedEquipment.accessories.push(equipment[x]) : sortedEquipment.accessories[x] = equipment[x];
				break;
			default: 
				!oB ? sortedEquipment.mainhands.push(equipment[x]) : sortedEquipment.mainhands[x] = equipment[x];
		};
	});

	return [sortedEquipment, mythics, legendaries];
}

//71
export const equipment = {
	phobos: {
		name: "Phobos",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "ares_legacy",
		effect: "",
		shareID: "ph"
	},
	deimos: {
		name: "Deimos",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "ares_legacy",
		effect: "",
		shareID: "de"
	},
	phantom_light: {
		name: "Phantom Light",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "divinity",
		effect: "",
		shareID: "pl"
	},
	legacy_of_truth: {
		name: "Legacy Of Truth",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "divinity",
		effect: "",
		shareID: "lt"
	},
	trinity_plate: {
		name: "Trinity Plate",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "divinity",
		effect: "",
		shareID: "tp"
	},
	visortron: {
		name: "Visortron",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "maru",
		effect: "",
		shareID: "vi"
	},
	mechcoat: {
		name: "Mechcoat",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "maru",
		effect: "",
		shareID: "me"
	},
	rom_bios: {
		name: "ROM BIOS",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "maru",
		effect: "",
		shareID: "rb"
	},
	blast_protocol: {
		name: "Blast Protocol",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "maru",
		effect: "",
		shareID: "bp"
	},
	moonlight: {
		name: "Moonlight",
		type: "set",
		slot: "Staff",
		image: "",
		partOfSet: "night_walker",
		effect: "",
		shareID: "mo"
	},
	discordiant_power: {
		name: "Discordiant Power",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "night_walker",
		effect: "",
		shareID: "dp"
	},
	dominance: {
		name: "Dominance",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "night_walker",
		effect: "",
		shareID: "do"
	},
	adorned_malice: {
		name: "Adorned Malice",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "night_walker",
		effect: "",
		shareID: "am"
	},
	umd_lazzault: {
		name: "UMD Lazzault",
		type: "set",
		slot: "Laser Gun",
		image: "",
		partOfSet: "arsenal",
		effect: "",
		shareID: "a1"
	},
	aimbot_80: {
		name: "Aimbot 80",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "arsenal",
		effect: "",
		shareID: "a2"
	},
	a_m_h: {
		name: "A M H",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "arsenal",
		effect: "",
		shareID: "a3"
	},
	nanovectal_plating: {
		name: "Nanovectal Plating",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "arsenal",
		effect: "",
		shareID: "a4"
	},
	despair: {
		name: "Despair",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "unity",
		effect: "",
		shareID: "ds"
	},
	sorrow: {
		name: "Sorrow",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "unity",
		effect: "",
		shareID: "so"
	},
	trugdors_bite: {
		name: "Trugdor's Bite",
		type: "set",
		slot: "Bow",
		image: "",
		partOfSet: "trugdors_call",
		effect: "",
		shareID: "tb"
	},
	scaled_vambrace: {
		name: "Scaled Vambrace",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "trugdors_call",
		effect: "",
		shareID: "sv"
	},
	dragons_breath: {
		name: "Dragons Breath",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "trugdors_call",
		effect: "",
		shareID: "db"
	},
	eternal_fire: {
		name: "Eternal Fire",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "taldrilths_artifacts",
		effect: "",
		shareID: "ef"
	},
	scaled_dragons_bone: {
		name: "Scaled Dragon's Bone",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "taldrilths_artifacts",
		effect: "",
		shareID: "sd"
	},
	taldrilths_soul: {
		name: "Taldrilth's Soul",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "taldrilths_artifacts",
		effect: "",
		shareID: "ts"
	},
	matsukura: {
		name: "Matsukura",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "bushido",
		effect: "",
		shareID: "mt"
	},
	yashiros_dou: {
		name: "Yashiro's Dou",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "bushido",
		effect: "",
		shareID: "yd"
	},
	gigastrike: {
		name: "Gigastrike",
		type: "set",
		slot: "Spear",
		image: "",
		partOfSet: "conduction",
		effect: "",
		shareID: "gi"
	},
	magnetron: {
		name: "Magnetron",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "conduction",
		effect: "",
		shareID: "ma"
	},
	flow_plate: {
		name: "Flow Plate",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "conduction",
		effect: "",
		shareID: "fp"
	},
	power_amp: {
		name: "Power Amp",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "conduction",
		effect: "",
		shareID: "pa"
	},
	yak_blade: {
		name: "Yak Blade",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "luminary",
		effect: "",
		shareID: "yb"
	},
	stillness: {
		name: "Stillness",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "luminary",
		effect: "",
		shareID: "st"
	},
	hylidae: {
		name: "Hylidae",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "luminary",
		effect: "",
		shareID: "hy"
	},
	flowing_silk_sash: {
		name: "Flowing Silk Sash",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "luminary",
		effect: "",
		shareID: "fs"
	},
	sky_vapor: {
		name: "Sky Vapor",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "polaris",
		effect: "",
		shareID: "p1"
	},
	sky_vault: {
		name: "Sky Vault",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "polaris",
		effect: "",
		shareID: "p2"
	},
	champions_helm: {
		name: "Champions Helm",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "polaris",
		effect: "",
		shareID: "p3"
	},
	whale_plate: {
		name: "Whale Plate",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "polaris",
		effect: "",
		shareID: "p4"
	},
	maelstrom: {
		name: "Maelstrom",
		type: "set",
		slot: "Staff",
		image: "",
		partOfSet: "lunar_guardian",
		effect: "",
		shareID: "ms"
	},
	eclipse_barrier: {
		name: "Eclipse Barrier",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "lunar_guardian",
		effect: "",
		shareID: "eb"
	},
	moku: {
		name: "Moku",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "jynx",
		effect: "",
		shareID: "mk"
	},
	ku: {
		name: "Ku",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "jynx",
		effect: "",
		shareID: "ku"
	},
	wraithguard: {
		name: "Wraithguard",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "obliteration",
		effect: "",
		shareID: "wr"
	},
	last_sight: {
		name: "Last Sight",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "obliteration",
		effect: "",
		shareID: "ls"
	},
	dark_wrap: {
		name: "Dark Wrap",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "obliteration",
		effect: "",
		shareID: "dw"
	},
	black_omen: {
		name: "Black Omen",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "obliteration",
		effect: "",
		shareID: "bo"
	},
	arcusbolt: {
		name: "Arcusbolt",
		type: "set",
		slot: "Crossbow",
		image: "",
		partOfSet: "agony",
		effect: "",
		shareID: "ar"
	},
	tormented_soul: {
		name: "Tormented Soul",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "agony",
		effect: "",
		shareID: "tu"
	},
	gravetouch: {
		name: "Gravetouch",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "agony",
		effect: "",
		shareID: "gt"
	},
	crypt_hunter: {
		name: "Crypt Hunter",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "agony",
		effect: "",
		shareID: "ch"
	},
	slaghelm: {
		name: "Slaghelm",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "eruption",
		effect: "",
		shareID: "e1"
	},
	molten_chasis: {
		name: "Molten Chasis",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "eruption",
		effect: "",
		shareID: "e2"
	},
	magmight: {
		name: "Magmight",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "eruption",
		effect: "",
		shareID: "e3"
	},
	ancient_tiara: {
		name: "Ancient Tiara",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "illustrious_artifacts",
		effect: "",
		shareID: "ai"
	},
	heavenly_garb: {
		name: "Heavenly Garb",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "illustrious_artifacts",
		effect: ""
		,
		shareID: "hg"
	},
	exalted_binding: {
		name: "Exalted Binding",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "illustrious_artifacts",
		effect: "",
		shareID: "ex"
	},
	tayto_sword: {
		name: "Tayto Sword",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "taters",
		effect: "",
		shareID: "ty"
	},
	tayto_sack: {
		name: "Tayto Sack",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "taters",
		effect: "",
		shareID: "tc"
	},
	hangin_tayto: {
		name: "Hangin Tayto",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "taters",
		effect: "",
		shareID: "ht"
	},
	final_gaze: {
		name: "Final Gaze",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "inferno",
		effect: "",
		shareID: "fg"
	},
	final_flash: {
		name: "Final Flash",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "inferno",
		effect: "",
		shareID: "ff"
	},
	melding_cloak: {
		name: "Melding Cloak",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "inferno",
		effect: "",
		shareID: "mc"
	},
	brimstone: {
		name: "Brimstone",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "inferno",
		effect: "",
		shareID: "br"
	},
	veilstrike: {
		name: "Veilstrike",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "requiem",
		effect: "",
		shareID: "r1"
	},
	cloudsinge: {
		name: "Cloudsinge",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "requiem",
		effect: "",
		shareID: "r2"
	},
	oscillation: {
		name: "Oscillation",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "requiem",
		effect: "",
		shareID: "r3"
	},
	acropodium: {
		name: "Acropodium",
		type: "set",
		slot: "Accessory",
		image: "",
		partOfSet: "gatekeeper",
		effect: "+24.5% Damage",
		shareID: "ac"
	},
	karlorr: {
		name: "Karlorr",
		type: "set",
		slot: "Pet",
		image: "",
		partOfSet: "gatekeeper",
		effect: "30% chance to attack weakest enemy per turn, when you get hit, and when you hit an enemy",
		shareID: "ka"
	},
	pew_pew: {
		name: "Pew Pew",
		type: "mythic",
		slot: "Laser Gun",
		image: "",
		partOfSet: "",
		effect: "3% Ricochet Chance",
		location: "r4 heroic",
		shareID: "pp"
	},
	hysteria: {
		name: "Hysteria",
		type: "mythic",
		slot: "Staff",
		image: "",
		partOfSet: "",
		effect: "Gain increased damage the lower your health percentage becomes, up to 10%",
		location: "t7 Netherworld World Boss Heroic",
		shareID: "hs"
	},
	bub: {
		name: "Bub",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "2% Absorb Chance",
		location: "t7 Orlag World Boss Heroic",
		shareID: "bb"
	},
	superstition: {
		name: "Superstition",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "Convert 3% of all team damage recieved to your enrage meter",
		location: "t7 Netherworld World Boss Heroic",
		shareID: "sp"
	},
	night_visage: {
		name: "Night Visage",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "While at full health, damage increased by 5%",
		location: "t7 Set Trials and Gauntlets 200-209",
		shareID: "ni"
	},
	consumption: {
		name: "Consumption",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "5% chance to heal a teammate for 85-115% when they are about to die",
		location: "t7 Set Trials and Gauntlets 200-209",
		shareID: "cn"
	},
	decay: {
		name: "Decay",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "5% chance for healing skills recieved to be twice as effective",
		location: "r4 Heroic",
		shareID: "dc"
	},
	necrosis: {
		name: "Necrosis",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "10% chance to gain 1 SP per turn",
		location: "t7 Orlag World Boss Heroic",
		shareID: "no"
	},
	cometfell: {
		name: "Cometfell",
		type: "mythic",
		slot: "Sword",
		image: "",
		partOfSet: "",
		effect: "1% Quad Strike",
		location: "r5 Heroic",
		shareID: "cm"
	},
	nebuleye: {
		name: "Nebuleye",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "Damage increased by 1% for every legendary item equipped",
		location: "r5 Heroic",
		shareID: "nb"
	},
	hood_of_menace: {
		name: "Hood Of Menace",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "While above 75% health, evade chance increased by 5%",
		location: "t8 Netherworld World Boss Heroic",
		shareID: "hm"
	},
	crypt_tunic: {
		name: "Crypt Tunic",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "+3% Deflect Chance",
		location: "t8 Netherworld World Boss Heroic",
		shareID: "ct"
	},
	fish_n_barrel: {
		name: "Fish N' Barrel",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "Gain 5% damage reduction, but deal 5% reduced damage",
		location: "t8 Orlag World Boss Heroic",
		shareID: "fn"
	},
	engulfing_artifact: {
		name: "Engulfing Artifact",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "At the start of each turn, shield team for 22-27%",
		location: "t8 Orlag World Boss Heroic",
		shareID: "ea"
	},
	nemesis: {
		name: "Nemesis",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "4% Dual Strike",
		location: "t8 Set Trials & Gauntlets 340+",
		shareID: "ne"
	},
	bedlam: {
		name: "Bedlam",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "Increase the poteny of your healing skills by 8%",
		location: "t8 Set Trials & Gauntlets 340+",
		shareID: "bd"
	},
	widowmaker: {
		name: "Widowmaker",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "16% Crit Chance, 50% Crit Damage, 4% Empower Chance",
		location: "Shop",
		shareID: "WM"
	},
	seraphims_grace: {
		name: "Seraphims Grace",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "20% Block Chance, 10% Evade Chance, 5% Deflect Chance",
		location: "Shop",
		shareID: "sg"
	},
	melvin_champ: {
		name: "Melvin Champ",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "20% Dual Strike, 9% Crit Chance",
		location: "Shop",
		shareID: "MH"
	},
	abominable_trophy: {
		name: "Abominable Trophy",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "20% Damage Reduction, 5% Absorb Chance",
		location: "Shop",
		shareID: "ao"
	},

	wrath: {
		name: "Wrath",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "10% Deflect Chance, 7.5% Absorb Chance",
		location: "Shop",
		shareID: "WR"
	},
	baronets: {
		name: "Baronets",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "20% Empower Chance, 4.5% Dual Strike",
		location: "Shop",
		shareID: "ec"
	},
	astaroths_diadem: {
		name: "Astaroths Diadem",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "2.5% Empower, 2.5% Dual, 5% Damage, 5% Speed, 5% Crit Chance, 50% Crit Damage",
		location: "Shop",
		shareID: "ad"
	},
	melvin_stew: {
		name: "Melvin Stew",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "15% Absorb Chance",
		location: "Shop",
		shareID: "es"
	},
	the_atomising_neutrino_accelerator: {
		name: "The Atomising Neutrino Accelerator",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "60% Block Chance",
		location: "Shop",
		shareID: "aa"
	},
	travelling_forge: {
		name: "Travelling Forge",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "10% Dual Strike, 10% Empower Chance, 10% Crit Chance",
		location: "Shop",
		shareID: "TF"
	},
	transcendence: {
		name: "Transcendence",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "40% Crit Chance, 3% Dual Strike, 3% Empower Chance",
		location: "Shop",
		shareID: "tr"
	},
	nelson: {
		name: "Nelson",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to Attack Closest enemy per turn, get hit, and when hit",
		location: "Shop",
		shareID: "nl"
	},
	gemmi: {
		name: "Gemmi",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance To Heal per turn, on hit, and when hit",
		location: "Shop",
		shareID: "mm"
	},
	boiguh: {
		name: "Boiguh",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to shield team per turn, on hit, and when hit",
		location: "Shop",
		shareID: "uh"
	},
	quimby: {
		name: "Quimby",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to attack weakest per turn, on hit, and when hit",
		location: "Shop",
		shareID: "qu"
	},
	wuvboi: {
		name: "Wubvoi",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to heal and shield team per turn, on hit, and when hit",
		location: "Shop",
		shareID: "wv"
	},
	buvboi: {
		name: "Buvboi",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to attack random enemy per turn, on hit, and when hit",
		location: "Shop",
		shareID: "bi"
	},
	skulldemort: {
		name: "Skulldemort",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to heal lowest health teammate per turn, on hit, and when hit",
		location: "Shop",
		shareID: "sk"
	},
	fuvboi: {
		name: "Fuvboi",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "10% Chance to heal and shield team per turn, on hit, and when hit",
		location: "Shop",
		shareID: "uv"
	},
	toebert: {
		name: "Toebert",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to heal and shield team per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "te"
	},
	urgoff: {
		name: "Urgoff",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to heal team per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "uf"
	},
	prisby: {
		name: "Prisby",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "41% Chance to attack strongest enemy per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "pb"
	},
	roogamenz: {
		name: "Roogamenz",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to shield team per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "oo"
	},
	crem: {
		name: "Crem",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "10 Chance to heal team per turn, on hit, and when hit",
		location: "Shop",
		shareID: "rm"
	},
	dawn_of_mercy: {
		name: "Dawn Of Mercy",
		type: "set",
		slot: "Axe",
		image: "",
		partOfSet: "hellfire",
		effect: "",
		shareID: "dm"
	},
	idol_of_decay: {
		name: "Idol Of Decay",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "hellfire",
		effect: "",
		shareID: "io"
	},
	deception: {
		name: "Deception",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "hellfire",
		effect: "",
		shareID: "h3"
	},
	soulkeeper: {
		name: "Soulkeeper",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "hellfire",
		effect: "",
		shareID: "h4"
	},
	dementia: {
		name: "Dementia",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "hellfire",
		effect: "",
		shareID: "h5"
	},
	ferocity: {
		name: "Ferocity",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "hellfire",
		effect: "",
		shareID: "h6"
	},
	maplestrike: {
		name: "Maplestrike",
		type: "set",
		slot: "Bow",
		image: "",
		partOfSet: "featherfall",
		effect: "",
		shareID: "f1"
	},
	peacesong: {
		name: "Peacesong",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "featherfall",
		effect: "",
		shareID: "f6"
	},
	emberling: {
		name: "Emberling",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "featherfall",
		effect: "",
		shareID: "f2"
	},
	windspirit: {
		name: "Windspirit",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "featherfall",
		effect: "",
		shareID: "f3"
	},
	nimble: {
		name: "Nimble",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "featherfall",
		effect: "",
		shareID: "f4"
	},
	clarity: {
		name: "Clarity",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "featherfall",
		effect: "",
		shareID: "f5"
	},
	veilage: {
		name: "Veilage",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "4% Empower Chance",
		location: "r6 heroic",
		shareID: "vl"
	},
	flickerate: {
		name: "Flickerate",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "2% Absorb Chance",
		location: "r6 heroic",
		shareID: "fr"
	},
	moon_collage: {
		name: "Moon Collage",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "Gain a 1%, 2%, 3%, 5%, 10% or 50% damage increase based on a weighted chance",
		location: "t9 trials",
		shareID: "ml"
	},
	lava_defender: {
		name: "Lava Defender",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "5% Redirect chance",
		location: "t9 trials",
		shareID: "ld"
	},
	dewey_decal: {
		name: "Dewey Decal",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "Gain 5% increased damage while all teammates are alive",
		location: "t9 orlag hc",
		shareID: "dy"
	},
	magmasher: {
		name: "Magmasher",
		type: "mythic",
		slot: "Axe",
		image: "",
		partOfSet: "",
		effect: "Heals received from skills are 10% more effective",
		location: "t9 orlag hc",
		shareID: "mg"
	},
	brightstar: {
		name: "Brightstar",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "3% Deflect Chance",
		location: "t9 nether hc",
		shareID: "bt"
	},
	shifting_breeze: {
		name: "Shifting Breeze",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "4% Speed",
		location: "t9 nether hc",
		shareID: "sb"
	},
	oblivion: {
		name: "Oblivion",
		type: "mythic",
		slot: "Staff",
		image: "",
		partOfSet: "",
		effect: "+1% Absorb Chance, +1% Deflect Chance, +1% Evade Chance",
		location: "Expedition (Relaeib Portal)",
		shareID: "ov"
	},
	peeper: {
		name: "Peeper",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "+1-8% Damage",
		location: "Expedition (Zarlock Portal)",
		shareID: "ee"
	},
	ataraxia: {
		name: "Ataraxia",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "Gain 1% increase damage for every set item equipped",
		location: "Expedition (Blemo Portal)",
		shareID: "xi"
	},
	twitch: {
		name: "Twitch",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "+1-8% Damage Reduction",
		location: "Expedition (Gummy's Portal)",
		shareID: "wi"
	},
	abhorence: {
		name: "Abhorence",
		type: "mythic",
		slot: "Bow",
		image: "",
		partOfSet: "",
		effect: "+1.5% Ricochet Chance, 1% Empower Chance, 1% Dual Strike",
		location: "Expedition (Googarum's)",
		shareID: "ah"
	},
	radiance: {
		name: "Radiance",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "Gain 0.75% Increase damage and damage reduction for every Mythic item equipped",
		location: "Svord's",
		shareID: "re"
	},
	vile_focus: {
		name: "Vile Focus",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "While above 50% health, Absorb Chance increased by 3%",
		location: "Expedition (Twinmbo's)",
		shareID: "vf"
	},
	cloak_of_dark_tides: {
		name: "Cloak Of Dark Tides",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "Deal 5% increased damage, but take 5% increased damage",
		location: "Expedition (X5-T34M's)",
		shareID: "dt"
	},
	mewmeck: {
		name: "Mewmeck",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "+1% Damage, +1% Speed, +1% Dual Strike, +1% Empower Chance",
		location: "Jelly Event",
		shareID: "wc"
	},
	peppermint_ring: {
		name: "Peppermint Ring",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "+2 Team Enrage, You and nearby teammates gain 1% increased Damage",
		location: "Holiday Invasion",
		shareID: "pr"
	},
	sakura: {
		name: "Sakura",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "25% Damage Reduction, 10% Block Chance",
		location: "Shop",
		shareID: "ur"
	},
	zaserite_wings: {
		name: "Zaserite Wings",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "10% Crit Chance, 5% Empower Chance, 5% Dual Strike, 5% Damage, 5% Speed, 5% Life Steal",
		location: "Shop",
		shareID: "za"
	},
	drozgul: {
		name: "Drozgul",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "8% Damage Reduction, 5% Evade Chance, 5% Absorb Chance, 5% Deflect Chance",
		location: "Shop",
		shareID: "gu"
	},
	kiwi: {
		name: "Kiwi",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20.5% Chance to attack weakest per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "iw"
	},
	sardines: {
		name: "Sardines",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to spread heal and shield per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "da"
	},
	crintie: {
		name: "Crintie",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% chance to heal weakest teammate and attack weakest enemy per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "cr"
	},
	harvester: {
		name: "Harvester",
		type: "ancient",
		slot: "Sword",
		image: "",
		partOfSet: "",
		effect: "Bonus: 5% chance to use a random skill for free at the start of each turn. +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z7d3",
		shareID: "hv"
	},
	starweave_ring: {
		name: "Starweave",
		type: "ancient",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "Reduces the amount of set items required for a set bonus by 1. Must have at least 2 items of a specific set equipped. +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z8d3",
		shareID: "sr"
	},
	starweave_necklace: {
		name: "Starweave",
		type: "ancient",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "Reduces the amount of set items required for a set bonus by 1. Must have at least 2 items of a specific set equipped, +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z8d3",
		shareID: "sn"
	},
	elementarium_body: {
		name: "Elementarium",
		type: "ancient",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "Major Rune Bonuses Doubled. Only 1 bonus of this type may be active. +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z10d3",
		shareID: "el"
	},
	elementarium_head: {
		name: "Elementarium",
		type: "ancient",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "Major Rune Bonuses Doubled. Only 1 bonus of this type may be active. +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z10d3",
		shareID: "ez"
	},
	melvin_cloak: {
		name: "Melvin Cloak",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "You and nearby teammates gain 2% increased damage",
		location: "R7 heroic",
		shareID: "m1"
	},
	melvin_head: {
		name: "Melvin Head",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "Increase maximum shields to 75% of total health",
		location: "R7 Trials 680+",
		shareID: "m2"
	},
	frostybite: {
		name: "Frostybite",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "5% SP skill damage increase",
		location: "R7 heroic",
		shareID: "f1"
	},
	bassault: {
		name: "Bassault",
		type: "mythic",
		slot: "Axe",
		image: "",
		partOfSet: "",
		effect: "Gain 5% damage reduction while shielded",
		location: "R7 Trials 680+",
		shareID: "b1"
	},
	ikoscale: {
		name: "Ikoscale",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "merciless",
		effect: "",
		shareID: "m3"
	},
	phantomate: {
		name: "Phantomate",
		type: "set",
		slot: "Spear",
		image: "",
		partOfSet: "merciless",
		effect: "",
		shareID: "m4"
	},
	reptor: {
		name: "Reptor",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "merciless",
		effect: "",
		shareID: "m5"
	},
	retilio: {
		name: "Retilio",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "merciless",
		effect: "",
		shareID: "m6"
	},
	exarkun: {
		name: "Exarkun",
		type: "set",
		slot: "Spear",
		image: "",
		partOfSet: "apocalypse",
		effect: "",
		shareID: "c1"
	},
	reflekun: {
		name: "Reflekun",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "apocalypse",
		effect: "",
		shareID: "c2"
	},
	solus: {
		name: "Solus",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "apocalypse",
		effect: "",
		shareID: "c3"
	},
	garplate: {
		name: "Garplate",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "apocalypse",
		effect: "",
		shareID: "c4"
	},
	revenwrap: {
		name: "Revenwrap",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "apocalypse",
		effect: "",
		shareID: "c5"
	},
	plaguscore: {
		name: "Plaguscore",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "apocalypse",
		effect: "",
		shareID: "c6"
	},
	tectonica: {
		name: "Tectonica",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "earthen_might",
		effect: "",
		shareID: "t1"
	},
	quartzar: {
		name: "Quartzar",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "earthen_might",
		effect: "",
		shareID: "t2"
	},
	shatterguard: {
		name: "Shatterguard",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "earthen_might",
		effect: "",
		shareID: "t3"
	},
	omenstone: {
		name: "Omenstone",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "earthen_might",
		effect: "",
		shareID: "t4"
	},
	degenera: {
		name: "Degenera",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "1% Absorb, 1% Deflect, 1% Damage Reduction",
		location: "T10 Melvin World Boss",
		shareID: "m7"
	},
	rabid_skeever: {
		name: "Rabid Skeever",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "When you hit an enemy, launch a skeever at the weakest eneemy for 47-87 damage.",
		location: "T10 Melvin World Boss",
		shareID: "m8"
	},
	meteor_blaster: {
		name: "Meteor Blaster",
		type: "mythic",
		slot: "Laser Gun",
		image: "",
		partOfSet: "",
		effect: "5% Bonus Healing + 1 each time an ally is healed up to 10",
		location: "Expedition Zorgo Crossing",
		shareID: "mb"
	},
	vortex_zapper: {
		name: "Vortex Zapper",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "3% Ricochet Chance",
		location: "Expedition Yackerz Tundra",
		shareID: "vz"
	},
	meteor_chain: {
		name: "Meteor Chain",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "1% Dual Strike, 1% Empower Chance 5% to gain SP",
		location: "Expedition Vionot Sewer",
		shareID: "md"
	},
	power_core: {
		name: "Power Core",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "25% Damage Reduction, 5% Evade  Chance",
		location: "Shop",
		shareID: "pw"
	},
	vortex_band: {
		name: "Vortex Band",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "Gain Damage reduction the higher health percentage is up to 4.5%",
		location: "Expedition",
		shareID: "vb"
	},
	nice_to_meat_ya: {
		name: "Nice To Meat Ya",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "+1% Absorb, +2% Damage Reduction",
		location: "Papoz Invasion",
		shareID: "my"
	},
	polychromatic_blaster_main: {
		name: "Polychromatic Blaster",
		type: "ancient",
		slot: "Laser Gun",
		image: "",
		partOfSet: "",
		effect: "If you have 1 mythic equipped, double the bonuses. +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z9d3",
		shareID: "yc"
	},
	polychromatic_blaster_offhand: {
		name: "Polychromatic Blaster",
		type: "ancient",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "If you have 1 mythic equipped, double the bonuses. +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z9d3",
		shareID: "yo"
	},
	sleipnir: {
		name: "Sleipnir",
		type: "mythic",
		slot: "Axe",
		image: "",
		partOfSet: "",
		effect: "While above 50% health, damage increased by 5%",
		location: "Blublix Portal (IDOL)",
		shareID: "xs"
	},
	slibinas: {
		name: "Slibinas",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "+1% Block, 1% Evade, 1% Damage Reduction, 0.5% absorb, 0.5% Deflect chance",
		location: "Mowhi Portal ( IDOL )",
		shareID: "xa"
	},
	eternal_resolve: {
		name: "Eternal Resolve",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "5% chance to gain 2 sp per turn",
		location: "Wizbot Portal ( IDOL )",
		shareID: "xe"
	},
	ultimatum: {
		name: "Ultimatum",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "+2% Dual Strike, +0.5% Quad Strike",
		location: "Astamus Portal ( IDOL )",
		shareID: "xu"
	},
	pep_pep: {
		name: "Pep Pep",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "+1% Quad Strike",
		location: "Ninja Invasion Mythic",
		shareID: "pq"
	},
	blorg_implant: {
		name: "Blorg Implant",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "Deal 10% increased Damage when the enemy team only has 1 unit alive",
		location: "t10 Extermination Worldboss",
		shareID: "bh"
	},
	timeweaver_garments: {
		name: "Timeweaver Garments",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "+5% damage reduction while all teammates are alive",
		location: "t10 Extermination Worldboss",
		shareID: "tg"
	},
	vulcarn: {
		name: "Vulcarn",
		type: "set",
		slot: "Axe",
		image: "",
		partOfSet: "virulence",
		effect: "",
		shareID: "v1"
	},
	ytterbite_scrap: {
		name: "Ytterbite Scrap",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "virulence",
		effect: "",
		shareID: "v2"
	},
	aquatic_ward: {
		name: "Aquatic Ward",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "trident",
		effect: "",
		shareID: "t5"
	},
	nemos_tempest: {
		name: "Nemo's Tempest",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "trident",
		effect: "",
		shareID: "t6"
	},
	//venom
	wigo_wiggins: {
		name: "Wigo Wiggins",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "venom",
		effect: "",
		shareID: "v3"
	},
	warriorolas: {
		name: "Warriorolas",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "venom",
		effect: "",
		shareID: "v4"
	},
	shiztiny: {
		name: "Shiztiny",
		type: "set",
		slot: "Spear",
		image: "",
		partOfSet: "venom",
		effect: "",
		shareID: "v5"
	},
	earendrin: {
		name: "Earendrin",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "venom",
		effect: "",
		shareID: "v6"
	},

	//camouflage
	violenshine: {
		name: "Violenshine",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "camouflage",
		effect: "",
		shareID: "c7"
	},
	violenhell: {
		name: "Violenhell",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "camouflage",
		effect: "",
		shareID: "c8"
	},
	violenmane: {
		name: "Violenmane",
		type: "set",
		slot: "Axe",
		image: "",
		partOfSet: "camouflage",
		effect: "",
		shareID: "c9"
	},
	viobus: {
		name: "Viobus",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "camouflage",
		effect: "",
		shareID: "c0"
	},

	//mistery
	visertal: {
		name: "Visertal",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "mistery",
		effect: "",
		shareID: "0m"
	},
	battletal: {
		name: "Battletal",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "mistery",
		effect: "",
		shareID: "1m"
	},
	grindymetal: {
		name: "Grindymetal",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "mistery",
		effect: "",
		shareID: "2m"
	},

	//courage
	wickedwood: {
		name: "Wickedwood",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "courage",
		effect: "",
		shareID: "0c"
	},
	malwood: {
		name: "Malwood",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "courage",
		effect: "",
		shareID: "1c"
	},
	woocrusher: {
		name: "Woocrusher",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "courage",
		effect: "",
		shareID: "2c"
	},

	blind_souls: {
		name: "Blind Souls",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "Gain a 0.5%, 1%, 1.5%, 2.5%, 5%, or 25% Absorb Chance Based On A Weighted Chance",
		location: "r8 Heroic",
		shareID: "bs"
	},
	ironbark_longbow: {
		name: "Ironbark Longbow",
		type: "mythic",
		slot: "Crossbow",
		image: "",
		partOfSet: "",
		effect: "2% Increased Damage, Each Hit on an Enemy Increases the bonus by 1% on them, to a max of 8%",
		location: "r8 Raid",
		shareID: "lb"
	},
	conquerors_fury: {
		name: "Conquerors Fury",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "+4% Empower Chance",
		location: "t11 Trials",
		shareID: "cf"
	},
	battleplate: {
		name: "Battleplate",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "+5% sp skill damage",
		location: "t11 trials",
		shareID: "1b"
	},
	windstalker: {
		name: "Windstalker",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "Deal increased damage the higher your health percentage is, up to a maximum of 8%",
		location: "t11 Melvin Worldboss",
		shareID: "ws"
	},
	proton_beem_zapper: {
		name: "Proton Beem Zapper",
		type: "mythic",
		slot: "Laser Gun",
		image: "",
		partOfSet: "",
		effect: "1.5% Ricochet Chance, 0.5% Quad Strike",
		location: "t11 Melvin Worldboss",
		shareID: "wz"
	},
	empyrean_vindicator: {
		name: "Empyrean Vindicator",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "Damage recieved from non redirect, ricochet, or bouncing attacks deal 5% less damage",
		location: "t11 3xt Worldboss",
		shareID: "ev"
	},
	phoenix_ravager: {
		name: "Phoenix Ravager",
		type: "mythic",
		slot: "Axe",
		image: "",
		partOfSet: "",
		effect: "While At Full Health, Gain 5% Damage Reduction",
		location: "t11 3xt Worldboss",
		shareID: "pv"
	},
	goldwings_chivalry: {
		name: "Goldwings Chivalry",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "16% Damage Reduction, 8% Absorb Chance, -4% Damage",
		location: "Shop",
		shareID: "gc"
	},
	jupingz: {
		name: "Jupingz",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "12.5% Dual Strike, 12.5% Empower Chance",
		location: "Shop",
		shareID: "jg"
	},
	
	glamounir: {
		name: "Glamounir",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "1% Absorb Chance, 1% Deflect Chance, 1% Evade Chance",
		location: "Battle Bards Expedition, left",
		shareID: "b2"
	},
	bassoul: {
		name: "Bassoul",
		type: "mythic",
		slot: "Axe",
		image: "",
		partOfSet: "",
		effect: "2% Absorb Chance, Team Gains 1% Increased Damage",
		location: "Battle Bards Expedition, middle",
		shareID: "b3"
	},
	demonmullet: {
		name: "Demonmullet",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "Team Gains 2% Damage Reduction",
		location: "Battle Bards Expedition, top",
		shareID: "b4"
	},
	chippity: {
		name: "Chippity",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "1% Damage, 1% Speed, 1% Dual Strike, 1% Empower Chance",
		location: "Battle Bards Expedition, right",
		shareID: "b5"
	},

	hydronus_helmet: {
		name: "Hydronus Helmet",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "3% Crit Chance, 3% Speed",
		location: "Brimstone t11 Worldboss",
		shareID: "b6"
	},
	hydragar_stone: {
		name: "Hydragar Stone",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "While Above 50% Health, Gain 5% Absorb",
		location: "Brimstone t11 Worldboss",
		shareID: "b7"
	},
	scrawny: {
		name: "Scrawny",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "+2% Empower Chance, +2% Speed",
		location: "Zombo Invasion",
		shareID: "sy"
	},
	//elementals
	voltio: {
		name: "Voltio",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "voltio",
		effect: "",
		shareID: "V1",
		elemental: {
			element_value: 3,
			element_type: "electric",
			element_modifier: "damage",
			flat: false
		}
	},
	vohltij: {
		name: "Vohltij",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "voltio",
		effect: "",
		shareID: "V2",
		elemental: {
			element_value: 3,
			element_type: "electric",
			element_modifier: "damage",
			flat: false
		}
	},
	ihlektron: {
		name: "Ihlektron",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "voltio",
		effect: "",
		shareID: "V3",
		elemental: {
			element_value: 3,
			element_type: "electric",
			element_modifier: "damage",
			flat: false
		}
	},
	kiluhwot: {
		name: "Kiluhwot",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "voltio",
		effect: "",
		shareID: "V4",
		elemental: {
			element_value: 3,
			element_type: "electric",
			element_modifier: "damage",
			flat: false
		}
	},
	spahrk: {
		name: "Spahrk",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "voltio",
		effect: "",
		shareID: "V5",
		elemental: {
			element_value: 3,
			element_type: "electric",
			element_modifier: "damage",
			flat: false
		}
	},
	johlt: {
		name: "Johlt",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "voltio",
		effect: "",
		shareID: "V6",
		elemental: {
			element_value: 3,
			element_type: "electric",
			element_modifier: "damage",
			flat: false
		}
	},
	abandon_fate: {
		name: "Abandon Fate",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "ishmaels_bounty",
		effect: "",
		shareID: "IA",
		elemental: {
			element_value: 3,
			element_type: "water",
			element_modifier: "resistance",
			flat: false
		}
	},
	tentuhkuhl: {
		name: "Tentuhkuhl",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "ishmaels_bounty",
		effect: "",
		shareID: "IB",
		elemental: {
			element_value: 3,
			element_type: "water",
			element_modifier: "resistance",
			flat: false
		}
	},
	traitors_loop: {
		name: "Traitors Loop",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		location: "t11 Titan World Boss",
		effect: "10% Chance for Skills to Not Spend SP, +5% Fire Resist, +39 Water Damage",
		shareID: "TL",
		elemental: {
			element_value: 5,
			element_type: "fire",
			element_modifier: "resistance",
			flat: false
		},
		elemental2: {
			element_value: 39,
			element_type: "water",
			element_modifier: "damage",
			flat: false
		}
	},
	nephilim_shield: {
		name: "Nephilim Shield",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		location: "t12 Trials",
		effect: "+4 Air DMG, +4 Electric Resist, +4% Dual Strike",
		shareID: "NS",
		elemental: {
			element_value: 4,
			element_type: "air",
			element_modifier: "damage",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "electric",
			element_modifier: "resistance",
			flat: false
		}
	},
	nephilim_scaled_vest: {
		name: "Nephilim Scaled Vest",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		location: "t12 Trials",
		effect: "4% Earth Resist, +4% Fire Damage, While Below 30% Health, 10% Chance for Healing Skills Received To Be Doubled.",
		shareID: "NV",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "resistance",
			flat: false
		}
	},
	nephilim_circle: {
		name: "Nephilim Circle",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		location: "t12 Raids",
		effect: "4% Electric Resist, +4% Air Damage, Teammates Take 3% Reduced Damage.",
		shareID: "NC",
		elemental: {
			element_value: 4,
			element_type: "air",
			element_modifier: "damage",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "electric",
			element_modifier: "resistance",
			flat: false
		}
	},
	nephilim_jewel: {
		name: "Nephilim Jewel",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		location: "t12 Titans",
		effect: "4% Earth Resist, +4% Fire Damage, 10% Chance to Heal Self When You Are About To Die.",
		shareID: "NJ",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "resistance",
			flat: false
		}
	},
	nephilim_casque: {
		name: "Nephilim casque",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		location: "t12 Titans",
		effect: "4% Fire Resist, +4% Water Damage, While Above 40% Health, Speed Increased By 5%.",
		shareID: "NQ",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "resistance",
			flat: false
		}
	},
	nephilim_legacy: {
		name: "Nephilim Legacy",
		type: "mythic",
		slot: "Axe",
		image: "",
		partOfSet: "",
		location: "t12 Brimstone",
		effect: "+4% Damage, +4% Damage Reduction.",
		shareID: "NL",
	},
	nephilim_girdle: {
		name: "Nephilim Girdle",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		location: "t12 Brimstone",
		effect: "4% Fire Resist, +4% Water Damage, Empower +1.25% Per Teammate alive",
		shareID: "Ng",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "resistance",
			flat: false
		}
	},
	ring_of_hellish_fire: {
		name: "Ring Of Hellish Fire",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "pyroc",
		effect: "",
		shareID: "HF",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		}
	},
	raiment_of_hellish_fire: {
		name: "Raiment Of Hellish Fire",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "pyroc",
		effect: "",
		shareID: "HR",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		}
	},
	wip_of_hellish_fire: {
		name: "Wip Of Hellish Fire",
		type: "set",
		slot: "Spear",
		image: "",
		partOfSet: "pyroc",
		effect: "",
		shareID: "HW",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		}
	},
	sleave_of_hellish_fire: {
		name: "Sleave Of Hellish Fire",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "pyroc",
		effect: "",
		shareID: "HS",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		}
	},
	visage_of_atlante: {
		name: "Visage Of Atlante",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "nepulus",
		effect: "",
		shareID: "VA",
		elemental: {
			element_value: 4,
			element_type: "water",
			element_modifier: "resistance",
			flat: false
		}
	},
	greatplate_of_atlante: {
		name: "Greatplate Of Atlante",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "nepulus",
		effect: "",
		shareID: "VQ",
		elemental: {
			element_value: 4,
			element_type: "water",
			element_modifier: "resistance",
			flat: false
		}
	},
	battleaxe_of_atlante: {
		name: "Battleaxe Of Atlante",
		type: "set",
		slot: "Axe",
		image: "",
		partOfSet: "nepulus",
		effect: "",
		shareID: "VB",
		elemental: {
			element_value: 4,
			element_type: "water",
			element_modifier: "resistance",
			flat: false
		}
	},
	gem_of_atlante: {
		name: "Gem Of Atlante",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "nepulus",
		effect: "",
		shareID: "VG",
		elemental: {
			element_value: 4,
			element_type: "water",
			element_modifier: "resistance",
			flat: false
		}
	},
	last_hope_faceguard: {
		name: "Last Hope Faceguard",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "pangea",
		effect: "",
		shareID: "LF",
		elemental: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "resistance",
			flat: false
		}
	},
	last_hope_stone: {
		name: "Last Hope Stone",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "pangea",
		effect: "",
		shareID: "LS",
		elemental: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "resistance",
			flat: false
		}
	},
	last_hope_hammer: {
		name: "Last Hope Hammer",
		type: "set",
		slot: "Hammer",
		image: "",
		partOfSet: "pangea",
		effect: "",
		shareID: "V8",
		elemental: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "resistance",
			flat: false
		}
	},
	last_hope_outbreak: {
		name: "Last Hope Outbreak",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "pangea",
		effect: "",
		shareID: "LO",
		elemental: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "resistance",
			flat: false
		}
	},
	crown_of_zeus: {
		name: "Crown Of Zeus",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "lucernas",
		effect: "",
		shareID: "ZC",
		elemental: {
			element_value: 4,
			element_type: "air",
			element_modifier: "damage",
			flat: false
		}
	},
	chestguard_of_zeus: {
		name: "Chestguard Of Zeus",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "lucernas",
		effect: "",
		shareID: "ZB",
		elemental: {
			element_value: 4,
			element_type: "air",
			element_modifier: "damage",
			flat: false
		}
	},
	pact_of_zeus: {
		name: "Pact Of Zeus",
		type: "set",
		slot: "Spear",
		image: "",
		partOfSet: "lucernas",
		effect: "",
		shareID: "ZP",
		elemental: {
			element_value: 4,
			element_type: "air",
			element_modifier: "damage",
			flat: false
		}
	},
	battery_of_zeus: {
		name: "Battery Of Zeus",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "lucernas",
		effect: "",
		shareID: "ZO",
		elemental: {
			element_value: 4,
			element_type: "air",
			element_modifier: "damage",
			flat: false
		}
	},
	carbi: {
		name: "Carbi",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "10% Water Resist, 20% Damage Reduction",
		location: "Shop",
		shareID: "bc"
	},
	gryphen_resistor: {
		name: "Gryphen Resistor",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "22% Block Chance, 10% Deflect Chance, 5% Electric Resist",
		location: "Shop",
		shareID: "gr"
	},
	astaroth_flag: {
		name: "Astaroth Flag",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "16% Damage, 16% Crit Chance",
		location: "PvP reward - Astaroth",
		shareID: "oh"
	},
	bit_chain: {
		name: "Bit Chain",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "16% Damage, 16% Crit Chance",
		location: "PvP Reward - 'B.I.T'",
		shareID: "ba"
	},
	mirror_wings: {
		name: "Mirror Wings",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "22% block Chance, 10% Deflect Chance",
		location: "PvP Reward - Mirror",
		shareID: "mw"
	},
	ancient_pendant: {
		name: "Ancient Pendant",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "10% Damage, 10% Speed, 4% Dual Strike",
		location: "PvP reward - Colonial",
		shareID: "ap"
	},
	grim_ward: {
		name: "Grim Ward",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "10% Damage Enrage, 10% Health, 5% Deflect Chance",
		location: "PvP Reward - 'Grim'",
		shareID: "gw"
	},
	dumglim: {
		name: "Dumglim",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to shield team per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "7k"
	},
	beto_ben: {
		name: "Beto Ben",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "41% Chance to attack furthest enemy per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "7l"
	},
	shelly: {
		name: "Shelly",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to heal lowest health teammate and shield self per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "0g"
	},
	manila: {
		name: "Manila",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "41 Chance to shield strongest per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "xl"
	},
	ringo: {
		name: "Ringo",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "40.5 Chance to attack weakest enemy 2 times per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "ii"
	},
	jellbi: {
		name: "Jellbi",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "40.5 Chance to deal electric damage 2 times to furthest enemy per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "hq"
	},
	ge: {
		name: "Ge",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to heal weakest teammate per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "9z"
	},
	bia: {
		name: "Bia",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to shield team and spread heal per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "vq"
	},
	thymos: {
		name: "Thymos",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to heal team per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "qx"
	},
	pyr: {
		name: "Pye",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "41% Chance to deal fire damage to the closest 3 enemies per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "ut"
	},
	rhoe: {
		name: "Rhoe",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to deal water damage 3 times to weakest enemy per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "v0"
	},
	boogie: {
		name: "Boogie",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to spread heal per turn, when you get hit, and when you hit an enemy",
		location: "Trials Reward - 'Boogie'",
		shareID: "zp"
	},
	nemo: {
		name: "Nemo",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "10% Channce to attack closest enemy per turn, when you get hit, and when you hit an enemy",
		location: "PvP Reward - 'nemo",
		shareID: "zi"
	},
	nerder: {
		name: "DNerder",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "10% Chance to self-heal per turn, when you get hit, and when you hit an enemy",
		location: "PvP Reward - 'Nerder'",
		shareID: "lw"
	},
	pumkwim: {
		name: "Pumkwim",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to attack enemy team per turn, when you get hit, and when you hit an enemy",
		location: "PvP Reward - 'Pumkwim'",
		shareID: "5o"
	},
	snut: {
		name: "Snut",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "10% Chance to shield team per turn, when you get hit, and when you hit an enemy",
		location: "PvP Reward - 'Snut'",
		shareID: "4o"
	},
	rendar: {
		name: "Rendar",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "40% Chance to shield self when you get hit",
		location: "PvP Reward - 'Rendar'",
		shareID: "hx"
	},
	nemrod: {
		name: "Nemrod",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "41% Chance to heal weakest teammate and attack weakest enemy per turn, on hit, or when you hit an enemy. Choose 1.",
		location: "PvP Reward - 'Nemrod'",
		shareID: "7f"
	},
	aryagn_sight: {
		name: "Aryagn Sight",
		type: "ancient",
		slot: "Bow",
		image: "",
		partOfSet: "",
		effect: "+5% Damage, +5% Damage Reduction, 50% Chance to attack the enemy with their weakest elemental resistance",
		location: "Craft from z12d4",
		shareID: "6f"
	},
	ladener_broom: {
		name: "Ladener Broom",
		type: "ancient",
		slot: "Staff",
		image: "",
		partOfSet: "",
		effect: "+5% Damage, +5% Damage Reduction, 50% Chance when you get hit to change all elemental resistants to the attack's",
		location: "Craft from z12d4",
		shareID: "5f"
	},

}

//Not for public to use
/*
let x = [];

const generateShareIDCollection = (equipment) => {
	Object.keys(equipment).forEach((y) => {
		x.push(equipment[y].shareID);
	})
}
generateShareIDCollection(equipment);


const generateShareID = () => {
	let result           = '';
   	var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
   	var charactersLength = characters.length;
   	for ( var i = 0; i < 2; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	if (x.includes(result)) {
		generateShareID();
	} else {
		x.push(result);
		console.log(result);
	}
}

*/

/* 
[name]: {
		name: "",
		type: "set",
		slot: "",
		image: "",
		partOfSet: "",
		effect: ""
	},

	[name]: {
		name: "",
		type: "mythic",
		slot: "",
		image: "",
		partOfSet: "",
		effect: "",
		location: ""
	},
	[name]: {
		name: "",
		type: "legendary",
		slot: "",
		image: "",
		partOfSet: "",
		effect: "",
		location: "",
		shareID: ""
	},
	*/