<template>
  <div class="badge gap-2 badge-lg p-5" :class="`badge-${color}-color`">
    <svg v-show="color == 'error'"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="inline-block h-4 w-4 stroke-current">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"></path>
    </svg>

    <svg
    style="fill: white;" class="inline-block h-4 w-4 "
    v-show="color == 'success'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>
    <span :class="{'text-white': color == 'success', 'text-black': color=='error'}">
      <slot />
    </span>
    
  </div>
</template>


<script setup>




const props = defineProps({
  color: String,
})
</script>


<style scoped>
.badge-success-color {
  background-color: #00a96e;
}

.badge-error-color {
  background-color: #ff5861;
}

.text-red {
  color: rgb(0 0 0);
}
.text-green {
  color: rgb(255 255 255);
}


</style>