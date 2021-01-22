//18


export const sets = {
	ares_legacy:{
			name: "Ares Legacy",
			location: "From r2 or from re-rolling any t5 set",
			tier: 5,
			items: ["Phobos", "Deimos"],
			description: "",
			setBonuses: {
				2: "20% Chance for skills to not spend SP"
			}
		},
	divinity:	{
			name: "Divinity",
			location: "From r3 or from re-rolling a set piece from Trials/Gauntlets",
			tier: 6,
			items: ["Phantom Light", "Legacy Of Truth", "Trinity Plate"],
			description: "",
			setBonuses: {
				2: "Damage increased by 5% while using a sword",
				3: "Execute: Damage increased by 30% to enemies below 30% health"
			}
		},
	maru:	{
			name: "M.A.R.U",
			location: "From r4",
			items: ["Visortron", "Mechcoat", "ROM BIOS", "Blast Protocol"],
			tier: 7,
			description: "Does not affect pets",
			setBonuses: {
				2: "10% of your Healing Skills also generate shields",
				3: "Over Healing converts to shield",
				4: "Gain the Defibrillator Skill"
			}
		},
	night_walker:	{
			name: "Night Walker",
			location: "From r5 or from rerolling any t8 set piece",
			tier: 8,
			items: ["Moonlight", "Discordiant Power", "Dominance", "Adorned Malice"],
			description: "",
			setBonuses: {
				2: "Increase absorb by 2%",
				3: "Gain full shields the first time you drop below 50% health",
				4: "Gain 15% damage reduction while shielded"
			}
		},
	arsenal:	{
			name: "Arsenal",
			location: "R6",
			tier: 9,
			items: ["UMD Lazzault", "Aimbot 80", "A M H", "Nanovectal Plating"],
			description: "",
			setBonuses: {
				2: "+2% Richochet",
				3: "Damage increase by 10% to enemies above 75% Health or below 25% health",
				4: "Gain increased damage the higher your targets health percentage is, up to 30%"
			}
		},
	earthen_might:	{
			name: "Earthen Might",
			location: "r7 Heroic Raids",
			tier: 10,
			items: ["Tectonica", "Quartzar", "Shatterguard", "Omenstone"],
			description: "",
			setBonuses: {
				2: "+2% Deflect Chance",
				3: "Automatically Prevent the first death upon your team, also shields target for half shields",
				4: "+25% Damage Reduction, this is reduced by 3% each time you are attacked and returns to 25% when it drops below 10%",
			}
		},
	camouflage:	{
		name: "Camouflage",
		location: "r8 Heroic Raid",
		tier: 11,
		items: ["Violenshine", "Violenhell", "Violenmane", "Viobus"],
		description: "",
		setBonuses: {
			2: "+1% Quad Strike",
			3: "+5% to ignore enemy defenses",
			4: "+40% Damage, 40% Reduced Shields",
		}
	},
	unity:	{
			name: "Unity",
			location: "Trials/Gauntlets 100-109 or from rerolling a t5 set piece",
			tier: 5,
			items: ["Despair", "Sorrow"],
			description: "",
			setBonuses: {
				2: "Gain the Unity Skill"
			}
		},
	trugdors_call:	{
			name: "Trugdor's Call",
			location: "Trials/Gauntlets 100-109 or from rerolling a t5 set piece",
			tier: 5,
			items: ["Trugdor's Bite", "Scaled Vambrace", "Dragons Breath"],
			description: "",
			setBonuses: {
				2: "4% Chance for skills to trigger twice",
				3: "7% Chance for projectiles to ricochet to a nearby enemy"
			}
		},
	taldrilths_artifacts:	{
			name: "Taldrilth's Artifacts",
			location: "Trials/Gauntlets 140-149 or from rerolling a t6 set piece",
			tier: 6,
			items: ["Eternal Fire", "Scaled Dragon's Bone", "Taldrilth's Soul"],
			description: "",
			setBonuses: {
				2: "Increase deflect by 3%",
				3: "Increase absorb by 6%"
			}
		},
	bushido:	{
			name: "Bushido",
			location: "Trials/Gauntlets 140-149 or from rerolling a t6 set piece",
			tier: 6,
			items: ["Matsukura", "Yashiro's Dou"],
			description: "",
			setBonuses: {
				2: "Berserk: +10% damage, but take 10% more damage"
			}
		},
	conduction:	{
			name: "Conduction",
			location: "Trials/Gauntlets 200-209",
			tier: 7,
			items: ["Gigastrike", "Magnetron", "Flow Plate", "Power Amp"],
			description: "",
			setBonuses: {
				2: "Projectiles deal 5% more damage",
				3: "5% chance for skills to be twice as powerful",
				4: "Deal 25% increased damage when the enemy team only has 1 unit alive"
			}
		},
	luminary:	{
			name: "Luminary",
			location: "Trials/Gauntlets Difficulty 260-289",
			tier: 8,
			items: ["Yak Blade", "Stillness", "Hylidae", "Flowing Silk Sash"],
			description: "",
			setBonuses: {
				2: "Gain enrage equal to 5% of heals",
				3: "Increases potency of your healing by 15%",
				4: "Automatically prevent the first death upon your team"
			}
		},
	polaris:	{
			name: "Polaris",
			location: "Trials/Gauntlets 510+",
			tier: 9,
			items: ["Sky Vapor", "Sky Vault", "Champions Helm", "Whale Plate"],
			description: "",
			setBonuses: {
				2: "+5% Damage Enrage",
				3: "Heal to full the first time you drop below 50% health.",
				4: "Gain Damage Reduction the higher your health percentage is, up to a maximum of 20%"
			}
		},
	merciless:	{
			name: "Merciless",
			location: "Trials/Gauntlets 680+",
			tier: 10,
			items: ["Phantomate", "Reptor", "Ikoscale", "Retilio"],
			description: "",
			setBonuses: {
				2: "+5% Damage while using a spear",
				3: "75% of overkill projectile damage richochets",
				4: "15% Increased damage. Each hit on an enemy increases this bonus by 2.5% on them, to a max of 35%. "
			}
		},
	venom:	{
		name: "Venom",
		location: "Set Trials, 1080+",
		tier: 11,
		items: ["Wigo Wiggins", "Warriorolas", "Shiztiny", "Earendrin"],
		description: "",
		setBonuses: {
			2: "+2% Team Enrage",
			3: "+2.5 Team Damage Reduction",
			4: "+17.5% Damage Reduction while all teammates are above 30% health",
		}
	},
	lunar_guardian:	{
			name: "Lunar Guardian",
			location: "Tier 6 Orlag World Boss",
			tier: 6,
			items: ["Maelstrom", "Eclipse Barrier"],
			description: "Does not affect healing pets",
			setBonuses: {
				2: "Increase potency of your healing skills by 15%"
			}
		},
	jynx:	{
			name: "Jynx",
			location: "Tier 6 Orlag World Boss",
			tier: 6,
			items: ["Moku", "Ku"],
			description: "",
			setBonuses: {
				2: "Regenerate 20% of your shields at the start of each battle"
			}
		},
	obliteration:	{
			name: "Obliteration",
			location: "Tier 7 Orlag World Boss",
			tier: 7,
			items: ["Wraithguard", "Last Sight", "Dark Wrap", "Black Omen"],
			description: "",
			setBonuses: {
				2: "Teammates behind you take 5% reduced damage",
				3: "Teammates behind you deal 5% increased damage",
				4: "Gain 15% Damage Reduction while all teammates are alive"
			}
		},
	agony:	{
			name: "Agony",
			location: "Tier 8 Orlag World Boss or from rerolling a t8 set piece",
			tier: 8,
			items: ["Arcusbolt", "Tormented Soul", "Gravetouch", "Crypt Hunter"],
			description: "",
			setBonuses: {
				2: "You and nearby teamates gain 3% increased damage",
				3: "You and your nearby teammates gain 10% SP Regeneration",
				4: "10% chance for projectiles to ricochet to a nearby enemy"
			}
		},
	eruption:	{
			name: "Eruption",
			location: "T9 Orlag HC",
			tier: 9,
			items: ["SlagHelm", "Molten Chasis", "Magmight"],
			description: "",
			setBonuses: {
				2: "First attack against you per battle is absorbed",
				3: "12% evade chance"
			}
		},
	illustrious_artifacts:	{
			name: "Illustrious Artifacts",
			location: "Tier 6 Netherworld World Boss",
			tier: 6,
			items: ["Ancient Tiara", "Heavenly Garb", "Exalted Binding"],
			description: "Scales with Power Stat",
			setBonuses: {
				2: "+4% Damage, +4% Healing",
				3: "Divine Protection: Instantly revive on first death per adventure"
			}
		},
	taters:	{
			name: "Taters",
			location: "Tier 7 Netherworld World Boss",
			tier: 7,
			items: ["Tayto Sword", "Tayto Sack", "Hangin Tayto"],
			description: "",
			setBonuses: {
				2: "4% Speed",
				3: "At the start of each turn, launch a Tayto at the weakest enemy for 3.25-22,75% damage"
			}
		},
	inferno:	{
			name: "Inferno",
			location: "Tier 8 Nethworld World Boss or from rerolling a t8 set piece",
			tier: 8,
			items: ["Final Gaze", "Final Flash", "Melding Cloak", "Brimstone"],
			description: "",
			setBonuses: {
				2: "4% chance for skills to be twice as powerful",
				3: "20% chance for skills to not spend SP",
				4: "Skills that cost SP deal 20% increased damage"
			}
		},
	requiem:	{
			name: "Requiem",
			location: "T9 Nether HC",
			tier: 9,
			items: ["Veilstrike", "Cloudsinge", "Oscillation"],
			description: "",
			setBonuses: {
				2: "20% Chance to deal 25% increased damage",
				3: "1-24% damage increase"
			}
		},
	apocalypse:	{
			name: "Apocalypse",
			location: "t10 Melvin Worldboss",
			tier: 10,
			items: ["Exarkun", "Reflekun", "Solus", "Garplate", "Revenwrap", "Plaguscore"],
			description: "",
			setBonuses: {
				3: "Enchant Bonuses Doubled",
				4: "Mount Bonuses Doubled",
				5: "Major Rune Bonuses Doubled "
			}
		},
	mistery:	{
			name: "Mistery",
			location: "t11 Melvin Worldboss",
			tier: 11,
			items: ["Visertal", "Battletal", "Grindymetal"],
			description: "",
			setBonuses: {
				2: "+4% Dual Strike",
				3: "Ignore Enemy Defense Bonuses on Shielded Targets",
			}
		},
	virulence:	{
		name: "Virulence",
		location: "t10 Ext Worldboss",
		tier: 10,
		items: ["Vulcarn", "Ytterbite Scrap"],
		description: "",
		setBonuses: {
			2: "Damage Recieved from Redirect, Ricochet, or Bouncing Attacks deal 20% Less Damage",
		}
	},
	trident:	{
			name: "Trident",
			location: "t10 Ext Worldboss",
			tier: 10,
			items: ["Aquatic Ward", "Nemo's Tempest"],
			description: "",
			setBonuses: {
				3: "Skills that cost SP Damage deal 15% increased Damage",
			}
		},
	courage:	{
			name: "Courage",
			location: "t11 Ext Worldboss",
			tier: 11,
			items: ["Wickedwood", "Malwood", "Woocrusher"],
			description: "",
			setBonuses: {
				2: "+10% SP Damage",
				3: "Team SP Regen increased by 25%",
			}
		},
	gatekeeper:	{
			name: "Gatekeeper",
			location: "Small/Large Dragon Egg",
			items: ["Acropodium", "Karlorr"],
			tier: 0,
			description: "",
			setBonuses: {
				2: "0.5% chance for skills to trigger four additional times."
			}
		},
	featherfall:	{
			name: "Featherfall",
			location: "Invasion or Expedition",
			tier: 1,
			items: ["Maplestrike", "Emberling", "Windspirit", "Nimble", "Clarity", "Peacesong"],
			description: "",
			setBonuses: {
				2: "+4% Damage",
				3: "+4% Speed",
				4: "+4% Dual Strike",
				5: "+4% Empower Chance",
				6: "+2% Quad Strike"
			}
		},
	hellfire:	{
			name: "Hellfire",
			location: "Invasion or Expedition",
			tier: 1,
			items: ["Dawn Of Mercy", "Idol Of Decay", "Deception", "Soulkeeper", "Dementia", "Ferocity"],
			description: "",
			setBonuses: {
				2: "+4% Damage Reduction",
				3: "+8% Block Chance",
				4: "+4% Evade Chance",
				5: "+3% Deflect Chance",
				6: "+4% Absorb Chance"
			}
		},
	icarus:	{
		name: "Icarus",
		location: "Invasion or Expedition",
		tier: 1,
		items: ["Empyreal Sunbow", "Golden Lyre", "Wreath of Sungold", "Solar Gown", "Phoebus", "Amber Necklace"],
		description: "",
		setBonuses: {
			2: "40% Overheal Converted To Shields",
			3: "Gain +5% Healing Bonus for SP Spent. Up to 35%",
			4: "+30% SP Regen",
			5: "25% Overheal Converted To Damage Enrage",
			6: "Prevent A Teammate Death Once per Adventure. Heal for 125%"
		}
	},
	ishmaels_bounty:	{
			name: "Ishmaels Bounty",
			location: "t11 Titan World Boss",
			tier: 11,
			items: ["Abandon Fate", "Tentuhkuhl"],
			description: "",
			setBonuses: {
				2: "Heals received from skills generate 30% shields."
			}
		},
	voltio:	{
			name: "Voltio",
			location: "t11 Trials",
			tier: 11,
			items: ["Voltio", "Vohltij", "Ihlektron", "Kiluhwot", "Spahrk", "Johlt"],
			description: "",
			setBonuses: {
				2: "When attack: 108 shield to all team.",
				4: "For Each 5% Shield: +3% Electric Damage",
				6: "Max shield: +50% Electric Damage"
			}
		},
	pyroc:	{
		name: "Pyroc",
		location: "t12 Brimstone",
		tier: 12,
		items: ["Ring Of Hellish Fire", "Raiment Of Hellish Fire", "Wip Of Hellish Fire", "Sleave Of Hellish Fire"],
		description: "",
		setBonuses: {
			2: "+2% empower per enemy alive.",
			3: "+15% Fire damage against unshielded enemies",
			4: "+30% Fire damage while above 60% health"
		}
	},
	nepulus: {
		name: "Nepulus",
		location: "t12 Titans",
		tier: 12,
		items: ["Visage of Atlante", "Greatplate Of Atlante", "Battleaxe Of Atlante", "Gem Of Atlante"],
		description: "",
		setBonuses: {
			2: "Heals received from skills at 10% more effective",
			3: "When hit gain 2% deflect, max 8%",
			4: "+8% Water Resistance, gain 2% when hit, up to 18%"
		}
	},
	pangea:	{
		name: "Pangea",
		location: "t12 Trials/Gauntlet",
		tier: 12,
		items: ["Last Hope Faceguard","Last Hope Stone","Last Hope Hammer","Last Hope Outbreak"],
		description: "",
		setBonuses: {
			2: "+25% Max Shield",
			3: "Teammates behind you gain +5% earth resistance",
			4: "Increase chance to block attacks by 40%"
		}
	},
	lucernas:	{
		name: "Lucernas",
		location: "t12 Raid",
		tier: 12,
		items: ["Crown Of Zeus", "Chestguard Of Zeus", "Pact Of Zeus", "Battery Of Zeus"],
		description: "",
		setBonuses: {
			2: "Gain .25% team enrage when using a healing skill, up to 2%",
			3: "+15% air damage while shielded",
			4: "When using a healing skill, spread shield and gain 1.5% healing bonus, up to 15%"
		}
	},
	blackarrow: {
		name: "Blackarrow",
		location: "t11 Worldboss",
		tier: 11,
		items: ["Black Arrow Spear", "Fire Scaler"],
		description: "",
		setBonuses: {
			2: "2% Absorb Chance. Gain 0.5 Absorb for each 10% Health Missing"
		}
	},
	dragonskull: {
		name: "Dragonskull",
		location: "t11 Worldboss",
		tier: 11,
		items: ["Triumph Bones Shield", "Nail Storm"],
		description: "",
		setBonuses: {
			2: "2% Damage. Damage increases 1% for every 10% health target is missing"
		}
	},
	grasberg: {
		name: "Grasberg",
		location: "t10 Orlad Worldboss",
		tier: 10,
		items: ["Lamp Of Grasberg", "Hat of Grasberg", "Pants of Grasberg"],
		description: "",
		setBonuses: {
			2: "+3% Team Enrage",
			3: "+7.5% Deflect Chance"
		}
	},
	vanpels: {
		name: "Vanpels",
		location: "t11 Orlad Worldboss",
		tier: 11,
		items: ["Vanpels Steak","Vanpels Fedora", "Vanpels Suit"],
		description: "",
		setBonuses: {
			2: "+5% Empower chance while using a spear.",
			3: "+8% Damage to you and your familiars."
		}
	},
	ceraunos:	{
		name: "Ceraunos",
		location: "t12 Orlag Worldboss",
		tier: 12,
		items: ["Orb Of Fleeting Voices", "Fleeting Voices Chest", "Tiara Of Fleeting Voices"],
		description: "",
		setBonuses: {
			2: "Gain 2.5% evade each time you dont evade, up to 10%. Resets on Evade",
			3: "Gain 3% Air Resistance when you evade, up to 12%",
		}
	},
	manticore:	{
		name: "Manticore",
		location: "t13 Trials",
		tier: 13,
		items: ["Manticore Spikes", "Manticore Mane", "Manticore Flames", "Manticore Tail"],
		description: "",
		setBonuses: {
			2: "Gain 2% Redirect Chance and 2% Absorb",
			3: "15% Chance to heal when you get hit",
			4: "Gain 20% Damage Reduction and 15% Redirect if you have the lowest health on your team"
		}
	},
	behemoth:	{
		name: "Behemoth",
		location: "t13 Raids",
		tier: 13,
		items: ["Boneblade Of The Behemoth", "Cowl Of The Behemoth", "Skull Of The Behemoth", "Scrap Of The Behemoth"],
		description: "",
		setBonuses: {
			2: "+4% empower for each SP you have",
			3: "25% Chance to deal +50% Earth Damage",
			4: "+15% Dual Strike. Gain 30% earth damage to enemies above 75% health"
		}
	},
	raiju:	{
		name: "Raiju",
		location: "t13 Titans",
		tier: 13,
		items: ["Raiju Reaper", "Raiju Muscle", "Raiju Reactor", "Raiju Coil"],
		description: "",
		setBonuses: {
			2: "Deal +10% electric damage when at least 3 enemies are alive",
			3: "+10% empower each normal hit, resets on empower",
			4: "+10% speed, +30% Electric Daamge. -3% Damage each normal hit. Resets on empower"
		}
	},
	flamewarden:{
		name: "Flamewarden",
		location: "t13 Ignite Worldboss",
		tier: 13,
		items: ["Book Of The Flamewarden", "Eyes Of The Flamewarden", "Pendant Of The Flamewarden", "Frame Of The Flamewarden"],
		description: "",
		setBonuses: {
			2: "Extort: Deal damage to the closest enemy and shield for same amount when you enter a battle",
			3: "Barrier: 25% Chance to end the attackers turn when you get hit",
			4: "+10% Evade Chance, 10% Flame Resistance"
		}
	},
	cursed: {
		name: "Cursed",
		location: "t10 Nether Worldboss",
		tier: 10,
		items: ["Cursed Cap", "Cursed Feather Vest", "Cursed Calavera", "Cursed Valander"],
		description: "",
		setBonuses: {
			2: "Enemies take 3% more damage",
			3: "Curse: Your enemies gain 5% chance to cast 0sp skills only",
			4: "Weaken: Reduce the enemy team SP regeneration by 20%"
		}
	},
	tapior: {
		name: "Tapior",
		location: "t11 Nether Worldboss",
		tier: 11,
		items: ["Tapior Horns", "Tapior Loincloth", "Tapior Stake", "Tapior Creature"],
		description: "",
		setBonuses: {
			2: "+8% Healing",
			3: "+16% Healing when using a spear",
			4: "+25% Chance to heal weakest teammate per turn"
		}
	},
	water_demon: {
		name: "Water Demon",
		location: "t12 Nether Worldboss",
		tier: 12,
		items: ["Water Demons Face", "Last Stand", "Frostfang", "Water Demons Omen"],
		description: "",
		setBonuses: {
			2: "Deflects first time you are hit in battle",
			3: "Freeze the enemy teamw hen you kill an enemy",
			4: "Water Adrenaline 10 (Each turn, you gain X amount of Damage up to X*4, then it resets. Avg 20%)"
		}
	},
	sparks: {
		name: "Sparks",
		location: "t13 Nether Worldboss",
		tier: 13,
		items: ["Sparks Mask", "Sparks Collar", "Soul Shepherd", "Sparks Signet Ring"],
		description: "",
		setBonuses: {
			2: "Expender 5: Gain 25% Healing Bonus (when you've spent 5 SP)",
			3: "Heal team when you trigger an E.M.P. fro 3606-4407",
			4: "Bolster 10 (When you hit, you spread shield for X% of your Power)"
		}
	},
	supay: {
		name: "Supay",
		location: "t14 Raid",
		tier: 14,
		items: ["Supay Drape","Supay Laceration","Supay Spikeshield","Supay Tribute Pin"],
		description: "",
		setBonuses: {
			2: "Teammates in front of you gain 5% earth resistance",
			3: "Gain 3% earth resistance when hit, up to 15%",
			4: "20% Block, 25% Barrier if you have the lowest health "
		}
	},
	montezuma: {
		name: "Montezuma",
		location: "t14 T/G",
		tier: 14,
		items: ["Judgement Of Montezuma", "Urn Of Montezuma", "Casque Of Montezuma", "Garnet Of Montezuma", ],
		description: "",
		setBonuses: {
			2: "5% speed",
			3: "Air Adrenaline 3 (avg 7.5)",
			4: "15% chance to damage all when you hit an enemy"
		}
	},
	eleuia: {
		name: "Eleuia",
		location: "t14 Abyss",
		tier: 14,
		items: ["Eleuia Ravager", "Eleuia Bracelet","Eleuia Tiara","Eleuia Memorial"],
		description: "",
		setBonuses: {
			2: "3% Team Damage",
			3: "10% Healing bonus to all teammates, bolster 5",
			4: "50% Chance to revitalize, +15% Fire Resistance"
		}
	},
	saywite: {
		name: "Saywite",
		location: "t14 Titan",
		tier: 14,
		items: ["Saywite Ward","Saywite Headcover","Saywite Brooch","Saywite Bracelet"],
		description: "",
		setBonuses: {
			2: "3% Team Enrage if you are in the front",
			3: "20% Water Resistance, -10% Damage",
			4: "25% Water Resistance while below 70% Health, 20% Block"
		}
	},
	akiho: {
		name: "Akiho",
		location: "t15 Raids",
		tier: 15,
		items: ["Akiho Torch", "Akiho Flame", "Akiho Kimono", "Akiho Round",],
		description: "",
		setBonuses: {
			2: "10% Max Shields, +5% Evade if you have the lowest health in your team",
			3: "+15% Evade if you are shielded",
			4: "Gain 2.5% evade for each 5% redirect"
		}
	},
	evenor: {
		name: "Evenor",
		location: "t15 T/G",
		tier: 15,
		items: ["Evenor Light", "Evenor Pray", "Evenor Battlechest", "Evenor Protector", ],
		description: "",
		setBonuses: {
			2: "+4% Empower when healing, gain +3% damage bonus up to 12%",
			3: "Your healing skills have 50% cleanse the target",
			4: "20% Team SP regeneration and 50% chance to bolster (spread heal) when you heal"
		}
	},
	wrightbros: {
		name: "Wrightbros",
		location: "t15 Abyss World Boss",
		tier: 15,
		items: ["Wrightbros Engine", "Wrightbros Ring", "Wrightbros Propellant", "Wrightbros Jacket", ],
		description: "",
		setBonuses: {
			2: "3 Air Adrenaline (avg +7.5 damage)",
			3: "15% Empower against shielded targets",
			4: "15% Air Damage. Braveheart: 50% Chance to ignore the enemy defenses"
		}
	},
	perkunas: {
		name: "Perkunas",
		location: "t15 Titan World Boss",
		tier: 15,
		items: ["Perkunas Spear","Perkunas Shield","Perkunas Helmet","Perkunas Connection", ],
		description: "",
		setBonuses: {
			2: "+5 Redirect",
			3: "+20% Block if you have the highest health on your team",
			4: "+30% Barrier. Heal and Cleanse self when you proc barrier"
		}
	},
	
}

/*
{
	name: "",
	location: "",
	items: ["", "", ""],
	description: "",
	setBonuses: {
		2: "",
		3: "",
		4: ""
	}
},
*/