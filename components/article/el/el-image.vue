<template>
  <img 
    class="mt-5"
    :src="contentData.data" :alt="contentData.alt" >
</template>

<script setup>
  const props = defineProps({contentData: Object})
</script>
