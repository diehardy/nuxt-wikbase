<template>
  <div>
    <Head>
      <Title>Adobe Illustrator Wikipedia | Wikbase</Title>
      <Meta name="description" :content="`Explore the comprehensive Adobe Illustrator Wikipedia featuring all kinds of tutorials.`" />
      <Meta property="og:description" content="Explore the comprehensive Adobe Illustrator Wikipedia featuring all kinds of tutorials." />
      <Meta property="og:title" content="Adobe Illustrator Wikipedia | Wikbase" />
      <Meta property="og:image" content="https://media.wikbase.com/logos/adobe-illustrator.png" />
    </Head>
    <el-main-title :title-level="1" class="mb-10">Adobe Illustrator Wikipedia</el-main-title>

    <el-page-cards :allItems="pages"></el-page-cards>

  </div>
</template>


<script setup>
  const pages = [
    {name: 'Adobe Illustrator tutorials', url: '/adobe-illustrator/tutorials', description: 'A list of practice-oriented tutorials to improve your skills of using Adobe Illustrator!', actionText: 'Follow the guideline', altImage: 'Adobe Illustrator tutorials', imgRoot: 'logos/adobe-illustrator.png'}
  ]


</script>
