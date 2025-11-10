<script setup>
import AppHeader from './components/AppHeader.vue'
import MapView from './components/MapView.vue'
import PropertyList from './components/PropertyList.vue'
</script>

<template>
  <div class="flex flex-col w-full h-screen overflow-hidden">
    <AppHeader />
    
    <div class="flex flex-col lg:flex-row flex-1 w-full overflow-hidden">
      <!-- Map: Fixed height on mobile, 50% width on desktop -->
      <div class="flex-none w-full lg:w-1/2 h-[250px] lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-200">
        <MapView />
      </div>
      
      <div class="flex-1 w-full lg:w-1/2 h-auto lg:h-full overflow-y-auto">
        <PropertyList />
      </div>
    </div>
  </div>
</template>
