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
	min_stats: {},
	max_stats: {},
	runes: [],
	enchants: [],
};

export const statTable = [
	{
		name: 'Damage: ',
		id: 'damage'
	},
	{
		name: 'SP Dmg: ',
		id: 'sp_damage'
	},
	{
		name: 'Deflect: ',
		id: 'deflect_chance'
	},
	{
		name: 'Absorb: ',
		id: 'absorb_chance'
	},
	{
		name: 'Dmg Reduction: ',
		id: 'damage_reduction'
	},
	{
		name: 'Dual Strike: ',
		id: 'dual_strike'
	},
	{
		name: 'Empower: ',
		id: 'empower_chance'
	},
	{
		name: 'Quad Strike: ',
		id: 'quad_strike'
	},
	{
		name: 'Ricochet: ',
		id: 'richochet_chance',
	},
	{
		name: 'Healing: ',
		id: 'healing'
	},
	
	{
		name: 'Crit Chance: ',
		id: 'critical_chance'
	},
	{
		name: 'Crit Dmg: ',
		id: 'critical_damage'
	},
	{
		name: 'Evade: ',
		id: 'evade'
	},
	{
		name: 'Block: ',
		id: 'block'
	},
	{
		name: 'Life Steal: ',
		id: 'life_steal'
	},
	{
		name: 'Dmg Enrage: ',
		id: 'damage_enrage'
	},
	{
		name: 'Team Enrage: ',
		id: 'team_enrage'
	},
	{
		name: 'Health: ',
		id: 'health'
	},
	{
		name: 'Speed: ',
		id: 'speed'
	},
	{
		name: 'Fire Dmg: ',
		id: 'fire_damage'
	},
	{
		name: 'Fire Resist: ',
		id: 'fire_resistance'
	},
	{
		name: 'Electric Dmg: ',
		id: 'electric_damage'
	},
	{
		name: 'Electric Resist: ',
		id: 'electric_resistance'
	},
	{
		name: 'Water Dmg: ',
		id: 'water_damage'
	},
	{
		name: 'Water Resist: ',
		id: 'water_resistance'
	},
	{
		name: 'Air Dmg: ',
		id: 'air_damage'
	},
	{
		name: 'Air Resist: ',
		id: 'air_resistance'
	},
	{
		name: 'Earth Dmg: ',
		id: 'earth_damage'
	},
	{
		name: 'Earth Resist: ',
		id: 'earth_resistance'
	},
	
	
]

export const elementsIndentifier = [
	{
		name: 'Physical',
		lowercase: 'physical',
		color: '#ff0'
	},
	{
		name: 'Fire',
		lowercase: 'fire',
		color: 'firebrick'
	},
	{
		name: 'Electric',
		lowercase: 'electric',
		color: 'lightblue'
	},
	{
		name: 'Water',
		lowercase: 'water',
		color: 'aquamarine'
	},
	{
		name: 'Air',
		lowercase: 'air',
		color: 'mintcream'
	},
	{
		name: 'Earth',
		lowercase: 'earth',
		color: 'darkseagreen'
	},
]
