<template>
  <div v-if="vehicles && vehicles?.length > 0">
    <Head>
      <Title>{{ vehicles[chosenVehicleIndex].name }} Unturned Vehicle ID & Details | Wikbase </Title>
      <Meta name="description" :content="`Detailed information about the ${vehicles[chosenVehicleIndex].name} vehicle in Unturned, including its ID, image and specific attributes.`" />
      <Meta property="og:description" :content="`Detailed information about the ${vehicles[chosenVehicleIndex].name} vehicle in Unturned, including its ID, image and specific attributes.`" />

      <Meta property="og:title" :content="`${vehicles[chosenVehicleIndex].name} Unturned Vehicle ID & Details | Wikbase`" />

      <Meta property="og:image" :content="`${config.public.storageLink}unturned/vehicles/${route.params.map}/400/${vehicles[chosenVehicleIndex].img}-${vehicles[chosenVehicleIndex].id}.png`" />

    </Head>
    <div class="lg:hero" >
      <div class="w-full p-5">
          <div class="card lg:card-side bg-base-100 shadow-xl">
            <figure>
              <img
                :src="`${config.public.storageLink}unturned/vehicles/${route.params.map}/400/${vehicles[chosenVehicleIndex].img}-${vehicles[chosenVehicleIndex].id}.png`"
                :alt="`${vehicles[chosenVehicleIndex].name} unturned id`"
                />
            </figure>
            <div class="card-body">
              <h1 class="card-title">{{vehicles[chosenVehicleIndex].name}} vehicle ID</h1>
              <div>
                <p class="mr-5 inline">To copy the vehicle Unturned ID for {{vehicles[chosenVehicleIndex].name}} to your clipboard, just hit the button displaying on the right.</p>
                <id-list-el-kbd :item="vehicles[chosenVehicleIndex]" :itemAttributes="itemAttributes" />
              </div>
              <div>
                <p class="mr-5 inline">You can use the following command to give this vehicle:</p>
                <id-list-el-kbd 
                :item="{id:'/vehicle ' + vehicles[chosenVehicleIndex].id}" :itemAttributes="itemAttributes" />
              </div>
              <div v-if="vehicles?.length > 1">
                <p>This item has several id variations, you can choose one of them: </p>
                <div class="join join-vertical lg:join-horizontal mt-2">
                  <button class="btn join-item" v-for="(vehicle, index) in vehicles" :key="index" @click="changeVehicleId(index)">ID: {{vehicle.id}}</button>
                </div>
              </div>
              <div v-if="vehicles[chosenVehicleIndex].ids">
                Each of the following id gives the same transport with a random color. You can use any id:
                <div 
                class="flex gap-2 flex-wrap flex-row"
                >
                  <id-list-el-kbd 
                  v-for="(id, index) in vehicles[chosenVehicleIndex].ids.split(',')" 
                  :key="index"
                  :item="{id: id}" :itemAttributes="itemAttributes" />
                </div>
              </div>

              <div class="mt-2" v-if="vehicles?.length <= 1 || !vehicles[chosenVehicleIndex].ids">
                <NuxtLink to="/unturned/vehicles"><button class="btn btn-success uppercase text-white">Explore Full Vehicles ID List</button></NuxtLink>
              </div>

            </div>

      
          </div>


          <div class="flex flex-row lg:flex-row gap-3 mt-5 flex-wrap">

            <div class="card bg-base-100 w-full lg:w-3/12  shadow-xl mt-2">
              <div class="card-body">
                <h2 class="card-title">
                  Details of 
                  {{vehicles[chosenVehicleIndex].name}}
                </h2>
                <table class="table mt-2 table-sm">
                  <tbody>
                    <tr 
                    v-for="(detail, index) in vehicles[chosenVehicleIndex].vehicleInfo"  :key="index">
                      <th>{{ detail.name }}</th>
                      <td class="flex items-center">
                        <span>
                          {{ detail.value }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
              </table>

              <div class="mt-2" v-if="vehicles?.length > 1 && vehicles[chosenVehicleIndex].ids">
                <NuxtLink to="/unturned/vehicles">
                  <button class="btn btn-success uppercase text-white">
                    Explore Full Vehicles ID List
                  </button>
                </NuxtLink>
              </div>
            </div>
            </div>


            <div class="card bg-base-100 w-full lg:w-8/12 shadow-xl mt-2" v-if="vehicles[chosenVehicleIndex].turrets.length > 0">
              <div class="card-body">
                <h2 class="card-title">
                  Default turrets of
                  {{vehicles[chosenVehicleIndex].name}}
                </h2>

                <el-items-list
                  :resetMargin="true"
                  :items="vehicles[chosenVehicleIndex].turrets" 
                  :headers="headerNames"
                  :idListStructure="idListStructure" 
                />

                <div class="mt-5">
                  <NuxtLink to="/unturned/items"><button class="btn btn-success uppercase text-white">Explore full Items ID List</button></NuxtLink>
                </div>

              </div>
            </div>
          </div>





      </div>
    </div>
  </div>
  <div v-else>
    <div class="w-full lg:w-8/12 h-full">
      <div class="card bg-base-100 shadow-xl lg:mt-0 w-full mt-5">
        <div class="card-body">
          <h1 class="font-bold card-title">Requested vehicle not found</h1>
          <p>This may be due to an error in our database or a typo in the requested URL.</p>
          <NuxtLink to="/unturned/vehicles"><button class="btn btn-success uppercase text-white">Go back to Vehicles ID list</button></NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  definePageMeta({
    layout: 'item-page'
  })
  const route = useRoute()
  import { useGlobalStore } from '~/stores/globalStore';
  const  globalStore = useGlobalStore()
  const config = useRuntimeConfig()
  const headerNames = ['Item ID', 'Name', 'Image'] 
  const linkBody = [
    {selfValue: '',},
    {selfValue: 'unturned'},
    {selfValue: 'items'},
    {itemValue: 'itemMap', replace: true},
    {itemValue: 'itemImg', replace: true, withoutSlash: true}, 
  ]
  const idListStructure = [
    { type: 'id-list-el-kbd', value: 'itemId'},
    { type: 'id-list-el-text', value: 'itemName', 
      linkValue: linkBody
    },
    { type: 'id-list-el-image', value: 'itemImg', linkValue: linkBody, 
      imageParams: [
        {selfValue: 'unturned'},
        {selfValue: 'items'}, 
        {itemValue: 'itemMap', replace: true}, 
        {selfValue: '32'}, 
        {itemValue: 'itemImg', replace: true, withoutSlash: true}, 
        {selfValue: '-', withoutSlash: true}, 
        {itemValue: 'itemId', withoutSlash: true}, 
      ],
      altParams: [{itemValue: 'itemName'}, {selfValue: 'unturned id'}],
    },
    { type: 'id-list-el-image', value: 'itemImg', 
      linkValue: linkBody,
      classes: 'block w-6 h-6 md:w-10 md:h-10',
      imageParams: [
        {selfValue: 'icons'},
        {selfValue: 'explore', replace: true, checkDarkMode: true, withoutSlash: true}, 
      ],
      altParams: [{selfValue: 'explore'}, {itemValue: 'itemName'}],
    },
  ]
  const itemAttributes = {value: 'id'}

  const {data: vehicles} = await useAsyncData('itemInfo', () => $fetch('/api/unturned/get-vehicle', {method: 'GET', query: {mapName: route.params.map, itemName: route.params.vehicleName}}) )

  let chosenVehicleIndex = ref(0)


  watchEffect(() => {
  if (vehicles.value && vehicles.value.length > 0) {
    globalStore.breadcrumbName =  vehicles.value[chosenVehicleIndex.value]['name']
  } else {globalStore.breadcrumbName = 'Not found'}
});



  function changeVehicleId(index) {
    chosenVehicleIndex.value = index
  }

</script>
  
<style scoped>
.stroke {
  text-shadow: 0 0 5px black;
}

</style>