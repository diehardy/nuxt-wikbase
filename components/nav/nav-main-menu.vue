<script setup>
const route = useRoute()
import { useGlobalStore } from '~/stores/globalStore';
const  globalStore = useGlobalStore()
</script>


<template>
  <!-- menu rounded-box w-full border-gray-800 border -->
  <ul class="menu rounded-box border shadow-xl"
   :class="{
        'border-slate-200': globalStore.darkMode, 
        'border-gray-900': !globalStore.darkMode
        }">
    <!-- <pre>{{ route }}</pre> -->
    <li>
      <NuxtLink to="/">Categories</NuxtLink>
    </li>
    
    <li>
      <NuxtLink to="/unturned">Unturned wiki</NuxtLink>
      <ul>
        <li>        
          <NuxtLink to="/unturned/items">Items id list</NuxtLink>
        </li>
        <li>        
          <NuxtLink to="/unturned/vehicles">Vehicles id list</NuxtLink>
        </li>
        <li>        
          <NuxtLink to="/unturned/" :class="{'router-link-active': route.path.includes('/unturned/guides')}">Guides</NuxtLink>
        </li>
      </ul>
    </li>

  </ul>
  
</template>