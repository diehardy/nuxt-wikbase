<template>
  <div>


    <Head>
      <Title>About Wikbase</Title>
      <Meta name="description" content="Wikbase is a versatile platform offering a growing database of guides, tools, and unique information for games, software, and beyond. Explore our in-depth resources today!" />
      <Meta property="og:description" content="Wikbase is a versatile platform offering a growing database of guides, tools, and unique information for games, software, and beyond. Explore our in-depth resources today!" />
      <Meta property="og:title" content="About Wikbase - Your Knowledge Hub" />
      <Meta property="og:image" content="https://media.wikbase.com/unturned/pages/unturned-guides.png" />
    </Head>



    <el-main-title :title-level="1" class="mb-5">About Wikbase</el-main-title>
    <NuxtLink to="/" aria-label="Go to the main page of Wikbase"><icon-wikbase-logo class="2xl:ml-10"/></NuxtLink>

    <el-main-title :title-level="2" class="mb-5">Our Mision</el-main-title>

    <p :class="paragraphStyles" class="mt-2">
      At Wikbase, our mission is to provide a reliable and accessible source of information for a wide range of topics, including games, programs, tools, and other platforms. We aim to empower users with clear and accurate resources to enhance their skills and knowledge.
    </p>

    

    <el-main-title :title-level="2" class="mb-5">Why Choose Wikbase?</el-main-title>

    <p :class="paragraphStyles" class="mt-2">
      We focus on creating high-quality, user-friendly content. Whether it's an ID list for a game, a guide for software, or insights on tools, our pages are curated by knowledgeable contributors who prioritize accuracy and clarity.
    </p>

    <el-main-title :title-level="2" class="mb-5">Get Involved</el-main-title>

    <p :class="paragraphStyles" class="mt-2">
      Wikbase thrives on community involvement. Share your feedback, suggest new topics, or contribute your expertise to help us grow. 
      <a 
      :class="linkStyles"
      href="https://discord.gg/7NRmb8X3sJ" target="_blank">
      Join us on Discord</a>
      and become part of the Wikbase journey to create a versatile knowledge hub!
    </p>

    <el-main-title :title-level="2" class="mb-5">From founder</el-main-title>

    <p :class="paragraphStyles" class="mt-2">
      Hi! My name's Nikita, and I'm the founder of Wikbase. This is a practice-oriented Wikipedia-style website for all kinds of topics. I have lots of skills in different programs, knowledge about certain things, and most importantly, the desire to help people.
    </p>

    <p :class="paragraphStyles" class="mt-2">For now, I'm working solo, but if you want to become a part of Wikbase by creating content for it—whether through YouTube videos or articles for the website—you’re welcome to join the Wikbase team. If you have any queries, please contact me at <b>nerdyaus21@gmail.com</b>.</p>
  </div>
</template>

<script setup>
const linkStyles = 'font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'

</script>

<style scoped>

</style>