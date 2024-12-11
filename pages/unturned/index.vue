<template>
  <div>
    <Head>
      <Title>Unturned Wikipedia | Wikbase</Title>
      <Meta name="description" :content="`Explore the comprehensive Unturned Wikipedia featuring guides, vehicle ID lists, and item ID lists to enhance your gameplay experience.`" />
      <Meta property="og:description" content="Explore the comprehensive Unturned Wikipedia featuring guides, vehicle ID lists, and item ID lists to enhance your gameplay experience." />
      <Meta property="og:title" content="Unturned Wikipedia | Wikbase" />
      <Meta property="og:image" content="https://media.wikbase.com/unturned/pages/unturned-guides.png" />
    </Head>
    <el-main-title :title-level="1" class="mb-10">Unturned wikipedia</el-main-title>

    <el-page-cards :allItems="pages"></el-page-cards>

  </div>
</template>


<script setup>
  const pages = [
    {name: 'Items ID List', url: '/unturned/items', description: 'The fullest items id list for Unturned including all curated and official maps.', actionText: 'Search for all items', altImage: 'Unturned items id list', imgRoot: 'unturned/pages/unturned-items-id-list.png'},
    {name: 'Vehicles ID List', url: '/unturned/vehicles', description: 'All kind of transport in Unturned is provided in this id list of vehicles. All maps are included.', actionText: 'Try out vehicles', altImage: 'Unturned vehicles id list', imgRoot: 'unturned/pages/unturned-vehicles-id-list.png'},
    {name: 'How-to guides', url: '/unturned/guides', description: 'Helpful tutorials for making a server and setting configurations.', actionText: 'Follow the guideline', altImage: 'Unturned guides', imgRoot: 'unturned/pages/unturned-guides.png'}

  ]


</script>
