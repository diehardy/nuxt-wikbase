<template>
  <div>
    <nav-header />    
    <div class="lg:flex">
      <div class="w-56 z-50 relative">
        <nav-aside-menu  />
      </div>
      <main class="w-full 2xl:flex z-0">
        <article class=" w-full bg-base-200 min-h-screen  p-10 pt-0">
          <nav-breadcrumbs />
          <slot class="z-0"/> <!--MAIN CONTENT -->
        </article>
        <el-contents-menu /> 
      </main>
    </div>
    <nav-footer />
  </div>
</template>

 