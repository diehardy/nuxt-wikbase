<template>
  <a v-if="contentData.id || contentData.href" :href="contentData.href" :id="contentData.id" class="jump-link cursor-none">
    <component :is="defineTitle" :class="[defineClass, titleDefaultClasses]">
      {{ contentData.data }}
    </component>
  </a>
  <div v-else>
    <component :is="defineTitle" :class="[defineClass, titleDefaultClasses]"> 
      {{ contentData.data }}
    </component>
  </div>
</template>

<script setup>


const props = defineProps({contentData: Object})
const titleDefaultClasses = 'font-extrabold leading-none tracking-tight dark:text-white mt-2'

const defineTitle = computed(()=> {
  switch (props.contentData.level) {
    case '1':
      return 'h1'
    case '2':
      return 'h2'
    case '3':
      return 'h3'
    case '4':
      return 'h4'
    case '5':
      return 'h5'
    case '6':
      return 'h6'
    default:
      return 'div'
  }
})



const defineClass = computed(()=> {
  switch (props.contentData.level) {
    case '1':
      return 'text-3xl md:text-4xl'
    case '2':
      return 'text-2xl md:text-3xl'
    case '3':
      return 'text-xl md:text-2xl'
    case '4':
    case '5':
    case '6':
    default:
      return 'text-lg md:text-xl'
  }
})


</script>