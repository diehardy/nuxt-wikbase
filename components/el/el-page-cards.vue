<template>
    <div class="flex  flex-row flex-wrap gap-5 items-center">
      <div v-for="(item, index) in allItems" :key="index">
        <div class=" card bg-base-100 image-full shadow-xl w-64 mx-auto " >
          <figure class="object-cover">
            <img class="object-cover"
              :src="`${config.public.storageLink}${item.imgRoot}`"
              :alt="item.altImage" />
              <div class="absolute inset-0 bg-black opacity-60 rounded-xl blur-sm"></div>
          </figure>
          <div class="card-body">
            <h2 class="card-title text-3xl md:text-2xl">{{ item.name }}</h2>
            <p class="text-base">{{ item.description }}</p>
            <div class="card-actions justify-end">
              <NuxtLink :to="item.url"><button class="btn btn-primary uppercase ">{{ item.actionText }}</button></NuxtLink>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script setup>
  const config = useRuntimeConfig()
  const props = defineProps({
    allItems: Array,
  })
</script>

