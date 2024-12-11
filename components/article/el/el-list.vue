<template>
  <component :is="listType" class="pl-5 mt-2" :class="listClasses">
    <li v-for="(child, index) in contentData.children" :key="index" :class="listStyles">
      
      <span v-if="!child.href">{{ child.data }}</span>
      <a v-else :href="child.href" :target="child.target"  class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"><span>{{ child.data }}</span></a>
    </li>
  </component>
</template>

<script setup>

  const props = defineProps({contentData: Object})
  const  listStyles = 'font-normal leading-relaxed lg:text-lg text-base mt-2'
  let listType = computed(()=> {
    return props.contentData.type == 'ul' ? 'ul' : 'ol' 
  })


  let listClasses = computed(()=> {
    return props.contentData.type == 'ul' ? 'list-disc' : 'list-decimal' 
  })

</script>