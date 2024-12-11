
<script setup>

const route = useRoute()
const headerNames = ['Vehicle ID', 'Name', 'Image Type', 'Type', 'Map' , '']

const linkBody = [
  {selfValue: 'vehicles'},
  {itemValue: 'vehicleMap', replace: true},
  {itemValue: 'vehicleImg', replace: true, withoutSlash: true}, 
]

const idListStructure = [
  { type: 'id-list-el-kbd', value: 'vehicleId'},
  { type: 'id-list-el-text', value: 'vehicleName', 
    linkValue: linkBody
  },
  { type: 'id-list-el-image', value: 'vehicleImg', 
    linkValue: linkBody, 
    imageParams: [
      {selfValue: 'unturned'},
      {selfValue: 'icons'}, 
      {itemValue: 'vehicleType', replace: true, checkDarkMode: true, withoutSlash: true}, 
    ],
    altParams: [{itemValue: 'vehicleName'}, {selfValue: 'unturned id'}],
  },
  { type: 'id-list-el-text', value: 'vehicleType'},
  { type: 'id-list-el-text', value: 'vehicleMap'},
  { type: 'id-list-el-image', value: 'vehicleImg', 
    linkValue: linkBody,
    classes: 'block w-6 h-6 md:w-10 md:h-10',
    imageParams: [
      {selfValue: 'icons'},
      {selfValue: 'explore', replace: true, checkDarkMode: true, withoutSlash: true}, 
    ],
    altParams: [{selfValue: 'explore'}, {itemValue: 'vehicleName'}],
  },
]
let selectedMap = ref()
let selectedType = ref(null)
let searchMessage = ref('')

let currentPage = ref(0)

let refreshObserver = ref(false)


const filters = computed (()=> ({
  maps: selectedMap.value,
  type: selectedType.value,
  searchTag: searchMessage.value.toLocaleLowerCase(),
  currentPage: currentPage.value
}))

let {data: maps} = await useAsyncData('maps', () => $fetch('/api/unturned/get-maps') )
let vehicleTypes = [{name: 'All types', id: 0}, {name: 'Land vehicles', id: 1}, {name: 'Air vehicles', id: 2}, {name: 'Sea vehicles', id:3}]
selectedType.value = 0
selectedMap.value = maps.value[0].id


let {data: vehicleList} = await useFetch('/api/unturned/get-vehicles', {method: 'POST', body: filters.value})

function resetVehicles(isMessageTyped = false) {
  currentPage.value = 0
  vehicleList.value = []
  getAdditionalVehicles()
  refreshObserver.value = !refreshObserver.value
}
watch(selectedMap, resetVehicles)
watch(selectedType, resetVehicles)
watch(searchMessage, resetVehicles)


async function getAdditionalVehicles(firstLoad = false) {
   if(firstLoad) {currentPage.value++}
   const newVehicles = await $fetch('/api/unturned/get-vehicles', {
     method: 'POST',
     body: filters.value
   })


  vehicleList.value.push(...newVehicles)
}

</script>

<template>
  <div>
    <Head>
      <Title>Unturned Vehicles ID List | Wikbase </Title>
      <Meta name="description" :content="`Explore the complete Unturned Vehicles ID List featuring all official and curated maps. Discover various transports categorized into land, air, and sea vehicles.`" />
      <Meta property="og:description" content="Explore the complete Unturned Vehicles ID List featuring all official and curated maps. Discover various transports categorized into land, air, and sea vehicles." />
      <Meta property="og:title" content="Unturned Vehicles ID List | Wikbase" />
      <Meta property="og:image" content="https://media.wikbase.com/unturned/vehicles/vanilla/400/transport-heli-94.png" />
    </Head>
    <el-main-title :title-level="1" class="mb-10">Unturned vehicles id list</el-main-title>
    <div class="flex w-full flex-col lg:flex-row items-center mx-auto justify-center">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text mx-auto">Pick the map</span>
        </div>
        <select class="select select-bordered overflow-y-scroll max-h-3"  v-model="selectedMap">
          <option :value="0" :name="'All maps'">All maps</option>
          <option 
          v-for="(map, index) in maps" :key="index" 
          :name="map.mapName"
          :value="map.mapId"
          >{{ map.mapName }}
          </option>
        </select>
      </label>

      <div class="divider lg:divider-horizontal" />
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text mx-auto">Pick the type</span>
        </div>
        <select class="select select-bordered" v-model="selectedType">
          <option 
          v-for="(type, index) in vehicleTypes" :key="index" 
          :name="type.name"
          :value="type.id"
          >{{ type.name }}
          </option>
        </select>
      </label>
    </div>

    <label class="input input-bordered flex items-center gap-2  lg:w-2/6  mx-auto mt-5">
      <input type="text" class="grow" placeholder="Search" v-model="searchMessage"/>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="h-4 w-4 opacity-70">
        <path
          fill-rule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clip-rule="evenodd" />
      </svg>
    </label>
      <!-- <pre> {{ vehicleList }}</pre> -->
      <el-items-list 
      :items="vehicleList" 
      @loadAdditinalItems="getAdditionalVehicles" 
      :refreshObserver="refreshObserver" 
      :headers="headerNames"
      :idListStructure="idListStructure"

      />

  </div>
</template>