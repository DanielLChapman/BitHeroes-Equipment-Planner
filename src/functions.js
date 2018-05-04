import { sets } from './sets';

export const calculateBonuses = (equipmentOn) => {
  let bonuses = {
    mythics: [],
    sets: {},
    pets: []
  };
  let setsToSort = {};
  let urlEnd = "";

  Object.keys(equipmentOn).forEach((x) => {

    if (equipmentOn[x].type === "mythic") {
      bonuses.mythics.push(equipmentOn[x]);
      urlEnd += equipmentOn[x].shareID;
    } else  if (equipmentOn[x].type === "set") {
      setsToSort[equipmentOn[x].partOfSet] = setsToSort[equipmentOn[x].partOfSet] + 1 || 1;
      if (equipmentOn[x].slot === "Pet" || equipmentOn[x].slot === "Accessory") {
        bonuses.pets.push(equipmentOn[x]);
      }
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
  return {bonuses, urlEnd};
}

export const convertName = (name) => {
  name = name.split(' ').join('_');
  name = name.split("'").join("");
  name = name.toLowerCase();
  return name;
}