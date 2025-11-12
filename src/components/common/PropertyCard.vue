<template>
  <!-- Compact property summary card used across tile view and map info windows -->
  <div class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 flex flex-col">
    <div class="relative w-full h-[200px] overflow-hidden">
      <img :src="property.image" :alt="property.address" class="w-full h-full object-cover" />
      <div class="absolute top-3 left-3 bg-white py-1 px-3 rounded text-xs font-semibold text-gray-800 shadow-sm">
        {{ property.county }}
      </div>
      <button 
        @click="handleToggleFavorite"
        class="absolute top-3 right-3 bg-white border-none w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-sm text-red-500 transition-transform hover:scale-110"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" :fill="property.isFavorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
          <path d="M10 17.5L3.5 11C1.5 9 1.5 5.5 3.5 3.5C5.5 1.5 9 1.5 10 3.5C11 1.5 14.5 1.5 16.5 3.5C18.5 5.5 18.5 9 16.5 11L10 17.5Z"/>
        </svg>
      </button>
    </div>
    
    <div class="p-3 flex-1">
      <h3 class="text-sm font-semibold text-gray-900 mb-1 leading-tight">{{ property.address }}</h3>
      <div class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
        {{ property.month || 'N/A' }}
      </div>
      
      <div class="grid grid-cols-2 gap-2">
        <div class="px-2.5 py-2 rounded bg-[#2c5282] text-white">
          <div class="text-[10px] font-medium mb-0.5 opacity-90">After Repair Value</div>
          <div class="text-lg font-bold">${{ formatPrice(property.afterRepairValue) }}</div>
        </div>
        <div class="px-2.5 py-2 rounded bg-gray-100 text-gray-900">
          <div class="text-[10px] font-medium mb-0.5 text-gray-600">Foreclosure Amt</div>
          <div class="text-lg font-bold">{{ property.foreclosureAmt ? '$' + formatPrice(property.foreclosureAmt) : '$-' }}</div>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-4 border-t border-gray-200 bg-gray-50">
      <div class="text-center py-2.5 border-r border-gray-200">
        <div class="text-xs text-gray-600 font-medium mb-0.5">Beds</div>
        <div class="text-base text-gray-900 font-bold">{{ property.beds || '-' }}</div>
      </div>
      <div class="text-center py-2.5 border-r border-gray-200">
        <div class="text-xs text-gray-600 font-medium mb-0.5">Baths</div>
        <div class="text-base text-gray-900 font-bold">{{ property.baths || '-' }}</div>
      </div>
      <div class="text-center py-2.5 border-r border-gray-200">
        <div class="text-xs text-gray-600 font-medium mb-0.5">Sq. Ft.</div>
        <div class="text-base text-gray-900 font-bold">{{ property.sqft ? property.sqft.toLocaleString() : '-' }}</div>
      </div>
      <div class="text-center py-2.5">
        <div class="text-xs text-gray-600 font-medium mb-0.5">Built</div>
        <div class="text-base text-gray-900 font-bold">{{ property.buildYear || '-' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

const MODULE = 'properties'

export default {
  name: 'PropertyCard',
  props: {
    property: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    
    // Formatting helpers keep template lean and readable
    const formatPrice = (price) => {
      if (!price) return '-'
      return price.toLocaleString()
    }
    
    const handleToggleFavorite = () => {
      store.dispatch(`${MODULE}/toggleFavorite`, props.property.id)
    }
    
    return {
      formatPrice,
      handleToggleFavorite
    }
  }
}
</script>
