<template>
  <div class="mockup-code mt-2 min-w-full">
    <div class="absolute top-3 left-6">{{contentData.data}}</div>
    <pre v-for="(line, index) in contentData.children" :key="index" :class="line.classes ? line.classes : null" 
    :data-prefix="line.dataPrefix ? line.dataPrefix : null"><code>{{ line.data }}</code></pre>
  </div>
</template>

<script setup>

  const props = defineProps({contentData: Object})

</script>

<style scoped>
.mockup-code {
   @apply pt-14;
   width: 40%;
}
.mockup-code:before {
  @apply absolute right-24 top-5;
}




.text-info {
  color: #01b0f7;
}

.text-warning
{
 color: #ffbe00;
}


</style>