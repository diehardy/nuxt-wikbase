<script setup >
 defineProps(['error'])


 definePageMeta({
    layout: 'item-page'
  })
</script>

<template>
  <div class="mt-7 max-w-sm mx-auto text-center card shadow-xl p-5">
    <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
    <p class="mt-7 text-2xl font-bold">Requested page not found. </p>

      <NuxtLink to="/"><button class="btn btn-info uppercase text-white mt-5">Go back</button></NuxtLink>

  </div>
</template>

