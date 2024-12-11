<template>
<footer class="footer bg-base-100 text-base-content p-10 border-t">
  <nav>
    <div class="footer-title">OUR PROJECTS</div>
    <span> Find your teammate on
      <a class="link link-hover underline" target="_blank" href="https://buddyrail.com">
       BuddyRail
      </a>
    </span>

  </nav>
  <nav>
    <div class="footer-title">LINKS</div>
    <NuxtLink class="link link-hover" to="/about" >About us</NuxtLink>
  </nav>
  <nav>
    <div class="footer-title">Social</div>
    <div class="grid grid-flow-col gap-4">
      <a href="https://www.youtube.com/channel/UCRCw_B9aANDmqywqv8VDGpA" target="_blank">
        <img :src="`https://media.wikbase.com/social/${!globalStore.darkMode ? 'youtube-black': 'youtube-white'}.png`" alt="youtube icon" />
      </a>
      <a href="https://discord.gg/7NRmb8X3sJ" target="_blank">
        <img :src="`https://media.wikbase.com/social/${!globalStore.darkMode ? 'discord-black': 'discord-white'}.png`" alt="discord icon" />
      </a>
    </div>
  </nav>
</footer>
</template>

<script setup>
  import { useGlobalStore } from '~/stores/globalStore';
  const  globalStore = useGlobalStore()
</script>
