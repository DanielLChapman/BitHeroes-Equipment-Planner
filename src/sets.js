//18
export const sets = {
	ares_legacy:{
			name: "Ares Legacy",
			location: "From r2 or from re-rolling any t5 set",
			items: ["Phobos", "Deimos"],
			description: "",
			setBonuses: {
				2: "20% Chance for skills to not spend SP"
			}
		},
	divinity:	{
			name: "Divinity",
			location: "From r3 or from re-rolling a set piece from Trials/Gauntlets",
			items: ["Phantom Light", "Legacy Of Truth", "Trinity Plate"],
			description: "Second set bonus only affects the player.",
			setBonuses: {
				2: "Damage increased by 5% while using a sword",
				3: "Execute: Damage increased by 30% to enemies below 30% health"
			}
		},
	maru:	{
			name: "M.A.R.U",
			location: "From r4",
			items: ["Visortron", "Mechcoat", "ROM BIOS", "Blast Protocol"],
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
			items: ["Moonlight", "Discordiant Power", "Dominance", "Adorned Malice"],
			description: "",
			setBonuses: {
				2: "Increase absorb by 2%",
				3: "Gain full shields the first time you drop below 50% health",
				4: "Gain 15% damage reduction while shielded"
			}
		},
	unity:	{
			name: "Unity",
			location: "Trials/Gauntlets 100-109 or from rerolling a t5 set piece",
			items: ["Despair", "Sorrow"],
			description: "",
			setBonuses: {
				2: "Gain the Unity Skill"
			}
		},
	trugdors_call:	{
			name: "Trugdor's Call",
			location: "Trials/Gauntlets 100-109 or from rerolling a t5 set piece",
			items: ["Trugdor's Bite", "Scaled Vambrace", "Dragons Breath"],
			description: "",
			setBonuses: {
				2: "4% Chance for skills to trigger twice",
				3: "7% Chance for projectiles to ricochet to a nearby enemy"
			}
		},
	taldriths_artifacts:	{
			name: "Taldrilth's Artifacts",
			location: "Trials/Gauntlets 140-149 or from rerolling a t6 set piece",
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
			items: ["Matsukura", "Yashiro's Dou"],
			description: "Does not affect pets procs",
			setBonuses: {
				2: "Berserk: +10% damage, but take 10% more damage"
			}
		},
	conduction:	{
			name: "Conduction",
			location: "Trials/Gauntlets 200-209",
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
			location: "Trials/Gauntlets Difficulty 340+",
			items: ["Yak Blade", "Stillness", "Hylidae", "Flowing Silk Sash"],
			description: "",
			setBonuses: {
				2: "Gain enrage equal to 5% of heals",
				3: "Increases potency of your healing by 15%",
				4: "Automatically prevent the first death upon your team"
			}
		},
	lunar_guardian:	{
			name: "Lunar Guardian",
			location: "Tier 6 Orlag World Boss",
			items: ["Maelstrom", "Eclipse Barrier"],
			description: "Does not affect healing pets",
			setBonuses: {
				2: "Increase potency of your healing skills by 15%"
			}
		},
	jynx:	{
			name: "Jynx",
			location: "Tier 6 Orlag World Boss",
			items: ["Moku", "Ku"],
			description: "",
			setBonuses: {
				2: "Regenerate 20% of your shields at the start of each battle"
			}
		},
	obliteration:	{
			name: "Obliteration",
			location: "Tier 7 Orlag World Boss",
			items: ["Wraithguard", "Last Sight", "Dark Wrap", "Black Omen"],
			description: "Does not affect pet procs",
			setBonuses: {
				2: "Teammates behind you take 5% reduced damage",
				3: "Teammates behind you deal 5% increased damage",
				4: "Gain 15% Damage Reduction while all teammates are alive"
			}
		},
	agony:	{
			name: "Agony",
			location: "Tier 8 Orlag World Boss or from rerolling a t8 set piece",
			items: ["Arcusbolt", "Tormented Soul", "Gravetouch", "Crypt Hunter"],
			description: "",
			setBonuses: {
				2: "You and nearby teamates gain 3% increased damage",
				3: "You and your nearby teammates gain 10% SP Regeneration",
				4: "9% chance for projectiles to ricochet to a nearby enemy"
			}
		},
	illustrious_artifacts:	{
			name: "Illustrious Artifacts",
			location: "Tier 6 Netherworld World Boss",
			items: ["Ancient Tiara", "Heavenly Garb", "Exalted Binding"],
			description: "Scales with Power Stat",
			setBonuses: {
				2: "+4% Damage",
				3: "Divine Protection: Instantly revive on first death per adventure"
			}
		},
	taters:	{
			name: "Taters",
			location: "Tier 7 Netherworld World Boss",
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
			items: ["", "", ""],
			description: "",
			setBonuses: {
				2: "",
				3: "",
				4: ""
			}
		},
	gatekeeper:	{
			name: "Gatekeeper",
			location: "Small/Large Dragon Egg",
			items: ["Acropodium", "Karlorr"],
			description: "",
			setBonuses: {
				2: ".5% Chance for skills to trigger four times"
			}
		}

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