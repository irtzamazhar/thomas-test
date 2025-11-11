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
    
    <div class="relative mb-5">
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
        <div class="relative" ref="valueDebtRef">
          <button
            @click="toggleValueDebt"
            class="py-[5px] px-[10px] bg-white text-gray-700 text-xs md:text-sm font-medium cursor-pointer flex items-center gap-2 transition-all hover:bg-gray-50"
            style="border: 1px solid #ccc; border-radius: 100em;"
          >
            Value & Debt
            <svg
              :class="valueDebtOpen ? 'rotate-180 text-gray-600' : 'text-gray-400'"
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
              v-if="valueDebtOpen"
              class="absolute left-0 mt-2 w-[340px] sm:w-[360px] bg-white rounded-2xl shadow-xl border border-gray-200 z-30 overflow-hidden"
            >
              <div class="bg-[#eef2f7] text-xs font-semibold text-gray-600 uppercase tracking-[0.08em] px-5 py-3 border-b border-gray-200">
                Estimated After Repair Value
              </div>
              <div class="px-5 py-4 space-y-5">
                <div class="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                  <div class="space-y-1.5">
                    <div class="text-sm font-semibold text-gray-800">Minimum</div>
                    <select v-model="selectedArvMin" class="value-select">
                      <option v-for="option in valueOptions" :key="`arv-min-${option}`" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <div class="text-2xl font-semibold text-gray-400">-</div>
                  <div class="space-y-1.5">
                    <div class="text-sm font-semibold text-gray-800">Maximum</div>
                    <select v-model="selectedArvMax" class="value-select">
                      <option v-for="option in valueOptions" :key="`arv-max-${option}`" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="bg-[#eef2f7] text-xs font-semibold text-gray-600 uppercase tracking-[0.08em] px-5 py-3 border-y border-gray-200">
                Foreclosure Amount
              </div>
              <div class="px-5 py-4 space-y-5">
                <div class="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                  <div class="space-y-1.5">
                    <div class="text-sm font-semibold text-gray-800">Minimum</div>
                    <select v-model="selectedDebtMin" class="value-select">
                      <option v-for="option in debtOptions" :key="`debt-min-${option}`" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <div class="text-2xl font-semibold text-gray-400">-</div>
                  <div class="space-y-1.5">
                    <div class="text-sm font-semibold text-gray-800">Maximum</div>
                    <select v-model="selectedDebtMax" class="value-select">
                      <option v-for="option in debtOptions" :key="`debt-max-${option}`" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="bg-[#eef2f7] text-xs font-semibold text-gray-600 uppercase tracking-[0.08em] px-5 py-3 border-y border-gray-200 flex items-center gap-2">
                Loan Score
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="text-gray-400">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.2"/>
                  <path d="M8 4.75c-.69 0-1.25.56-1.25 1.25H8c0-.14.11-.25.25-.25h.25c.14 0 .25.11.25.25 0 .26-.15.4-.46.62-.45.32-.79.73-.79 1.38V9h1.5v-.16c0-.37.21-.58.55-.82.45-.32.95-.71.95-1.52 0-.97-.79-1.75-1.75-1.75H8Z" fill="currentColor"/>
                  <circle cx="8" cy="11.5" r=".6" fill="currentColor"/>
                </svg>
              </div>
              <div class="px-5 py-4 space-y-5">
                <div class="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                  <div class="space-y-1.5">
                    <div class="text-sm font-semibold text-gray-800">Minimum</div>
                    <select v-model="selectedLoanMin" class="value-select">
                      <option v-for="option in loanScoreOptions" :key="`loan-min-${option}`" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <div class="text-2xl font-semibold text-gray-400">-</div>
                  <div class="space-y-1.5">
                    <div class="text-sm font-semibold text-gray-800">Maximum</div>
                    <select v-model="selectedLoanMax" class="value-select">
                      <option v-for="option in loanScoreOptions" :key="`loan-max-${option}`" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="px-5 pb-5">
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
    </div>
      
    <div class="flex flex-wrap gap-2 md:gap-3 mb-4">
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
    
    <!-- Table View -->
    <div v-if="viewMode === 'list'" class="mb-8 bg-white rounded-lg shadow-sm overflow-x-auto">
      <table class="w-full min-w-[900px]">
        <thead class="bg-[#3a5a7a] text-white">
          <tr>
            <th class="text-left py-3 md:py-4 px-4 md:px-6 font-semibold text-xs md:text-sm">Address</th>
            <th class="text-left py-3 md:py-4 px-3 md:px-4 font-semibold text-xs md:text-sm">Month</th>
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
            <td class="py-3 md:py-4 px-3 md:px-4 text-gray-900 text-xs md:text-sm">{{ property.month || '-' }}</td>
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
    const valueDebtOpen = ref(false)
    const valueDebtRef = ref(null)

    const valueOptionEntries = [
      ['No Min', null],
      ['$50K', 50_000],
      ['$100K', 100_000],
      ['$150K', 150_000],
      ['$200K', 200_000],
      ['$250K', 250_000],
      ['$300K', 300_000],
      ['$350K', 350_000],
      ['$400K', 400_000],
      ['$500K', 500_000],
      ['$750K', 750_000],
      ['$1M', 1_000_000],
      ['$1.5M', 1_500_000],
      ['$2M', 2_000_000],
      ['$5M', 5_000_000],
      ['No Max', null]
    ]

    const debtOptionEntries = [
      ['No Min', null],
      ['$10K', 10_000],
      ['$25K', 25_000],
      ['$50K', 50_000],
      ['$75K', 75_000],
      ['$100K', 100_000],
      ['$150K', 150_000],
      ['$200K', 200_000],
      ['$250K', 250_000],
      ['$500K', 500_000],
      ['No Max', null]
    ]

    const loanScoreOptionEntries = [
      ['No Min', null],
      ['500', 500],
      ['550', 550],
      ['600', 600],
      ['650', 650],
      ['700', 700],
      ['750', 750],
      ['800', 800],
      ['850', 850],
      ['No Max', null]
    ]

    const valueOptions = valueOptionEntries.map(([label]) => label)
    const debtOptions = debtOptionEntries.map(([label]) => label)
    const loanScoreOptions = loanScoreOptionEntries.map(([label]) => label)

    const selectedArvMin = ref('No Min')
    const selectedArvMax = ref('No Max')
    const selectedDebtMin = ref('No Min')
    const selectedDebtMax = ref('No Max')
    const selectedLoanMin = ref('No Min')
    const selectedLoanMax = ref('No Max')

    const findOptionByValue = (entries, value, fallback) => {
      if (value === null || value === undefined) return fallback
      const entry = entries.find(([, val]) => val === value)
      return entry ? entry[0] : fallback
    }

    const parseOptionValue = (entries, option, isMax = false) => {
      if (option === 'No Min' || option === 'No Max') return null
      const entry = entries.find(([label]) => label === option)
      return entry ? entry[1] : null
    }

    const syncValueDebtState = () => {
      const filters = store.state.filters
      selectedArvMin.value = findOptionByValue(valueOptionEntries, filters.minValue, 'No Min')
      selectedArvMax.value = findOptionByValue(valueOptionEntries, filters.maxValue, 'No Max')
      selectedDebtMin.value = findOptionByValue(debtOptionEntries, filters.minDebt, 'No Min')
      selectedDebtMax.value = findOptionByValue(debtOptionEntries, filters.maxDebt, 'No Max')
      selectedLoanMin.value = findOptionByValue(loanScoreOptionEntries, filters.minLoanScore, 'No Min')
      selectedLoanMax.value = findOptionByValue(loanScoreOptionEntries, filters.maxLoanScore, 'No Max')
    }

    const toggleBedsBaths = () => {
      bedsBathsOpen.value = !bedsBathsOpen.value
      if (bedsBathsOpen.value) {
        valueDebtOpen.value = false
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

    const toggleValueDebt = () => {
      valueDebtOpen.value = !valueDebtOpen.value
      if (valueDebtOpen.value) {
        bedsBathsOpen.value = false
      }
    }

    const applyValueDebt = async () => {
      const payloads = [
        { filterName: 'minValue', value: parseOptionValue(valueOptionEntries, selectedArvMin.value) },
        { filterName: 'maxValue', value: parseOptionValue(valueOptionEntries, selectedArvMax.value) },
        { filterName: 'minDebt', value: parseOptionValue(debtOptionEntries, selectedDebtMin.value) },
        { filterName: 'maxDebt', value: parseOptionValue(debtOptionEntries, selectedDebtMax.value) },
        { filterName: 'minLoanScore', value: parseOptionValue(loanScoreOptionEntries, selectedLoanMin.value) },
        { filterName: 'maxLoanScore', value: parseOptionValue(loanScoreOptionEntries, selectedLoanMax.value) }
      ]

      await Promise.all(payloads.map(payload => store.dispatch('updateFilter', payload)))
      valueDebtOpen.value = false
    }

    const handleOutsideClick = (event) => {
      const target = event.target

      if (bedsBathsRef.value && !bedsBathsRef.value.contains(target)) {
        bedsBathsOpen.value = false
      }

      if (valueDebtRef.value && !valueDebtRef.value.contains(target)) {
        valueDebtOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleOutsideClick)
      syncValueDebtState()
    })

    watch(
      () => store.state.filters,
      () => syncValueDebtState(),
      { deep: true }
    )

    watch(valueDebtOpen, (open) => {
      if (open) {
        syncValueDebtState()
      }
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
      bedsBathsRef,
      valueDebtOpen,
      toggleValueDebt,
      applyValueDebt,
      valueOptions,
      debtOptions,
      loanScoreOptions,
      selectedArvMin,
      selectedArvMax,
      selectedDebtMin,
      selectedDebtMax,
      selectedLoanMin,
      selectedLoanMax,
      valueDebtRef
    }
  }
}
</script>

<style scoped>
.value-select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d9e2;
  border-radius: 12px;
  background-color: #ffffff;
  font-size: 0.85rem;
  color: #142c40;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23617186' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
}

.value-select:focus {
  outline: none;
  border-color: #1f527a;
  box-shadow: 0 0 0 2px rgba(31, 82, 122, 0.15);
}

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

