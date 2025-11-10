<template>
  <div class="p-3 md:p-4 lg:p-5 bg-white h-full relative">
    <!-- Loading Overlay -->
    <div 
      v-if="isLoading"
      class="absolute inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center"
    >
      <div class="flex flex-col items-center gap-3">
        <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-gray-600 font-medium">Loading properties...</p>
      </div>
    </div>

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
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1f7cd6]"></div>
          </label>
          
          <span 
            :class="viewMode === 'list' ? 'text-gray-900 font-semibold' : 'text-gray-500'"
            class="text-sm cursor-pointer"
            @click="setView('list')"
          >
            List
          </span>
          <span 
            :class="viewMode === 'tile' ? 'text-gray-900 font-semibold' : 'text-gray-500'"
            class="text-sm cursor-pointer"
            @click="setView('tile')"
          >
            Tile
          </span>
    </div>
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
      <div class="flex flex-wrap gap-2 md:gap-3 relative">
        <!-- Beds & Baths Dropdown -->
        <div class="relative">
          <button 
            @click="toggleBedsAndBaths"
            :class="isBedsAndBathsOpen ? 'bg-gray-100' : 'bg-white'"
            class="py-[5px] px-[10px] text-gray-700 text-xs md:text-sm font-medium cursor-pointer flex items-center gap-2 transition-all hover:bg-gray-50" 
            style="border: 1px solid #ccc; border-radius: 100em;"
          >
            Beds & Baths
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" class="text-gray-400">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Backdrop -->
          <div 
            v-if="isBedsAndBathsOpen"
            @click="isBedsAndBathsOpen = false"
            class="fixed inset-0 z-40"
          ></div>

          <!-- Dropdown Panel -->
          <div 
            v-if="isBedsAndBathsOpen"
            class="absolute top-full left-0 mt-2 w-[400px] max-w-[95vw] bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-5"
          >
            <!-- Number of Bedrooms -->
            <div class="mb-6">
              <h3 class="text-base font-semibold text-gray-700 mb-4">Number of Bedrooms</h3>
              <div class="inline-flex border border-gray-300 rounded-md overflow-hidden mb-4">
                <button 
                  v-for="(option, index) in bedroomOptions" 
                  :key="option.value"
                  @click="selectBedrooms(option.value)"
                  :class="[
                    tempBedrooms === option.value ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 hover:bg-gray-50',
                    index !== 0 ? 'border-l border-gray-300' : ''
                  ]"
                  class="py-2.5 px-4 text-sm font-medium transition-all"
                >
                  {{ option.label }}
                </button>
              </div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="exactMatch"
                  class="w-4 h-4 rounded border-gray-300"
                >
                <span class="text-sm text-gray-600">Use exact match</span>
              </label>
            </div>

            <!-- Number of Bathrooms -->
            <div class="mb-5">
              <h3 class="text-base font-semibold text-gray-700 mb-4">Number of Bathrooms</h3>
              <div class="inline-flex border border-gray-300 rounded-md overflow-hidden">
                <button 
                  v-for="(option, index) in bathroomOptions" 
                  :key="option.value"
                  @click="selectBathrooms(option.value)"
                  :class="[
                    tempBathrooms === option.value ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 hover:bg-gray-50',
                    index !== 0 ? 'border-l border-gray-300' : ''
                  ]"
                  class="py-2.5 px-4 text-sm font-medium transition-all"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>

            <!-- Apply Button -->
            <button 
              @click="applyBedsAndBaths"
              class="w-full py-2.5 bg-[#4a6b8a] text-white text-sm font-semibold rounded-md hover:bg-[#3d5a75] transition-all"
            >
              Apply
            </button>
          </div>
        </div>

        <button class="py-[5px] px-[10px] bg-white text-gray-700 text-xs md:text-sm font-medium cursor-pointer flex items-center gap-2 transition-all hover:bg-gray-50" style="border: 1px solid #ccc; border-radius: 100em;">
          Value & Debt
              <svg
                :class="valueDebtOpen ? 'rotate-180 text-[#0a2f3f]' : 'text-[#0a2f3f]'"
                class="transition-transform duration-200"
                width="12"
                height="7"
                viewBox="0 0 10 6"
                fill="none"
              >
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

            <transition name="fade">
              <div
                v-if="valueDebtOpen"
                class="absolute left-0 mt-2 w-[340px] sm:w-[360px] bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden"
              >
                <div class="bg-[#f7f9fc] px-4 py-3 text-sm font-semibold text-gray-600">
                  Estimated After Repair Value
                </div>

                <div class="p-4 md:p-5 space-y-5">
                  <div>
                    <div class="grid grid-cols-2 gap-4 mb-2 text-[13px] md:text-sm font-semibold text-gray-900">
                      <span>Minimum</span>
                      <span class="text-right">Maximum</span>
                    </div>
                    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                      <select v-model="arvMin" class="filter-select">
                        <option v-for="option in valueOptions" :key="`arv-min-${option}`" :value="option">
                          {{ option }}
                        </option>
                      </select>
                      <span class="text-gray-500 font-semibold">-</span>
                      <select v-model="arvMax" class="filter-select">
                        <option v-for="option in valueOptions" :key="`arv-max-${option}`" :value="option">
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="space-y-4 border-t border-gray-200 pt-4">
                    <div class="text-sm font-semibold text-gray-600">Foreclosure Amount</div>
                    <div>
                      <div class="grid grid-cols-2 gap-4 mb-2 text-[13px] md:text-sm font-semibold text-gray-900">
                        <span>Minimum</span>
                        <span class="text-right">Maximum</span>
                      </div>
                      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                        <select v-model="foreclosureMin" class="filter-select">
                          <option v-for="option in valueOptions" :key="`foreclosure-min-${option}`" :value="option">
                            {{ option }}
                          </option>
                        </select>
                        <span class="text-gray-500 font-semibold">-</span>
                        <select v-model="foreclosureMax" class="filter-select">
                          <option v-for="option in valueOptions" :key="`foreclosure-max-${option}`" :value="option">
                            {{ option }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4 border-t border-gray-200 pt-4">
                    <div class="flex items-center gap-2 text-sm font-semibold text-gray-600">
                      Loan Score
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-gray-400">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.2"/>
                        <path d="M8 4.75c-.69 0-1.25.56-1.25 1.25H8c0-.14.11-.25.25-.25h.25c.14 0 .25.11.25.25 0 .26-.15.4-.46.62-.45.32-.79.73-.79 1.38V9h1.5v-.16c0-.37.21-.58.55-.82.45-.32.95-.71.95-1.52 0-.97-.79-1.75-1.75-1.75H8Z" fill="currentColor"/>
                        <circle cx="8" cy="11.5" r=".6" fill="currentColor"/>
                      </svg>
                    </div>
                    <div>
                      <div class="grid grid-cols-2 gap-4 mb-2 text-[13px] md:text-sm font-semibold text-gray-900">
                        <span>Minimum</span>
                        <span class="text-right">Maximum</span>
                      </div>
                      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                        <select v-model="loanScoreMin" class="filter-select">
                          <option v-for="option in loanScoreOptions" :key="`loan-min-${option}`" :value="option">
                            {{ option }}
                          </option>
                        </select>
                        <span class="text-gray-500 font-semibold">-</span>
                        <select v-model="loanScoreMax" class="filter-select">
                          <option v-for="option in loanScoreOptions" :key="`loan-max-${option}`" :value="option">
                            {{ option }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="px-4 md:px-5 pb-5">
                  <button
                    class="w-full h-11 md:h-12 bg-[#1f527a] text-white text-sm md:text-base font-semibold rounded-lg hover:bg-[#184161] transition-colors"
                    @click="applyValueDebt"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </transition>
          </div>
        <button class="filter-chip">
          More
          <svg width="12" height="7" viewBox="0 0 10 6" fill="none" class="text-[#0a2f3f] transition-transform">
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="filter-chip">
          Filter
          <svg width="12" height="7" viewBox="0 0 10 6" fill="none" class="text-[#0a2f3f] transition-transform">
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      </div>
      
      <div class="flex flex-wrap items-center gap-4">
        <button 
          @click="handleSaveSearch"
          class="save-search-link"
        >
          <span>Save Search</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="8" stroke="#0a2f3f" stroke-width="1.5"/>
            <path d="M9 5.75C8.0335 5.75 7.25 6.5335 7.25 7.5H8.5C8.5 7.1885 8.6885 7 9 7H9.25C9.57494 7 9.8125 7.23756 9.8125 7.5625C9.8125 7.9875 9.53125 8.20625 9.04687 8.525C8.47344 8.90625 8 9.425 8 10.1875V10.5H9.25V10.3125C9.25 9.925 9.53125 9.69375 9.925 9.43125C10.475 9.0625 11.0625 8.6125 11.0625 7.5625C11.0625 6.54944 10.2631 5.75 9.25 5.75H9Z" fill="#0a2f3f"/>
            <circle cx="9" cy="12.5" r="0.75" fill="#0a2f3f"/>
          </svg>
        </button>
        <button class="export-button">
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
import { computed, ref } from 'vue'
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
    const isLoading = computed(() => store.state.isLoading)
    
    // Beds & Baths dropdown state
    const isBedsAndBathsOpen = ref(false)
    const tempBedrooms = ref(store.state.filters.beds)
    const tempBathrooms = ref(store.state.filters.baths)
    const exactMatch = ref(false)
    
    const bedroomOptions = [
      { label: 'Any', value: null },
      { label: '1+', value: 1 },
      { label: '2+', value: 2 },
      { label: '3+', value: 3 },
      { label: '4+', value: 4 },
      { label: '5+', value: 5 }
    ]
    
    const bathroomOptions = [
      { label: 'Any', value: null },
      { label: '1+', value: 1 },
      { label: '1.5+', value: 1.5 },
      { label: '2+', value: 2 },
      { label: '3+', value: 3 },
      { label: '4+', value: 4 }
    ]
    
    const toggleBedsAndBaths = () => {
      if (!isBedsAndBathsOpen.value) {
        // Sync temp values with current store filters when opening
        tempBedrooms.value = store.state.filters.beds
        tempBathrooms.value = store.state.filters.baths
      }
      isBedsAndBathsOpen.value = !isBedsAndBathsOpen.value
    }
    
    const selectBedrooms = (value) => {
      tempBedrooms.value = value
    }
    
    const selectBathrooms = (value) => {
      tempBathrooms.value = value
    }
    
    const applyBedsAndBaths = async () => {
      // Close dropdown immediately
      isBedsAndBathsOpen.value = false
      
      // Then update filters (even if null to clear them)
      await store.dispatch('updateFilter', {
        filterName: 'beds',
        value: tempBedrooms.value
      })
      await store.dispatch('updateFilter', {
        filterName: 'baths',
        value: tempBathrooms.value
      })
      console.log('Filters applied:', { beds: tempBedrooms.value, baths: tempBathrooms.value })
    }
    
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
    const valueDebtOpen = ref(false)
    const bedsBathsRef = ref(null)
    const valueDebtRef = ref(null)
    const bedsOptions = ['Any', '1+', '2+', '3+', '4+', '5+']
    const bathsOptions = ['Any', '1+', '1.5+', '2+', '3+', '4+']
    const selectedBeds = ref('Any')
    const selectedBaths = ref('Any')
    const useExactMatch = ref(false)
    const valueOptions = ['No Min', '$50K', '$100K', '$150K', '$200K', '$250K', '$300K', '$350K', '$400K', '$500K', '$750K', '$1M', 'No Max']
    const loanScoreOptions = ['No Min', '300', '400', '500', '600', '650', '700', '750', '800', '850', 'No Max']
    const arvMin = ref('No Min')
    const arvMax = ref('No Max')
    const foreclosureMin = ref('No Min')
    const foreclosureMax = ref('No Max')
    const loanScoreMin = ref('No Min')
    const loanScoreMax = ref('No Max')

    const toggleBedsBaths = () => {
      bedsBathsOpen.value = !bedsBathsOpen.value
      if (bedsBathsOpen.value) {
        valueDebtOpen.value = false
      }
    }

    const toggleValueDebt = () => {
      valueDebtOpen.value = !valueDebtOpen.value
      if (valueDebtOpen.value) {
        bedsBathsOpen.value = false
      }
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

    const applyValueDebt = () => {
      valueDebtOpen.value = false
    }

    const handleOutsideClick = (event) => {
      if (bedsBathsRef.value && !bedsBathsRef.value.contains(event.target)) {
        bedsBathsOpen.value = false
      }
      if (valueDebtRef.value && !valueDebtRef.value.contains(event.target)) {
        valueDebtOpen.value = false
      }
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
      isLoading,
      isBedsAndBathsOpen,
      tempBedrooms,
      tempBathrooms,
      exactMatch,
      bedroomOptions,
      bathroomOptions,
      toggleBedsAndBaths,
      selectBedrooms,
      selectBathrooms,
      applyBedsAndBaths,
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
      bedsBathsRef,
      valueDebtOpen,
      toggleValueDebt,
      valueOptions,
      loanScoreOptions,
      arvMin,
      arvMax,
      foreclosureMin,
      foreclosureMax,
      loanScoreMin,
      loanScoreMax,
      applyValueDebt,
      valueDebtRef
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

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1.1rem;
  border-radius: 9999px;
  border: 1.5px solid #d0d7df;
  background-color: #fff;
  color: #0a2f3f;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.filter-chip:hover {
  background-color: #f2f6f9;
  border-color: #b8c3cd;
  box-shadow: 0 2px 6px rgba(10, 47, 63, 0.08);
}

.filter-chip svg {
  flex-shrink: 0;
}

.save-search-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0;
  border: none;
  background: transparent;
  color: #0a3f63;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}

.save-search-link:hover {
  color: #0c5585;
}

.export-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 1.4rem;
  border-radius: 9999px;
  background-color: #d14727;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.export-button:hover {
  background-color: #b83b21;
  box-shadow: 0 4px 10px rgba(209, 71, 39, 0.25);
}

.filter-select {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #d0d7df;
  border-radius: 0.7rem;
  background-color: #f9fbff;
  color: #0a2f3f;
  font-size: 0.85rem;
  font-weight: 500;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #607088 50%), linear-gradient(135deg, #607088 50%, transparent 50%);
  background-position: calc(100% - 18px) calc(1.1rem), calc(100% - 13px) calc(1.1rem);
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #8ba8c5;
  box-shadow: 0 0 0 3px rgba(47, 106, 151, 0.15);
}
</style>

