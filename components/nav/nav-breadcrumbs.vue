<template>
  <div class="breadcrumbs text-sm pl-5">
     <!-- <pre>{{ route }}</pre> -->
    <ul>
      <li v-for="(link, index) in breadcrumbLinks" :key='index'>
        <NuxtLink  :to="link.url" v-if="link.url">
          <span class="breadcrumb-link ">{{ link.name }}</span>
        </NuxtLink>
        <span v-else>
          <span class="breadcrumb-link ">{{ link.name }}</span>
        </span>
      </li>
      <li>
        <span>
          <span class="breadcrumb-link ">{{ globalStore.breadcrumbName }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>


<script setup>

  const ignoreLinks = ['vanilla']
  import { useGlobalStore } from '~/stores/globalStore';
  const  globalStore = useGlobalStore()
  const route = useRoute()
  let breadcrumbLinks = ref([])

  const generateBreadcrumbs = (route) => {
    const routeLinks = route.fullPath.replace('/', '').split('/')
    breadcrumbLinks.value = [] 
    for (let i = 0; i < routeLinks.length -1; i++) {
      const startIndexUrl = route.fullPath.indexOf(routeLinks[i])
      
      const startLink = route.fullPath.slice(0, startIndexUrl)

      if(!ignoreLinks.includes(routeLinks[i])) {
        // temporary condition (makes no sense for 1 article create guides page)
          breadcrumbLinks.value.push({ name: routeLinks[i], url: `${startLink}${routeLinks[i]}` })
      } else {
        breadcrumbLinks.value.push({ name: routeLinks[i][0].toUpperCase() + routeLinks[i].slice(1) })
      }

    }
  }




  generateBreadcrumbs(route)


  watch(route, (newRoute) => {
    generateBreadcrumbs(newRoute)
  })


</script>

<style scoped>
.breadcrumb-link::first-letter {
    text-transform: uppercase;
}
</style>