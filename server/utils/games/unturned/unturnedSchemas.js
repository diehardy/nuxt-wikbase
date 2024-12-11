import { varchar, integer, pgSchema, jsonb, real  } from 'drizzle-orm/pg-core';

  const unturnedSchema = pgSchema('unturned') 

  export const maps =  unturnedSchema.table('maps', {
    id: integer('id').primaryKey(),
    mapId: integer('map_id'),
    mapName: varchar('map_name'),
    mapOrder: integer('map_order'),
  })


  export const types =  unturnedSchema.table('types', {
    id: integer('id').primaryKey(),
    typeId: integer('type_id'),
    typeName: varchar('type_name'),
    typeOrder: integer('type_order'),
    typeIncludes: varchar('includes')
  })

  export const vanillaTypes =  unturnedSchema.table('vanilla_types', {
    id: integer('id').primaryKey(),
    typeId: integer('type_id'),
    typeName: varchar('type_name')
  })

  export const vehicleTypes =  unturnedSchema.table('vehicle_types', {
    id: integer('id').primaryKey(),
    typeId: integer('type_id'),
    typeName: varchar('type_name')
  })

  export const itemsRarity =  unturnedSchema.table('items_rarity', {
    id: integer('id').primaryKey(),
    rarityId: integer('rarity_id'),
    rarityName: varchar('rarity_name'),
    rarityColor: varchar('rarity_color')
  })
  export const items =  unturnedSchema.table('items', {
    id: integer('id').primaryKey(),
    itemId: integer('item_id'),
    itemName: varchar('item_name'),
    itemImg: varchar('item_img'),
    itemMapId: integer('map_id'),
    itemTypeId: integer('type_id'),
    itemInfo: varchar('item_info'),
    itemBlueprints: jsonb('blueprints'),
    itemSizeX: integer('size_x'),
    itemSizeY: integer('size_y'),
    itemDescription: varchar('item_description'),
    itemSizeZ: integer('size_z'),
    itemBlueprintsAmount: integer('blueprints_amount'),
    itemRarity: integer('item_rarity')
  })



  export const vehicles =  unturnedSchema.table('vehicles', {
    id: integer('id').primaryKey(),
    vehicleId: integer('vehicle_id'),
    vehicleName: varchar('vehicle_name'),
    vehicleIds: varchar('vehicle_ids'),
    vehicleImg: varchar('vehicle_img'),
    vehicleSeats: integer('vehicle_seats'),
    vehicleMapId: integer('map_id'),
    vehicleTypeId: integer('vehicle_type'),
    vehicleInfo: jsonb('vehicle_info'),
    vehicleRarity: integer('vehicle_rarity'),
    vehicleSpeedMax: real('vehicle_speed_max'),
    vehicleSpeedMin: real('vehicle_speed_min'),
    vehicleFuelMax: integer('vehicle_fuel_max'),
    vehicleFuelMin: integer('vehicle_fuel_min'),
    vehicleFuel: integer('vehicle_fuel'),
    vehicleHealth: integer('vehicle_health'),
    vehicleHealthMax: integer('vehicle_health_max'),
    vehicleHealthMin: integer('vehicle_health_min'),
    vehicleSteerMax: integer('vehicle_steer_max'),
    vehicleSteerMin: integer('vehicle_steer_min'),
    vehicleTrunkStorageX: integer('vehicle_trunk_storage_x'),
    vehicleTrunkStorageY: integer('vehicle_trunk_storage_y')
  })




