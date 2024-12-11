<template>
  <div class="pt-16">
    <NuxtLayout >
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<style>

.router-link-active {
  color: var(--darkOnColor);
  font-weight: 900;
}

.router-link-active-white {
  color: var(--white-mode-color);
  font-weight: 900;
}

.jump-link {
  scroll-margin-top: 60px; /* Adjust to your header's height */
}
</style>