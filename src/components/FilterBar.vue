<template>
  <div class="filter-bar">
    <div class="filter-dropdown">
      <label>County</label>
      <select v-model="selectedCounty" @change="updateCountyFilter">
        <option v-for="county in counties" :key="county" :value="county">
          {{ county }}
        </option>
      </select>
    </div>
    
    <div class="filter-dropdown">
      <label>Month</label>
      <select v-model="selectedMonth" @change="updateMonthFilter">
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
    
    <div class="filter-dropdown">
      <label>List</label>
      <select v-model="selectedList" @change="updateListFilter">
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

<style scoped>
.filter-bar {
  display: flex;
  gap: 1.5rem;
  padding: 1.25rem 2rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.filter-dropdown {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.filter-dropdown label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.filter-dropdown select {
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 14px;
  color: #1f2937;
  cursor: pointer;
  min-width: 150px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236b7280' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
}

.filter-dropdown select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>

