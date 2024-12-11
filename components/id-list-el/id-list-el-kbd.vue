<script setup>
  const props = defineProps({item: Object, itemAttributes: Object})

  const isClicked = ref(false);

  async function copyToClipboard (item) {
    isClicked.value = true;

    await navigator.clipboard.writeText(item[props.itemAttributes.value]);
    setTimeout(()=> {
      isClicked.value = false
    }, 2000)    
  }
</script>


<template>
  <div  
    v-if="item[itemAttributes.value]"
    class="tooltip" 
    :data-tip="isClicked ? 'ID copied!' : null" 
    :class="{'tooltip-open': isClicked}">
    <kbd class="kbd btn" @click="copyToClipboard(item)">{{ isClicked ? 'Copied!' : item[itemAttributes.value] }}</kbd>
  </div>
</template>