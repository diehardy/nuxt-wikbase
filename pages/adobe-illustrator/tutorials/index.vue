<template>
  <div>
    <Head>
      <Title>Adobe Illustrator Tutorials | Wikbase</Title>
      <Meta name="description" :content="`Explore detailed Adobe Illustrator tutorials designed to help you enhance your skills and master this powerful vector design software!`" />
      <Meta property="og:description" content="Explore detailed Adobe Illustrator tutorials designed to help you enhance your skills and master this powerful vector design software!" />
      <Meta property="og:title" content="Adobe Illustrator Tutorials | Wikbase" />
      <Meta property="og:image" :content="`${config.public.storageLink}logos/adobe-illustrator.png`" />
    </Head>
    <el-main-title :title-level="1" >Adobe Illustrator Tutorials</el-main-title>
    <el-main-title :title-level="2" class="mb-5">Most Popular Adobe Illustrator Tutorials</el-main-title>
    <el-page-cards :allItems="popularArticles" />

    <el-main-title :title-level="2" class="mb-5">Explore our tutorials on Adobe Illustrator</el-main-title>

    <el-page-cards :allItems="allArticles" />
    <!-- <div class="text-xl font-bold mt-5">All Unturned Guides</div> -->
  </div>
</template>


<script setup>
  const config = useRuntimeConfig()
  let {data: popularArticles} = await useAsyncData('popularArticles',() => $fetch('/api/articles/get-articles', {method: 'POST', body: {type: 'popular', category: 2}})  )
  let {data: allArticles} = await useAsyncData('articles',() => $fetch('/api/articles/get-articles', {method: 'POST', body: {category: 2}})  )
  // let {data: articles} = await useFetch('/api/articles/get-articles', {method: 'POST'})
  // console.log('articles: ', popularArticles.value)

</script>