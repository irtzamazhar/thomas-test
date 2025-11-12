<template>
  <!-- Provides global header + full-height flex canvas for every page -->
  <div class="flex flex-col w-full h-screen overflow-hidden">
    <AppHeader />
    <main class="flex-1 overflow-hidden">
      <slot />
    </main>
  </div>
</template>

<script setup>
// Layout-specific imports live here to keep page components slim
import AppHeader from '../components/layout/AppHeader.vue'
</script>
