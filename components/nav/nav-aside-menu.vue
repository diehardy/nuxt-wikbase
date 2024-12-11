<template>
  <div>
    <aside class="hidden  lg:mx-auto lg:flex items-center lg:justify-between   mt-10 justify-center fixed pl-5">
      <nav-main-menu />
    </aside>

    <div class="drawer z-50 static">

      <input id="my-drawer" type="checkbox" v-model="globalStore.mobileSwapper"  aria-label="Toggle mobile menu" class="drawer-toggle" /> 
      <aside class="drawer-side mt-70">
        <label for="my-drawer-4" aria-label="close sidebar" 
        class="drawer-overlay"
        @click="globalStore.mobileSwapper = false"
        ></label>
        <div class="menu  bg-base-200 text-base-content min-h-full p-4 w-64">
          <el-menu-swapper />
          <nav-main-menu />
        </div>

      </aside>
    </div>
  </div>
</template>

<script setup>
import { useGlobalStore } from '~/stores/globalStore';
const  globalStore = useGlobalStore()
</script>

<style scoped>

</style>