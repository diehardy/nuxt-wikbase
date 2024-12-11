<script setup>
  const props = defineProps({item: Object, itemAttributes: Object})
  const linkUrl = computed(()=> {
    let urlLink = []
    props.itemAttributes.linkValue.forEach(param => {
      let paramString = param.selfValue ? param.selfValue : props.item[param.itemValue]
      if(param.replace && paramString) paramString = paramString.toLowerCase().replaceAll(' ', '-')
      param.withoutSlash ? urlLink.push(paramString) : urlLink.push(paramString, '/')
    })
    return urlLink.join('')
  })

</script>

<template>
  <NuxtLink v-if="itemAttributes.linkValue" :to="linkUrl" class="restrict-text">
    <span class="restrict-text narrow-text">
      {{ item[itemAttributes.value] }}
    </span>
  </NuxtLink>
  <span v-else class="restrict-text narrow-text">{{ item[itemAttributes.value] }}</span>
</template>


<style scoped>
  .narrow-text{
    white-space: wrap;
  }
  @media (max-width: 768px) {
    .restrict-text {
      display: block; max-width: 150px; overflow: hidden; white-space: wrap; text-overflow: ellipsis;
    }
  }

</style>

