export default () => {
    let maximum = {
    equipment: {
        mainhand: {},
        offhand: {},
        head: {},
        body: {},
        necklace: {},
        ring: {},
        accessory: {},
        pet: {},
        mount: {}
    },
    runes: [],
    enchants: {
  
    },
    value: 0
  };

  let count = 0;
  let numberOfOptions = 0;

  self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
      if (typeof e === 'undefined') return;
      let users = e.data;

      let index = users.index;
      let currentlyEquipped = users.currentlyEquipped;
      let sFR = users.sFR;
      
      let searchOption = users.searchOption;
      let sortedEquipment = users.sortedEquipment;
      let numChange = users.numChange;
      let nOF = users.numberOfOptions;

      maximum = {
        equipment: {
            mainhand: {},
            offhand: {},
            head: {},
            body: {},
            necklace: {},
            ring: {},
            accessory: {},
            pet: {},
            mount: {}
        },
        runes: [],
        enchants: {
      
        },
        value: 0
      };

      count = 0;

      numberOfOptions = nOF;


      // console.log(maximum);

      // for (var x = 0; x < 1000000; x++) {
      //   i = testing(i, 0) + 1;
      // }
      // console.log(Math.floor(Math.random()*25+1));
      recurveIncrement(index, currentlyEquipped, sFR, searchOption, sortedEquipment, numChange);
      

      postMessage(maximum);
  });

  const recurveIncrement = (index, equippedInput, whatToChange, searchingFor, sortedEquipment, numChange) => {
    //
    let i = index;
    

    //Clean up equipped into a better format, or create a null object if one is empty for some reason
    let equipped = {
        mainhand: equippedInput.equipped.mainhand || {},
        offhand: equippedInput.equipped.offhand || {},
        head: equippedInput.equipped.head || {},
        body: equippedInput.equipped.body || {},
        necklace: equippedInput.equipped.necklace || {},
        ring: equippedInput.equipped.ring || {},
        accessory: equippedInput.equipped.accessory || {},
        pet: equippedInput.equipped.pet || {},
        mount: equippedInput.equipped.mount || {}
    };

    //shortening name
    let sI = searchingFor;
    let stats = equippedInput.stats;
    //new equippedInput for future
    
    let r;
    
    //At the end of the line for equipment, we run the calculate bonuses
    if (i === 8 ) {
      count+=1;
      //counting total
      
      //calculate bonuses
      let bonuses = calculateBonuses([equippedInput.stats.power, equippedInput.stats.stamina, equippedInput.stats.agility], equipped, equippedInput.runes, equippedInput.enchants, 2);
      //grab the new equipment incase its in the maximum
      let equippedAfter = bonuses.bonuses;
      //grab the new stats
      let newStats = bonuses.stats;
      //This is where calculations would be.
      //Would set a maximum of specified result

      //If the new stat is higher than maximum, equip it to maximum
      //this is to separate the links and non links in the bonuse object
      
      let newStatsValue = newStats[sI] || newStats.links[sI] || 0;
      if (newStatsValue === undefined) {
          console.log({
              newStats,
              sI,
              sI2: this.searchSearchOptions(sI),
              sI3: newStats[sI],
              sI4: newStats.links[sI],
              sI5: newStats[sI] || newStats.links[sI]
          });
      }

      //greater than equal to for best chance at most recent equipment
      if (newStatsValue >= maximum.value) {
          maximum.value = newStatsValue;
          maximum.equipment = equippedAfter.equipmentOn;
          maximum.runes = equippedInput.runes;
          maximum.enchants = equippedInput.enchants;
          
      } 

      //temporary, need to clean up
      if (count === numberOfOptions) {

          /*
              TODO: IF AN EQUIPMENT CHANGE DOESN'T AFFECT THE FINAL TOTAL, THEN WE SHOULDN'T CHANGE IT
              CANT DO TWO STARWEAVES, DIDN'T CHECK FOR ANCIENTS

              Kind of Done - ADD ABILITY TO REMOVE ITEMS FROM APPEARING
              Done - ADD ABILITY TO REMOVE ANCIENTS
          
          */
         return maximum;
      }
  }
  else if (whatToChange[i].symbol === '*') {
      //only change equipment on this stage
      //this was giving me an issue, t= index + 1 solved it
      let t = index + 1;
      //mounts are not in sorted equipment so take it out, would be the same for runes, enchants
      if (i===7) {
          //loop over all the mounts
          for(let x = 0; x < numChange[i]; x++) {
              //equip it
              equipped[whatToChange[i].slot] = mountTypes[i];

              //send it back in for future testing
              r = {   
                  equipped,
                  enchants: equippedInput.enchants,
                  runes: equippedInput.runes,
                  stats,
          
              }
              //call it
              recurveIncrement(t, r, whatToChange, sI, sortedEquipment, numChange);
          }

      }
      else {
          if (numChange[i] <= 0) {
              r = {
                  equipped,
                  enchants: equippedInput.enchants,
                  runes: equippedInput.runes,
                  stats,
          
              }
              return recurveIncrement(t, r, whatToChange, sI, sortedEquipment, numChange);
          }
          for(let x = 0; x < numChange[i]; x++) {
              //equip[i]+=1;
              try {
                  //for all equipment in sorted equipment, try to add
                  equipped[whatToChange[i].slot] = sortedEquipment[whatToChange[i].reference][x];
              } catch (error) {
                  //think the error was from mounts, so try catch may no longer be necessary but will keep for debugging
                  console.log({
                      i: i,
                      x: x,
                  });
              }
              //send back in for future testing
              r = {
                  equipped,
                  enchants: equippedInput.enchants,
                  runes: equippedInput.runes,
                  stats,
          
              }
              recurveIncrement(t, r, whatToChange, sI, sortedEquipment, numChange);
          }
      }
      
  } else {
      //if its not supposed to be changed, skip it.
      i+=1;
      r = {
          equipped,
          enchants: equippedInput.enchants,
          runes: equippedInput.runes,
          stats,
  
      }
      recurveIncrement(i, r, whatToChange, sI, sortedEquipment, numChange);
  }
    
  }

  const sets = {
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
  
  

//   const testing = (i, counter) => {
//     let r = counter + 1;
//     let q = i + 1;
//     if (r < Math.random()*25+1) {
//       return testing(q, r);
//     } else {
//       return parseInt(q, 10);
//     }

//  } 
  }

  var base ={
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
  
  const enchantTypes = [{
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
  
  const mountTypes = [
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
    }
  ]

  const enchants = {
    enchantSlot1: {
        slot1: 'None',
        slot2: 'None'
    }, enchantSlot2: {
        slot1: 'None',
        slot2: 'None'
    }, enchantSlot3: {
        slot1: 'None',
        slot2: 'None'
    }, enchantSlot4: {
        slot1: 'None',
        slot2: 'None'
    }, enchantSlot5: {
        slot1: 'None',
        slot2: 'None'
    }, enchantSlot6: {
        slot1: 'None',
        slot2: 'None'
    }
  };

  const searchObjectArray = (objectArray, searchQuery, compareTo) => {
    let returnQuery = compareTo;
    for (let i = 0; i < objectArray.length; i++) {
      if (objectArray[i][searchQuery] === compareTo) {
        returnQuery = objectArray[i];
      }
    }
  
    if (returnQuery === compareTo) {
      returnQuery = {
        id: 'x',
        title: "None",
        selected: false,
        effect: "speed",
        value:  0,
        key: 'enchant'
      };
    }
  
    return returnQuery;
  }

  const linkCalculation = (stats) => {
    let rA, rD, rE, rB, pRR;
    let q = 0;
    if(stats.block >= 100) {
      q = 100;
    }
    let s = stats;
    
    var defaultLinks = JSON.parse(JSON.stringify(base.default_stats.links));
    rA = stats.absorb_chance/100;
    rD = Math.abs((1-rA)*stats.deflect_chance/100);
    rE =  Math.abs((1-rA-rD)*stats.evade/100);
    rB = Math.abs((1-rA-rD-rE)*q/100);
    s.damage += s.sp_damage;
    s.fire_damage += s.sp_damage;
    s.electric_damage += s.sp_damage;
    s.water_damage += s.sp_damage;
    s.air_damage += s.sp_damage;
    s.earth_damage += s.sp_damage;
    /* elementals 
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
    */
  
    //DEFENSE
    //cap DR
    let pDR = stats.damage_reduction > 75 ? 75 : stats.damage_reduction;
    let eDR = stats.electric_resistance > 75 ? 75 : stats.electric_resistance;
    let wDR = stats.water_resistance > 75 ? 75 : stats.water_resistance;
    let fDR = stats.fire_resistance > 75 ? 75 : stats.fire_resistance;
    let rDR = stats.earth_resistance > 75 ? 75 : stats.earth_resistance;
    let aDR = stats.air_resistance > 75 ? 75 : stats.air_resistance;
    //total
    let trElectric = Math.min(75, eDR*1 + wDR*0 + fDR*.75 + rDR*.75 + aDR*.75 + pDR * .75);
    let trWater = Math.min(75, eDR*.75 + wDR*1 + fDR*0 + rDR*.75 + aDR*.75 + pDR * .75);
    let trFire = Math.min(75, eDR*.75 + wDR*.75 + fDR*1 + rDR*0 + aDR*.75 + pDR * .75);
    let trEarth = Math.min(75, eDR*.75 + wDR*.75 + fDR*.75 + rDR*1 + aDR*0 + pDR * .75);
    let trAir = Math.min(75, eDR*0 + wDR*.75 + fDR*.75 + rDR*.75 + aDR*1 + pDR *.75);
    let trPhysical = Math.min(75, eDR*.75 + wDR*.75 + fDR*.75 + rDR*.75 + aDR*.75 + pDR * 1);
  
    defaultLinks['totalPhysicalDamageReduction'] = trPhysical;
    defaultLinks['totalElectricDamageReduction'] = trElectric;
    defaultLinks['totalWaterDamageReduction'] = trWater;
    defaultLinks['totalFireDamageReduction'] = trFire;
    defaultLinks['totalEarthDamageReduction'] = trEarth;
    defaultLinks['totalAirDamageReduction'] = trAir;
  
    //OFFENSE
    let tElectric = s.electric_damage*1 + s.water_damage*.0 + s.fire_damage*.75 + s.earth_damage * .75 + s.air_damage * .75 + s.damage * .75;
    let tWater = s.electric_damage*.75 + s.water_damage*1 + s.fire_damage*0 + s.earth_damage * .75 + s.air_damage * .75 + s.damage * .75;
    let tFire = s.electric_damage*.75 + s.water_damage*.75 + s.fire_damage*1 + s.earth_damage * 0 + s.air_damage * .75 + s.damage * .75;
    let tEarth = s.electric_damage*.75 + s.water_damage*.75 + s.fire_damage*.75 + s.earth_damage * 1 + s.air_damage * 0 + s.damage * .75;
    let tAir = s.electric_damage*.0 + s.water_damage*.75 + s.fire_damage*.75 + s.earth_damage * .75 + s.air_damage * 1 + s.damage * .75;
    let tPhysical = s.electric_damage*.75 + s.water_damage*.75 + s.fire_damage*.75 + s.earth_damage * .75 + s.air_damage * .75 + s.damage * 1;
  
    let elementsFL = [
      {
        element: 'electric',
        tseries: tElectric,
        lowerseries: trElectric,
      },
      {
        element: 'water',
        tseries: tWater,
        lowerseries: trWater,
      },
      {
        element: 'fire',
        tseries: tFire,
        lowerseries: trFire,
      },
      {
        element: 'earth',
        tseries: tEarth,
        lowerseries: trEarth,
      },
      {
        element: 'air',
        tseries: tAir,
        lowerseries: trAir,
      },
      {
        element: 'physical',
        tseries: tPhysical,
        lowerseries: trPhysical,
      }
    ]
  
    let tempTurns = 0;
    tempTurns = (((s.agility+s.power) / 2) * ((s.agility+s.power) / 2))/s.power/(30*(100+s.speed)/100);
  
  
    for (let i = 0; i < elementsFL.length; i++) {
      let e = elementsFL[i].element;
      defaultLinks[e+"DamageBonus"] = ((100+(s.critical_chance*s.critical_damage)/100)*(100+(elementsFL[i].tseries ))/100)*((100+(s.empower_chance))/100)*((100+(s.dual_strike))/100)*(((s.quad_strike)/100*3+100)/100)*(100+(s.richochet_chance))/100;
      defaultLinks[e+"DamageBonus"] = parseFloat(defaultLinks[e+"DamageBonus"].toFixed(2));
    
      defaultLinks[e+"DamageOutput"] = (tempTurns*2000)*(defaultLinks[e+"DamageBonus"])/100;
      defaultLinks[e+"DamageOutput"] = parseFloat(defaultLinks[e+"DamageOutput"].toFixed(2));
  
      //damage mitigation
  
      
      //physical
      let lseries = elementsFL[i].lowerseries;
      pRR = Math.abs((1-rA-rD-rE-(rB*.5))*lseries/100);
      defaultLinks[e+"DamageMitigation"] = (1-((1-rD-rE-(rB/2)-pRR-rA)))*100;
      defaultLinks[e+"DamageMitigation"] = parseFloat(defaultLinks[e+"DamageMitigation"].toFixed(2));
  
      //health efficiency
      defaultLinks[e+'HealthEfficiency'] = (1/(1-rD-rD-(rB/2)-pRR-rA*2))*100;
      defaultLinks[e+'HealthEfficiency'] = parseFloat(defaultLinks[e+'HealthEfficiency'].toFixed(2));
    }
  
    return defaultLinks;
  }

  const calculateBonuses = (baseStats = [6, 6, 6], equipmentOn, runes = [], enchantments = {}, accessoryLevel = 1, t12 = true) => {
    let bonuses = {
      mythics: [],
      sets: {},
      ancients: [],
      pets: [],
      mounts: []
    };
    let setsToSort = {};
    let urlEnd = "";
    let stats = Object.assign({}, base.default_stats);
    let ancientEquipped = false;
    let ancientEquipped2 = false;
    let ancientEquipped3 = false;
    var doubled = {
      enchant: false,
      mount: false,
      rune: false
    }
  
    Object.keys(equipmentOn).forEach((x, i) => {
      if (equipmentOn[x].type === "ancient") {
        bonuses.ancients.push(equipmentOn[x]);
        urlEnd += equipmentOn[x].shareID;
        stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
        if (equipmentOn[x].name === "Starweave") {
          ancientEquipped = true;
        }
        if (equipmentOn[x].name === "Polychromatic Blaster") {
          ancientEquipped2 = true;
        }
        if (equipmentOn[x].name === "Elementarium") {
          ancientEquipped3 = true;
        }
        if (t12) {
          stats.damage += 5;
          stats.damage_reduction += 5;
        }
        
      }
      if (equipmentOn[x]['elemental'] ) {
        if (! equipmentOn[x]['elemental'].flat) {
          let temp = equipmentOn[x]['elemental'];
          stats[temp.element_type + "_" + temp.element_modifier] += parseInt(temp.element_value, 10);
        } else {
          let temp = equipmentOn[x]['elemental'];
          stats.elemental_flat['temp.element_type '] += temp.element_value;
        }
        
      }
  
      if (equipmentOn[x]['elemental2'] ) {
        if (! equipmentOn[x]['elemental2'].flat) {
          let temp = equipmentOn[x]['elemental2'];
          stats[temp.element_type + "_" + temp.element_modifier] += parseInt(temp.element_value, 10);
        } else {
          let temp = equipmentOn[x]['elemental2'];
          stats.elemental_flat['temp.element_type '] += temp.element_value;
        }
        
      }
  
      if (equipmentOn[x].type === "mythic" ) {
        bonuses.mythics.push(equipmentOn[x]);
        urlEnd += equipmentOn[x].shareID;
        stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
      } else  if (equipmentOn[x].type === "set") {
        setsToSort[equipmentOn[x].partOfSet] = setsToSort[equipmentOn[x].partOfSet] + 1 || 1;
        if (equipmentOn[x].slot === "Pet" || equipmentOn[x].slot === "Accessory") {
          bonuses.pets.push(equipmentOn[x]);
          stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
        }
        /*elemental: {
          element_value: 3,
          element_type: "water",
          element_modifier: "resist"
        }*/
  
  
        urlEnd += equipmentOn[x].shareID;
      } else if (equipmentOn[x].slot === "Pet" || equipmentOn[x].slot === "Accessory") {
        bonuses.pets.push(equipmentOn[x]);
        urlEnd += equipmentOn[x].shareID;
        stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
      }/*
      if (i === 8 ) {
        stats.fire_damage += "%"// + " + stats.elemental_flat.fire + " Flat";
        stats.air_damage += "%"// + " + stats.elemental_flat.air + " Flat";
        stats.electric_damage += "%"// + " + stats.elemental_flat.electric + " Flat";
        stats.earth_damage += "%"// + " + stats.elemental_flat.earth + " Flat";
        stats.water_damage += "%"// + " + stats.elemental_flat.water + " Flat";
      }*/
    });
  
  
    if (ancientEquipped2) {
      let numMythics = 0;
      let x = 0;
      Object.keys(equipmentOn).forEach((p) => {
        switch(equipmentOn[p].type) {
          case 'mythic': 
            numMythics++;
            x = p;
            break;
          default:
            break
        }
      });
      if (numMythics === 1) {
        stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
      }
    }
  
    
  
    Object.keys(setsToSort).forEach((x) => {
      if (setsToSort[x] >= 2 ) {
        //grab set to get set bonuses,
        let setWorkingOn = sets[x];
        //Figure out which bonuses it gets;
        bonuses.sets[x] = [];
        if (ancientEquipped) {
            setsToSort[x] += 1;
          }
        Object.keys(setWorkingOn.setBonuses).forEach((y) => {
          if (setsToSort[x] >= parseInt(y, 10)) {
            bonuses.sets[x].push(setWorkingOn.setBonuses[y]);
            if (setWorkingOn.name !== 'Apocalypse') {
              stats = setStatBonuses(setWorkingOn.name, equipmentOn, stats, y, accessoryLevel);
            } else if (setWorkingOn.name === 'Apocalypse') {
                if (y === '3') {
                  doubled.enchant = true;
                }
                if (y === '4') {
                  doubled.mount = true;
                }
                if (y === '5') {
                  doubled.rune = true;
                }
                
            }
            
            
          }
        })
      }
    });
    let hasAddedQ = false;
  
    
    //Add Mount
    if (Object.keys(equipmentOn.mount).length > 0) {
      urlEnd+="?";
      hasAddedQ = true;
      stats[equipmentOn.mount.effect] += equipmentOn.mount.value;
      if (doubled.mount) {
        stats[equipmentOn.mount.effect] += equipmentOn.mount.value;
      }
      urlEnd+= "mount=" + equipmentOn.mount.id;
      bonuses.mounts = equipmentOn.mount;
  
    }
  
    if (accessoryLevel !== 1) {
      if (!hasAddedQ) {
        urlEnd+="?";
        hasAddedQ = true;
      } else {
        urlEnd+="&"
      }
      urlEnd += "accessory=" + accessoryLevel;
    }
  
    //Add Runes
    if (runes.length !== 0) {
      if (runes.length > 4) {
        runes.splice(4);
      }
      let runesForURL = "";
      for (var i = 0; i < runes.length; i++) {
  
        if (runes[i].id !== 'x') {
          let tempRune = runes[i];
          stats[tempRune.effect] += tempRune.value;
          if (doubled.rune || ancientEquipped3) {
            stats[tempRune.effect] += tempRune.value;
          }
          runesForURL += tempRune.id;
        }
  
      }
  
      if (runesForURL !== "") {
        if (!hasAddedQ) {
          urlEnd+="?";
          hasAddedQ = true;
        } else {
          urlEnd+="&"
        }
        urlEnd += "runes=" + runesForURL;
      }
  
  
    }
  
    //Add Enchants
    let c = 0;
  
    if (Object.keys(enchantments).length > 0 && JSON.stringify(enchants) !== JSON.stringify(enchantments)) {
      let tempURL = "", tempURL2 = "";
      if (!hasAddedQ) {
        tempURL+="?";
        hasAddedQ = true;
      } else {
        tempURL+="&"
      }
      tempURL += "enchantments=";
      Object.keys(enchantments).forEach((x) => {
        if (!['alreadyUpdated', 'ownUpdate'].includes(x)) {
        
          if (c <= 5) {
  
            let r1 = searchObjectArray(enchantTypes, 'title', enchantments[x]['slot1'].title);
            let r2 = searchObjectArray(enchantTypes, 'title', enchantments[x]['slot2'].title);
  
            let enchantArray = [];
            for (var i = 0; i < enchantTypes.length; i++) {
              enchantArray.push(enchantTypes[i].title);
            } 
            
            if (r1.value > 2 || !enchantArray.includes(r1.title)) {
              r1 =  {
                id: 'x',
                title: "None",
                selected: false,
                effect: "speed",
                value:  0,
                key: 'enchant'
              };
            }
            if (r2.value > 2 || !enchantArray.includes(r2.title)) {
              r2 =  {
                id: 'x',
                title: "None",
                selected: false,
                effect: "speed",
                value:  0,
                key: 'enchant'
              };
            }
  
            //stats[r2.effect] += r2.value;
            //stats[r1.effect] += r1.value;
            //adding decimals seems to become a repeating decimal, this is a team fix. 
            stats[r1.effect] = Math.round((stats[r1.effect]+r1.value)*1000)/1000;
            stats[r2.effect] = Math.round((stats[r2.effect]+r2.value)*1000)/1000;
  
            if (doubled.enchant) {
              stats[r1.effect] = Math.round((stats[r1.effect]+r1.value)*1000)/1000;
              stats[r2.effect] = Math.round((stats[r2.effect]+r2.value)*1000)/1000;
  
            }
  
            if (r1.effect2) {
              //stats[r1.effect2] += r1.value2;
              stats[r1.effect2] = Math.round((stats[r1.effect2]+r1.value2)*1000)/1000;
              if (doubled.enchant) {
                //stats[r1.effect2] += r1.value2;
                stats[r1.effect2] = Math.round((stats[r1.effect2]+r1.value2)*1000)/1000;
              }
            }
            if (r2.effect2) {
              //stats[r2.effect2] += r2.value2;
              stats[r2.effect2] = Math.round((stats[r2.effect2]+r2.value2)*1000)/1000;
              if (doubled.enchant) {
                //stats[r2.effect2] += r2.value2;
                stats[r2.effect2] = Math.round((stats[r2.effect2]+r2.value2)*1000)/1000;
              }
            }
  
  
            tempURL2 += r1.id + "" + r2.id;
  
          }
          c++;
        }
      });
  
      if (tempURL2 !== "xxxxxxxxxxxx") {
        urlEnd += tempURL + tempURL2;
      }
    }
  
    stats.power = baseStats[0];
    stats.stamina = baseStats[1];
    stats.agility = baseStats[2];
  
    if (baseStats[0] !== 6 || baseStats[1] !== 6 || baseStats[2] !== 6) {
      if (!hasAddedQ) {
        urlEnd+="?";
        hasAddedQ = true;
      } else {
        urlEnd+="&"
      }
      urlEnd += "p=" + baseStats[0] + "&s=" + baseStats[1] + "&a=" + baseStats[2];
    }
  
  
    stats.links = linkCalculation(stats);
  
    bonuses.equipmentOn = equipmentOn;
    base.current_stats = stats;
  
    return {bonuses, urlEnd, stats};
  }

  const setStatBonuses = (name, equipped, stats, count = 2, aU = 0) => {
    let numLegendary = 0, numSets = 0, numMythics = 0, accessoryUpgrade = aU ;
    Object.keys(equipped).forEach((x) => {
      switch(equipped[x].type) {
        case 'set':
          numSets++;
          break;
        case 'legendary':
          numLegendary++;
          break;
        case 'mythic': 
          numMythics++;
          break;
        default:
          break
      }
    });
  
    count = parseInt(count, 10);
    switch(name) {
    case 'Divinity':
      if (equipped.mainhand.slot === 'Sword' && count === 2) {
        stats.damage += 5;
      }
      if (count === 3) {
        stats.damage += 30;
      }
      break;
    case 'Night Walker':
      if (count === 2) {
        stats.absorb_chance += 2;
      }
      if (count === 4) {
        stats.damage_reduction += 15;
      }
      break;
    case "Trugdor's Call":
      if (count === 2) {
        stats.dual_strike += 4;
      }
      if (count === 3) {
        stats.richochet_chance += 7;
      }
      break;
    case "Arsenal":
      if (count === 2) {
        stats.richochet_chance += 2;
      }
      if (count === 3) {
        stats.damage += 10;
      }
      if (count === 4) {
        stats.damage += 30;
      }
      break;
    case "Taldrilth's Artifacts":
      if (count === 2) {
        stats.deflect_chance += 3;
      }
      if (count === 3) {
        stats.absorb_chance += 6;
      }
      break;
    case 'Bushido':
      stats.damage += 10;
      stats.damage_reduction -= 10;
      break;
    case 'Conduction':
      if (count === 2) {
        if (equipped.mainhand.slot === "Bow" || equipped.mainhand.slot === "Spear" ||equipped.mainhand.slot === "Laser Gun" || equipped.mainhand.slot === "Crossbow" || equipped.mainhand.slot === "Staff") {
          stats.damage += 5;
        }
      }
      if (count === 3) {
        stats.empower_chance += 5;
      }
      if (count === 4) {
        stats.empower_chance += 25;
      }
      break;
    case 'Luminary':
      if (count === 2) {
        stats.damage_enrage += 5;
      }
      if (count === 3) {
        stats.healing += 15;
      }
      break;
    case 'Polaris':
      if (count === 2) {
        stats.damage_enrage += 5;
      }
      if (count === 4) {
        stats.damage_reduction += 20;
      }
      break;
    case 'Lunar Guardian':
      if (count === 2) {
        stats.healing += 15;
      }
      break;
    case 'Obliteration':
      if (count === 4) {
        stats.damage_reduction += 15;
      }
      break;
    case 'Agony':
      if (count === 2) {
        stats.damage += 3;
      }
      if (count === 4) {
        stats.richochet_chance += 10;
      }
      break;
    case 'Eruption':
      if (count === 3) {
        stats.evade += 12;
      }
      break;
    case 'Illustrious Artifacts':
      if (count === 2) {
        stats.damage += 4;
        stats.healing += 4;
      }
      break;
    case 'Taters':
      if (count === 2) {
        stats.speed += 4;
      }
      break;
    case 'Inferno':
      if (count === 2) {
        stats.empower_chance += 4;
      }
      if (count === 4) {
        stats.sp_damage += 20;
      }
      break;
    case 'Requiem':
      if (count === 2) {
        stats.damage += 25;
      }
      if (count === 3) {
        stats.damage += 24;
      }
      break;
    case 'Gatekeeper':
      if (count === 2) {
        stats.quad_strike += 0.5;
      }
      break;
    case 'Featherfall':
      if (count === 2) {
        stats.damage += 4;
      }
      if (count === 3) {
        stats.speed += 4;
      }
      if (count === 4) {
        stats.dual_strike += 4;
      }
      if (count === 5) {
        stats.empower_chance += 4;
      }
      if (count === 6) {
        stats.quad_strike += 2;
      }
      break;
    case 'Hellfire':
      if (count === 2) {
        stats.damage_reduction += 4;
      }
      if (count === 3) {
        stats.block += 8;
      }
      if (count === 4) {
        stats.evade += 4;
      }
      if (count === 5) {
        stats.deflect_chance += 3;
      }
      if (count === 6) {
        stats.absorb_chance += 4;
      }
      break;
    case 'Pew Pew':
      stats.richochet_chance += 3;
      break;
    case 'Hysteria':
      stats.damage += 10;
      break;
    case 'Bub':
      stats.absorb_chance += 2;
      break;
    case 'Superstition':
      stats.team_enrage += 3;
      break;
    case 'Night Visage':
      stats.damage += 5;
      break;
    case 'Cometfell':
      stats.quad_strike += 1;
      break;
    case 'Nebuleye':
      stats.damage += parseInt(numLegendary, 10);
      break;
    case 'Hood Of Menace': 
      stats.evade += 5;
      break;
    case 'Crypt Tunic':
      stats.deflect_chance += 2;
      break;
    case "Fish N' Barrel":
      stats.damage_reduction += 5;
      stats.damage -= 5;
      break;
    case 'Magmasher':
      stats.healing += 10;
      break;
    case 'Nemesis':
      stats.dual_strike += 4;
      break;
    case 'Bedlam':
      stats.healing += 8;
      break;
    case 'Veilage':
      stats.empower_chance += 4;
      break;
    case 'Flickerate':
      stats.absorb_chance += 2;
      break;
    case 'Dewey Decal':
      stats.damage += 5;
      break;
    case 'Shifting Breeze':
      stats.speed += 4;
      break;
    case 'Brightstar':
      stats.deflect_chance+= 3;
      break;
    case 'Lava Defender':
      stats.redirect_chance += 5;
      break;
    case 'Moon Collage':
      stats.damage += 5.5;
      break;
    case 'Mewmeck':
      stats.damage += 1;
      stats.dual_strike += 1;
      stats.empower_chance+= 1;
      break;
    case 'Peppermint Ring':
      stats.team_enrage += 2;
      stats.damage += 1;
      break;
    case 'Peeper':
      stats.damage += 8;
      break;
    case 'Ataraxia':
      stats.damage += parseInt(numSets, 10);
      break;
    case 'Oblivion':
      stats.absorb_chance += 1;
      stats.deflect_chance += 1;
      stats.evade += 1;
      break;
    case 'Twitch':
      stats.damage_reduction += 4.5;
      break;
    case 'Radiance':
      stats.damage += .75 * parseInt(numMythics, 10);
      stats.damage_reduction += .75 * parseInt(numMythics, 10);
      break;
    case 'Vile Focus':
      stats.absorb_chance += 3;
      break;
    case 'Abhorence':
      stats.richochet_chance += 1.5;
      stats.empower_chance += 1;
      stats.dual_strike += 1;
      break;
    case 'Cloak of Dark Tides':
      stats.damage_reduction -= 5;
      stats.damage += 5;
      break;
    case 'Widowmaker':
      stats.critical_chance += 16+(1*accessoryUpgrade);
      stats.critical_damage += 50;
      stats.empower_chance += 4;
      break;
    case 'Seaphims Grace':
      stats.block += 20+(1*accessoryUpgrade);
      stats.evade += 10+(.5*accessoryUpgrade);
      stats.evade += 4;
      break;
    case 'Melvin Champ':
      stats.dual_strike += 20+(.5*accessoryUpgrade);
      stats.critical_chance += 9+(1*accessoryUpgrade);
      break;
    case 'Abominable Trophy':
      stats.damage_reduction += 20+(1*accessoryUpgrade);
      stats.absorb_chance += 5;
      break;
    case 'Wrath':
      stats.deflect_chance += 10+(.75*accessoryUpgrade);
      stats.absorb_chance += 7.5;
      break
    case 'Baronets':
      stats.empower_chance += 20+(1*accessoryUpgrade);
      stats.dual_strike += 4.5;
      break;
    case 'Astaroths Diadem':
      stats.empower_chance += 2.5+(.5*accessoryUpgrade);
      stats.dual_strike += 2.5+(.5*accessoryUpgrade);
      stats.damage += 5;
      stats.speed += 5;
      stats.critical_chance += 5;
      stats.critical_damage += 50;
      break;
    case 'Melvin Stew':
      stats.absorb_chance += 15+(.5*accessoryUpgrade);
      break;
    case 'The Atomising Neutrino Accelerator':
      stats.block += 60+(2*accessoryUpgrade);
      break;
    case 'Travelling Forge':
      stats.dual_strike += 10+(.5*accessoryUpgrade);
      stats.empower_chance += 10+(.5*accessoryUpgrade)
      stats.critical_chance += 10;
      break;
    case 'Transcendence':
      stats.critical_chance += 40+(1*accessoryUpgrade);
      stats.dual_strike += 3+(.25*accessoryUpgrade);
      stats.empower_chance += 3+(.25*accessoryUpgrade)
      break;
    case 'Sakura':
      stats.damage_reduction += 25;
      stats.block += 10+(2*accessoryUpgrade)
      break;
    case 'Zaserite Wings':
      stats.critical_chance+=10+(.4*accessoryUpgrade);
      stats.empower_chance+=5+(.2*accessoryUpgrade);
      stats.dual_strike+=5+(.2*accessoryUpgrade);
      stats.damage+=5+(.2*accessoryUpgrade);
      stats.speed+=5+(.2*accessoryUpgrade);
      stats.life_steal += 5;
      break;
    case 'Drozgul':
      stats.damage_reduction+=8+(1*accessoryUpgrade);
      stats.evade += 5;
      stats.absorb_chance += 5;
      stats.deflect_chance += 5;
      break;
    case 'Seraphims Grace':
      stats.block += 20+(1*accessoryUpgrade);
      stats.evade += 10+(.5*accessoryUpgrade);
      stats.deflect_chance += 5;
      break;
    case 'Acropodium':
      stats.damage+=24.5+(1*accessoryUpgrade);
      break;
    case 'Melvin Cloak':
      stats.damage += 2;
      break;
    case 'Degenera':
      stats.absorb_chance += 1;
      stats.deflect_chance += 1;
      stats.damage_reduction += 1;
      break;
    case 'Bassault':
      stats.damage_reduction += 5;
      break;
    case 'Frostybite':
      stats.sp_damage += 5;
      break;
    case 'Meteor Chain':
      stats.dual_strike += 1;
      stats.empower_chance += 1;
      break;
    case 'Vortex Zapper':
      stats.richochet_chance += 3;
      break;
    case 'Meteor Blaster':
      stats.healing += 10;
      break;
    case 'Power Core':
      stats.damage_reduction += 25+(1*accessoryUpgrade);
      stats.evade += 5;
      break;
    case 'Goldwings Chivalry':
        stats.damage_reduction += 16+(1*accessoryUpgrade);
        stats.absorb_chance += 8;
        stats.damage += -4;
        break;
    case 'Jupingz':
      stats.empower_chance += 12.5+(0.5*accessoryUpgrade);
      stats.dual_strike += 12.5+(0.5*accessoryUpgrade);
      break;
    case 'Vortex Band':
      stats.damage_reduction += 4.5;
      break;
    case 'Nice To Meat Ya':
      stats.damage_reduction += 2;
      stats.absorb_chance += 1;
      break;
    case 'Merciless':
      if (count === 2 && equipped.mainhand.slot === "Spear") {
  
        stats.damage += 5;
      }
      if (count === 4) {
        stats.damage += 35;
      }
      break;
    case 'Earthen Might':
      if (count === 2) {
        stats.deflect_chance += 2;
      }
      if (count === 4) {
        stats.damage_reduction += 25;
      }
      break;
    case 'Ultimatum':
        stats.dual_strike += 2;
        stats.quad_strike += 0.5;
        break;
    case 'Slibinas':
      stats.block += 1;
      stats.evade += 1;
      stats.damage_reduction += 1;
      stats.absorb_chance += 0.5;
      stats.deflect_chance += 0.5;
      break;
    case 'Sleipnir':
      stats.damage += 5;
      break;
    case 'Pep Pep':
      stats.quad_strike += 1;
      break;
    case 'Blorg Implant':
      stats.damage += 10;
      break;
    case 'Timeweaver Garments':
      stats.damage_reduction += 5;
      break;
    case 'Trident':
        if (count === 2) {
          stats.sp_damage += 15;
        }
        break;
    case 'Venom':
      if (count === 2) {
        stats.team_enrage += 2;
      }
      if (count === 3) {
        stats.damage_reduction += 2.5;
      }
      if (count === 4) {
        stats.damage_reduction += 17.5;
      }
      break;
    case 'Camouflage':
      if (count === 2) {
        stats.quad_strike += 1;
      }
      if (count === 3) {
        stats.ignore_defense += 5;
      }
      if (count === 4) {
        stats.damage += 40;
      }
      break;
    case 'Mistery':
        if (count === 2) {
          stats.dual_strike += 4;
        }
        break;
    case 'Courage':
      if (count === 2) {
        stats.sp_damage += 10;
      }
      break;
    case 'Blind Souls':
      stats.absorb_chance += 5;
      break;
    case "Conquerors Fury":
      stats.empower_chance += 4;
      break;
    case "Battleplate":
      stats.sp_damage += 5;
      break;
    case 'Windstalker': 
      stats.damage += 8;
      break;
    case 'Proton Beem Zapper':
      stats.richochet_chance += 1.5;
      stats.quad_strike += 0.5;
      break;
    case 'Empyrean Vindicator':
      stats.damage_reduction += 5;
      break;
    case 'Phoenix Ravager':
      stats.damage_reduction += 5;
      break;
    case 'Ironbark Longbow':
      stats.damage += 8;
      break;
    case 'Hydronus Helmet':
      stats.speed += 3;
      stats.critical_chance += 8;
      break;
    case 'Hydragar Stone':
      stats.absorb_chance += 5;
      break;
  
    case 'Glamounir':
      stats.absorb_chance += 1;
      stats.deflect_chance += 1;
      stats.evade += 1;
      break;
    case 'Bassoul':
      stats.absorb_chance += 2;
      stats.damage += 1;
      break;
    case 'Demonmullet':
      stats.damage_reduction += 2;
      break;
    case 'Scrawny':
      stats.empower_chance += 2;
      stats.speed += 2;
      break;
    case 'Chippity':
      stats.damage += 1;
      stats.dual_strike += 1;
      stats.empower_chance += 1;
      stats.speed += 1;
      break;
  
    case 'Dragonskull':
      if (count === 2) {
        stats.damage += 2;
      }
      break;
    case 'Blackarrow':
      if (count === 2) {
        stats.absorb_chance += 2;
      }
      break;
    case 'Voltio':
      if (count === 4) {
        stats['electric_damage'] += 60;
      }
      if (count === 6) {
        stats['electric_damage'] += 100;
      }
      break;
    case 'Nephilim Shield':
      stats.dual_strike += 4;
      break;
    case 'Nephilim Legacy':
      stats.damage += 4;
      stats.damage_reduction += 4;
      break;
    case 'Nephilim Casque':
      stats.speed += 5;
      break;
    case 'Nephilim Girdle':
      stats.empower_chance += 5;
      break;
    case 'Pyroc':
      if (count === 2) {
        stats.empower_chance += 2;
      }
      if (count === 3) {
        stats['fire_damage'] += 15;
      }
      if (count === 4) {
        stats['fire_damage'] += 30;
      }
      break;
    case 'Nepulus':
      if (count === 3) {
        stats.deflect_chance += 8;
      }
      if (count === 4) {
        stats['water_resistance'] += 18;
      }
      break;
    case 'Pangea':
      if (count === 4) {
        stats.block += 40;
      }
      break;
    case 'Lucernas':
      if (count === 2) {
        stats.team_enrage += 2;
      }
      if (count === 3) {
        stats['air_damage'] += 15;
      }
      if (count === 4) {
        stats.healing += 15;
      }
      break;
    case 'Astaroth Flag':
        stats.critical_chance += 16+(1*accessoryUpgrade);
        stats.damage += 16+(.5*accessoryUpgrade);
        break;
    case 'Bit Chain':
      stats.critical_chance += 8
      stats.damage += 10+(.5*accessoryUpgrade);
      stats.dual_strike += 10+(.5*accessoryUpgrade);
      break;
    case 'Mirror Wings':
      stats.block += 22 + (2*accessoryUpgrade);
      stats.deflect_chance += 10;
      break; 
    case 'Ancient Pendant':
      stats.speed += 10+(.5*accessoryUpgrade);
      stats.damage += 10+(.5*accessoryUpgrade);
      stats.dual_strike += 4;
      break; 
    case 'Grim Ward':
      stats.damage_enrage += 10+(.5*accessoryUpgrade);
      stats.health += 10+(.5*accessoryUpgrade);
      stats.deflect_chance += 5;
      break;  
    case 'Carbi':
      stats.water_resistance += 10;
      stats.damage_reduction += 20+(1*accessoryUpgrade);
      break;
    case 'Gryphen Resistor':
      stats.block += 22+(2*accessoryUpgrade);
      stats.deflect_chance += 10;
      setStatBonuses.electric_resistance += 5;
      break;
    case 'Amaglon':
      stats.block += 8;
      break;
    //Add in legendary enchant and accessories, mounts too
    default: 
      //console.log(name, equipped, stats);
      break;
    };
  
    return stats;
  }
}

