/*function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.substring(1)
}

function splitCapitalizeFirstLetter(string) {
	let x = string.split(' ');
	let r = "";
	for (var i = 0; i < x.length; i++) {
		r += x[i][0].toUpperCase() + x[i].substring(1)
	}
    return r;
}

*/

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
};

const filterSearching = (testing, searching) => {
	try {
		if (testing.toLowerCase().includes(searching.toLowerCase())) {
			return true;
		} 
	} 
	catch (err) {
		console.log(err);
	}
	/*
	try {
		if (testing.includes(searching) || 
			// eslint-disable-next-line 
			testing.includes(searching.toUpperCase()) || 
			// eslint-disable-next-line 
			testing.includes(searching.toLowerCase()) ||
			// eslint-disable-next-line 
			testing.includes(capitalizeFirstLetter(searching)) ||

			testing.includes(splitCapitalizeFirstLetter(searching))
			) {
				return true;
		}

		if (testing.toUpperCase().includes(searching) || 
			// eslint-disable-next-line 
			testing.toUpperCase().includes(searching.toUpperCase()) || 
			// eslint-disable-next-line 
			testing.toLowerCase().includes(searching.toLowerCase()) ||
			// eslint-disable-next-line 
			capitalizeFirstLetter(testing).includes(capitalizeFirstLetter(searching)) ||

			splitCapitalizeFirstLetter(testing).includes(splitCapitalizeFirstLetter(searching))
			) {
				return true;
		}



	} catch (err) {
		return false;
	}
	*/
	return false;
}

const convertName = (name) => {
	name = name.split(' ').join('_');
	name = name.split("'").join("");
	name = name.toLowerCase();
	return name;
  }

export const filteringEquipment = (equipment, filters, sets = {}, objectBool = true) => {
	/*
		filters: {
			searching: String,
			tiers: [],
			mythicsOnly: bool,
			setsOnly: bool,
			
		}
	
	*/

	let oB = objectBool;
	let sortedEquipment;
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
	var mythics = {}, legendaries = {};
	let setsSort = sets;
	let returnSets = {};
	let filterTextArray = [];

	if (filters.searching.length > 0) {
		let t = filters.searching.split(' ').filter(r => r !== "");
		t.forEach((x) => {
			let p = x.split('_').filter(r => r !== "");
			p.forEach((q) => {
				filterTextArray.push(q);
			})
		})
	};
	//Equipment + Mythics
	Object.keys(equipment).forEach( (x) => {

		let pass = true;
		equipment[x].image = `${x}.png`;

		// first search through
		if (filters.mythicsOnly && equipment[x].type !== 'mythic') {
			pass = false;
		} else if (filters.setsOnly && equipment[x].type !== 'set') {
			pass = false;
		}

		//if it fails, we can just skip the rest)
		if (pass) {
			//if searching by tiers
			if (filters.tiers) {
				if (!filters.tiers.includes(equipment[x].tier)) {
					pass = false;
				}
			}
		} 

		//text searching
		if (pass) {
			if (filterTextArray.length > 0) {
				pass = false;
				// eslint-disable-next-line 
				filterTextArray.forEach((q) => {
					
					if (q !== "") {
						if (filterSearching(equipment[x].name,q ) || 
							(equipment[x].partOfSet && filterSearching(equipment[x].partOfSet, q)) ||
							(equipment[x].effect && filterSearching(equipment[x].effect, q))) {
							pass = true;
						}
					} 
					
				})
			}
		}

		if (pass) {
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
		}

	});
	
	//sets
	/*

		1. Loop over return sets
		2. Grab equipment from sets and match to equipment from 'equipment'
		3. Loop over this new equipment
		4. Find its slot and search if it appears in sortedEquipment
		5. If it doesn't, add it in
		
	*/

	if (Object.keys(setsSort).length > 0) {
		Object.keys(setsSort).forEach( (x) => {
			let pass = true;

			if (filters.tiers) {
				if (!filters.tiers.includes(setsSort[x].tier)) {
					pass = false;
				}
			}

			//text searching
			if (pass) {
				if (filterTextArray.length > 0) {
					pass = false;
					// eslint-disable-next-line 
					filterTextArray.forEach((q) => {
						
						if (q !== "") {
							if (filterSearching(setsSort[x].name, q) || 
								(filterSearching(setsSort[x].location, q))) {
								pass = true;
							}
							Object.keys(setsSort[x].setBonuses).forEach((y) => {
								if (filterSearching(setsSort[x].setBonuses[y], q)) {
									pass = true;
								}
							})
							Object.keys(setsSort[x].items).forEach((y) => {
								if (filterSearching(setsSort[x].items[y].name, q)) {
									pass = true;
								}
								if (filterSearching(setsSort[x].items[y].slot, q)) {
									pass = true;
								}
							})
						} 
						
					})
				}
			}


			if(pass) {
				returnSets[x] = setsSort[x];

				setsSort[x].items.forEach((y)=> {
					let convertedName = convertName(y.name);
					switch(y.slot) {
						case 'Offhand':
							if (!Object.keys(sortedEquipment.offhands).includes(convertedName)) {
								!oB ? sortedEquipment.offhands.push(y) : sortedEquipment.offhands[convertedName] = y;
							} 
							break;
						case 'Body':
							if (!Object.keys(sortedEquipment.bodies).includes(convertedName)) {
								!oB ? sortedEquipment.bodies.push(y) : sortedEquipment.bodies[convertedName] = y;
							} 
							break;
						case 'Head':
							if (!Object.keys(sortedEquipment.heads).includes(convertedName)) {
								!oB ? sortedEquipment.heads.push(y) : sortedEquipment.heads[convertedName] = y;
							} 
							break;
						case 'Ring':
							if (!Object.keys(sortedEquipment.rings).includes(convertedName)) {
								!oB ? sortedEquipment.rings.push(y) : sortedEquipment.rings[convertedName] = y;
							} 
							break;
						case 'Necklace':
							if (!Object.keys(sortedEquipment.necklaces).includes(convertedName)) {
								!oB ? sortedEquipment.necklaces.push(y) : sortedEquipment.necklaces[convertedName] = y;
							} 
							break;
						case 'Pet':
							if (!Object.keys(sortedEquipment.pets).includes(convertedName)) {
								!oB ? sortedEquipment.pets.push(y) : sortedEquipment.pets[convertedName] = y;
							} 
							break;
						case 'Accessory':
							if (!Object.keys(sortedEquipment.accessories).includes(convertedName)) {
								!oB ? sortedEquipment.accessories.push(y) : sortedEquipment.accessories[convertedName] = y;
							} 
							break;
						default: 
							if (!Object.keys(sortedEquipment.mainhands).includes(convertedName)) {
								!oB ? sortedEquipment.mainhands.push(y) : sortedEquipment.mainhands[convertedName] = y;
							} 
					};
				})
			}
		})
	}

	

	return [sortedEquipment, mythics, legendaries, returnSets];
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
		shareID: "ph",
		tier: 5,
	},
	deimos: {
		name: "Deimos",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "ares_legacy",
		effect: "",
		shareID: "de",
		tier: 5,
	},
	phantom_light: {
		name: "Phantom Light",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "divinity",
		effect: "",
		shareID: "pl",
		tier: 6,
	},
	legacy_of_truth: {
		name: "Legacy Of Truth",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "divinity",
		effect: "",
		shareID: "lt",
		tier: 6,
	},
	trinity_plate: {
		name: "Trinity Plate",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "divinity",
		effect: "",
		shareID: "tp",
		tier: 6,
	},
	visortron: {
		name: "Visortron",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "maru",
		effect: "",
		shareID: "vi",
		tier: 7,
	},
	mechcoat: {
		name: "Mechcoat",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "maru",
		effect: "",
		shareID: "me",
		tier: 7,
	},
	rom_bios: {
		name: "ROM BIOS",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "maru",
		effect: "",
		shareID: "rb",
		tier: 7,
	},
	blast_protocol: {
		name: "Blast Protocol",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "maru",
		effect: "",
		shareID: "bp",
		tier: 7,
	},
	moonlight: {
		name: "Moonlight",
		type: "set",
		slot: "Staff",
		image: "",
		partOfSet: "night_walker",
		effect: "",
		shareID: "mo",
		tier: 8,
	},
	discordiant_power: {
		name: "Discordiant Power",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "night_walker",
		effect: "",
		shareID: "dp",
		tier: 8,
	},
	dominance: {
		name: "Dominance",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "night_walker",
		effect: "",
		shareID: "do",
		tier: 8,
	},
	adorned_malice: {
		name: "Adorned Malice",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "night_walker",
		effect: "",
		shareID: "am",
		tier: 8,
	},
	umd_lazzault: {
		name: "UMD Lazzault",
		type: "set",
		slot: "Laser Gun",
		image: "",
		partOfSet: "arsenal",
		effect: "",
		shareID: "a1",
		tier: 9,
	},
	aimbot_80: {
		name: "Aimbot 80",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "arsenal",
		effect: "",
		shareID: "a2",
		tier: 9,
	},
	a_m_h: {
		name: "A M H",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "arsenal",
		effect: "",
		shareID: "a3",
		tier: 9,
	},
	nanovectal_plating: {
		name: "Nanovectal Plating",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "arsenal",
		effect: "",
		shareID: "a4",
		tier: 9,
	},
	despair: {
		name: "Despair",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "unity",
		effect: "",
		shareID: "ds",
		tier: 5,
	},
	sorrow: {
		name: "Sorrow",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "unity",
		effect: "",
		shareID: "so",
		tier: 5,
	},
	trugdors_bite: {
		name: "Trugdor's Bite",
		type: "set",
		slot: "Bow",
		image: "",
		partOfSet: "trugdors_call",
		effect: "",
		shareID: "tb",
		tier: 5,
	},
	scaled_vambrace: {
		name: "Scaled Vambrace",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "trugdors_call",
		effect: "",
		shareID: "sv",
		tier: 5,
	},
	dragons_breath: {
		name: "Dragons Breath",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "trugdors_call",
		effect: "",
		shareID: "db",
		tier: 5,
	},
	eternal_fire: {
		name: "Eternal Fire",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "taldrilths_artifacts",
		effect: "",
		shareID: "ef",
		tier: 6,
	},
	scaled_dragons_bone: {
		name: "Scaled Dragon's Bone",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "taldrilths_artifacts",
		effect: "",
		shareID: "sd",
		tier: 6,
	},
	taldrilths_soul: {
		name: "Taldrilth's Soul",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "taldrilths_artifacts",
		effect: "",
		shareID: "ts",
		tier: 6,
	},
	matsukura: {
		name: "Matsukura",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "bushido",
		effect: "",
		shareID: "mt",
		tier: 6,
	},
	yashiros_dou: {
		name: "Yashiro's Dou",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "bushido",
		effect: "",
		shareID: "yd",
		tier: 6,
	},
	gigastrike: {
		name: "Gigastrike",
		type: "set",
		slot: "Spear",
		image: "",
		partOfSet: "conduction",
		effect: "",
		shareID: "gi",
		tier: 7,
	},
	magnetron: {
		name: "Magnetron",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "conduction",
		effect: "",
		shareID: "ma",
		tier: 7,
	},
	flow_plate: {
		name: "Flow Plate",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "conduction",
		effect: "",
		shareID: "fp",
		tier: 7,
	},
	power_amp: {
		name: "Power Amp",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "conduction",
		effect: "",
		shareID: "pa",
		tier: 7,
	},
	yak_blade: {
		name: "Yak Blade",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "luminary",
		effect: "",
		shareID: "yb",
		tier: 8,
	},
	stillness: {
		name: "Stillness",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "luminary",
		effect: "",
		shareID: "st",
		tier: 8,
	},
	hylidae: {
		name: "Hylidae",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "luminary",
		effect: "",
		shareID: "hy",
		tier: 8,
	},
	flowing_silk_sash: {
		name: "Flowing Silk Sash",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "luminary",
		effect: "",
		shareID: "fs",
		tier: 8,
	},
	sky_vapor: {
		name: "Sky Vapor",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "polaris",
		effect: "",
		shareID: "p1",
		tier: 9,
	},
	sky_vault: {
		name: "Sky Vault",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "polaris",
		effect: "",
		shareID: "p2",
		tier: 9,
	},
	champions_helm: {
		name: "Champions Helm",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "polaris",
		effect: "",
		shareID: "p3",
		tier: 9,
	},
	whale_plate: {
		name: "Whale Plate",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "polaris",
		effect: "",
		shareID: "p4",
		tier: 9,
	},
	maelstrom: {
		name: "Maelstrom",
		type: "set",
		slot: "Staff",
		image: "",
		partOfSet: "lunar_guardian",
		effect: "",
		shareID: "ms",
		tier: 6,
	},
	eclipse_barrier: {
		name: "Eclipse Barrier",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "lunar_guardian",
		effect: "",
		shareID: "eb",
		tier: 6,
	},
	moku: {
		name: "Moku",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "jynx",
		effect: "",
		shareID: "mk",
		tier: 6,
	},
	ku: {
		name: "Ku",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "jynx",
		effect: "",
		shareID: "ku",
		tier: 6,
	},
	wraithguard: {
		name: "Wraithguard",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "obliteration",
		effect: "",
		shareID: "wr",
		tier: 7,
	},
	last_sight: {
		name: "Last Sight",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "obliteration",
		effect: "",
		shareID: "ls",
		tier: 7,
	},
	dark_wrap: {
		name: "Dark Wrap",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "obliteration",
		effect: "",
		shareID: "dw",
		tier: 7,
	},
	black_omen: {
		name: "Black Omen",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "obliteration",
		effect: "",
		shareID: "bo",
		tier: 7,
	},
	arcusbolt: {
		name: "Arcusbolt",
		type: "set",
		slot: "Crossbow",
		image: "",
		partOfSet: "agony",
		effect: "",
		shareID: "ar",
		tier: 8,
	},
	tormented_soul: {
		name: "Tormented Soul",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "agony",
		effect: "",
		shareID: "tu",
		tier: 8,
	},
	gravetouch: {
		name: "Gravetouch",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "agony",
		effect: "",
		shareID: "gt",
		tier: 8,
	},
	crypt_hunter: {
		name: "Crypt Hunter",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "agony",
		effect: "",
		shareID: "ch",
		tier: 8,
	},
	slaghelm: {
		name: "Slaghelm",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "eruption",
		effect: "",
		shareID: "e1",
		tier: 9,
	},
	molten_chasis: {
		name: "Molten Chasis",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "eruption",
		effect: "",
		shareID: "e2",
		tier: 9,
	},
	magmight: {
		name: "Magmight",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "eruption",
		effect: "",
		shareID: "e3",
		tier: 9,
	},
	ancient_tiara: {
		name: "Ancient Tiara",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "illustrious_artifacts",
		effect: "",
		shareID: "ai",
		tier: 6,
	},
	heavenly_garb: {
		name: "Heavenly Garb",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "illustrious_artifacts",
		effect: "",
		shareID: "hg",
		tier: 6,
	},
	exalted_binding: {
		name: "Exalted Binding",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "illustrious_artifacts",
		effect: "",
		shareID: "ex",
		tier: 6,
	},
	tayto_sword: {
		name: "Tayto Sword",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "taters",
		effect: "",
		shareID: "ty",
		tier: 7,
	},
	tayto_sack: {
		name: "Tayto Sack",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "taters",
		effect: "",
		shareID: "tc",
		tier: 7,
	},
	hangin_tayto: {
		name: "Hangin Tayto",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "taters",
		effect: "",
		shareID: "ht",
		tier: 7,
	},
	final_gaze: {
		name: "Final Gaze",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "inferno",
		effect: "",
		shareID: "fg",
		tier: 8,
	},
	final_flash: {
		name: "Final Flash",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "inferno",
		effect: "",
		shareID: "ff",
		tier: 8,
	},
	melding_cloak: {
		name: "Melding Cloak",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "inferno",
		effect: "",
		shareID: "mc",
		tier: 8,
	},
	brimstone: {
		name: "Brimstone",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "inferno",
		effect: "",
		shareID: "br",
		tier: 8,
	},
	veilstrike: {
		name: "Veilstrike",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "requiem",
		effect: "",
		shareID: "r1",
		tier: 9,
	},
	cloudsinge: {
		name: "Cloudsinge",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "requiem",
		effect: "",
		shareID: "r2",
		tier: 9,
	},
	oscillation: {
		name: "Oscillation",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "requiem",
		effect: "",
		shareID: "r3",
		tier: 9,
	},
	acropodium: {
		name: "Acropodium",
		type: "set",
		slot: "Accessory",
		image: "",
		partOfSet: "gatekeeper",
		effect: "+30% Damage",
		shareID: "ac",
		tier: 0,
	},
	gold_pendant: {
		name: "Gold Pendant",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "+10% Damage, +10% Speed, +9% Dual Strike",
		shareID: "4v",
		tier: 0,
	},
	honor_cloud: {
		name: "Honor Cloud",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "+30% Crit Chance, +10% Evade",
		shareID: "eq",
		tier: 0,
	},
	karlorr: {
		name: "Karlorr",
		type: "set",
		slot: "Pet",
		image: "",
		partOfSet: "gatekeeper",
		effect: "30% chance to attack weakest enemy per turn, when you get hit, and when you hit an enemy",
		shareID: "ka",
		tier: 0,
	},
	pew_pew: {
		name: "Pew Pew",
		type: "mythic",
		slot: "Laser Gun",
		image: "",
		partOfSet: "",
		effect: "3% Ricochet Chance",
		location: "r4 heroic",
		shareID: "pp",
		tier: 7,
	},
	hysteria: {
		name: "Hysteria",
		type: "mythic",
		slot: "Staff",
		image: "",
		partOfSet: "",
		effect: "Gain increased damage the lower your health percentage becomes, up to 10%",
		location: "t7 Netherworld World Boss Heroic",
		shareID: "hs",
		tier: 7,
	},
	bub: {
		name: "Bub",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "2% Absorb Chance",
		location: "t7 Orlag World Boss Heroic",
		shareID: "bb",
		tier: 7,
	},
	superstition: {
		name: "Superstition",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "Convert 3% of all team damage recieved to your enrage meter",
		location: "t7 Netherworld World Boss Heroic",
		shareID: "sp",
		tier: 7,
	},
	night_visage: {
		name: "Night Visage",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "While at full health, damage increased by 5%",
		location: "t7 Set Trials and Gauntlets 200-209",
		shareID: "ni",
		tier: 7,
	},
	consumption: {
		name: "Consumption",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "5% chance to heal a teammate for 85-115% when they are about to die",
		location: "t7 Set Trials and Gauntlets 200-209",
		shareID: "cn",
		tier: 7,
	},
	decay: {
		name: "Decay",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "5% chance for healing skills recieved to be twice as effective",
		location: "r4 Heroic",
		shareID: "dc",
		tier: 7,
	},
	necrosis: {
		name: "Necrosis",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "10% chance to gain 1 SP per turn",
		location: "t7 Orlag World Boss Heroic",
		shareID: "no",
		tier: 7,
	},
	cometfell: {
		name: "Cometfell",
		type: "mythic",
		slot: "Sword",
		image: "",
		partOfSet: "",
		effect: "1% Quad Strike",
		location: "r5 Heroic",
		shareID: "cm",
		tier: 8,
	},
	nebuleye: {
		name: "Nebuleye",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "Damage increased by 1% for every legendary item equipped",
		location: "r5 Heroic",
		shareID: "nb",
		tier: 8,
	},
	hood_of_menace: {
		name: "Hood Of Menace",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "While above 75% health, evade chance increased by 5%",
		location: "t8 Netherworld World Boss Heroic",
		shareID: "hm",
		tier: 8,
	},
	crypt_tunic: {
		name: "Crypt Tunic",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "+3% Deflect Chance",
		location: "t8 Netherworld World Boss Heroic",
		shareID: "ct",
		tier: 8,
	},
	fish_n_barrel: {
		name: "Fish N' Barrel",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "Gain 5% damage reduction, but deal 5% reduced damage",
		location: "t8 Orlag World Boss Heroic",
		shareID: "fn",
		tier: 8,
	},
	engulfing_artifact: {
		name: "Engulfing Artifact",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "At the start of each turn, shield team for 22-27%",
		location: "t8 Orlag World Boss Heroic",
		shareID: "ea",
		tier: 8,
	},
	nemesis: {
		name: "Nemesis",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "4% Dual Strike",
		location: "t8 Set Trials & Gauntlets 340+",
		shareID: "ne",
		tier: 8,
	},
	bedlam: {
		name: "Bedlam",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "Increase the poteny of your healing skills by 8%",
		location: "t8 Set Trials & Gauntlets 340+",
		shareID: "bd",
		tier: 8,
	},
	widowmaker: {
		name: "Widowmaker",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "16% Crit Chance, 50% Crit Damage, 8% Empower Chance",
		location: "Shop",
		shareID: "WM",
		tier: 0,
	},
	seraphims_grace: {
		name: "Seraphims Grace",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "20% Block Chance, 10% Evade Chance, 5% Deflect Chance",
		location: "Shop",
		shareID: "sg",
		tier: 0,
	},
	melvin_champ: {
		name: "Melvin Champ",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "20% Dual Strike, 16% Crit Chance",
		location: "Shop",
		shareID: "MH",
		tier: 0,
	},
	abominable_trophy: {
		name: "Abominable Trophy",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "20% Damage Reduction, 5% Absorb Chance",
		location: "Shop",
		shareID: "ao",
		tier: 0,
	},

	wrath: {
		name: "Wrath",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "10% Deflect Chance, 7.5% Absorb Chance",
		location: "Shop",
		shareID: "WR",
		tier: 0,
	},
	baronets: {
		name: "Baronets",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "20% Empower Chance, 9% Dual Strike",
		location: "Shop",
		shareID: "ec",
		tier: 0,
	},
	astaroths_diadem: {
		name: "Astaroths Diadem",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "3.5% Empower, 3.5% Dual, 6% Damage, 6% Speed, 5% Crit Chance, 50% Crit Damage",
		location: "Shop",
		shareID: "ad",
		tier: 0,
	},
	melvin_stew: {
		name: "Melvin Stew",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "15% Absorb Chance",
		location: "Shop",
		shareID: "es",
		tier: 0,
	},
	the_atomising_neutrino_accelerator: {
		name: "The Atomising Neutrino Accelerator",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "60% Block Chance",
		location: "Shop",
		shareID: "aa",
		tier: 0,
	},
	travelling_forge: {
		name: "Travelling Forge",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "12% Dual Strike, 12% Empower Chance, 10% Crit Chance",
		location: "Shop",
		shareID: "TF",
		tier: 0,
	},
	transcendence: {
		name: "Transcendence",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "40% Crit Chance, 4.5% Dual Strike, 4.5% Empower Chance",
		location: "Shop",
		shareID: "tr",
		tier: 0,
	},
	nelson: {
		name: "Nelson",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to Attack Closest enemy per turn, get hit, and when hit",
		location: "Shop",
		shareID: "nl",
		tier: 0,
	},
	gemmi: {
		name: "Gemmi",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance To Heal per turn, on hit, and when hit",
		location: "Shop",
		shareID: "mm",
		tier: 0,
	},
	boiguh: {
		name: "Boiguh",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to shield team per turn, on hit, and when hit",
		location: "Shop",
		shareID: "uh",
		tier: 0,
	},
	quimby: {
		name: "Quimby",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to attack weakest per turn, on hit, and when hit",
		location: "Shop",
		shareID: "qu",
		tier: 0,
	},
	wuvboi: {
		name: "Wubvoi",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to heal and shield team per turn, on hit, and when hit",
		location: "Shop",
		shareID: "wv",
		tier: 0,
	},
	buvboi: {
		name: "Buvboi",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to attack random enemy per turn, on hit, and when hit",
		location: "Shop",
		shareID: "bi",
		tier: 0,
	},
	skulldemort: {
		name: "Skulldemort",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to heal lowest health teammate per turn, on hit, and when hit",
		location: "Shop",
		shareID: "sk",
		tier: 0,
	},
	fuvboi: {
		name: "Fuvboi",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "10% Chance to heal and shield team per turn, on hit, and when hit",
		location: "Shop",
		shareID: "uv",
		tier: 0,
	},
	toebert: {
		name: "Toebert",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to heal and shield team per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "te",
		tier: 0,
	},
	urgoff: {
		name: "Urgoff",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to heal team per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "uf",
		tier: 0,
	},
	prisby: {
		name: "Prisby",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "41% Chance to attack strongest enemy per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "pb",
		tier: 0,
	},
	roogamenz: {
		name: "Roogamenz",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to shield team per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "oo",
		tier: 0,
	},
	crem: {
		name: "Crem",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "10 Chance to heal team per turn, on hit, and when hit",
		location: "Shop",
		shareID: "rm",
		tier: 0,
	},
	dawn_of_mercy: {
		name: "Dawn Of Mercy",
		type: "set",
		slot: "Axe",
		image: "",
		partOfSet: "hellfire",
		effect: "",
		shareID: "dm",
		tier: 1,
	},
	idol_of_decay: {
		name: "Idol Of Decay",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "hellfire",
		effect: "",
		shareID: "io",
		tier: 1,
	},
	deception: {
		name: "Deception",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "hellfire",
		effect: "",
		shareID: "h3",
		tier: 1,
	},
	soulkeeper: {
		name: "Soulkeeper",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "hellfire",
		effect: "",
		shareID: "h4",
		tier: 1,
	},
	dementia: {
		name: "Dementia",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "hellfire",
		effect: "",
		shareID: "h5",
		tier: 1,
	},
	ferocity: {
		name: "Ferocity",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "hellfire",
		effect: "",
		shareID: "h6",
		tier: 1,
	},
	maplestrike: {
		name: "Maplestrike",
		type: "set",
		slot: "Bow",
		image: "",
		partOfSet: "featherfall",
		effect: "",
		shareID: "fq",
		tier: 1,
	},
	peacesong: {
		name: "Peacesong",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "featherfall",
		effect: "",
		shareID: "f6",
		tier: 1,
	},
	emberling: {
		name: "Emberling",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "featherfall",
		effect: "",
		shareID: "f2",
		tier: 1,
	},
	windspirit: {
		name: "Windspirit",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "featherfall",
		effect: "",
		shareID: "f3",
		tier: 1,
	},
	nimble: {
		name: "Nimble",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "featherfall",
		effect: "",
		shareID: "f4",
		tier: 1,
	},
	clarity: {
		name: "Clarity",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "featherfall",
		effect: "",
		shareID: "f5",
		tier: 1,
	},
	veilage: {
		name: "Veilage",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "4% Empower Chance",
		location: "r6 heroic",
		shareID: "vl",
		tier: 9,
	},
	flickerate: {
		name: "Flickerate",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "2% Absorb Chance",
		location: "r6 heroic",
		shareID: "fr",
		tier: 9,
	},
	moon_collage: {
		name: "Moon Collage",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "Gain a 1%, 2%, 3%, 5%, 10% or 50% damage increase based on a weighted chance",
		location: "t9 trials",
		shareID: "ml",
		tier: 9,
	},
	lava_defender: {
		name: "Lava Defender",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "5% Redirect chance",
		location: "t9 trials",
		shareID: "ld",
		tier: 9,
	},
	dewey_decal: {
		name: "Dewey Decal",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "Gain 5% increased damage while all teammates are alive",
		location: "t9 orlag hc",
		shareID: "dy",
		tier: 9,
	},
	magmasher: {
		name: "Magmasher",
		type: "mythic",
		slot: "Axe",
		image: "",
		partOfSet: "",
		effect: "Heals received from skills are 10% more effective",
		location: "t9 orlag hc",
		shareID: "mg",
		tier: 9,
	},
	brightstar: {
		name: "Brightstar",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "3% Deflect Chance",
		location: "t9 nether hc",
		shareID: "bt",
		tier: 9,
	},
	shifting_breeze: {
		name: "Shifting Breeze",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "4% Speed",
		location: "t9 nether hc",
		shareID: "sb",
		tier: 9,
	},
	oblivion: {
		name: "Oblivion",
		type: "mythic",
		slot: "Staff",
		image: "",
		partOfSet: "",
		effect: "+1% Absorb Chance, +1% Deflect Chance, +1% Evade Chance",
		location: "Expedition (Relaeib Portal)",
		shareID: "ov",
		tier: 1,
	},
	peeper: {
		name: "Peeper",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "+1-8% Damage",
		location: "Expedition (Zarlock Portal)",
		shareID: "ee",
		tier: 1,
	},
	ataraxia: {
		name: "Ataraxia",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "Gain 1% increase damage for every set item equipped",
		location: "Expedition (Blemo Portal)",
		shareID: "xi",
		tier: 1,
	},
	twitch: {
		name: "Twitch",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "+1-8% Damage Reduction",
		location: "Expedition (Gummy's Portal)",
		shareID: "wi",
		tier: 1,
	},
	abhorence: {
		name: "Abhorence",
		type: "mythic",
		slot: "Bow",
		image: "",
		partOfSet: "",
		effect: "+1.5% Ricochet Chance, 1% Empower Chance, 1% Dual Strike",
		location: "Expedition (Googarum's)",
		shareID: "ah",
		tier: 1,
	},
	radiance: {
		name: "Radiance",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "Gain 0.75% Increase damage and damage reduction for every Mythic item equipped",
		location: "Expedition (Svord's)",
		shareID: "re",
		tier: 1,
	},
	vile_focus: {
		name: "Vile Focus",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "While above 50% health, Absorb Chance increased by 3%",
		location: "Expedition (Twinmbo's)",
		shareID: "vf",
		tier: 1,
	},
	cloak_of_dark_tides: {
		name: "Cloak Of Dark Tides",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "Deal 5% increased damage, but take 5% increased damage",
		location: "Expedition (X5-T34M's)",
		shareID: "dt",
		tier: 1,
	},
	mewmeck: {
		name: "Mewmeck",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "+1% Damage, +1% Speed, +1% Dual Strike, +1% Empower Chance",
		location: "Jelly Event",
		shareID: "wc",
		tier: 1,
	},
	peppermint_ring: {
		name: "Peppermint Ring",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "+2 Team Enrage, You and nearby teammates gain 1% increased Damage",
		location: "Holiday Invasion",
		shareID: "pr",
		tier: 1,
	},
	sakura: {
		name: "Sakura",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "25% Damage Reduction, 10% Block Chance",
		location: "Shop",
		shareID: "ur",
		tier: 0,
	},
	zaserite_wings: {
		name: "Zaserite Wings",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "10% Crit Chance, 6% Empower Chance, 6% Dual Strike, 6% Damage, 6% Speed, 6% Life Steal",
		location: "Shop",
		shareID: "za",
		tier: 0,
	},
	drozgul: {
		name: "Drozgul",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "8% Damage Reduction, 5% Evade Chance, 5% Absorb Chance, 5% Deflect Chance",
		location: "Shop",
		shareID: "gu",
		tier: 0,
	},
	kiwi: {
		name: "Kiwi",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20.5% Chance to attack weakest per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "iw",
		tier: 0,
	},
	sardines: {
		name: "Sardines",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to spread heal and shield per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "da",
		tier: 0,
	},
	crintie: {
		name: "Crintie",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% chance to heal weakest teammate and attack weakest enemy per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "cr",
		tier: 0,
	},
	harvester: {
		name: "Harvester",
		type: "ancient",
		slot: "Sword",
		image: "",
		partOfSet: "",
		effect: "Bonus: 5% chance to use a random skill for free at the start of each turn. +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z7d3",
		shareID: "hv",
		tier: 2,
	},
	starweave_ring: {
		name: "Starweave",
		type: "ancient",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "Reduces the amount of set items required for a set bonus by 1. Must have at least 2 items of a specific set equipped. +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z8d3",
		shareID: "sr",
		tier: 2,
	},
	starweave_necklace: {
		name: "Starweave",
		type: "ancient",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "Reduces the amount of set items required for a set bonus by 1. Must have at least 2 items of a specific set equipped, +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z8d3",
		shareID: "sn",
		tier: 2,
	},
	elementarium_body: {
		name: "Elementarium",
		type: "ancient",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "Major Rune Bonuses Doubled. Only 1 bonus of this type may be active. +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z10d3",
		shareID: "el",
		tier: 2,
	},
	elementarium_head: {
		name: "Elementarium",
		type: "ancient",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "Major Rune Bonuses Doubled. Only 1 bonus of this type may be active. +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z10d3",
		shareID: "ez",
		tier: 2,
	},
	melvin_cloak: {
		name: "Melvin Cloak",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "You and nearby teammates gain 2% increased damage",
		location: "R7 heroic",
		shareID: "m1",
		tier: 10,
	},
	melvin_head: {
		name: "Melvin Head",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "Increase maximum shields to 75% of total health",
		location: "R7 Trials 680+",
		shareID: "m2",
		tier: 10,
	},
	frostybite: {
		name: "Frostybite",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "5% SP skill damage increase",
		location: "R7 heroic",
		shareID: "f1",
		tier: 10,
	},
	bassault: {
		name: "Bassault",
		type: "mythic",
		slot: "Axe",
		image: "",
		partOfSet: "",
		effect: "Gain 5% damage reduction while shielded",
		location: "R7 Trials 680+",
		shareID: "b1",
		tier: 10,
	},
	ikoscale: {
		name: "Ikoscale",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "merciless",
		effect: "",
		shareID: "m3",
		tier: 10,
	},
	phantomate: {
		name: "Phantomate",
		type: "set",
		slot: "Spear",
		image: "",
		partOfSet: "merciless",
		effect: "",
		shareID: "m4",
		tier: 10,
	},
	reptor: {
		name: "Reptor",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "merciless",
		effect: "",
		shareID: "m5",
		tier: 10,
	},
	retilio: {
		name: "Retilio",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "merciless",
		effect: "",
		shareID: "m6",
		tier: 10,
	},
	exarkun: {
		name: "Exarkun",
		type: "set",
		slot: "Spear",
		image: "",
		partOfSet: "apocalypse",
		effect: "",
		shareID: "c1",
		tier: 10,
	},
	reflekun: {
		name: "Reflekun",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "apocalypse",
		effect: "",
		shareID: "c2",
		tier: 10,
	},
	solus: {
		name: "Solus",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "apocalypse",
		effect: "",
		shareID: "c3",
		tier: 10,
	},
	garplate: {
		name: "Garplate",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "apocalypse",
		effect: "",
		shareID: "c4",
		tier: 10,
	},
	revenwrap: {
		name: "Revenwrap",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "apocalypse",
		effect: "",
		shareID: "c5",
		tier: 10,
	},
	plaguscore: {
		name: "Plaguscore",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "apocalypse",
		effect: "",
		shareID: "c6",
		tier: 10,
	},
	tectonica: {
		name: "Tectonica",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "earthen_might",
		effect: "",
		shareID: "t1",
		tier: 10,
	},
	quartzar: {
		name: "Quartzar",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "earthen_might",
		effect: "",
		shareID: "t2",
		tier: 10,
	},
	shatterguard: {
		name: "Shatterguard",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "earthen_might",
		effect: "",
		shareID: "t3",
		tier: 10,
	},
	omenstone: {
		name: "Omenstone",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "earthen_might",
		effect: "",
		shareID: "t4",
		tier: 10,
	},
	degenera: {
		name: "Degenera",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "1% Absorb, 1% Deflect, 1% Damage Reduction",
		location: "T10 Melvin World Boss",
		shareID: "m7",
		tier: 10,
	},
	rabid_skeever: {
		name: "Rabid Skeever",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "When you hit an enemy, launch a skeever at the weakest eneemy for 47-87 damage.",
		location: "T10 Melvin World Boss",
		shareID: "m8",
		tier: 10,
	},
	meteor_blaster: {
		name: "Meteor Blaster",
		type: "mythic",
		slot: "Laser Gun",
		image: "",
		partOfSet: "",
		effect: "5% Bonus Healing + 1 each time an ally is healed up to 10",
		location: "Expedition Zorgo Crossing",
		shareID: "mb",
		tier: 1,
	},
	vortex_zapper: {
		name: "Vortex Zapper",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "3% Ricochet Chance",
		location: "Expedition Yackerz Tundra",
		shareID: "vz",
		tier: 1,
	},
	meteor_chain: {
		name: "Meteor Chain",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "1% Dual Strike, 1% Empower Chance 5% to gain SP",
		location: "Expedition Vionot Sewer",
		shareID: "md",
		tier: 1,
	},
	power_core: {
		name: "Power Core",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "25% Damage Reduction, 5% Evade  Chance",
		location: "Shop",
		shareID: "pw",
		tier: 0,
	},
	vortex_band: {
		name: "Vortex Band",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "Gain Damage reduction the higher health percentage is up to 4.5%",
		location: "Expedition",
		shareID: "vb",
		tier: 1,
	},
	nice_to_meat_ya: {
		name: "Nice To Meat Ya",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "+1% Absorb, +2% Damage Reduction",
		location: "Papoz Invasion",
		shareID: "my",
		tier: 1,
	},
	polychromatic_blaster_main: {
		name: "Polychromatic Blaster",
		type: "ancient",
		slot: "Laser Gun",
		image: "",
		partOfSet: "",
		effect: "If you have 1 mythic equipped, double the bonuses. +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z9d3",
		shareID: "yc",
		tier: 2,
	},
	polychromatic_blaster_offhand: {
		name: "Polychromatic Blaster",
		type: "ancient",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "If you have 1 mythic equipped, double the bonuses. +5% Damage, +5% Damage Reduction at t12",
		location: "Craft from z9d3",
		shareID: "yo",
		tier: 2,
	},
	sleipnir: {
		name: "Sleipnir",
		type: "mythic",
		slot: "Axe",
		image: "",
		partOfSet: "",
		effect: "While above 50% health, damage increased by 5%",
		location: "Blublix Portal (IDOL)",
		shareID: "xs",
		tier: 1,
	},
	slibinas: {
		name: "Slibinas",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "+1% Block, 1% Evade, 1% Damage Reduction, 0.5% absorb, 0.5% Deflect chance",
		location: "Mowhi Portal ( IDOL )",
		shareID: "xa",
		tier: 1,
	},
	eternal_resolve: {
		name: "Eternal Resolve",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "5% chance to gain 2 sp per turn",
		location: "Wizbot Portal ( IDOL )",
		shareID: "xe",
		tier: 1,
	},
	ultimatum: {
		name: "Ultimatum",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "+2% Dual Strike, +0.5% Quad Strike",
		location: "Astamus Portal ( IDOL )",
		shareID: "xu",
		tier: 1,
	},
	pep_pep: {
		name: "Pep Pep",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "+1% Quad Strike",
		location: "Ninja Invasion Mythic",
		shareID: "pq",
		tier: 1,
	},
	blorg_implant: {
		name: "Blorg Implant",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "Deal 10% increased Damage when the enemy team only has 1 unit alive",
		location: "t10 Extermination Worldboss",
		shareID: "bh",
		tier: 10,
	},
	timeweaver_garments: {
		name: "Timeweaver Garments",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "+5% damage reduction while all teammates are alive",
		location: "t10 Extermination Worldboss",
		shareID: "tg",
		tier: 10,
	},
	vulcarn: {
		name: "Vulcarn",
		type: "set",
		slot: "Axe",
		image: "",
		partOfSet: "virulence",
		effect: "",
		shareID: "v1",
		tier: 10,
	},
	ytterbite_scrap: {
		name: "Ytterbite Scrap",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "virulence",
		effect: "",
		shareID: "v2",
		tier: 10,
	},
	aquatic_ward: {
		name: "Aquatic Ward",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "trident",
		effect: "",
		shareID: "t5",
		tier: 10,
	},
	nemos_tempest: {
		name: "Nemo's Tempest",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "trident",
		effect: "",
		shareID: "t6",
		tier: 10,
	},
	//venom
	wigo_wiggins: {
		name: "Wigo Wiggins",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "venom",
		effect: "",
		shareID: "v3",
		tier: 11,
	},
	warriorolas: {
		name: "Warriorolas",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "venom",
		effect: "",
		shareID: "v4",
		tier: 11,
	},
	shiztiny: {
		name: "Shiztiny",
		type: "set",
		slot: "Spear",
		image: "",
		partOfSet: "venom",
		effect: "",
		shareID: "v5",
		tier: 11,
	},
	earendrin: {
		name: "Earendrin",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "venom",
		effect: "",
		shareID: "v6",
		tier: 11,
	},

	//camouflage
	violenshine: {
		name: "Violenshine",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "camouflage",
		effect: "",
		shareID: "c7",
		tier: 11,
	},
	violenhell: {
		name: "Violenhell",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "camouflage",
		effect: "",
		shareID: "c8",
		tier: 11,
	},
	violenmane: {
		name: "Violenmane",
		type: "set",
		slot: "Axe",
		image: "",
		partOfSet: "camouflage",
		effect: "",
		shareID: "c9",
		tier: 11,
	},
	viobus: {
		name: "Viobus",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "camouflage",
		effect: "",
		shareID: "c0",
		tier: 11,
	},

	//mistery
	visertal: {
		name: "Visertal",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "mistery",
		effect: "",
		shareID: "0m",
		tier: 11,
	},
	battletal: {
		name: "Battletal",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "mistery",
		effect: "",
		shareID: "1m",
		tier: 11,
	},
	grindymetal: {
		name: "Grindymetal",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "mistery",
		effect: "",
		shareID: "2m",
		tier: 11,
	},

	//courage
	wickedwood: {
		name: "Wickedwood",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "courage",
		effect: "",
		shareID: "0c",
		tier:11,
	},
	malwood: {
		name: "Malwood",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "courage",
		effect: "",
		shareID: "1c",
		tier: 11,
	},
	woocrusher: {
		name: "Woocrusher",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "courage",
		effect: "",
		shareID: "2c",
		tier: 11,
	},

	blind_souls: {
		name: "Blind Souls",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "Gain a 0.5%, 1%, 1.5%, 2.5%, 5%, or 25% Absorb Chance Based On A Weighted Chance",
		location: "r8 Heroic",
		shareID: "bs",
		tier: 11,
	},
	ironbark_longbow: {
		name: "Ironbark Longbow",
		type: "mythic",
		slot: "Crossbow",
		image: "",
		partOfSet: "",
		effect: "2% Increased Damage, Each Hit on an Enemy Increases the bonus by 1% on them, to a max of 8%",
		location: "r8 Raid",
		shareID: "lb",
		tier: 11,
	},
	conquerors_fury: {
		name: "Conquerors Fury",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "+4% Empower Chance",
		location: "t11 Trials",
		shareID: "cf",
		tier: 11,
	},
	battleplate: {
		name: "Battleplate",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "+5% sp skill damage",
		location: "t11 trials",
		shareID: "1b",
		tier: 11,
	},
	windstalker: {
		name: "Windstalker",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "Deal increased damage the higher your health percentage is, up to a maximum of 8%",
		location: "t11 Melvin Worldboss",
		shareID: "ws",
		tier: 11,
	},
	proton_beem_zapper: {
		name: "Proton Beem Zapper",
		type: "mythic",
		slot: "Laser Gun",
		image: "",
		partOfSet: "",
		effect: "1.5% Ricochet Chance, 0.5% Quad Strike",
		location: "t11 Melvin Worldboss",
		shareID: "wz",
		tier: 11,
	},
	empyrean_vindicator: {
		name: "Empyrean Vindicator",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "Damage recieved from non redirect, ricochet, or bouncing attacks deal 5% less damage",
		location: "t11 3xt Worldboss",
		shareID: "ev",
		tier: 11,
	},
	phoenix_ravager: {
		name: "Phoenix Ravager",
		type: "mythic",
		slot: "Axe",
		image: "",
		partOfSet: "",
		effect: "While At Full Health, Gain 5% Damage Reduction",
		location: "t11 3xt Worldboss",
		shareID: "pv",
		tier: 11,
	},
	goldwings_chivalry: {
		name: "Goldwings Chivalry",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "16% Damage Reduction, 8% Absorb Chance, -4% Damage",
		location: "Shop",
		shareID: "gc",
		tier: 0,
	},
	jupingz: {
		name: "Jupingz",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "14.5% Dual Strike, 14.5% Empower Chance",
		location: "Shop",
		shareID: "jg",
		tier: 0,
	},
	
	glamounir: {
		name: "Glamounir",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "1% Absorb Chance, 1% Deflect Chance, 1% Evade Chance",
		location: "Battle Bards Expedition, left",
		shareID: "b2",
		tier: 1,
	},
	bassoul: {
		name: "Bassoul",
		type: "mythic",
		slot: "Axe",
		image: "",
		partOfSet: "",
		effect: "2% Absorb Chance, Team Gains 1% Increased Damage",
		location: "Battle Bards Expedition, middle",
		shareID: "b3",
		tier: 1,
	},
	demonmullet: {
		name: "Demonmullet",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "Team Gains 2% Damage Reduction",
		location: "Battle Bards Expedition, top",
		shareID: "b4",
		tier: 1,
	},
	chippity: {
		name: "Chippity",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "1% Damage, 1% Speed, 1% Dual Strike, 1% Empower Chance",
		location: "Battle Bards Expedition, right",
		shareID: "b5",
		tier: 1,
	},

	hydronus_helmet: {
		name: "Hydronus Helmet",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "3% Crit Chance, 3% Speed",
		location: "Brimstone t11 Worldboss",
		shareID: "b6",
		tier: 11,
	},
	hydragar_stone: {
		name: "Hydragar Stone",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "While Above 50% Health, Gain 5% Absorb",
		location: "Brimstone t11 Worldboss",
		shareID: "b7",
		tier: 11,
	},
	scrawny: {
		name: "Scrawny",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "+2% Empower Chance, +2% Speed",
		location: "Zombo Invasion",
		shareID: "sy",
		tier: 1,
	},
	amaglon: {
		name: "Amaglon",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "+8% Block Change",
		location: "Revenge Of The Turkey",
		shareID: "y0",
		tier: 1,
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
		},
		tier: 11,
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
		},
		tier: 11,
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
		},
		tier: 11,
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
		},
		tier: 11,
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
		},
		tier: 11,
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
		},
		tier: 11,
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
		},
		tier: 11,
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
		},
		tier: 11,
	},
	traitors_loop: {
		name: "Traitors Loop",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		location: "t11 Titan World Boss",
		effect: "10% Chance for Skills to Not Spend SP, +5% Fire Resist, +4 Water Damage",
		shareID: "TL",
		elemental: {
			element_value: 5,
			element_type: "fire",
			element_modifier: "resistance",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "water",
			element_modifier: "damage",
			flat: false
		},
		tier: 11,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
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
		},
		tier: 12,
	},
	carbi: {
		name: "Carbi",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "10% Water Resist, 20% Damage Reduction",
		location: "Shop",
		shareID: "bc",
		tier: 0,
	},
	gryphen_resistor: {
		name: "Gryphen Resistor",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "22% Block Chance, 10% Deflect Chance, 5% Electric Resist",
		location: "Shop",
		shareID: "gr",
		tier: 0,
	},
	astaroth_flag: {
		name: "Astaroth Flag",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "20% Damage, 18% Crit Chance",
		location: "PvP reward - Astaroth",
		shareID: "oh",
		tier: 0,
	},
	bit_chain: {
		name: "Bit Chain",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "11% Damage, 11% Dual Strike, 14% Crit Chance",
		location: "PvP Reward - 'B.I.T'",
		shareID: "ba",
		tier: 0,
	},
	mirror_wings: {
		name: "Mirror Wings",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "22% block Chance, 10% Deflect Chance",
		location: "PvP Reward - Mirror",
		shareID: "mw",
		tier: 0,
	},
	ancient_pendant: {
		name: "Ancient Pendant",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "10% Damage, 10% Speed, 4% Dual Strike",
		location: "PvP reward - Colonial",
		shareID: "ap",
		tier: 0,
	},
	grim_ward: {
		name: "Grim Ward",
		type: "legendary",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "10% Damage Enrage, 10% Health, 5% Deflect Chance",
		location: "PvP Reward - 'Grim'",
		shareID: "gw",
		tier: 0,
	},
	dumglim: {
		name: "Dumglim",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to shield team per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "7k",
		tier: 0,
	},
	beto_ben: {
		name: "Beto Ben",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "41% Chance to attack furthest enemy per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "7l",
		tier: 0,
	},
	shelly: {
		name: "Shelly",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to heal lowest health teammate and shield self per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "0g",
		tier: 0,
	},
	manila: {
		name: "Manila",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "41 Chance to shield strongest per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "xl",
		tier: 0,
	},
	ringo: {
		name: "Ringo",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "40.5 Chance to attack weakest enemy 2 times per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "ii",
		tier: 0,
	},
	jellbi: {
		name: "Jellbi",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "40.5 Chance to deal electric damage 2 times to furthest enemy per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "hq",
		tier: 0,
	},
	ge: {
		name: "Ge",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to heal weakest teammate per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "9z",
		tier: 0,
	},
	bia: {
		name: "Bia",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to shield team and spread heal per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "vq",
		tier: 0,
	},
	thymos: {
		name: "Thymos",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to heal team per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "qx",
		tier: 0,
	},
	pyr: {
		name: "Pye",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "41% Chance to deal fire damage to the closest 3 enemies per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "ut",
		tier: 0,
	},
	rhoe: {
		name: "Rhoe",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "61.5% Chance to deal water damage 3 times to weakest enemy per turn, on hit, OR when you get hit. Choose 1",
		location: "Shop",
		shareID: "v0",
		tier: 0,
	},
	boogie: {
		name: "Boogie",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to spread heal per turn, when you get hit, and when you hit an enemy",
		location: "Trials Reward - 'Boogie'",
		shareID: "zp",
		tier: 0,
	},
	nemo: {
		name: "Nemo",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "10% Channce to attack closest enemy per turn, when you get hit, and when you hit an enemy",
		location: "PvP Reward - 'nemo",
		shareID: "zi",
		tier: 0,
	},
	nerder: {
		name: "DNerder",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "10% Chance to self-heal per turn, when you get hit, and when you hit an enemy",
		location: "PvP Reward - 'Nerder'",
		shareID: "lw",
		tier: 0,
	},
	pumkwim: {
		name: "Pumkwim",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "20% Chance to attack enemy team per turn, when you get hit, and when you hit an enemy",
		location: "PvP Reward - 'Pumkwim'",
		shareID: "5o",
		tier: 0,
	},
	snut: {
		name: "Snut",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "10% Chance to shield team per turn, when you get hit, and when you hit an enemy",
		location: "PvP Reward - 'Snut'",
		shareID: "4o",
		tier: 0,
	},
	rendar: {
		name: "Rendar",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "40% Chance to shield self when you get hit",
		location: "PvP Reward - 'Rendar'",
		shareID: "hx",
		tier: 0,
	},
	nemrod: {
		name: "Nemrod",
		type: "legendary",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "41% Chance to heal weakest teammate and attack weakest enemy per turn, on hit, or when you hit an enemy. Choose 1.",
		location: "PvP Reward - 'Nemrod'",
		shareID: "7f",
		tier: 0,
	},
	aryagn_sight: {
		name: "Aryagn Sight",
		type: "ancient",
		slot: "Bow",
		image: "",
		partOfSet: "",
		effect: "+5% Damage, +5% Damage Reduction, 50% Chance to attack the enemy with their weakest elemental resistance",
		location: "Craft from z12d4",
		shareID: "6f",
		tier: 2,
	},
	ladener_broom: {
		name: "Ladener Broom",
		type: "ancient",
		slot: "Staff",
		image: "",
		partOfSet: "",
		effect: "+5% Damage, +5% Damage Reduction, 50% Chance when you get hit to change all elemental resistants to the attack's",
		location: "Craft from z12d4",
		shareID: "5f",
		tier: 2,
	},
	tatooi: {
		name: "Tatooi",
		type: "mythic",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "70% block chance",
		location: "Crafting",
		shareID: "ay",
		tier: 0,
	},
	nugget_of_grasberg: {
		name: "Nugget Of Grasberg",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "1.5% Evade Chance, 5% Block Chance",
		location: "t10 Orlag Worldboss",
		shareID: "6q",
		tier: 10,
	},
	vanpels_wip: {
		name: "Vanpels Wip",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "10% Chance to redirect damage to the teammate with the highest health",
		location: "t11 Orlag Worldboss",
		shareID: "yl",
		tier: 11,
	},
	warfist_of_fleeting_voices: {
		name: "Warfirst Of Fleeting Voices",
		type: "mythic",
		slot: "Laser Gun",
		image: "",
		partOfSet: "",
		effect: "Give team 1 sp first time you evade per battle",
		location: "t12 Orlag Worldboss",
		shareID: "d2",
		tier: 12,
	},
	orb_of_fleeting_voices: {
		name: "Orb Of Fleeting Voices",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "ceraunos",
		effect: "",
		shareID: "xt",
		elemental: {
			element_value: 4,
			element_type: "air",
			element_modifier: "resistance",
			flat: false
		},
		tier: 12,
	},
	fleeting_voices_chest: {
		name: "Fleeting Voices Chest",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "ceraunos",
		effect: "",
		shareID: "4l",
		elemental: {
			element_value: 4,
			element_type: "air",
			element_modifier: "resistance",
			flat: false
		},
		tier: 12,
	},
	tiara_of_fleeting_voices: {
		name: "Tiara Of Fleeting Voices",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "ceraunos",
		effect: "",
		shareID: "uz",
		elemental: {
			element_value: 4,
			element_type: "air",
			element_modifier: "resistance",
			flat: false
		},
		tier: 12,
	},
	black_arrow_spear: {
		name: "Black Arrow Spear",
		type: "set",
		slot: "Spear",
		image: "",
		partOfSet: "blackarrow",
		effect: "",
		shareID: "3o",
		tier: 11,
	},
	fire_scaler: {
		name: "Fire Scaler",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "blackarrow",
		effect: "",
		shareID: "9v",
		tier: 11,
	},
	triumph_bones_shield: {
		name: "Triumph Bones Shield",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "dragonskull",
		effect: "",
		shareID: "ca",
		tier: 11,
	},
	nail_storm: {
		name: "Nail Storm",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "dragonskull",
		effect: "",
		shareID: "58",
		tier: 11,
	},
	vanpels_steak: {
		name: "Vanpels Steak",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "vanpels",
		effect: "",
		shareID: "8a",
		tier: 11,
	},
	vanpels_fedora: {
		name: "Vanpels Fedora",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "vanpels",
		effect: "",
		shareID: "q1",
		tier: 11,
	},
	vanpels_suit: {
		name: "Vanpels Suit",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "vanpels",
		effect: "",
		shareID: "10",
		tier: 11,
	},
	lamp_of_grasberg: {
		name: "Lamp Of Grasberg",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "grasberg",
		effect: "",
		shareID: "n1",
		tier: 10,
	},
	hat_of_grasberg: {
		name: "Hat Of Grasberg",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "grasberg",
		effect: "",
		shareID: "3s",
		tier: 10,
	},
	pants_of_grasberg: {
		name: "Pants Of Grasberg",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "grasberg",
		effect: "",
		shareID: "gv",
		tier: 10,
	},
	empyreal_sunbow: {
		name: "Empyreal Sunbow",
		type: "set",
		slot: "Bow",
		image: "",
		partOfSet: "icarus",
		effect: "",
		shareID: "jc",
		tier: 1,
		innate: {
			type: 'damage_reduction',
			value: 3
		}
	},
	golden_lyre: {
		name: "Golden Lyre",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "icarus",
		effect: "",
		shareID: "j0",
		tier: 1,
		innate: {
			type: 'damage_reduction',
			value: 3
		}
	},
	wreath_of_sungold: {
		name: "Wreath Of Sungold",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "icarus",
		effect: "",
		shareID: "1z",
		tier: 1,
		innate: {
			type: 'damage_reduction',
			value: 3
		}
	},
	solar_gown: {
		name: "Solar Gown",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "icarus",
		effect: "",
		shareID: "s9",
		tier: 1,
		innate: {
			type: 'damage_reduction',
			value: 3
		}
	},
	phoebus: {
		name: "Phoebus",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "icarus",
		effect: "",
		shareID: "bm",
		tier: 1,
		innate: {
			type: 'damage_reduction',
			value: 3
		}
	},
	amber_necklace: {
		name: "Amber Necklace",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "icarus",
		effect: "",
		shareID: "sw",
		tier: 1,
		innate: {
			type: 'damage_reduction',
			value: 3
		}
	},
	misty_shrowd: {
		name: "Misty Shrowd",
		type: "mythic",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "26% Damage Reduction, 18% Block Chance",
		location: "Armoury Crafting",
		shareID: "z1",
		tier: 0,
	},
	hunter_trophy: {
		name: "Hunter Trophy",
		type: "mythic",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "26% Damage Reduction 5% Absorb",
		location: "Armoury Crafting",
		shareID: "t0",
		tier: 0,
	},
	resistor: {
		name: "Resistor",
		type: "mythic",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "32% Block Chance, 10% Damage Reduction, 5% Deflect",
		location: "Armoury Crafting",
		shareID: "yp",
		tier: 0,
	},
	mythic_core: {
		name: "Mythic Core",
		type: "mythic",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "28% Damage Reduction 8% Evade",
		location: "Armoury Crafting",
		shareID: "oe",
		tier: 0,
	},
	seraphim_ascendence: {
		name: "Seraphim Ascendence",
		type: "mythic",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "22% Evade Chance 26% Block Chance ",
		location: "Armoury Crafting",
		shareID: "x1",
		tier: 0,
	},
	ascendancy: {
		name: "Ascendancy",
		type: "mythic",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "7% Dual Strike 7% Empower Chance 50% Critical Chance, 2% critical damage on crit up to 10%",
		location: "Armoury Crafting",
		shareID: "2b",
		tier: 0,
	},
	astaroths_crown: {
		name: "Astaroths Crown",
		type: "mythic",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "6% Empower 6% Dual Strike 6% Damage 6% Speed 6% Crit Chance 88% Crit Damage ",
		location: "Armoury Crafting",
		shareID: "ja",
		tier: 0,
	},
	shokan_attachment: {
		name: "Shokan Attachment",
		type: "mythic",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "7% Damage 8% Speed  8% Empower Chance 8% Dual Strike 15% Crit Chance 10% Lifesteal",
		location: "Armoury Crafting",
		shareID: "bk",
		tier: 0,
	},
	hailes_power_supply: {
		name: "Hailes Power Supply",
		type: "mythic",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "18% Empower Chance 20% Dual Strike 10% SP Regeneration",
		location: "Armoury Crafting",
		shareID: "op",
		tier: 0,
	},
	divine_ward: {
		name: "Divine Ward",
		type: "mythic",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "17% Dual Strike 5% Quad Strike 3% Ricochet Chance",
		location: "Armoury Crafting",
		shareID: "ps",
		tier: 0,
	},
	fobett: {
		name: "Fobett",
		type: "mythic",
		slot: "Accessory",
		image: "",
		partOfSet: "",
		effect: "30% Crit Chance 70% Crit damage",
		location: "Armoury Crafting",
		shareID: "14",
		tier: 0,
	},
	savage: {
		name: "Savage",
		type: "mythic",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "23% Chance to give enrage to max health teammate per turn, on hit, when hit",
		location: "Armoury Crafting",
		shareID: "qb",
		tier: 0,
	},
	asti: {
		name: "Asti",
		type: "mythic",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "35% (70% reforge) Chance to heal weakest and attack weakest per turn, on hit, and when hit ",
		location: "Armoury Crafting",
		shareID: "i1",
		tier: 0,
	},
	borgi: {
		name: "Borgi",
		type: "mythic",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "23% Chance to attack weakest enemy 2 times per turn, on hit, and when hit",
		location: "Armoury Crafting",
		shareID: "h2",
		tier: 0,
	},
	kolg: {
		name: "Kolg",
		type: "mythic",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "17% Chance to attack closest enemy per turn, on hit and when hit",
		location: "Armoury Crafting",
		shareID: "di",
		tier: 0,
	},
	druffo: {
		name: "Druffo",
		type: "mythic",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "23% Chance to attack enemy team per turn, on hit, and when hit",
		location: "Armoury Crafting",
		shareID: "6s",
		tier: 0,
	},
	toetrio: {
		name: "Toetrio",
		type: "mythic",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "35% (70% reforge) Chance to Heal and Shield team per turn, on hit, and when hit",
		location: "Armoury Crafting",
		shareID: "cz",
		tier: 0,
	},
	b_7_5: {
		name: "B 7 5",
		type: "mythic",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "35% (70% reforge) Chance to shield team per turn, on hit, and when hit",
		location: "Armoury Crafting",
		shareID: "bz",
		tier: 0,
	},
	dwadin: {
		name: "Dwadin",
		type: "mythic",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "35% (70% reforge) Chance to spread heal and spread shield per turn, on hit, and when hit",
		location: "Armoury Crafting",
		shareID: "96",
		tier: 0,
	},
	sqweeb: {
		name: "Sqweed",
		type: "mythic",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "35% (70% reforge) Chance to heal lowest health teammate and shield self per turn, on hit and when hit",
		location: "Armoury Crafting",
		shareID: "1y",
		tier: 0,
	},
	crucru: {
		name: "Crucru",
		type: "mythic",
		slot: "Pet",
		image: "",
		partOfSet: "",
		effect: "35% (70% reforge) chance to spread shield per turn, on hit, and when hit",
		location: "Armoury Crafting",
		shareID: "pt",
		tier: 0,
	},
	manticore_spikes: {
		name: "Manticore Spikes",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "manticore",
		effect: "",
		shareID: "7i",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		},
		tier: 13,
	},
	manticore_mane: {
		name: "Manticore Mane",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "manticore",
		effect: "",
		shareID: "vx",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		},
		tier: 13,
	},
	manticore_flames: {
		name: "Manticore Flames",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "manticore",
		effect: "",
		shareID: "a6",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		},
		tier: 13,
	},
	manticore_tail: {
		name: "Manticore Tail",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "manticore",
		effect: "",
		shareID: "kp",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		},
		tier: 13,
	},
	raiju_reaper: {
		name: "Raiju Reaper",
		type: "set",
		slot: "Spear",
		image: "",
		partOfSet: "raiju",
		effect: "",
		shareID: "34",
		elemental: {
			element_value: 4,
			element_type: "electric",
			element_modifier: "damage",
			flat: false
		},
		tier: 13,
	},
	raiju_muscle: {
		name: "Raiju Muscle",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "raiju",
		effect: "",
		shareID: "lu",
		elemental: {
			element_value: 4,
			element_type: "electric",
			element_modifier: "damage",
			flat: false
		},
		tier: 13,
	},
	raiju_reactor: {
		name: "Raiju Reactor",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "raiju",
		effect: "",
		shareID: "j2",
		elemental: {
			element_value: 4,
			element_type: "electric",
			element_modifier: "damage",
			flat: false
		},
		tier: 13,
	},
	raiju_coil: {
		name: "Raiju Coil",
		type: "set",
		slot: "Ring",
		image: "",
		partOfSet: "raiju",
		effect: "",
		shareID: "rp",
		elemental: {
			element_value: 4,
			element_type: "electric",
			element_modifier: "damage",
			flat: false
		},
		tier: 13,
	},
	boneblade_of_the_behemoth: {
		name: "Boneblade Of The Behemoth",
		type: "set",
		slot: "Sword",
		image: "",
		partOfSet: "behemoth",
		effect: "",
		shareID: "ou",
		elemental: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "damage",
			flat: false
		},
		tier: 13,
	},
	cowl_of_the_behemoth: {
		name: "Cowl Of The Behemoth",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "behemoth",
		effect: "",
		shareID: "7m",
		elemental: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "damage",
			flat: false
		},
		tier: 13,
	},
	skull_of_the_behemoth: {
		name: "Skull Of The Behemoth",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "behemoth",
		effect: "",
		shareID: "tk",
		elemental: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "damage",
			flat: false
		},
		tier: 13,
	},
	scrap_of_the_behemoth: {
		name: "Scrap Of The Behemoth",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "behemoth",
		effect: "",
		shareID: "21",
		elemental: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "damage",
			flat: false
		},
		tier: 13,
	},
	kaijin_fang: {
		name: "Kaijin Fang",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "Patience: Inceease your damage reduction by 2% for each SP you have",
		location: "t13 Trials",
		shareID: "lt",
		tier: 13,
		elemental: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "resistance",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		},
	},
	kaijin_hopeguard: {
		name: "Kaijin Hopeguard",
		type: "mythic",
		slot: "Body",
		image: "",
		partOfSet: "",
		effect: "Purification: 25% Chance to return 1 SP after using a skill (0sp not included)",
		location: "t13 Trials",
		shareID: "g7",
		tier: 13,
		elemental: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "resistance",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "damage",
			flat: false
		},
	},
	kaijin_ring: {
		name: "Kaijin Ring",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "-15% Max Shield, +16% Healing Potency",
		location: "t13 Raids",
		shareID: "p6",
		tier: 13,
		elemental: {
			element_value: 4,
			element_type: "air",
			element_modifier: "resistance",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "damage",
			flat: false
		},
	},
	kaijin_reminder: {
		name: "Kaijin Reminder",
		type: "mythic",
		slot: "Offhand",
		image: "",
		partOfSet: "",
		effect: "Gain +25% Bonus Damage on targets below 30% Health",
		location: "t13 Raids",
		shareID: "vj",
		tier: 13,
		elemental: {
			element_value: 4,
			element_type: "air",
			element_modifier: "resistance",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "earth",
			element_modifier: "damage",
			flat: false
		},
	},
	kaijin_tear: {
		name: "Kaijin Tear",
		type: "mythic",
		slot: "Necklace",
		image: "",
		partOfSet: "",
		effect: "Spread Heal when you hit an enemy",
		location: "t13 Titans",
		shareID: "03",
		tier: 13,
		elemental: {
			element_value: 4,
			element_type: "water",
			element_modifier: "resistance",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "electric",
			element_modifier: "damage",
			flat: false
		},
	},
	kaijin_furnace: {
		name: "Kaijin Furnace",
		type: "mythic",
		slot: "Head",
		image: "",
		partOfSet: "",
		effect: "Adrenaline: Amplify the damage of the next attack by 3% until 12% then reset",
		location: "t13 Titans",
		shareID: "kq",
		tier: 13,
		elemental: {
			element_value: 4,
			element_type: "water",
			element_modifier: "resistance",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "electric",
			element_modifier: "damage",
			flat: false
		},
	},
	kaijin_augury: {
		name: "Kaijin Augury",
		type: "mythic",
		slot: "Ring",
		image: "",
		partOfSet: "",
		effect: "Expender 5: Gain 10% DR after you've spent 5 SP",
		location: "t13 Ignite Worldboss",
		shareID: "rh",
		tier: 13,
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "resistance",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "water",
			element_modifier: "damage",
			flat: false
		},
	},
	kaijin_existence: {
		name: "Kaijin Existence",
		type: "mythic",
		slot: "Sword",
		image: "",
		partOfSet: "",
		effect: "Bolster: Spread shield when you hit an enemy",
		location: "t13 Ignite Worldboss",
		shareID: "qr",
		tier: 13,
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "resistance",
			flat: false
		},
		elemental2: {
			element_value: 4,
			element_type: "water",
			element_modifier: "damage",
			flat: false
		},
	},
	book_of_the_flamewarden: {
		name: "Book Of The Flamewarden",
		type: "set",
		slot: "Offhand",
		image: "",
		partOfSet: "flamewarden",
		effect: "",
		shareID: "ey",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "resistance",
			flat: false
		},
		tier: 13,
	},
	eyes_of_the_flamewarden: {
		name: "Eyes Of The Flamewarden",
		type: "set",
		slot: "Head",
		image: "",
		partOfSet: "flamewarden",
		effect: "",
		shareID: "sx",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "resistance",
			flat: false
		},
		tier: 13,
	},
	pendant_of_the_flamewarden: {
		name: "Pendant Of The Flamewarden",
		type: "set",
		slot: "Necklace",
		image: "",
		partOfSet: "flamewarden",
		effect: "",
		shareID: "79",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "resistance",
			flat: false
		},
		tier: 13,
	},
	frame_of_the_flamewarden: {
		name: "Frame Of The Flamewarden",
		type: "set",
		slot: "Body",
		image: "",
		partOfSet: "flamewarden",
		effect: "",
		shareID: "0l",
		elemental: {
			element_value: 4,
			element_type: "fire",
			element_modifier: "resistance",
			flat: false
		},
		tier: 13,
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