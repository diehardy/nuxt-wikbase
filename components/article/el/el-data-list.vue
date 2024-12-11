<template>
<!-- <pre>
  {{ contentData }}
</pre> -->
<el-items-list 
  :items="contentData.dataListRows" 
  :headers="contentData.data.split(',')"
  :idListStructure="contentData.idListStructure"
  :reset-margin="true"
/>
<!-- <component :is="listType" class="pl-5 mt-2" :class="listClasses">
  </component> -->
</template>

<script setup>

  const props = defineProps({contentData: Object})
 


</script>