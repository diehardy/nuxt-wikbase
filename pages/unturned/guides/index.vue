<template>
  <div>
    <Head>
      <Title>Unturned How-To Guides | Wikbase</Title>
      <Meta name="description" :content="`Explore detailed Unturned guides covering a variety of topics from making and setting up servers to boosting your in-game FPS!`" />
      <Meta property="og:description" content="Explore detailed Unturned guides covering a variety of topics from making and setting up servers to boosting your in-game FPS!" />
      <Meta property="og:title" content="Unturned How-To Guides | Wikbase" />
      <Meta property="og:image" :content="`${config.public.storageLink}unturned/pages/unturned-guides.png`" />
    </Head>
    <el-main-title :title-level="1" >Unturned How-To Guides</el-main-title>
    <el-main-title :title-level="2" class="mb-5">Most Popular Unturned Guides</el-main-title>
    <el-page-cards :allItems="popularArticles" />
    <!-- <div class="text-xl font-bold mt-5">All Unturned Guides</div> -->
  </div>
</template>


<script setup>
  const config = useRuntimeConfig()
  let {data: popularArticles} = await useAsyncData('articles',() => $fetch('/api/articles/get-articles', {method: 'POST', body: {type: 'popular', category: 1}})  )
  // let {data: articles} = await useFetch('/api/articles/get-articles', {method: 'POST'})
  // console.log('articles: ', popularArticles.value)

</script>