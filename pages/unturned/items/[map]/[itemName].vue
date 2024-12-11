<template>
<div v-if="items && items?.length > 0">
  <Head>
    <Title>{{ items[chosenItemIndex].name }} Unturned Item ID & Details | Wikbase </Title>
    <Meta name="description" :content="`Detailed information about the ${items[chosenItemIndex].name} item in Unturned, including its ID, blueprints, and specific attributes.`" />
    <Meta property="og:description" :content="`Detailed information about the ${items[chosenItemIndex].name} item in Unturned, including its ID, blueprints, and specific attributes.`" />
    <Meta property="og:title" :content="`${items[chosenItemIndex].name} Unturned Item ID & Details | Wikbase`" />
    <Meta property="og:image" :content="`${config.public.storageLink}unturned/items/${route.params.map}/256/${items[chosenItemIndex].imgUrl}-${items[chosenItemIndex].id}.png`" />
  </Head>
  <div class="lg:hero" >
    <div class="w-full p-5">
      
      <div class="flex flex-wrap justify-between flex-col-reverse lg:flex-row">

        <div class="w-full lg:w-8/12 h-full">
          <div class="card bg-base-100 shadow-xl lg:mt-0 w-full mt-5">
            <div class="card-body">
              <h1 class="font-bold card-title">{{items[chosenItemIndex].name}} Item ID</h1>
              <div>
                <p class="mr-5 inline">To copy the Unturned ID for {{items[chosenItemIndex].name}} to your clipboard, just hit the button displaying <b>{{ items[chosenItemIndex].itemId }}</b> on the right.</p>
                <id-list-el-kbd :item="items[chosenItemIndex]" :itemAttributes="itemAttributes" />

                <div v-show="items?.length > 1">
                  <p>This item has several id variations, you can switch between them: </p>
                  <div class="join join-vertical lg:join-horizontal">
                    <button class="btn join-item" v-for="(item, index) in items" :key="index" @click="changeItemId(index)">ID: {{item.id}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl mt-5 z-0" v-show="items[chosenItemIndex].gunDamage.playerDamage.total">
            <div class="card-body">
              <h2 class="font-bold card-title">Damage of {{ items[chosenItemIndex].name}}</h2>
                <div class="overflow-x-auto">
                  <table class="table text-center" v-show="items[chosenItemIndex].gunDamage.playerDamage.head != 'NaN'">
                    <thead>
                      <tr class="bg-base-200">
                        <th></th>
                        <th>Players</th>
                        <th>Zombies</th>
                        <th>Animals</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Head</th>
                        <td>{{ items[chosenItemIndex].gunDamage.playerDamage.head}}</td>
                        <td>{{ items[chosenItemIndex].gunDamage.zombieDamage.head}}</td>
                        <td>{{ items[chosenItemIndex].gunDamage.animalDamage.head}}</td>
                      </tr>
                      <tr>
                        <th>Body</th>
                        <td>{{ items[chosenItemIndex].gunDamage.playerDamage.body}}</td>
                        <td>{{ items[chosenItemIndex].gunDamage.zombieDamage.body}}</td>
                        <td>{{ items[chosenItemIndex].gunDamage.animalDamage.body}}</td>
                      </tr>
                      <tr>
                        <th>Limbs</th>
                        <td>{{ items[chosenItemIndex].gunDamage.playerDamage.limbs}}</td>
                        <td>{{ items[chosenItemIndex].gunDamage.zombieDamage.limbs}}</td>
                        <td>{{ items[chosenItemIndex].gunDamage.animalDamage.limbs}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 class="font-bold text-base">Environment Damage</h3>

                <div class="overflow-x-auto">
                  <table class="table text-center" >
                    <thead>
                      <tr class="bg-base-200">
                        <th>Vehicles</th>
                        <th>Objects</th>
                        <th>Structures</th>
                        <th>Barricades</th>
                        <th>Resources</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ items[chosenItemIndex].gunDamage.vehicle}}</td>
                        <td>{{ items[chosenItemIndex].gunDamage.object}}</td>
                        <td>{{ items[chosenItemIndex].gunDamage.structure}}</td>
                        <td>{{ items[chosenItemIndex].gunDamage.barricade}}</td>
                        <td>{{ items[chosenItemIndex].gunDamage.resource}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <el-alert-message class="mt-2" v-show="items[chosenItemIndex].type != 'Melee'"
                :type="items[chosenItemIndex].gunDamage.invulnerable ? 'alert-success' : 'alert-error'" >
                  {{items[chosenItemIndex].gunDamage.invulnerable ? 'Can raid structures and houses.' : 'Cannot raid structures and houses.'}}
                </el-alert-message>
            </div>
          </div>



          <div class="card bg-base-100 shadow-xl mt-5 w-full" v-show="items[chosenItemIndex].gunDamage.playerDamage.total && items[chosenItemIndex].type != 'Melee' && items[chosenItemIndex].type != 'Throwable'">
            <div class="card-body" >
              <h2 class="font-bold card-title">Attachments {{ items[chosenItemIndex].name}}</h2>
                <div class="overflow-x-auto">
                  <div class="flex gap-3 justify-start flex-wrap">
                    <el-badge
                    v-for="(hook, index) in ['tactical', 'barrel', 'grip', 'sight']" :key="index" 
                    :color="items[chosenItemIndex].attachments.hooks[hook] ? 'success' : 'error'" >
                      {{items[chosenItemIndex].attachments.hooks[hook] ? `Can have ${hook}`: `Cannot have ${hook}` }}
                    </el-badge>
                  </div>
                  <h4 class="font-bold text-base my-2">Fire modes</h4>
                  <div class="flex gap-3 justify-start flex-wrap">
                    <el-badge
                    v-for="(mood, index) in ['Safety', 'Semi', 'Bursts', 'Auto']" :key="index" 
                    :color="items[chosenItemIndex].attachments.modes[mood.toLowerCase()] ? 'success' : 'error'" >
                      {{mood}} {{ mood == 'Bursts' && items[chosenItemIndex].attachments.modes[mood.toLowerCase()] ?  `${items[chosenItemIndex].attachments.modes[mood.toLowerCase()]} rounds per shoot` : ''}}
                    </el-badge>
                  </div>
                </div>
                {{  }}
                <div v-if="items[chosenItemIndex].attachments.defaultAttachments.Sight || 
                items[chosenItemIndex].attachments.defaultAttachments.Magazine ||
                items[chosenItemIndex].attachments.defaultAttachments.Muzzle">
                  <h4 class="font-bold text-lg mt-2">Default attachments</h4>
                  <el-items-list 
                    :resetMargin="true"
                    :items="items[chosenItemIndex].attachments.defaultAttachments" 
                    :headers="headerNames"
                    :idListStructure="idListStructure" 
                  />
                </div>

                
            </div>
          </div>



          <div class="card bg-base-100 shadow-xl mt-5 lg:w-full" v-show="items[chosenItemIndex].blueprintsAmount > 0 && items[chosenItemIndex].blueprints.length > 0">
            <div class="card-body">
              <h2 class="font-bold card-title">Blueprints {{ items[chosenItemIndex].name}}</h2>
              <p>
                {{ items[chosenItemIndex].blueprintsAmount }} 
                {{ items[chosenItemIndex].blueprintsAmount !== 1 ? 'blueprints are ' : 'blueprint is ' }}
                available for {{ items[chosenItemIndex].name }}.
              </p>

              <div v-for="(blueprint,index) in items[chosenItemIndex].blueprints" :key="index">

                  <p class="font-bold text-xl mt-2 mb-5">Blueprint {{ index + 1 }} output:</p> 
                  <el-items-list 
                    class="shadow-sm"
                    :resetMargin="true"
                    :items="blueprintResult(blueprint)" 
                    :headers="headerBlueprintResult"
                    :idListStructure="idListBlueprintResult" 
                  />

                <p class="mt-5 mb-5"><span class="font-bold text-lg">Supplies</span>: {{  blueprintSupplies(blueprint.blueprintSupplies)?.length == 0 ? 'None' :  ''}}</p>
                <el-items-list class="shadow-sm my-2"
                  :resetMargin="true"
                  v-if="blueprintSupplies(blueprint.blueprintSupplies)?.length > 0"
                  :items="blueprintSupplies(blueprint.blueprintSupplies, blueprint.blueprintTool)" 
                  :headers="headerBlueprintResult"
                  :idListStructure="idListBlueprintResult" 
                />
                <p class="mt-5"><span class="font-bold text-lg mt-5">Required Skill:</span> {{ blueprint.blueprintSkill ?  blueprint.blueprintSkill : 'None' }} {{ getLevelSkill(blueprint.blueprintSkillLevel) }}</p>
                <p class="mt-2"><span class="font-bold text-lg mt-5">Craft Category</span>: {{blueprint.type ? blueprint.type : "None"}}</p>
                <div class="divider divider-info" v-if="index != items[chosenItemIndex].blueprints.length -1"/>
              </div>



            </div>
          </div>

        </div>
        

        

        

        <div class="card bg-base-100 w-full lg:w-3/12 shadow-xl  h-full">
          <div>
            <figure class="px-10 pt-10">
            <img
              :src="`${config.public.storageLink}unturned/items/${route.params.map}/256/${items[chosenItemIndex].imgUrl}-${items[chosenItemIndex].id}.png`"
              :alt="`${items[chosenItemIndex].name} unturned id`"
              class="rounded-xl" />
          </figure>
          <div class="card-body">
            <h2 class="text-xl text-center">{{items[chosenItemIndex].name}} details</h2>
            <span>{{ items[chosenItemIndex].description }}</span>

            <div>
            <p class="mr-5 inline">You can use the following command to give this item:</p>
            <id-list-el-kbd 
            :item="{id:'/give ' + items[chosenItemIndex].id}" :itemAttributes="itemAttributes" />
          </div>
            
            <table class="table mt-2 table-sm">
              <tbody>
                <tr v-for="(detail, index) in items[chosenItemIndex].generalInfo" :key="index">
                  <th>{{ detail.name }}</th>
                  <td class="flex items-center">
                    <span>
                      {{ detail.value }}
                    </span>
                    <div v-show="detail.explanation"
                    class="ml-2 tooltip h-6 w-6" :data-tip="detail.explanation">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" /></svg>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          


          <div class="px-5 pb-5 mx-auto">
            <NuxtLink to="/unturned/items"><button class="btn btn-success uppercase text-white">Explore full ID List</button></NuxtLink>
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
        <h1 class="font-bold card-title">Requested item not found</h1>
        <p>This may be due to an error in our database or a typo in the requested URL.</p>
        <NuxtLink to="/unturned/items"><button class="btn btn-success uppercase text-white">Go back to Items ID list</button></NuxtLink>
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
const headerBlueprintResult = ['Item ID', 'Name', 'Image',  'Amount'] 

const getLevelSkill = computed(() => {
  return (skillLevel) => {
    if(skillLevel == 1) { return 'I'}
    else if (skillLevel == 2) {return 'II'}
    else if (skillLevel == 3) {return 'III'}
    else {return ''}
  }
})



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

]

const idListBlueprintResult = [
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
  // { type: 'id-list-el-text', value: 'itemType'},
  { type: 'id-list-el-text', value: 'amount'},

]



const itemAttributes = {value: 'id'}
const {data: items} = await useAsyncData('itemInfo', () => $fetch('/api/unturned/get-item', {method: 'GET',query: {mapName: route.params.map, itemName: route.params.itemName}}) )

let chosenItemIndex = ref(0)



let blueprintResult = computed(() => {
  return blueprint =>  {
    return [{
        amount: blueprint.product.amount ? blueprint.product.amount : 1,
        itemId: blueprint.product.itemInfo?.itemId ? blueprint.product.itemInfo?.itemId : items.value[chosenItemIndex.value].id,
        itemMap: blueprint.product.itemInfo?.itemMap ? blueprint.product.itemInfo?.itemMap : route.params.map,
        itemName: blueprint.product.itemInfo?.itemName ? blueprint.product.itemInfo?.itemName : items.value[chosenItemIndex.value].name,
        itemType: blueprint.product.itemInfo?.itemType ? blueprint.product.itemInfo?.itemType : items.value[chosenItemIndex.value].type,
        itemImg: blueprint.product.itemInfo?.itemImg ? blueprint.product.itemInfo?.itemImg : items.value[chosenItemIndex.value].imgUrl
      }]
  }
})

let blueprintSupplies = computed(() => {
  return (supply, tool) =>  {
    let supplies = []
      for (const [key, value] of Object.entries(supply)) {
        supplies.push({
          amount: value.amount ? value.amount : 1,
          itemId: value.itemInfo.itemId,
          itemImg:value.itemInfo.itemImg,
          itemMap: value.itemInfo.itemMap,
          itemName: value.itemInfo.itemName,
          itemType: value.itemInfo.itemType          
        })
      }


      if(tool) {
        supplies.push({
          ...tool,
          amount: 1      
        })
      }
    return supplies
  }
})


watchEffect(() => {
  if (items.value && items.value.length > 0) {
    globalStore.breadcrumbName =  items.value[0]['name'];
  } else {globalStore.breadcrumbName = 'Not found'}
});

function changeItemId(index) {
  chosenItemIndex.value = index
}


</script>

<style scoped>
.stroke {
  text-shadow: 0 0 5px black;
}

</style>