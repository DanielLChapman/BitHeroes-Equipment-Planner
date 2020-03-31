export var base ={
	default_stats: {
		power: 6,
		stamina: 6,
		agility: 6,
		total_stats: 18,
		damage: 0,
		sp_damage: 0,
		health: 0,
		speed: 0,
		critical_chance: 10,
		critical_damage: 50,
		evade: 2.5,
		block: 0,
		life_steal: 0,
		damage_enrage: 0,
		deflect_chance: 0,
		absorb_chance: 0,
		damage_reduction: 0,
		dual_strike: 0,
		empower_chance: 0,
		redirect_chance: 0,
		healing: 0, 
		quad_strike: 0,
		richochet_chance: 0,
		team_enrage: 0,
		ignore_defense: 0,
		links: {
			healthEfficiency: 0,
			damageMitigation: 0,
			damageBonus: 0,
			damageOutput: 0
		},
		fire_damage: 0,
		fire_resistance: 0,
		electric_damage: 0,
		electric_resistance: 0,
		water_damage: 0,
		water_resistance: 0,
		air_damage: 0,
		air_resistance: 0,
		earth_damage: 0,
		earth_resistance: 0,
		elemental_flat: {
			fire: 0,
			electric: 0,
			water: 0,
			air: 0,
			earth: 0
		}
	},
	current_stats: {},
	runes: [],
	enchants: [],
};

export const runeTypes = [{
	id: 'd',
	title: "Damage",
	effect: "damage",
	value: 2.5,
	key: "rune"
},
{
	id: 's',
	title: "Speed",
	effect: "speed",
	value: 2.5,
	key: "rune"
},
{
	id: 'h',
	title: "Health",
	effect: "health",
	value: 2.5,
	key: "rune"
},
{
	id: 'b',
	title: "Block",
	effect: "block",
	value: 5,
	key: "rune"
},
{
	id: 'e',
	title: "Evade",
	effect: "evade",
	value: 2.5,
	key: "rune"
},
{
	id: 'a',
	title: "Absorb",
	effect: "absorb_chance",
	value: 1.25,
	key: "rune"
},
{
	id: 'c',
	title: "Damage Enrage",
	effect: "damage_enrage",
	value: 2.5,
	key: "rune"
},{
	id: 'g',
	title: "Empower",
	effect: "empower_chance",
	value: 2.5,
	key: "rune"
},{
	id: 'r',
	title: "Damage Reduction",
	effect: "damage_reduction",
	value: 2.5,
	key: "rune"
},
{
	id: 'i',
	title: "Life Steal",
	effect: "life_steal",
	value: 2.5,
	key: "rune"
},
{
	id: 'l',
	title: "Dual Strike",
	effect: "dual_strike",
	value: 2.5,
	key: "rune"
},
{
	id: 'q',
	title: "Deflect",
	effect: "deflect_chance",
	value:1.25,
	key: "rune"
},{
	id: '0',
	title: "Fire Damage",
	effect: "fire_damage",
	value:2.5,
	key: "rune"
},{
	id: '1',
	title: "Water Damage",
	effect: "water_damage",
	value:2.5,
	key: "rune"
},{
	id: '2',
	title: "Electric Damage",
	effect: "electric_damage",
	value:2.5,
	key: "rune"
},{
	id: '3',
	title: "Air Damage",
	effect: "air_damage",
	value:2.5,
	key: "rune"
},{
	id: '4',
	title: "Earth Damage",
	effect: "earth_damage",
	value:2.5,
	key: "rune"
},{
	id: '5',
	title: "Fire Resistance",
	effect: "fire_resistance",
	value:2.5,
	key: "rune"
},{
	id: '6',
	title: "Water Resistance",
	effect: "water_resistance",
	value:2.5,
	key: "rune"
},{
	id: '7',
	title: "Electric Resistance",
	effect: "electric_resistance",
	value:2.5,
	key: "rune"
},{
	id: '8',
	title: "Air Resistance",
	effect: "air_resistance",
	value:2.5,
	key: "rune"
},{
	id: '9',
	title: "Earth Resistance",
	effect: "earth_resistance",
	value:2.5,
	key: "rune"
},
{
	id: 't',
	title: "Mythic Empower",
	effect: "empower_chance",
	value: 3,
	key: "rune"
},
{
	id: 'j',
	title: "Mythic Absorb",
	effect: "absorb_chance",
	value: 1.5,
	key: "rune"
},
{
	id: 'k',
	title: "Mythic Dual Strike",
	effect: "dual_strike",
	value: 3,
	key: "rune"
},
{
	id: 'm',
	title: "Mythic Damage Enrage",
	effect: "damage_enrage",
	value: 3,
	key: "rune"
},
{
	id: 'n',
	title: "Mythic Damage",
	effect: "damage",
	value: 3,
	key: "rune"
},
{
	id: 'o',
	title: "Mythic Deflect",
	effect: "deflect_chance",
	value: 1.5,
	key: "rune"
},
{
	id: 'p',
	title: "Mythic DR",
	effect: "damage_reduction",
	value: 3,
	key: "rune"
},
{
	id: 'u',
	title: "Mythic Life Steal",
	effect: "life_steal",
	value: 3,
	key: "rune"
},
{
	id: 'v',
	title: "Mythic Evade",
	effect: "evade",
	value: 3,
	key: "rune"
},
{
	id: 'w',
	title: "Mythic Block",
	effect: "block",
	value: 6,
	key: "rune"
},
{
	id: 'y',
	title: "Mythic Speed",
	effect: "speed",
	value: 3,
	key: "rune"
},
{
	id: 'z',
	title: "Mythic Health",
	effect: "health",
	value: 3,
	key: "rune"
},
{
	id: 'x',
	title: "None",
	effect: "dual_strike",
	value: 0,
	key: "rune"
}];

export const enchantTypes = [{
	id: 'a',
	title: "Block",
	selected: false,
	effect: "block",
	value:  2,
	key: 'enchant'
},{
	id: 'b',
	title: "Damage Reduction",
	selected: false,
	effect: "damage_reduction",
	value:  1,
	key: 'enchant'
},{
	id: 'c',
	title: "Damage",
	selected: false,
	effect: "damage",
	value:  1,
	key: 'enchant'
},{
	id: 'd',
	title: "Damage Enrage",
	selected: false,
	effect: "damage_enrage",
	value:  1,
	key: 'enchant'
}, {
	id: 'e',
	title: "Deflect Chance",
	selected: false,
	effect: "deflect_chance",
	value:  .5,
	key: 'enchant'
},{
	id: 'f',
	title: "Dual Strike",
	selected: false,
	effect: "dual_strike",
	value:  1,
	key: 'enchant'
},{
	id: 'g',
	title: "Empower Chance",
	selected: false,
	effect: "empower_chance",
	value:  1,
	key: 'enchant'
},{
	id: 'h',
	title: "Evade",
	selected: false,
	effect: "evade",
	value:  1,
	key: 'enchant'
},{
	id: 'i',
	title: "Health",
	selected: false,
	effect: "health",
	value:  1,
	key: 'enchant'
},{
	id: 'j',
	title: "Life Steal",
	selected: false,
	effect: "life_steal",
	value:  1,
	key: 'enchant'
},{
	id: 'k',
	title: "Speed",
	selected: false,
	effect: "speed",
	value:  1,
	key: 'enchant'
},{
	id: 'l',
	title: "Absorb",
	selected: false,
	effect: "absorb_chance",
	value:  .5,
	key: 'enchant'
},{
	id: 'm',
	title: "Impatient (Block Speed)",
	selected: false,
	effect: "block",
	effect2: "speed",
	value:  2.5,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: 'n',
	title: "Passionate (DR Deflect)",
	selected: false,
	effect: "damage_reduction",
	effect2: "deflect_chance",
	value:  1.25,
	value2: .7,
	key: 'enchant',
	mythic: true
},{
	id: 'o',
	title: "Quarrelsome (Deflect DS)",
	selected: false,
	effect: "deflect_chance",
	effect2: "dual_strike",
	value:  .7,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: 'p',
	title: "Hearty (Block Lifesteal)",
	selected: false,
	effect: "block",
	effect2: "life_steal",
	value:  2.5,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: 'q',
	title: "Balanced (Damage)",
	selected: false,
	effect: "damage",
	value:  2.5,
	key: 'enchant',
	mythic: true
},{
	id: 'r',
	title: "Unstable (Damage Deflect)",
	selected: false,
	effect: "damage",
	effect2: "deflect",
	value:  1.25,
	value2: .7,
	key: 'enchant',
	mythic: true
},{
	id: 's',
	title: "Dextrous (DR)",
	selected: false,
	effect: "damage_reduction",
	value:  2.5,
	key: 'enchant',
	mythic: true
},{
	id: 't',
	title: "Respected (DR Empower)",
	selected: false,
	effect: "damage_reduction",
	effect2: "empower_chance",
	value:  1.25,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: 'u',
	title: "Kind (DR + Health)",
	selected: false,
	effect: "damage_reduction",
	effect2: "health",
	value:  1.25,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: 'v',
	title: "Lean (DR Lifesteal)",
	selected: false,
	effect: "damage_reduction",
	effect2: "life_Steal",
	value:  1.25,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: 'w',
	title: "Eager (Deflect)",
	selected: false,
	effect: "deflect_chance",
	value:  1.4,
	key: 'enchant',
	mythic: true
},{
	id: 'y',
	title: "Quick (Deflect Evade)",
	selected: false,
	effect: "deflect_chance",
	effect2: "evade",
	value:  .7,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: 'z',
	title: "Modest (Deflect Lifesteal)",
	selected: false,
	effect: "deflect_chance",
	effect2: "life_steal",
	value:  .7,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: '1',
	title: "Irritable (Deflect Speed)",
	selected: false,
	effect: "deflect_chance",
	effect2: "speed",
	value:  .7,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: '2',
	title: "Able (Block Chance",
	selected: false,
	effect: "block",
	value:  5,
	key: 'enchant',
	mythic: true
},{
	id: '3',
	title: "Maternal (Block Speed",
	selected: false,
	effect: "block",
	effect2: "speed",
	value:  2.5,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: '4',
	title: "Noisy (Block Enrage)",
	selected: false,
	effect: "deflect_chance",
	effect2: "damage_enrage",
	value:  2.5,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: '5',
	title: "Tranquil (Block DR)",
	selected: false,
	effect: "deflect_chance",
	effect2: "damage_reduction",
	value:  2.5,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: '6',
	title: "Outgoing (Block Deflect)",
	selected: false,
	effect: "deflect_chance",
	effect2: "block",
	value:  .7,
	value2: 2.5,
	key: 'enchant',
	mythic: true
},{
	id: '7',
	title: "Bright (Block DS)",
	selected: false,
	effect: "block",
	effect2: "dual_strike",
	value:  2.5,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: '8',
	title: "Composed (Block Empower)",
	selected: false,
	effect: "block",
	effect2: "empower_chance",
	value:  2.5,
	value2: 1.25,
	key: 'enchant',
	mythic: true
},{
	id: 'x',
	title: "None",
	selected: false,
	effect: "speed",
	value:  0,
	key: 'enchant'
}];

export const mountTypes = [
	{
		id: 0,
		title: "Quad Strike",
		selected: false,
		effect: "quad_strike",
		value:  1,
		key: 'mount'
	},
	{
		id: 1,
		title: "Absorb",
		selected: false,
		effect: "absorb_chance",
		value:  2,
		key: 'mount'
	},
	{
		id: 2,
		title: "Damage",
		selected: false,
		effect: "damage",
		value:  4,
		key: 'mount'
	},
	{
		id: 3,
		title: "Damage Reduction",
		selected: false,
		effect: "damage_reduction",
		value:  4,
		key: 'mount'
	},
	{
		id: 4,
		title: "SP Skill Damage",
		selected: false,
		effect: "damage",
		value:  6,
		key: 'mount'
	},
	{
		id: 5,
		title: "Block",
		selected: false,
		effect: "block",
		value:  8,
		key: 'mount'
	},
	{
		id: 6,
		title: "Damage Enrage",
		selected: false,
		effect: "damage_enrage",
		value:  4,
		key: 'mount'
	},
	{
		id: 7,
		title: "Deflect Chance",
		selected: false,
		effect: "deflect_chance",
		value:  2,
		key: 'mount'
	},
	{
		id: 8,
		title: "Dual Strike",
		selected: false,
		effect: "dual_strike",
		value:  4,
		key: 'mount'
	},
	{
		id: 9,
		title: "Empower Chance",
		selected: false,
		effect: "empower_chance",
		value:  4,
		key: 'mount'
	},
	{
		id: 10,
		title: "Evade Chance",
		selected: false,
		effect: "evade",
		value:  4,
		key: 'mount'
	},
	{
		id: 11,
		title: "Health",
		selected: false,
		effect: "health",
		value:  4,
		key: 'mount'
	},
	{
		id: 12,
		title: "Life Steal",
		selected: false,
		effect: "life_steal",
		value:  4,
		key: 'mount'
	},
	{
		id: 13,
		title: "Speed",
		selected: false,
		effect: "speed",
		value:  4,
		key: 'mount'
	},
	{
		id: 14,
		title: "Team Enrage",
		selected: false,
		effect: "team_enrage",
		value:  3,
		key: 'mount'
	},
	{
		id: 15,
		title: "Ricochet Chance",
		selected: false,
		effect: "richochet_chance",
		value:  3,
		key: 'mount'
	},
	{
		id: 16,
		title: "Team Damage",
		selected: false,
		effect: "damage",
		value:  1,
		key: 'mount'
	},
	{
		id: 17,
		title: "Team Damage Reduction",
		selected: false,
		effect: "damage_reduction",
		value:  1,
		key: 'mount'
	},
	{
		id: 18,
		title: "Heal Power",
		selected: false,
		effect: "healing",
		value:  8,
		key: 'mount'
	},
	{
		id: 19,
		title: "Mythic Block",
		selected: false,
		effect: "block",
		value:  10,
		key: 'mount'
	}
]