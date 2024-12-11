// import {users} from '~/server/utils/games/unturned/unturnedSchemas'

import {itemsRarity, maps, types, vanillaTypes, vehicleTypes, items, vehicles} from "~/server/utils/games/unturned/unturnedSchemas";

import { eq, asc, inArray, and, like,sql } from 'drizzle-orm';


import {db} from '~/server/utils/db'

const unturnedPackage = {

    getMaps: async function ()  {
      const mapsList = await db.select().from(maps).orderBy(asc(maps.mapOrder));
      return mapsList;
    },  
      
    getTypes: async function ()  {
      const typesList = await db.select().from(types).orderBy(asc(types.typeOrder));
      return typesList;
    }, 

    getItems: async function (chosenMapId, types, searchTag, currentPage)  {


      const itemsList = await db.select(
        {
          itemId: items.itemId, 
          itemName: items.itemName,
          itemImg: items.itemImg, 
          itemType: vanillaTypes.typeName,
          itemMap: maps.mapName,  
        })
        .from(items)
        .where(
          and(
          inArray(items.itemMapId, chosenMapId == 0 ? [1,2,3,4,5,6,7,8,9,10,11,12,13] : [chosenMapId]),
          inArray(items.itemTypeId, types),
          Number(searchTag) ? eq(items.itemId, Number(searchTag)) : like(sql`LOWER(${items.itemName})`, `%${searchTag}%`),
          )
        )
        .leftJoin(maps, eq(items.itemMapId, maps.mapId))
        .leftJoin(vanillaTypes, eq(items.itemTypeId, vanillaTypes.typeId))
        .offset(currentPage * 30)
        .orderBy(items.itemId, asc)
        .limit(30);
      return itemsList;
    },
    
    getVehicles: async function (chosenMapId, type, searchTag, currentPage)  {
      const vehiclesList = await db.select(
        {
          vehicleId: vehicles.vehicleId,
          vehicleName: vehicles.vehicleName,
          vehicleImg: vehicles.vehicleImg,
          vehicleType: vehicleTypes.typeName,
          vehicleMap: maps.mapName,
        })
        .from(vehicles)
        .where(
          and(
          inArray(vehicles.vehicleMapId, chosenMapId == 0 ? [1,2,3,4,5,6,7,8,9,10,11,12,13] : [chosenMapId]),
          inArray(vehicles.vehicleTypeId, type == 0 ? [1,2,3] : [type]),
          Number(searchTag) ? eq(vehicles.vehicleId, Number(searchTag)) : like(sql`LOWER(${vehicles.vehicleName})`, `%${searchTag}%`),
          )
        )
        .leftJoin(maps, eq(vehicles.vehicleMapId, maps.mapId))
        .leftJoin(vehicleTypes, eq(vehicles.vehicleTypeId, vehicleTypes.typeId))
        .offset(currentPage * 30)
        .orderBy(vehicles.vehicleId, asc)
        .limit(30);
      return vehiclesList;
    },


    

    getVehicleInfo: async function (vehicleName, mapId)  {
      const itemInfo = await db.select({
        id: vehicles.vehicleId,
        name: vehicles.vehicleName,
        mapId: maps.mapId,
        mapName: maps.mapName,
        ids: vehicles.vehicleIds,
        img: vehicles.vehicleImg,
        healthMax: vehicles.vehicleHealthMax,
        healthMin: vehicles.vehicleHealthMin,
        storageX: vehicles.vehicleTrunkStorageX,
        storageY: vehicles.vehicleTrunkStorageY,
        fuel: vehicles.vehicleFuel,
        health: vehicles.vehicleHealth,
        speedMax: vehicles.vehicleSpeedMax,
        speedMin: vehicles.vehicleSpeedMin,
        detailedInfo: vehicles.vehicleInfo,
        seats: vehicles.vehicleSeats,
      })
      .from(vehicles)
      .where(
        and(
          eq(vehicles.vehicleMapId, mapId),   
          eq(vehicles.vehicleImg, vehicleName)  
        )
      )
      .leftJoin(maps, eq(vehicles.vehicleMapId, maps.mapId))

      return itemInfo;
    },


    getItemInfo: async function (itemName, mapId)  {
      const itemInfo = await db.select({
        typeName: vanillaTypes.typeName,
        itemId: items.itemId,
        mapId: items.itemMapId,
        itemName: items.itemName,
        itemImg: items.itemImg,
        itemInfo: items.itemInfo,
        blueprints: items.itemBlueprints,
        sizeX: items.itemSizeX,
        sizeY: items.itemSizeY,
        sizeZ: items.itemSizeZ,
        itemDescription: items.itemDescription,
        blueprintsAmount: items.itemBlueprintsAmount,
        itemRarity: itemsRarity.rarityName,
        rarityColor: itemsRarity.rarityColor,
      })
      .from(items)
      .where(
        and(
          eq(items.itemMapId, mapId),   
          eq(items.itemImg, itemName)  
        )
      )
      .innerJoin(vanillaTypes, eq(items.itemTypeId, vanillaTypes.typeId))
      .innerJoin(itemsRarity, eq(items.itemRarity, itemsRarity.rarityId));
      
      return itemInfo;
    },



    getItemById: async function (mapId, itemId)  {
      const gottenItem = await db.select({
        itemId: items.itemId,
        itemMap: maps.mapName,  
        itemName: items.itemName,
        itemImg: items.itemImg,
        itemType: vanillaTypes.typeName,
      })
      .from(items)
      .where(
        and(
          eq(items.itemMapId, mapId),   
          eq(items.itemId, itemId)  
        )
      )
      .innerJoin(vanillaTypes, eq(items.itemTypeId, vanillaTypes.typeId))
      .innerJoin(maps, eq(items.itemMapId, maps.mapId))

      return gottenItem;
    },





}

export default unturnedPackage