<template>
  <div v-if="article && article?.length > 0">

    <Head>
      <Title>{{ article[0].headInfo.title }}</Title>
      <Meta name="description" :content="article[0].headInfo.description" />
      <Meta property="og:description" :content="article[0].headInfo.description" />
      <Meta property="og:title" :content="article[0].headInfo.ogTitle" />
      <Meta property="og:image" :content="article[0].headInfo.ogImage" />
    </Head>

    <el-main-title :title-level="1" class="mb-10">{{ article[0].name }}</el-main-title>
    <el-table-contents :contents="article[0].tableContents" class="mb-5"/>

    
    <div class="video-container" v-if="article[0].embeddedVideoLink">
      <iframe :src="article[0].embeddedVideoLink" :title="article[0].embeddedVideoTitle" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
    </div>



    <article-block 
    v-for="(contentBlock, index) in article[0].articleContent" 
    :key="index" 
    :contentBlock="contentBlock" />

  </div>  
  <div v-else>
    <div class="w-full lg:w-8/12 h-full">
      <div class="card bg-base-100 shadow-xl lg:mt-0 w-full mt-5">
        <div class="card-body">
          <h1 class="font-bold card-title">Requested article not found</h1>
          <p>This may be due to an error in our database or a typo in the requested URL.</p>
          <NuxtLink to="/unturned/guides"><button class="btn btn-success uppercase text-white">All Unturned guides</button></NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>




<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()

  definePageMeta({
    layout: 'article'
  })
  const config = useRuntimeConfig()

  import { useGlobalStore } from '~/stores/globalStore';
  const  globalStore = useGlobalStore()
  // globalStore.articleContents = contents

  let {data: article} = await useAsyncData('article',() => $fetch('/api/articles/get-article', {method: 'GET', query: {url: '/unturned/guides/' + route.params.articleUrl}})  )



  watchEffect(() => {
    if (article.value && article.value.length > 0) {
      globalStore.breadcrumbName =  article.value[0]['breadcrumb'];
      globalStore.articleContents = article.value[0].tableContents
    } else {globalStore.breadcrumbName = 'Not found'}
  });

  

</script>

<style scoped>
.video-container {
  display: flex;
}
    
iframe {
  aspect-ratio: 16 / 9;
  width: 100% !important;
}
</style>