<template>
  <div class="pb-5">
    <Head>
      <Title>Practice-Oriented Wikipedia-Style Website | Wikbase</Title>
      <Meta name="description" :content="`Discover Wikbase, your hub for practical guides, tutorials, and resources on games, programs, and tools. Enhance your skills and explore in-depth content across various topics!`" />
      <Meta property="og:description" content="Discover Wikbase, your hub for practical guides, tutorials, and resources on games, programs, and tools. Enhance your skills and explore in-depth content across various topics!" />
      <Meta property="og:title" content="Practice-Oriented Wikipedia-Style Website | Wikbase" />
      <Meta property="og:image" content="https://media.wikbase.com/logos/wikbase.png" />
    </Head>
    <el-main-title :title-level="1" class="mb-10">Wikbase: practice-oriented Wikipedia-style website for all kinds of topics</el-main-title>
    <el-main-title :title-level="2" class="mb-10">Choose a category you're interested in:</el-main-title>
    <el-page-cards :all-items="categories"></el-page-cards>
  </div>
</template>

<script setup>

const categories = [
  {name: 'Unturned', url: '/unturned', description: 'Free to play survival game', actionText: 'Go to wiki', altImage: 'unturned logo', imgRoot: 'logos/unturned-logo.png'},
  {name: 'Adobe Illustrator', url: '/adobe-illustrator', description: 'Vector graphics editor and design software', actionText: 'Explore', altImage: 'Adobe Illustrator logo', imgRoot: 'logos/adobe-illustrator.png'}
]

</script>

