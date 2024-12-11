const router = createRouter()
import unturnedPackage from "~/server/utils/games/unturned/unturnedPackage"

 let cacheMaps = null
 let cacheTypes = null


async function  getMaps () {
  cacheMaps = await unturnedPackage.getMaps()
  return cacheMaps
}

router.get('/get-maps', defineEventHandler(async(event) => {
  let maps = cacheMaps ? cacheMaps : await getMaps(cacheMaps)
  return maps 
}))



router.get('/get-types', defineEventHandler(async(event) => {
  async function  getTypes () {
    cacheTypes = await unturnedPackage.getTypes()
    return cacheTypes
  }

  let types = cacheTypes ? cacheTypes :  await getTypes()
  return types
}))


async function getItemById(mapId, itemId, type, parentItemName, infoBlock) {
  if(!itemId) return null
  
  let item = await unturnedPackage.getItemById(mapId, itemId) 

  if(item.length < 1 && mapId != 1) { // check for the same item in vanilla map (if first check was for a curated map)
    item = await unturnedPackage.getItemById(1, itemId) 
  }


  if(infoBlock == 'guns') { // crafts info
    if(item.length === 1) { // item found
      return item[0].itemType == type ? item[0] : 
        { 
          itemId: 0,
          itemMap: 'Vanilla',
          itemName: `Default ${parentItemName} ${type}`,
          itemImg: 'default',
          itemType: type, 
        }
    } else return null
  } else { // blueprints info
    return item[0]
  }


}

async function  getItemInfo (itemInfo) {
  let items = [] // total items from db to frontend
    // handling general stats
    const generalTypes = {
      Width: 'Gives X slots', 
      Height: 'Gives Y slots',
      Armor: 'Armor',
      Slot: 'Slot',
      Ammo_Min: 'Spawns with rounds',
      Count_Min: 'Spawns with rounds',
      Durability: 'Durability Lose',
      Range: 'Range',
      Firerate: 'Firerate',
      Recoil_X: 'Recoil X/Y',
      Spread: 'Spread',
      Sway: 'Scope Sway',
      Shake: 'Shake',
      Health: 'Recovers Health',
      Energy: 'Recovers Energy',
      Food: 'Recovers Food',
      Water: 'Recovers Water',
      Aid: 'Can be used on others',
      Bleeding: 'Stops Bleeding',
      Broken: 'Heals broken leg',
      Disinfectant: 'Heals Radiation',
      Virus: 'Affects Radiation',
      Vision: 'Nightvision Type',
      Nightvision_Allowed_In_ThirdPerson: 'Can be used in third person',
      Hair: 'Takes hair slot',
      Amount: 'Rounds Amount',
      Silenced: 'Enables Silence',
      Volume: 'Noise Reduction',
      Ballistic_Drop: 'Ballistic Drop',
      Strength: 'Force Punch',
      Stamina: 'Cost ',
      Speed: 'Reload speed',
      Aim_Duration_Multiplier: 'Aim Duration',
      Distance: 'Distance',
      Zoom: 'Zoom',
      Fuel: 'Fuel Capacity',
      Fuel_Capacity: 'Fuel Capacity',
      Radius: 'Radius',
      Explosion: 'Explosion',
      Build: 'Structure Type',
      Construct: 'Structure Type',
      Repeated: 'Repeated Use',
      Repair: 'Repair',
      Locked: 'Cannot be opened by others',
      Laser: 'Can turn on laser (press B)',
      Light: 'Can turn on light (press B)',
      Storage_X: 'Storage capacity X',
      Storage_Y: 'Storage capacity Y',
      Capacity: 'Fuel Capacity',
      Burn: 'Fuel usage per second',
      Clean_Water: 'Recovers Water',
      Proof_Radiation: 'Defends from radiation',
      Proof_Water: 'Prevents Drowning',
      Gravity: 'Gravity',
      Enables_Chart: 'Enables Chart'
    }
    generalTypes.Health = itemInfo[0].typeName == 'Food' ? 'Recovers Health' : 'Structure Health'
    generalTypes.Vision = itemInfo[0].typeName == 'Water' ? 'Vision Distortion' : 'Nightvision Type'
    let generalTypesList = ['Width', 'Height', 'Armor', 'Slot', 'Ammo_Min', 'Durability', 'Range', 'Firerate', 'Recoil_X', 'Spread', 'Sway', 'Shake', 'Health', 'Food', 'Water', 'Aid', 'Bleeding', 'Broken', 'Disinfectant', 'Virus', 'Vision', 'Nightvision_Allowed_In_ThirdPerson', 'Hair', 'Amount', 'Count_Min', 'Silenced', 'Volume', 'Ballistic_Drop', 'Strength', 'Stamina', 'Speed', 'Aim_Duration_Multiplier', 'Distance', 'Zoom', 'Fuel', 'Radius', 'Build', 'Construct', 'Explosion', 'Repeated', 'Repair', 'Energy', 'Laser', 'Light', 'Locked', 'Storage_X', 'Storage_Y', 'Capacity', 'Burn', 'Clean_Water', 'Proof_Radiation', 'Gravity', 'Enables_Chart', 'Proof_Water', 'Fuel_Capacity']


    if(itemInfo[0].typeName != 'Gun' && itemInfo[0].typeName != 'Melee' && itemInfo[0].typeName != 'Charge') {
      generalTypes.Player_Damage = 'Player Damage',
      generalTypes.Zombie_Damage = 'Zombie Damage',
      generalTypes.Animal_Damage = 'Animal Damage',
      generalTypes.Barricade_Damage = 'Barricade Damage',
      generalTypes.Structure_Damage = 'Structure Damage',
      generalTypes.Vehicle_Damage = 'Vehicle Damage',
      generalTypes.Resource_Damage = 'Resource Damage',
      generalTypes.Object_Damage = 'Object Damage'
      generalTypesList.push('Barricade_Damage', 'Structure_Damage', 'Vehicle_Damage', 'Resource_Damage', 'Object_Damage',  'Player_Damage', 'Zombie_Damage', 'Animal_Damage')
    }


  for(const el of itemInfo) {
    const mapId = el.mapId // get mapId

    let generalInfo = []
    generalInfo.push( // default stats from an item
      {name: 'Takes horizontal slots', value: el.sizeX},
      {name: 'Takes vertical slots', value: el.sizeY},
      {name: 'Rarity', value: el.itemRarity, color: el.rarityColor},
      {name: 'In-game type', value: el.typeName}
    )


    let parsedItemData = {}
    JSON.parse(el.itemInfo).forEach(el => {
      for (const [key, value] of Object.entries(el)) {
        parsedItemData[key] =  value
      }
    })



    for (const [key, value] of Object.entries(parsedItemData)) {

      if(generalTypesList.includes(key)) {
        switch (key) {
          case 'Strength':
            generalInfo.push({name: generalTypes[key], value: '+' + Math.round((1 - value) * 100 * -1) + '% Damage' }) 
            break;
          case 'Vision':
            generalInfo.push({name: generalTypes[key], value: itemInfo[0].typeName == 'Water' ? value + ' seconds' : value
             }) 
            break;
          case 'Stamina':
          generalInfo.push({name: generalTypes[key], value: value + '%' + ' Stamina per use' }) 
          break;
          case 'Bleeding':
          case 'Silenced':
          case 'Broken':
          case 'Nightvision_Allowed_In_ThirdPerson':
          case 'Aid':
          case 'Hair':
          case 'Repeated':
          case 'Repair':
          case 'Laser':
          case 'Locked':
          case 'Light':
          case 'Proof_Radiation':
          case 'Enables_Chart':
          case 'Proof_Water':
            generalInfo.push({name: generalTypes[key], value: 'Yes' }) 
            break;
          case 'Armor':
          case 'Volume':
          case 'Gravity':
          case 'Ballistic_Drop':
            generalInfo.push({name: generalTypes[key], value: Math.round((1 - value) * 100) + '%' }) 
            break;
          case 'Speed':
          case 'Aim_Duration_Multiplier':
            generalInfo.push({name: generalTypes[key], value: Math.round((1 - value) * 100 * -1) + '%' }) 
            break;
          case 'Food':
          case 'Water':
          case 'Energy':
          case 'Clean_Water':
          case 'Disinfectant':
            generalInfo.push({name: generalTypes[key], value: '+' + value + '%' }) 
            break;
          case 'Virus':
          case 'Durability':
            generalInfo.push({name: generalTypes[key], value: '-' + value + '%' }) 
            break;
          case 'Slot':
            generalInfo.push({name: generalTypes[key], value: value == 'Primary' ? 'Primary only' : 'Secondary and primary'}) 
            break;  
          case 'Range':
          case 'Distance':
            generalInfo.push({name: generalTypes[key], value: value + 'm'}) 
            break;  
          case 'Zoom':
            generalInfo.push({name: generalTypes[key], value: `${parsedItemData['Zoom']}x / (${parsedItemData['ThirdPerson_Zoom'] ? parsedItemData['ThirdPerson_Zoom'] : 1}x third-person)`}) 
            break; 
          case 'Ammo_Min':
            generalInfo.push({name: generalTypes[key], value: `${parsedItemData['Ammo_Min']}-${parsedItemData['Ammo_Max']}`}) 
            break; 
          case 'Count_Min':
            generalInfo.push({name: generalTypes[key], value: `${parsedItemData['Count_Min']}-${parsedItemData['Count_Max']}`}) 
            break; 
          case 'Recoil_X':
            generalInfo.push({name: generalTypes[key], value: `${(1 - parsedItemData['Recoil_X']).toFixed(2) * 100}%/${ (1-parsedItemData['Recoil_Y']).toFixed(2) * 100}%`, explanation: 'The recoil values represent the stability of the weapon after firing.'}) 
            break;  
          case 'Sway':
            generalInfo.push({name: generalTypes[key], value: (1 - Number(value)) * -1 * 100 + '%', explanation: 'Sway affects aiming stability, especially over long distances.'}) 
            break; 
          case 'Spread':
            generalInfo.push({name: generalTypes[key], value: ((1 - Number(value)).toFixed(2)) * 100 + '%', explanation: 'This measures how much the bullets scatter from the point of aim when fired. Higher values meaning bullets stay closer together, improving accuracy, especially when firing multiple shots.'}) 
            break;  
          case 'Shake':
            generalInfo.push({name: generalTypes[key], value: ((1 - Number(value)).toFixed(2)) * 100 + '%', explanation: 'Shake is how much the weapon visually jerks when you fire. Higher values make it easier to keep your aim steady during continuous fire.'}) 
            break;          
          default:
            generalInfo.push({name: generalTypes[key], value: value}) 
        }

      }

    }
    let gunDamage = {playerDamage: {}, zombieDamage: {}, animalDamage: {}}      

    // damage stats
    if(parsedItemData['Useable'] == 'Gun' || parsedItemData['Useable'] == 'Melee' || parsedItemData['Useable'] == 'Throwable' || parsedItemData['Build'] == 'Charge') {
      // player damage
      gunDamage.playerDamage.total = Number(parsedItemData['Player_Damage'])
      gunDamage.playerDamage.limbs = parsedItemData['Useable'] != 'Throwable' ? (Number(parsedItemData['Player_Damage']) * Number(parsedItemData['Player_Leg_Multiplier'])).toFixed(1) : Number(parsedItemData['Player_Damage'])
      gunDamage.playerDamage.head = parsedItemData['Useable'] != 'Throwable' ? (Number(parsedItemData['Player_Damage']) * Number(parsedItemData['Player_Skull_Multiplier'])).toFixed(1): Number(parsedItemData['Player_Damage'])
      gunDamage.playerDamage.body = parsedItemData['Useable'] != 'Throwable' ? (Number(parsedItemData['Player_Damage']) * Number(parsedItemData['Player_Spine_Multiplier'])).toFixed(1) : Number(parsedItemData['Player_Damage'])
      // zombies damage
      gunDamage.zombieDamage.total = Number(parsedItemData['Zombie_Damage'])
      gunDamage.zombieDamage.limbs = parsedItemData['Useable'] != 'Throwable' ? (Number(parsedItemData['Zombie_Damage']) * Number(parsedItemData['Zombie_Leg_Multiplier'])).toFixed(1) : Number(parsedItemData['Zombie_Damage'])
      gunDamage.zombieDamage.head = parsedItemData['Useable'] != 'Throwable' ? (Number(parsedItemData['Zombie_Damage']) * Number(parsedItemData['Zombie_Skull_Multiplier'])).toFixed(1) : Number(parsedItemData['Zombie_Damage'])
      gunDamage.zombieDamage.body = parsedItemData['Useable'] != 'Throwable' ? (Number(parsedItemData['Zombie_Damage']) * Number(parsedItemData['Zombie_Spine_Multiplier'])).toFixed(1) : Number(parsedItemData['Zombie_Damage'])
      // animals damage
      gunDamage.animalDamage.total = Number(parsedItemData['Animal_Damage'])
      gunDamage.animalDamage.limbs = parsedItemData['Useable'] != 'Throwable' ? (Number(parsedItemData['Animal_Damage']) * Number(parsedItemData['Animal_Leg_Multiplier'])).toFixed(1) : Number(parsedItemData['Animal_Damage'])
      gunDamage.animalDamage.head = parsedItemData['Useable'] != 'Throwable' ? (Number(parsedItemData['Animal_Damage']) * Number(parsedItemData['Animal_Skull_Multiplier'])).toFixed(1) : Number(parsedItemData['Animal_Damage'])
      gunDamage.animalDamage.body = parsedItemData['Useable'] != 'Throwable' ? (Number(parsedItemData['Animal_Damage']) * Number(parsedItemData['Animal_Spine_Multiplier'])).toFixed(1) : Number(parsedItemData['Animal_Damage'])
      // other damage
      gunDamage.resource = Number(parsedItemData['Resource_Damage'])
      gunDamage.structure = Number(parsedItemData['Structure_Damage'])
      gunDamage.vehicle = Number(parsedItemData['Vehicle_Damage'])
      gunDamage.barricade = Number(parsedItemData['Barricade_Damage'])
      gunDamage.object = Number(parsedItemData['Object_Damage'])
      gunDamage.invulnerable = parsedItemData['Invulnerable'] ==  ''  || itemInfo[0].typeName == 'Throwable' || gunDamage.structure >= 1000 ? true : ''
    }



    // attachments

    let attachments = {
      defaultAttachments: {},
      hooks: {},
      modes: {}
    }
    
    if(parsedItemData['Useable'] == 'Gun') {
      attachments.show = true
      if(parsedItemData['Hook_Sight'] == '') attachments.hooks.sight = true
      if(parsedItemData['Hook_Tactical'] == '') attachments.hooks.tactical = true
      if(parsedItemData['Hook_Grip'] == '') attachments.hooks.grip = true
      if(parsedItemData['Hook_Barrel'] == '') attachments.hooks.barrel = true

      if(parsedItemData['Safety'] == '') attachments.modes.safety = true
      if(parsedItemData['Semi'] == '') attachments.modes.semi = true
      if(parsedItemData['Bursts'] || parsedItemData['Bursts'] == '') attachments.modes.bursts = parsedItemData['Bursts'] ? parsedItemData['Bursts'] : true
      if(parsedItemData['Auto'] == '') attachments.modes.auto = true

      for (const itemType of ['Sight', 'Magazine', 'Muzzle']) { // default attachments
        const gottenType = await getItemById(
          mapId, Number(parsedItemData[itemType]), itemType, el.itemName, 'guns')
          if(gottenType) {
            attachments.defaultAttachments[itemType] = gottenType
          }
      }
      // console.log(attachments);
    }



    // blueprints
    let blueprints = []
    if(el.blueprintsAmount > 0) {

        for(let ind = 0; ind<el.blueprintsAmount; ind++ ) { 
          // loop inside a loop, bad optimazation, but not a lot of iterations anyway, for now like leave it like this as a fast solution

          let blueprintType = ''
          let blueprintSupplies = {}
          let suppliesAmount = 0
          let blueprintTool = null
          let blueprintSkillLevel = null
          let blueprintSkill = null
          let blueprintProductId = null
          let blueprintProductAmount = null
          for (const [blueprintIndex, blueprint] of Object.entries(el.blueprints)) {
            for (const [key, value] of Object.entries(blueprint)) {
           
              if(key.includes(`Blueprint_${ind}`)) {
                // console.log(`blueprint value: ${ind}: ${key}: ${value}`);

                if(key == `Blueprint_${ind}_Type`) {
                  blueprintType = value
                }

                if(key == `Blueprint_${ind}_Supplies`) {
                  suppliesAmount = value
                }

                if(key == `Blueprint_${ind}_Tool`) {
                  blueprintTool = value
                }

                if(key == `Blueprint_${ind}_Level`) {
                  blueprintSkillLevel = value
                }

                if(key == `Blueprint_${ind}_Skill`) {
                  blueprintSkill = value
                }


                if(key == `Blueprint_${ind}_Product`) {
                  blueprintProductId = value
                }

                if(key == `Blueprint_${ind}_Products`) {
                  blueprintProductAmount = value
                }

                if(suppliesAmount > 0) {
                  if(key.includes(`Blueprint_${ind}_Supply`)) {
                    let supplyPart = key.slice(`Blueprint_${ind}_Supply`.length + 1, key.length);
                    let supplyIndex =  supplyPart.slice(0, supplyPart.indexOf('_'))
                    let type = supplyPart.includes('ID') ? 'id' : 'amount'
                    blueprintSupplies[`supply${supplyIndex}`] = blueprintSupplies[`supply${supplyIndex}`] ? blueprintSupplies[`supply${supplyIndex}`] : {}
                    blueprintSupplies[`supply${supplyIndex}`][type == 'id' ? 'id' : 'amount'] = value
                  }
                }

              }
            }
          }

          if(suppliesAmount > 0 || blueprintProductId) {
            blueprints.push({
              suppliesAmount,
              type: blueprintType,
              blueprintSupplies,
              blueprintTool,
              blueprintSkillLevel,
              blueprintSkill,
              product: {id: blueprintProductId, amount: blueprintProductAmount}
            })
          }



        }
        
    }


    for(const blueprint of blueprints) { // getting supplies item info for blueprints
      if(blueprint.blueprintTool) {blueprint.blueprintTool = await getItemById(mapId, blueprint.blueprintTool)}
      if(blueprint.suppliesAmount > 0) {
        for(let ind = 0; ind< blueprint.suppliesAmount; ind++) {
          const supplyId = blueprint.blueprintSupplies[`supply${ind}`].id
          blueprint.blueprintSupplies[`supply${ind}`].itemInfo = await getItemById(mapId, supplyId)
        }
      }

      if(blueprint.product) {blueprint.product.itemInfo = await getItemById(mapId, blueprint.product.id)}

    }

    items.push({id: el.itemId, name: el.itemName, imgUrl: el.itemImg, description: el.itemDescription, type: el.typeName,
      blueprintsAmount: el.blueprintsAmount, generalInfo, gunDamage: gunDamage ? gunDamage : null, attachments,  blueprints: blueprints, /* itemInfo  temporary */
    })

  }
  return items
}


async function  prepareVehicleInfo (vehicles) {
  const preparedVehicles = []
  for(const vehicle of vehicles) {
    const defaultVehicleInfo = []

    const speedMax = vehicle.speedMax * 1.25 * 3.6;
    defaultVehicleInfo.push(
      {value: vehicle.seats, name: 'Seats'},
      {value: vehicle.health, name: 'Vehicle Health'},
      {value: vehicle.fuel, name: 'Vehicle Fuel'},
      {value: speedMax, name: 'Approximate Speed'},
      {value: Number(vehicle.storageX) * Number(vehicle.storageY) + ` (${vehicle.storageX}*${vehicle.storageY})`, name: 'Storage'},
      {value: vehicle.speedMax + '/' + vehicle.speedMin, name: 'Speed multiplier Max/Min'},
    )

    let turretsIds = []
    let turrets = []
    vehicle.detailedInfo.forEach(el => {
      for (const [key, value] of Object.entries(el)) {
        if(key == 'Can_Be_Locked') {
          defaultVehicleInfo.push({value: 'Yes', name: 'Can be locked'})
        }
        if(key == 'Invulnerable') {
          defaultVehicleInfo.push({value: 'Yes', name: 'Invulnerable'})
        }
        if(key == 'Turrets') {
          defaultVehicleInfo.push({value: value, name: 'Turrets'})
        }
        if(key == 'Turret_0_Item_ID') {
          turretsIds.push(value)
        }
        if(key == 'Turret_1_Item_ID') {
          turretsIds.push(value)
        }
        if(key == 'Turret_2_Item_ID') {
          turretsIds.push(value)
        }

      }
    })

    for(let i = 0; i < turretsIds.length; i++) {
      let turret = await getItemById(vehicle.mapId, Number(turretsIds[i])); 
      turrets.push(turret)
    }
    
    preparedVehicles.push({id: vehicle.id, name: vehicle.name, ids: vehicle.ids, img: vehicle.img, vehicleInfo: defaultVehicleInfo, turrets})
  }

  return preparedVehicles
}



router.get('/get-vehicle', defineEventHandler(async(event) => {
  const query = getQuery(event)

  let maps = cacheMaps ? cacheMaps : await getMaps(cacheMaps)
  const res = maps.filter(map => map.mapName.replaceAll(' ', '-').toLowerCase() == query.mapName)

  let vehicleInfo
  if(res[0]?.mapId) {
    vehicleInfo = await unturnedPackage.getVehicleInfo(query.itemName, res[0].mapId);
  }
  let vehicles = []
  if(vehicleInfo && vehicleInfo.length > 0) {
    vehicles = await prepareVehicleInfo(vehicleInfo)
  }


  return  vehicles 
}))

router.get('/get-item', defineEventHandler(async(event) => {
  const query = getQuery(event)

  let maps = cacheMaps ? cacheMaps : await getMaps(cacheMaps)
  const res = maps.filter(map => map.mapName.replaceAll(' ', '-').toLowerCase() == query.mapName)
  let itemInfo
  if(res[0]?.mapId) {
    itemInfo = await unturnedPackage.getItemInfo(query.itemName, res[0].mapId);
  }
  let items = []
  if(itemInfo && itemInfo.length > 0) {
    items = getItemInfo(itemInfo)
  }


  return  items 
}))
  

router.post('/get-items', defineEventHandler(async(event) => {
    const body = await readBody(event);
    const category = body.category
    let idList = await unturnedPackage.getItems(Number(body.maps), category.typeIncludes.split(','), body.searchTag.trim(), Number(body.currentPage));
  
    return idList;
}))





router.post('/get-vehicles', defineEventHandler(async(event) => {
    const body = await readBody(event);
    let vehicleList = await unturnedPackage.getVehicles(Number(body.maps), Number(body.type), body.searchTag.trim(), Number(body.currentPage));
  
    return vehicleList;
}))
  



export default useBase('/api/unturned', router.handler)