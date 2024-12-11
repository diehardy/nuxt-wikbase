<script setup>
  import { useGlobalStore } from '~/stores/globalStore';
  const  globalStore = useGlobalStore()
  const props = defineProps({items: Array, refreshObserver: Boolean, headers: Array, idListStructure: Array, resetMargin: Boolean})


  const lastItem = ref(null)
  


  const emit = defineEmits(['loadAdditinalItems'])
  let itemsObserver = null



  function initObserver() {
    itemsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            itemsObserver.unobserve(lastItem.value)
            emit('loadAdditinalItems', true)
          }
        });
      },
      {
        rootMargin: '600px',
        threshold: 0.5,
      }
    );

    if (lastItem.value) {
      itemsObserver.observe(lastItem.value);
    }
  }


  onMounted(() => {
    initObserver()
});



watch(props.items, ()=> {
    if (lastItem.value) {
      itemsObserver.observe(lastItem.value);
    }
  })

  watch(() => props.refreshObserver, (newVal, oldVal) => {
    initObserver()
  }); 
  
  import IdListElKbd from '../id-list-el/id-list-el-kbd.vue';
  import IdListElText from '../id-list-el/id-list-el-text.vue';
  import IdListElImage from '../id-list-el/id-list-el-image.vue';
  
  const componentsMap = {
    'id-list-el-kbd': IdListElKbd,
    'id-list-el-text': IdListElText,
    'id-list-el-image': IdListElImage,
  };

</script>
<template>


  <div class="mx-auto lg:w-3/6 mt-5" :class="{'margin-reset' : resetMargin}">

    <div class="relative overflow-x-auto lg:overflow-x-hidden overflow-y-hidden">
    <table class="text-sm text-center mx-auto" :class="{'margin-reset' : resetMargin}">
        <thead class="text-xs uppercase">
            <tr>
                <th scope="col" class="lg:px-6 lg:py-3" v-for="(headerName, index) in headers" :key="index">
                  {{headerName}}
                </th>
            </tr>
        </thead>
        <tbody >
            <tr class=" border-gray-600" :class="{'border-b': items.length -1 != index}" 
            v-for="(item, index) in items"  
            :key="index">
                <td
                v-for="(itemAttributes,indexStruct) in idListStructure" :key="indexStruct"
                scope="row" class=" font-medium whitespace-nowrap lg:py-2">
                  <component :is="componentsMap[itemAttributes.type]" :item="item" :itemAttributes="itemAttributes" />
                </td>
            </tr>

        </tbody>
    </table>
    </div>
    <div ref="lastItem" class="lastItem" />
  </div>



</template>

<style  scoped>
.margin-reset {
  margin: 0px;
  width: 100%;
}
</style>