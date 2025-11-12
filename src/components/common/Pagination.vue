<template>
  <!-- Responsive pager shared by list + grid views -->
  <div class="flex flex-col sm:flex-row justify-between items-center py-4 md:py-6 gap-3">
    <div class="text-xs md:text-sm text-gray-500 font-medium">
      Showing page {{ currentPage }} of {{ totalPages }} pages
    </div>
    
    <div class="flex gap-1 md:gap-2 flex-wrap justify-center">
      <button 
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        class="py-1.5 md:py-2 px-3 md:px-4 border border-gray-300 bg-white text-gray-700 text-xs md:text-sm font-medium rounded-md cursor-pointer transition-all hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span class="hidden sm:inline">Previous</span>
        <span class="sm:hidden">Prev</span>
      </button>
      
      <button 
        v-for="page in visiblePages" 
        :key="page"
        :class="page === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'"
        @click="goToPage(page)"
        class="py-1.5 md:py-2 px-3 md:px-4 border text-xs md:text-sm font-medium rounded-md cursor-pointer transition-all min-w-[36px] md:min-w-[40px]"
      >
        {{ page }}
      </button>
      
      <button 
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        class="py-1.5 md:py-2 px-3 md:px-4 border border-gray-300 bg-white text-gray-700 text-xs md:text-sm font-medium rounded-md cursor-pointer transition-all hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

const MODULE = 'properties'

export default {
  name: 'Pagination',
  setup() {
    const store = useStore()
    
    const currentPage = computed(() => store.state[MODULE].currentPage)
    const totalPages = computed(() => store.getters[`${MODULE}/totalPages`])
    
    // Visible pager buttons clamp around the active page to avoid long pagination bars
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
        store.dispatch(`${MODULE}/setPage`, page)
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
