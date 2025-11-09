<template>
  <div class="pagination">
    <div class="pagination-info">
      Showing page {{ currentPage }} of {{ totalPages }} pages
    </div>
    
    <div class="pagination-controls">
      <button 
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>
      
      <button 
        v-for="page in visiblePages" 
        :key="page"
        class="pagination-btn page-number"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      
      <button 
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Pagination',
  setup() {
    const store = useStore()
    
    const currentPage = computed(() => store.state.currentPage)
    const totalPages = computed(() => store.getters.totalPages)
    
    const visiblePages = computed(() => {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
      let end = Math.min(totalPages.value, start + maxVisible - 1)
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    })
    
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        store.dispatch('setPage', page)
      }
    }
    
    return {
      currentPage,
      totalPages,
      visiblePages,
      goToPage
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
}

.pagination-info {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.pagination-controls {
  display: flex;
  gap: 0.5rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 44px;
}

.pagination-btn:hover:not(:disabled):not(.active) {
  background: #f9fafb;
  border-color: #9ca3af;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn.page-number {
  min-width: 40px;
}

.pagination-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}
</style>

