<template>
    <div class="w-full bg-gray-100 px-4 py-3 text-left text-gray-800 break-words max-w-md rounded shadow-xl">
      <h2 class="mx-auto text-xl font-semibold"><strong>Table of contents</strong></h2>
      <ul class="mt-2 list-disc px-2 pl-6">
          <li v-for="(link, index) in contents" :key="index">
            <a class="block hover:bg-gray-200 px-2 py-1 rounded" :href="`#${link.url}`">
              {{ link.name }}
            </a>
          <ul v-if="link.children?.length > 0" class="list-disc px-4">
            <li v-for="(childLink, indexChildLink) in link.children" :key="indexChildLink">
              <a :href="`#${childLink.url}`" class="block hover:bg-gray-200 py-1 rounded">
                {{ childLink.name }}
              </a>
              <ul v-if="childLink.children?.length > 0">
                <li 
                  v-for="(subChildLink, indexSubChildLink) in childLink.children" :key="indexSubChildLink">
                  <a 
                    :href="`#${subChildLink.url}`" 
                    class="block hover:bg-gray-200 px-2 py-1 rounded">
                    -> {{ subChildLink.name }}
                  </a>
                </li>
              </ul>

            </li>
          </ul>
          </li>

      </ul>
    </div>
</template>

<script setup>

const props = defineProps({
  contents: Array
})

  // import { useGlobalStore } from '~/stores/globalStore';
  // const  globalStore = useGlobalStore()

</script>