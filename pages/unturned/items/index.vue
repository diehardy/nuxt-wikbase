
<script setup>
  const config = useRuntimeConfig()

const route = useRoute()

const linkBody = [
  {selfValue: 'items'},
  {itemValue: 'itemMap', replace: true},
  {itemValue: 'itemImg', replace: true, withoutSlash: true}, 
]
// headers for table
const headerNames = ['Item ID', 'Name', 'Image', 'Type', 'Map', ''] 
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
  { type: 'id-list-el-text', value: 'itemType'},
  { type: 'id-list-el-text', value: 'itemMap'},
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



// filters
let selectedMap = ref()
let selectedCategory = ref(null)
let searchMessage = ref('')
let currentPage = ref(0)
const filters = computed (()=> ({
  maps: selectedMap.value,
  category: selectedCategory.value,
  searchTag: searchMessage.value.toLocaleLowerCase(),
  currentPage: currentPage.value
}))

// loading more items
let refreshObserver = ref(false)




// $fetch: Manual, used when you need to trigger requests yourself.
// useFetch: Automatic, tied to reactivity and the component lifecycle (great for most reactive data fetching).
// asyncData: Pre-fetches data for pages during SSR or initial load, ensuring the page is rendered with the necessary data.

// getting and setting data
let {data: maps} = await useAsyncData('maps', () => $fetch('/api/unturned/get-maps') )
let {data: types} = await useAsyncData('types', () => $fetch('/api/unturned/get-types') )

selectedCategory.value = types.value[0]
selectedMap.value = maps.value[0].id

let {data: idList} = await useFetch('/api/unturned/get-items', {method: 'POST', body: filters.value})

function resetItems() {
  currentPage.value = 0
  idList.value = []
  getAdditionalItems()
  refreshObserver.value = !refreshObserver.value
}

// invoking filters events
watch(selectedMap, resetItems)
watch(selectedCategory, resetItems)
watch(searchMessage, resetItems)



async function getAdditionalItems(firstLoad = false) {
   if(firstLoad) {currentPage.value++}
   const newItems = await $fetch('/api/unturned/get-items', {
     method: 'POST',
     body: filters.value
   })
  idList.value.push(...newItems)
}

</script>

<template>
  <div>
    <Head>
      <Title>Complete Unturned Items ID List | Wikbase </Title>
      <Meta name="description" :content="`Full Unturned Items ID List, including all official and curated maps and divided into 16 categories. Choose a map and category, then click on an item to open its detailed page.`" />
      <Meta property="og:description" content="Full Unturned Items ID List, including all official and curated maps and divided into 16 categories. Choose a map and category, then click on an item to open its detailed page." />
      <Meta property="og:title" content="Complete Unturned Items ID List | Wikbase" />
      <Meta property="og:image" :content="`${config.public.storageLink}unturned/items/vanilla/256/work-jeans-2.png`" />
    </Head>
    <el-main-title :title-level="1" class="mb-10">Complete Unturned items id list</el-main-title>
    <div class="flex w-full flex-col lg:flex-row items-center mx-auto justify-center">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text mx-auto">Pick the map</span>
        </div>
        <select class="select select-bordered overflow-y-scroll max-h-3"  v-model="selectedMap">
          <option :value="0" :name="'All maps'">All maps</option>
          <option 
            v-for="(map, index) in maps" 
            :key="index" 
            :name="map.mapName"
            :value="map.mapId"
          >{{ map.mapName }}
          </option>
        </select>
      </label>

      <div class="divider lg:divider-horizontal" />
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text mx-auto">Pick the category</span>
        </div>
        <select class="select select-bordered" v-model="selectedCategory">
          <option 
          v-for="(type, index) in types" :key="index" 
          :name="type.typeName"
          :value="type"
          >{{ type.typeName }}
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
      <el-items-list 
        :items="idList" 
        @loadAdditinalItems="getAdditionalItems" 
        :refreshObserver="refreshObserver"
        :headers="headerNames"
        :idListStructure="idListStructure"
        />
  </div>
</template>