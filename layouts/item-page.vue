<template>
  <div>
    <nav-header />
    <div class="lg:flex">
      <div class="w-64 z-50 relative">
        <nav-aside-menu class="fixed" />
      </div>
      <main class="w-full z-0">
        <div class=" bg-base-200 min-h-screen sm:p-10 pt-0 pr-0">
          <nav-breadcrumbs />
        <slot /> <!--MAIN CONTENT --></div>
      </main>
    </div>
    <nav-footer />
  </div>
</template>

