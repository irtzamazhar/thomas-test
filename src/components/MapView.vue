<template>
  <div class="map-container">
    <div class="map-placeholder">
      <div class="map-content">
        <!-- Map clusters -->
        <div 
          v-for="property in properties" 
          :key="property.id" 
          class="map-marker"
          :style="getMarkerPosition(property)"
        >
          <div class="marker-cluster">{{ property.county.substring(0, 1) }}</div>
        </div>
        
        <div class="map-controls">
          <button class="map-control-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="map-control-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="map-control-btn fullscreen">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2h4M14 2h-4M2 14h4M14 14h-4M2 2v4M14 2v4M2 14v-4M14 14v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="map-overlay-text">
          Georgia Foreclosure Map
          <div class="map-subtext">Showing {{ properties.length }} properties</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MapView',
  setup() {
    const store = useStore()
    const properties = computed(() => store.getters.filteredProperties)
    
    const getMarkerPosition = (property) => {
      // Simple positioning logic for demonstration
      const baseX = Math.random() * 80 + 10
      const baseY = Math.random() * 80 + 10
      return {
        left: `${baseX}%`,
        top: `${baseY}%`
      }
    }
    
    return {
      properties,
      getMarkerPosition
    }
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  position: relative;
  overflow: hidden;
}

.map-content {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: 
    repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,.02) 50px, rgba(0,0,0,.02) 51px),
    repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,.02) 50px, rgba(0,0,0,.02) 51px);
}

.map-marker {
  position: absolute;
  transform: translate(-50%, -50%);
}

.marker-cluster {
  background: #2563eb;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 3px solid white;
  cursor: pointer;
  transition: transform 0.2s;
}

.marker-cluster:hover {
  transform: scale(1.1);
}

.map-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.map-control-btn {
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #6b7280;
  transition: all 0.2s;
}

.map-control-btn:hover {
  background: #f9fafb;
  color: #1f2937;
}

.map-control-btn.fullscreen {
  margin-top: 8px;
}

.map-overlay-text {
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #1f2937;
}

.map-subtext {
  font-size: 12px;
  font-weight: 400;
  color: #6b7280;
  margin-top: 0.25rem;
}
</style>

