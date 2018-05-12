export var base ={
	default_stats: {
		power: 6,
		stamina: 6,
		agility: 6,
		total_stats: 18,
		damage: 0,
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
		richochet_chance: 0
	},
	current_stats: {},
	runes: [],
	enchants: []
};

export const runeTypes = ["damage", "health", "speed", "block", "evade", "deflect_chance", "damage_enrage", "life_steal", "dual_strike", "damage_reduction", "empower_chance", "absorb_chance"];

export const enchantTypes = ["block", "damage_reduction", "damage", "damage_enrage", "deflect_chance", "dual_strike", "empower_chance", "evade", "health", "life_steal", "speed"];