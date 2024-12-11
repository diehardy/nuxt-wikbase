<template>
  <p :class="paragraphStyles" v-html="paragraphData" />
</template>

<script setup>

  const props = defineProps({contentData: Object})

  const paragraphStyles = 'font-normal leading-relaxed lg:text-lg text-base mt-2'

  let paragraphData = computed(()=> {

    let paragraphChildrenData = ''

    if(props.contentData.children && props.contentData.children?.length > 0) {
      props.contentData.children.forEach(el => {

        if(el.type == 'paragraph') {
          paragraphChildrenData += el.data
        }

        if(el.type == 'link') {
          const target = el.target ? 'target="' + el.target + '"' : ''
          const href = el.href ? `href="${el.href}"` : '' 


          paragraphChildrenData += ` <a class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
           ${target} ${href}>${el.data}</a> `
        }


      })
    }

    let finalParagraph = `${props.contentData.data} ${paragraphChildrenData}`
    return finalParagraph
  })


</script>