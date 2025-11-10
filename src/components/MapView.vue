<template>
  <div class="w-full h-full relative">
    <div class="w-full h-full bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden">
      <div class="w-full h-full relative" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,.02) 50px, rgba(0,0,0,.02) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,.02) 50px, rgba(0,0,0,.02) 51px);">
        
        <!-- Top Filter Bar Overlay - Centered -->
        <div class="absolute  left-0 right-0 flex items-center justify-center z-10 px-4">
          <!-- Filter Container -->
          <div class="bg-white rounded-full shadow-lg flex items-center">
            <!-- County Dropdown -->
            <select 
              v-model="selectedCounty" 
              @change="updateCountyFilter"
              class="py-3 pr-10 pl-5 border-none bg-transparent text-base text-gray-800 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width=%2712%27%20height=%278%27%20viewBox=%270%200%2012%208%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M1%201L6%206L11%201%27%20stroke=%27%236b7280%27%20stroke-width=%272%27%20stroke-linecap=%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center] focus:outline-none min-w-[140px] font-medium border-r border-gray-200"
            >
              <option value="All">County</option>
              <option v-for="county in counties.filter(c => c !== 'All')" :key="county" :value="county">
                {{ county }}
              </option>
            </select>

            <!-- Month Dropdown -->
            <select 
              v-model="selectedMonth" 
              @change="updateMonthFilter"
              class="py-3 pr-10 pl-5 border-none bg-transparent text-base text-gray-800 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width=%2712%27%20height=%278%27%20viewBox=%270%200%2012%208%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M1%201L6%206L11%201%27%20stroke=%27%236b7280%27%20stroke-width=%272%27%20stroke-linecap=%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center] focus:outline-none min-w-[140px] font-medium border-r border-gray-200"
            >
              <option value="All">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>

            <!-- List Dropdown -->
            <select 
              v-model="selectedList" 
              @change="updateListFilter"
              class="py-3 pr-10 pl-5 border-none bg-transparent text-base text-gray-800 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width=%2712%27%20height=%278%27%20viewBox=%270%200%2012%208%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M1%201L6%206L11%201%27%20stroke=%27%236b7280%27%20stroke-width=%272%27%20stroke-linecap=%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center] focus:outline-none min-w-[140px] font-medium"
            >
              <option value="All">List</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>
          </div>
        </div>

        <!-- Map/Satellite Toggle - Left Side -->
        <div class="absolute top-24 left-4 bg-white rounded-md shadow-md overflow-hidden z-10">
          <button 
            :class="mapType === 'map' ? 'bg-white text-gray-900 font-semibold' : 'bg-gray-50 text-gray-600'"
            @click="mapType = 'map'"
            class="py-2 px-4 border-none cursor-pointer text-sm transition-all hover:bg-gray-50"
          >
            Map
          </button>
          <button 
            :class="mapType === 'satellite' ? 'bg-white text-gray-900 font-semibold' : 'bg-gray-50 text-gray-600'"
            @click="mapType = 'satellite'"
            class="py-2 px-4 border-none cursor-pointer text-sm transition-all hover:bg-gray-50"
          >
            Satellite
          </button>
        </div>

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
        
        <!-- Zoom and Fullscreen Controls - Right Side -->
        <div class="absolute bottom-5 right-5 flex flex-col gap-2 z-10">
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
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MapView',
  setup() {
    const store = useStore()
    const properties = computed(() => store.getters.filteredProperties)
    const counties = computed(() => store.getters.counties)
    
    const selectedCounty = ref('All')
    const selectedMonth = ref('All')
    const selectedList = ref('All')
    const mapType = ref('map')
    
    const updateCountyFilter = () => {
      store.dispatch('updateFilter', {
        filterName: 'county',
        value: selectedCounty.value
      })
    }
    
    const updateMonthFilter = () => {
      store.dispatch('updateFilter', {
        filterName: 'month',
        value: selectedMonth.value
      })
    }
    
    const updateListFilter = () => {
      store.dispatch('updateFilter', {
        filterName: 'list',
        value: selectedList.value
      })
    }
    
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
      counties,
      selectedCounty,
      selectedMonth,
      selectedList,
      mapType,
      updateCountyFilter,
      updateMonthFilter,
      updateListFilter,
      getMarkerPosition
    }
  }
}
</script>

