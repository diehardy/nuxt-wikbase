<script setup>
  const props = defineProps({item: Object, itemAttributes: Object})
  const config = useRuntimeConfig()
  import { useGlobalStore } from '~/stores/globalStore';
  const  globalStore = useGlobalStore()


  const linkUrl = computed(()=> {
    let urlLink = []
    props.itemAttributes.linkValue.forEach(param => {
      let paramString = param.selfValue ? param.selfValue : props.item[param.itemValue]
      if(param.replace && paramString) paramString = paramString.toLowerCase().replaceAll(' ', '-')
      param.withoutSlash ? urlLink.push(paramString) : urlLink.push(paramString, '/')
    })
    return urlLink.join('')
  })




  const imageUrl = computed(()=> {
    let urlLink = []
    props.itemAttributes.imageParams.forEach(param => {
      let paramString = param.selfValue ? param.selfValue : props.item[param.itemValue]
      if(param.replace && paramString) paramString = paramString.toLowerCase().replaceAll(' ', '-')
      if(param.checkDarkMode) {if(!globalStore.darkMode) {paramString = paramString + '-black' }} 

      param.withoutSlash ? urlLink.push(paramString) : urlLink.push(paramString, '/')
    })
    return urlLink.join('')
  })

  const imageAlt = computed(()=> {
    let altName = []
    props.itemAttributes.altParams.forEach(param => {
      let paramString = param.selfValue ? param.selfValue : props.item[param.itemValue]
      altName.push(paramString)
    })
    return altName.join(' ')
  })

</script>


<template>
<div>
  <NuxtLink 
    :class="itemAttributes.classes"
    v-if="itemAttributes.linkValue" :to="linkUrl">
    <img
      :src="`${config.public.storageLink}${imageUrl}.png`" 
      :alt="imageAlt"
      class="mx-auto"
    />
  </NuxtLink>
  <img v-else />

</div>
</template>

