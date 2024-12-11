<template>
    <component 
    class="font-extrabold leading-none tracking-tight pt-5"
    :class="basedHeadingStyles"
    :is="'h'+titleLevel"><slot /></component>
</template>


<script setup>
const props = defineProps({
  titleLevel: Number
})



const basedHeadingStyles = computed(() => {
  if(props.titleLevel === 1) return 'text-3xl md:text-4xl'
  if(props.titleLevel === 2) return 'text-2xl md:text-3xl'
  if(props.titleLevel === 3) return 'text-xl md:text-2xl'
  if(props.titleLevel === 4 || props.titleLevel === 5) return 'text-lg md:text-xl'
})

</script>