<template>
  <div class="flex flex-wrap gap-4 md:gap-6 py-4 md:py-5 px-4 md:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
    <div class="flex flex-col gap-1 w-full sm:w-auto">
      <label class="text-xs md:text-[13px] text-gray-500 font-medium">County</label>
      <select 
        v-model="selectedCounty" 
        @change="updateCountyFilter"
        class="py-2 pr-8 pl-3 border border-gray-300 rounded-md bg-white text-sm text-gray-800 cursor-pointer w-full sm:min-w-[150px] appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width=%2712%27%20height=%278%27%20viewBox=%270%200%2012%208%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M1%201L6%206L11%201%27%20stroke=%27%236b7280%27%20stroke-width=%272%27%20stroke-linecap=%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.75rem_center] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >
        <option v-for="county in counties" :key="county" :value="county">
          {{ county }}
        </option>
      </select>
    </div>
    
    <div class="flex flex-col gap-1 w-full sm:w-auto">
      <label class="text-xs md:text-[13px] text-gray-500 font-medium">Month</label>
      <select 
        v-model="selectedMonth" 
        @change="updateMonthFilter"
        class="py-2 pr-8 pl-3 border border-gray-300 rounded-md bg-white text-sm text-gray-800 cursor-pointer w-full sm:min-w-[150px] appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width=%2712%27%20height=%278%27%20viewBox=%270%200%2012%208%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M1%201L6%206L11%201%27%20stroke=%27%236b7280%27%20stroke-width=%272%27%20stroke-linecap=%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.75rem_center] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >
        <option value="All">All</option>
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
    </div>
    
    <div class="flex flex-col gap-1 w-full sm:w-auto">
      <label class="text-xs md:text-[13px] text-gray-500 font-medium">List</label>
      <select 
        v-model="selectedList" 
        @change="updateListFilter"
        class="py-2 pr-8 pl-3 border border-gray-300 rounded-md bg-white text-sm text-gray-800 cursor-pointer w-full sm:min-w-[150px] appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width=%2712%27%20height=%278%27%20viewBox=%270%200%2012%208%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M1%201L6%206L11%201%27%20stroke=%27%236b7280%27%20stroke-width=%272%27%20stroke-linecap=%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.75rem_center] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >
        <option value="All">All</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="Land">Land</option>
      </select>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FilterBar',
  setup() {
    const store = useStore()
    
    const counties = computed(() => store.getters.counties)
    const selectedCounty = ref('All')
    const selectedMonth = ref('All')
    const selectedList = ref('All')
    
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
    
    return {
      counties,
      selectedCounty,
      selectedMonth,
      selectedList,
      updateCountyFilter,
      updateMonthFilter,
      updateListFilter
    }
  }
}
</script>

