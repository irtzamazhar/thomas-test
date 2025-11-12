<script setup>
import { RouterView } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
</script>

<!-- Root component wraps every routed view with the shared MainLayout shell -->
<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>
