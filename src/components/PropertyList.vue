<template>
  <div class="property-list-container">
    <div class="list-header">
      <div class="list-info">
        <h2>Showing {{ totalProperties }} properties</h2>
      </div>
      
      <div class="list-controls">
        <div class="view-toggle">
          <span class="view-label">View</span>
          <button 
            class="view-btn"
            :class="{ active: viewMode === 'list' }"
            @click="setView('list')"
          >
            List
          </button>
          <button 
            class="view-btn"
            :class="{ active: viewMode === 'tile' }"
            @click="setView('tile')"
          >
            Tile
          </button>
        </div>
        
        <div class="filter-buttons">
          <button class="filter-btn">
            Beds & Baths
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="filter-btn">
            Value & Debt
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="filter-btn">
            More
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="filter-btn">
            Filter
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div class="action-bar">
      <button class="action-btn secondary" @click="handleSaveSearch">
        Save Search
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="2"/>
          <path d="M7 4v6M4 7h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="action-btn primary">Export List</button>
    </div>
    
    <div class="properties-grid" :class="{ 'list-view': viewMode === 'list' }">
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
import { computed } from 'vue'
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
    
    const handleSaveSearch = () => {
      store.dispatch('saveSearch')
      alert('Search saved successfully!')
    }
    
    return {
      paginatedProperties,
      totalProperties,
      viewMode,
      setView,
      handleSaveSearch
    }
  }
}
</script>

<style scoped>
.property-list-container {
  padding: 1.5rem;
  background: white;
  height: 100%;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.list-info h2 {
  font-size: 18px;
  color: #6b7280;
  font-weight: 400;
  margin: 0;
}

.list-controls {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.view-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.view-label {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.view-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn:first-of-type {
  border-radius: 6px 0 0 6px;
}

.view-btn:last-of-type {
  border-radius: 0 6px 6px 0;
  border-left: none;
}

.view-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.view-btn:not(.active):hover {
  background: #f9fafb;
}

.filter-buttons {
  display: flex;
  gap: 0.75rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.filter-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.filter-btn svg {
  color: #6b7280;
}

.action-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.action-btn {
  padding: 0.65rem 1.25rem;
  border: none;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.action-btn.secondary {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
}

.action-btn.secondary:hover {
  background: #f9fafb;
}

.action-btn.primary {
  background: #dc2626;
  color: white;
}

.action-btn.primary:hover {
  background: #b91c1c;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.properties-grid.list-view {
  grid-template-columns: 1fr;
}

@media (max-width: 1200px) {
  .properties-grid:not(.list-view) {
    grid-template-columns: 1fr;
  }
}
</style>

