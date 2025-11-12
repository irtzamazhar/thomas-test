<template>
  <!-- Split-screen dashboard: map left, property inventory right -->
  <div class="flex flex-col lg:flex-row flex-1 w-full h-full overflow-hidden">
    <div class="flex-none w-full lg:w-1/2 h-[250px] lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-200">
      <MapView />
    </div>

    <div class="flex-1 w-full lg:w-1/2 h-auto lg:h-full overflow-y-auto">
      <PropertyList />
    </div>
  </div>
</template>

<script setup>
// Dashboard re-exports composable UI widgets to keep routing clean
import MapView from '../../components/ui/MapView.vue'
import PropertyList from '../../components/ui/PropertyList.vue'
</script>
