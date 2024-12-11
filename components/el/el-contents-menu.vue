<template>
  <aside class="pt-2 hidden 2xl:flex  2xl:w-1/3  h-2">
      <div class=" flex-row flex-wrap flex fixed">
        <div class="divider divider-horizontal divider-success pb-0"  /> 
        <ul class="pt-0 menu w-56">

          <li>
            <h2 class="menu-title font-extrabold" :class="globalStore.darkMode ? 'text-gray-50' : 'text-gray-900'">Contents of the page</h2>
          </li>

          <ul>

            <li v-for="(link, index) in globalStore.articleContents" :key="index">
              <a :href="`#${link.url}`">
                {{ link.name }}
              </a>

              <ul v-if="link.children?.length > 0">
                <li v-for="(childLink, indexChildLink) in link.children" :key="indexChildLink">
                  <a :href="`#${childLink.url}`">
                    {{ childLink.name }}
                  </a>

                  <ul v-if="childLink.children?.length > 0">
                    <li v-for="(subChildLink, indexSubChildLink) in childLink.children" :key="indexSubChildLink">
                      <a :href="`#${subChildLink.url}`">
                        {{ subChildLink.name }}
                      </a>
                    </li>
                  </ul>

                </li>
              </ul>
              
            </li>
          </ul>

        </ul>

      </div>
  </aside>
</template>

<script setup>
  import { useGlobalStore } from '~/stores/globalStore';
  const  globalStore = useGlobalStore()
</script>
