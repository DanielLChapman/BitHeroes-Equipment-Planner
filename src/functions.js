import { sets } from './sets';
import { base, enchantTypes} from './stats';

export const enchants = {
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

export const searchObjectArray = (objectArray, searchQuery, compareTo) => {
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

export const calculateBonuses = (equipmentOn, runes = [], enchantments = {}, accessoryLevel = 1) => {
  let bonuses = {
    mythics: [],
    sets: {},
    ancients: [],
    pets: [],
    mounts: []
  };
  let setsToSort = {};
  let urlEnd = "";
  let stats = {...base.default_stats};
  let ancientEquipped = false;

  Object.keys(equipmentOn).forEach((x) => {
    if (equipmentOn[x].type === "ancient") {
      bonuses.ancients.push(equipmentOn[x]);
      urlEnd += equipmentOn[x].shareID;
      stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
      if (equipmentOn[x].name === "Starweave") {
        ancientEquipped = true;
      }
    }
     else if (equipmentOn[x].type === "mythic" ) {
      bonuses.mythics.push(equipmentOn[x]);
      urlEnd += equipmentOn[x].shareID;
      stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
    } else  if (equipmentOn[x].type === "set") {
      setsToSort[equipmentOn[x].partOfSet] = setsToSort[equipmentOn[x].partOfSet] + 1 || 1;
      if (equipmentOn[x].slot === "Pet" || equipmentOn[x].slot === "Accessory") {
        bonuses.pets.push(equipmentOn[x]);
      }
      urlEnd += equipmentOn[x].shareID;
    } else if (equipmentOn[x].slot === "Pet" || equipmentOn[x].slot === "Accessory") {
      bonuses.pets.push(equipmentOn[x]);
      urlEnd += equipmentOn[x].shareID;
      stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats, 2, accessoryLevel);
    }
  });

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
          stats = setStatBonuses(setWorkingOn.name, equipmentOn, stats, y, accessoryLevel);
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
      if (c <= 5) {

        let r1 = searchObjectArray(enchantTypes, 'title', enchantments[x]['slot1'].title);
        let r2 = searchObjectArray(enchantTypes, 'title', enchantments[x]['slot2'].title);

        let enchantArray = ["Block", "Absorb", "Damage Reduction", "Damage", "Damage Enrage", "Deflect Chance", "Dual Strike", "Empower Chance", "Evade", "Health", "Life Steal", "Speed", "None"];

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

        stats[r2.effect] += r2.value;
        stats[r1.effect] += r1.value;

        tempURL2 += r1.id + "" + r2.id;

      }
      c++;
    });

    if (tempURL2 !== "xxxxxxxxxxxx") {
      urlEnd += tempURL + tempURL2;
    }
  }


  console.log(stats);
  base.current_stats = stats;

  return {bonuses, urlEnd, stats};
}

export const convertName = (name) => {
  name = name.split(' ').join('_');
  name = name.split("'").join("");
  name = name.toLowerCase();
  return name;
}

export const setStatBonuses = (name, equipped, stats, count = 2, aU = 0) => {
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
    
  })

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
      if (equipped.mainhand.type === "Bow" || equipped.mainhand.type === "Crossbow" || equipped.mainhand.type === "Staff") {
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
      stats.damage += 20;
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
    stats.damage += 50;
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
    stats.damage_reduction += 8;
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
  case 'Abdominable Trophy':
    stats.damage_reduction += 20+(1*accessoryUpgrade);
    stats.absorb_chance += 5;
    break;
  case 'Wrath':
    stats.deflect_chance += 10+(.75*accessoryUpgrade);
    stats.absorb_chance += 7.5;
    break
  case 'Baronet Edwins Cranialoptic Regulator':
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
  case 'Traveling Forge':
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
  case 'Zaerite Wings':
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
  case 'Acropodium':
    stats.damage+=24.5+(1*accessoryUpgrade);
    break;
  case 'Melvin Cloak':
    stats.damage += 2;
    break;
  case 'Bassault':
    stats.damage_reduction += 5;
    break;
  case 'Frostybite':
    stats.damage += 5;
    break;
  case 'Merciless':
    if (count === 2 && equipped.mainhand.type === "Spear") {
      stats.damage += 5;
    }
    if (count === 4) {
      stats.damage += 35;
    }
    break;
  //Add in legendary enchant and accessories, mounts too
  default: 
    //console.log(name, equipped, stats);
    break;
  };

  return stats;
}