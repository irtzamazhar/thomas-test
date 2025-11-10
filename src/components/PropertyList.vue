<template>
  <div class="p-3 md:p-4 lg:p-5 bg-white h-full">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
      <div>
        <h2 class="text-sm md:text-base text-gray-600 font-normal m-0">Showing {{ totalProperties }} properties</h2>
      </div>
      
      <div class="flex gap-3 md:gap-4 items-center">
        <div class="flex items-center gap-2 md:gap-3">
          <span class="text-xs md:text-sm text-gray-700 font-medium">View</span>
          
          <!-- Toggle Switch -->
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" :checked="viewMode === 'tile'" @change="toggleView" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          
          <span 
            :class="viewMode === 'list' ? 'text-gray-900 font-semibold' : 'text-gray-500'"
            class="text-xs md:text-sm cursor-pointer"
            @click="setView('list')"
          >
            List
          </span>
          <span 
            :class="viewMode === 'tile' ? 'text-gray-900 font-semibold' : 'text-gray-500'"
            class="text-xs md:text-sm cursor-pointer"
            @click="setView('tile')"
          >
            Tile
          </span>
        </div>
      </div>
    </div>
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
      <div class="flex flex-wrap gap-2 md:gap-3">
        <div class="relative" ref="bedsBathsRef">
          <button
            @click="toggleBedsBaths"
            class="py-[5px] px-[10px] bg-white text-gray-700 text-xs md:text-sm font-medium cursor-pointer flex items-center gap-2 transition-all hover:bg-gray-50"
            style="border: 1px solid #ccc; border-radius: 100em;"
          >
            Beds & Baths
            <svg
              :class="bedsBathsOpen ? 'rotate-180 text-gray-600' : 'text-gray-400'"
              class="transition-transform duration-200"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
            >
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <transition name="fade">
            <div
              v-if="bedsBathsOpen"
              class="absolute left-0 mt-2 w-[320px] sm:w-[360px] bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden"
            >
              <div class="p-4 md:p-5 space-y-4">
                <div>
                  <h3 class="text-sm font-semibold text-gray-700 mb-3">Number of Bedrooms</h3>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="option in bedsOptions"
                      :key="option"
                      @click="selectBeds(option)"
                      :class="[
                        'h-9 md:h-10 rounded-lg border text-xs md:text-sm font-medium transition-colors',
                        selectedBeds === option
                          ? 'bg-[#2f6a97] text-white border-[#2f6a97]'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      ]"
                    >
                      {{ option }}
                    </button>
                  </div>
                  <label class="mt-3 flex items-center gap-2 text-xs md:text-sm text-gray-600 cursor-pointer select-none">
                    <input type="checkbox" class="rounded border-gray-300 text-[#2f6a97] focus:ring-[#2f6a97]" v-model="useExactMatch">
                    Use exact match
                  </label>
                </div>

                <div class="pt-1 border-t border-gray-200">
                  <h3 class="text-sm font-semibold text-gray-700 mt-4 mb-3">Number of Bathrooms</h3>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="option in bathsOptions"
                      :key="option"
                      @click="selectBaths(option)"
                      :class="[
                        'h-9 md:h-10 rounded-lg border text-xs md:text-sm font-medium transition-colors',
                        selectedBaths === option
                          ? 'bg-[#2f6a97] text-white border-[#2f6a97]'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      ]"
                    >
                      {{ option }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="px-4 md:px-5 pb-5">
                <button
                  class="w-full h-11 md:h-12 bg-[#1f527a] text-white text-sm md:text-base font-semibold rounded-lg hover:bg-[#184161] transition-colors"
                  @click="applyBedsBaths"
                >
                  Apply
                </button>
              </div>
            </div>
          </transition>
        </div>
        <button class="py-[5px] px-[10px] bg-white text-gray-700 text-xs md:text-sm font-medium cursor-pointer flex items-center gap-2 transition-all hover:bg-gray-50" style="border: 1px solid #ccc; border-radius: 100em;">
          Value & Debt
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" class="text-gray-400">
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="py-[5px] px-[10px] bg-white text-gray-700 text-xs md:text-sm font-medium cursor-pointer flex items-center gap-2 transition-all hover:bg-gray-50" style="border: 1px solid #ccc; border-radius: 100em;">
          More
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" class="text-gray-400">
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="py-[5px] px-[10px] bg-white text-gray-700 text-xs md:text-sm font-medium cursor-pointer flex items-center gap-2 transition-all hover:bg-gray-50" style="border: 1px solid #ccc; border-radius: 100em;">
          Filter
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" class="text-gray-400">
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div class="flex flex-wrap gap-2 md:gap-3">
        <button 
          @click="handleSaveSearch"
          class="py-2 px-3 md:px-4 text-xs md:text-sm font-medium rounded-md cursor-pointer flex items-center gap-2 transition-all bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        >
          <span class="hidden sm:inline">Save Search</span>
          <span class="sm:hidden">Save</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-gray-400">
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 5v6M5 8h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="py-2 px-3 md:px-4 text-xs md:text-sm font-semibold rounded-md cursor-pointer transition-all bg-red-600 text-white hover:bg-red-700">
          Export List
        </button>
      </div>
    </div>
    
    <!-- Table View -->
    <div v-if="viewMode === 'list'" class="mb-8 bg-white rounded-lg shadow-sm overflow-x-auto">
      <table class="w-full min-w-[800px]">
        <thead class="bg-[#3a5a7a] text-white">
          <tr>
            <th class="text-left py-3 md:py-4 px-4 md:px-6 font-semibold text-xs md:text-sm">Address</th>
            <th class="text-left py-3 md:py-4 px-3 md:px-4 font-semibold text-xs md:text-sm">
              Est. Value
              <svg class="inline-block ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
              </svg>
            </th>
            <th class="text-left py-3 md:py-4 px-3 md:px-4 font-semibold text-xs md:text-sm">
              Beds
              <svg class="inline-block ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
              </svg>
            </th>
            <th class="text-left py-3 md:py-4 px-3 md:px-4 font-semibold text-xs md:text-sm">
              Bath
              <svg class="inline-block ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
              </svg>
            </th>
            <th class="text-left py-3 md:py-4 px-3 md:px-4 font-semibold text-xs md:text-sm">
              Sq Ft
              <svg class="inline-block ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
              </svg>
            </th>
            <th class="text-left py-3 md:py-4 px-3 md:px-4 font-semibold text-xs md:text-sm">
              Bld Yr
              <svg class="inline-block ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(property, index) in paginatedProperties"
            :key="property.id"
            :class="index % 2 === 0 ? 'bg-white' : 'bg-[#e8f0f8]'"
            class="border-b border-gray-200 hover:bg-blue-50 transition-colors"
          >
            <td class="py-3 md:py-4 px-4 md:px-6">
              <div class="flex items-center gap-2 md:gap-3">
                <button 
                  @click="toggleFavorite(property.id)"
                  class="text-red-500 hover:scale-110 transition-transform flex-shrink-0"
                >
                  <svg width="18" height="18" class="md:w-[20px] md:h-[20px]" viewBox="0 0 20 20" :fill="property.isFavorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                    <path d="M10 17.5L3.5 11C1.5 9 1.5 5.5 3.5 3.5C5.5 1.5 9 1.5 10 3.5C11 1.5 14.5 1.5 16.5 3.5C18.5 5.5 18.5 9 16.5 11L10 17.5Z"/>
                  </svg>
                </button>
                <div>
                  <div class="font-semibold text-gray-900 text-xs md:text-sm">{{ property.address.split(',')[0] }}</div>
                  <div class="text-[11px] md:text-sm text-gray-500">{{ property.address.split(',').slice(1).join(',').trim() }}</div>
                </div>
              </div>
            </td>
            <td class="py-3 md:py-4 px-3 md:px-4 text-gray-900 font-medium text-xs md:text-sm">${{ formatPrice(property.afterRepairValue) }}</td>
            <td class="py-3 md:py-4 px-3 md:px-4 text-gray-900 text-xs md:text-sm">{{ property.beds || '-' }}</td>
            <td class="py-3 md:py-4 px-3 md:px-4 text-gray-900 text-xs md:text-sm">{{ property.baths || '-' }}</td>
            <td class="py-3 md:py-4 px-3 md:px-4 text-gray-900 text-xs md:text-sm">{{ property.sqft ? property.sqft.toLocaleString() : '-' }}</td>
            <td class="py-3 md:py-4 px-3 md:px-4 text-gray-900 text-xs md:text-sm">{{ property.buildYear || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Grid View -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 mb-8">
      <PropertyCard 
        v-for="property in paginatedProperties" 
        :key="property.id"
        :property="property"
      />
    </div>
    
    <Pagination />
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import PropertyCard from './PropertyCard.vue'
import Pagination from './Pagination.vue'

export default {
  name: 'PropertyList',
  components: {
    PropertyCard,
    Pagination
  },
  setup() {
    const store = useStore()
    
    const paginatedProperties = computed(() => store.getters.paginatedProperties)
    const totalProperties = computed(() => store.getters.totalProperties)
    const viewMode = computed(() => store.state.viewMode)
    
    const setView = (mode) => {
      store.dispatch('setViewMode', mode)
    }
    
    const toggleView = () => {
      const newMode = viewMode.value === 'list' ? 'tile' : 'list'
      store.dispatch('setViewMode', newMode)
    }
    
    const handleSaveSearch = () => {
      store.dispatch('saveSearch')
      alert('Search saved successfully!')
    }
    
    const toggleFavorite = (propertyId) => {
      store.dispatch('toggleFavorite', propertyId)
    }
    
    const formatPrice = (price) => {
      if (!price) return '-'
      return price.toLocaleString()
    }
    const bedsBathsOpen = ref(false)
    const bedsBathsRef = ref(null)
    const bedsOptions = ['Any', '1+', '2+', '3+', '4+', '5+']
    const bathsOptions = ['Any', '1+', '1.5+', '2+', '3+', '4+']
    const selectedBeds = ref('Any')
    const selectedBaths = ref('Any')
    const useExactMatch = ref(false)

    const toggleBedsBaths = () => {
      bedsBathsOpen.value = !bedsBathsOpen.value
    }

    const selectBeds = (option) => {
      selectedBeds.value = option
    }

    const selectBaths = (option) => {
      selectedBaths.value = option
    }

    const applyBedsBaths = () => {
      bedsBathsOpen.value = false
    }

    const handleOutsideClick = (event) => {
      if (!bedsBathsRef.value) return
      if (bedsBathsRef.value.contains(event.target)) return

      bedsBathsOpen.value = false
    }

    onMounted(() => {
      document.addEventListener('click', handleOutsideClick)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleOutsideClick)
    })

    return {
      paginatedProperties,
      totalProperties,
      viewMode,
      setView,
      toggleView,
      handleSaveSearch,
      toggleFavorite,
      formatPrice,
      bedsBathsOpen,
      toggleBedsBaths,
      bedsOptions,
      bathsOptions,
      selectBeds,
      selectBaths,
      selectedBeds,
      selectedBaths,
      useExactMatch,
      applyBedsBaths,
      bedsBathsRef
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

