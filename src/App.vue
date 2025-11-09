<script setup>
import AppHeader from './components/AppHeader.vue'
import FilterBar from './components/FilterBar.vue'
import MapView from './components/MapView.vue'
import PropertyList from './components/PropertyList.vue'
</script>

<template>
  <div class="app-container">
    <AppHeader />
    <FilterBar />
    
    <div class="main-content">
      <div class="map-section">
        <MapView />
      </div>
      
      <div class="list-section">
        <PropertyList />
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f9fafb;
  overflow: hidden;
}

html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  display: flex;
  flex: 1;
  width: 100%;
  overflow: hidden;
}

.map-section {
  flex: 0 0 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.list-section {
  flex: 0 0 50%;
  width: 50%;
  height: 100%;
  overflow-y: auto;
  border-left: 1px solid #e5e7eb;
}

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
  
  .map-section {
    width: 100%;
    height: 400px;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .list-section {
    width: 100%;
    height: auto;
  }
}
</style>
