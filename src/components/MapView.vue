<template>
  <div class="w-full h-full relative">
    <div class="w-full h-full bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden">
      <div class="w-full h-full relative" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,.02) 50px, rgba(0,0,0,.02) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,.02) 50px, rgba(0,0,0,.02) 51px);">
        <!-- Map clusters -->
        <div 
          v-for="property in properties" 
          :key="property.id" 
          class="absolute -translate-x-1/2 -translate-y-1/2"
          :style="getMarkerPosition(property)"
        >
          <div class="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md border-4 border-white cursor-pointer transition-transform hover:scale-110">
            {{ property.county.substring(0, 1) }}
          </div>
        </div>
        
        <div class="absolute bottom-5 right-5 flex flex-col gap-2">
          <button class="w-10 h-10 bg-white border border-gray-300 rounded-md flex items-center justify-center cursor-pointer shadow-sm text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-800">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="w-10 h-10 bg-white border border-gray-300 rounded-md flex items-center justify-center cursor-pointer shadow-sm text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-800">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="w-10 h-10 bg-white border border-gray-300 rounded-md flex items-center justify-center cursor-pointer shadow-sm text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-800 mt-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2h4M14 2h-4M2 14h4M14 14h-4M2 2v4M14 2v4M2 14v-4M14 14v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="absolute top-5 left-5 bg-white py-4 px-6 rounded-lg shadow-md font-semibold text-gray-800">
          Georgia Foreclosure Map
          <div class="text-xs font-normal text-gray-500 mt-1">Showing {{ properties.length }} properties</div>
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

