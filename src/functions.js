import { sets } from './sets';
import { base } from './stats';

export const calculateBonuses = (equipmentOn) => {
  let bonuses = {
    mythics: [],
    sets: {},
    pets: []
  };
  let setsToSort = {};
  let urlEnd = "";
  let stats = {...base.default_stats};

  Object.keys(equipmentOn).forEach((x) => {

    if (equipmentOn[x].type === "mythic") {
      bonuses.mythics.push(equipmentOn[x]);
      urlEnd += equipmentOn[x].shareID;
      stats = setStatBonuses(equipmentOn[x].name, equipmentOn, stats)
    } else  if (equipmentOn[x].type === "set") {
      setsToSort[equipmentOn[x].partOfSet] = setsToSort[equipmentOn[x].partOfSet] + 1 || 1;
      if (equipmentOn[x].slot === "Pet" || equipmentOn[x].slot === "Accessory") {
        bonuses.pets.push(equipmentOn[x]);
      }
      urlEnd += equipmentOn[x].shareID;
    } else if (equipmentOn[x].slot === "Pet" || equipmentOn[x].slot === "Accessory") {
      bonuses.pets.push(equipmentOn[x]);
      urlEnd += equipmentOn[x].shareID;
    }
  });

  Object.keys(setsToSort).forEach((x) => {
    if (setsToSort[x] >= 2 ) {
      //grab set to get set bonuses,
      let setWorkingOn = sets[x];
      //Figure out which bonuses it gets;
      bonuses.sets[x] = [];
      Object.keys(setWorkingOn.setBonuses).forEach((y) => {
        if (setsToSort[x] >= parseInt(y, 10)) {
          bonuses.sets[x].push(setWorkingOn.setBonuses[y]);
        }
      })
    }
  });
  base.current_stats = stats;

  return {bonuses, urlEnd};
}

export const convertName = (name) => {
  name = name.split(' ').join('_');
  name = name.split("'").join("");
  name = name.toLowerCase();
  return name;
}

export const setStatBonuses = (name, equipped, stats, count = 2) => {
    switch(name) {
    case 'Divinity':
      if (equipped.mainhand.slot === 'Sword' && count === 2) {
        stats.damage += 5;
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
      break;
    case 'Luminary':
      if (count === 2) {
        stats.damage_enrage += 5;
      }
      if (count === 3) {
        stats.healing += 15;
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
        stats.richochet_chance += 9;
      }
      break;
    case 'Illustrious Artifacts':
      if (count === 2) {
        stats.damage += 4;
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
      break;
    case 'Gatekeeper':
      if (count === 2) {
        stats.quad_strike += 0.5;
      }
      break;
    case 'Pew Pew':
      stats.richochet_chance += 3;
      break;
    case 'Bub':
      stats.absorb_chance += 2;
      break;
    case 'Superstition':
      stats.damage_enrage += 3;
      break;
    case 'Night Visage':
      stats.damage += 5;
      break;
    case 'Cometfell':
      stats.quad_strike += 1;
      break;
    case 'Nebuleye':
      stats.damage += 1;
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
    case 'Nemesis':
      stats.dual_strike += 4;
      break;
    case 'Bedlam':
      stats.healing += 8;
      break;
    //Add in legendary enchant and accessories
    default: 
      console.log(name, equipped, stats);
  };

  return stats;
}