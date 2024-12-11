<template>
    <component :is="componentsMap[contentBlock.type]" :contentData="contentBlock" />
</template>

<script setup>

  const props = defineProps({contentBlock: Object})

  import elTitle from './el/el-title.vue';
  import elParagraph from './el/el-paragraph.vue';
  import elList from './el/el-list.vue';
  import elCode from './el/el-code.vue';
  import elImg from './el/el-image.vue';
  import elDataList from './el/el-data-list.vue';
  const componentsMap = {
      'title': elTitle,
      'div': elTitle,
      'paragraph': elParagraph,
      'ul': elList,
      'ol': elList,
      'code': elCode,
      'image': elImg,
      'dataList': elDataList,
  };

// 'title', 'link', 'image', 'paragraph', 'ul', 'ol', 'li', 'div', 'pre', 'code', 'dataList'


</script>