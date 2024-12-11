<template>
  <header class="border-slate-200 border-b mb:navbar lg:justify-around  mb:flex justify-between pt-2 px-0 sm:px-5 h-16
  fixed inset-0  bg-base-100 z-50">

    <nav class="lg:mx-auto flex items-center lg:justify-between w-full justify-between" > 
      <div class="flex flex-row items-center">
        <el-menu-swapper class="ml-2  lg:hidden mr-5"  />
        <NuxtLink to="/" aria-label="Go to the main page of Wikbase"><icon-wikbase-logo class="2xl:ml-10"/></NuxtLink>
      </div>
      <el-theme-controller class="2xl: mr-10"/>
    </nav>
  </header>
</template>


<style scoped>

</style>