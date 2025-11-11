import { createStore } from 'vuex'

// Mock property data
const mockProperties = [
  {
    id: 1,
    address: '425 Steele Drive, Hampton, GA 30228',
    county: 'Henry',
    price: 713000,
    afterRepairValue: 143800,
    foreclosureAmt: null,
    beds: null,
    baths: null,
    sqft: null,
    buildYear: 1999,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=300&fit=crop',
    month: 'January',
    zillowUrl: 'https://www.zillow.com/homedetails/80143132',
    lat: 33.3895,
    lng: -84.2945
  },
  {
    id: 2,
    address: '5352 Sweetsprings Court Southwest, Powder Springs, GA 30127',
    county: 'Cobb',
    price: null,
    afterRepairValue: 143800,
    foreclosureAmt: null,
    beds: null,
    baths: null,
    sqft: null,
    buildYear: 1988,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop',
    month: 'February',
    zillowUrl: 'https://www.zillow.com/homedetails/14843816',
    lat: 33.8712,
    lng: -84.6160
  },
  {
    id: 3,
    address: '123 Main Street, Atlanta, GA 30303',
    county: 'Fulton',
    price: 250000,
    afterRepairValue: 320000,
    foreclosureAmt: 180000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    buildYear: 1998,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&h=300&fit=crop',
    month: 'March',
    zillowUrl: 'https://www.zillow.com/homedetails/12345678',
    lat: 33.7490,
    lng: -84.3880
  },
  {
    id: 4,
    address: '456 Oak Avenue, Marietta, GA 30060',
    county: 'Cobb',
    price: 185000,
    afterRepairValue: 245000,
    foreclosureAmt: 150000,
    beds: 4,
    baths: 2.5,
    sqft: 2100,
    buildYear: 2005,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop',
    month: 'April',
    zillowUrl: 'https://www.zillow.com/homedetails/23456789',
    lat: 33.9526,
    lng: -84.5499
  },
  {
    id: 5,
    address: '789 Pine Road, Roswell, GA 30075',
    county: 'Fulton',
    price: 320000,
    afterRepairValue: 395000,
    foreclosureAmt: 280000,
    beds: 5,
    baths: 3,
    sqft: 2850,
    buildYear: 2010,
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=500&h=300&fit=crop',
    month: 'May',
    zillowUrl: 'https://www.zillow.com/homedetails/34567890',
    lat: 34.0232,
    lng: -84.3616
  },
  {
    id: 6,
    address: '321 Elm Street, Decatur, GA 30030',
    county: 'DeKalb',
    price: 195000,
    afterRepairValue: 265000,
    foreclosureAmt: 170000,
    beds: 3,
    baths: 2,
    sqft: 1650,
    buildYear: 1995,
    image: 'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=500&h=300&fit=crop',
    month: 'June',
    zillowUrl: 'https://www.zillow.com/homedetails/45678901',
    lat: 33.7748,
    lng: -84.2963
  }
]

export default createStore({
  state() {
    return {
      properties: mockProperties,
      filters: {
        county: 'All',
        month: 'All',
        list: 'All',
        beds: null,
        baths: null,
        minValue: null,
        maxValue: null,
        minDebt: null,
        maxDebt: null
      },
      viewMode: 'tile', // 'list' or 'tile'
      currentPage: 1,
      itemsPerPage: 6,
      savedSearches: [],
      isLoading: false
    }
  },
  mutations: {
    SET_FILTER(state, { filterName, value }) {
      state.filters[filterName] = value
      console.log('Filter updated:', filterName, '=', value)
      console.log('All filters:', state.filters)
    },
    SET_VIEW_MODE(state, mode) {
      state.viewMode = mode
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page
    },
    SAVE_SEARCH(state, search) {
      state.savedSearches.push({
        id: Date.now(),
        filters: { ...state.filters },
        timestamp: new Date().toISOString()
      })
    },
    TOGGLE_FAVORITE(state, propertyId) {
      const property = state.properties.find(p => p.id === propertyId)
      if (property) {
        property.isFavorite = !property.isFavorite
      }
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions: {
    async updateFilter({ commit }, payload) {
      // Only show loading for property list filters (beds/baths), not map filters
      const showLoading = payload.filterName === 'beds' || payload.filterName === 'baths'
      
      if (showLoading) {
        commit('SET_LOADING', true)
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      
      commit('SET_FILTER', payload)
      commit('SET_CURRENT_PAGE', 1) // Reset to first page when filters change
      
      if (showLoading) {
        commit('SET_LOADING', false)
      }
    },
    setViewMode({ commit }, mode) {
      commit('SET_VIEW_MODE', mode)
    },
    async setPage({ commit }, page) {
      commit('SET_LOADING', true)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      commit('SET_CURRENT_PAGE', page)
      commit('SET_LOADING', false)
    },
    saveSearch({ commit }) {
      commit('SAVE_SEARCH')
    },
    toggleFavorite({ commit }, propertyId) {
      commit('TOGGLE_FAVORITE', propertyId)
    }
  },
  getters: {
    filteredProperties: (state) => {
      let filtered = [...state.properties]
      console.log('Starting filter with', filtered.length, 'properties')
      if (state.filters.month && state.filters.month !== 'All') {
        filtered = filtered.filter(p => p.month === state.filters.month)
        console.log('After month filter:', filtered.length, 'properties')
      }
      
      // Apply county filter
      if (state.filters.county && state.filters.county !== 'All') {
        filtered = filtered.filter(p => p.county === state.filters.county)
        console.log('After county filter:', filtered.length, 'properties')
      }
      
      // Apply beds filter
      if (state.filters.beds) {
        filtered = filtered.filter(p => p.beds && p.beds >= state.filters.beds)
        console.log('After beds filter:', filtered.length, 'properties (beds >=', state.filters.beds, ')')
      }
      
      // Apply baths filter
      if (state.filters.baths) {
        filtered = filtered.filter(p => p.baths && p.baths >= state.filters.baths)
        console.log('After baths filter:', filtered.length, 'properties (baths >=', state.filters.baths, ')')
      }
      
      console.log('Final filtered count:', filtered.length)
      return filtered
    },
    paginatedProperties: (state, getters) => {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return getters.filteredProperties.slice(start, end)
    },
    totalPages: (state, getters) => {
      return Math.ceil(getters.filteredProperties.length / state.itemsPerPage)
    },
    totalProperties: (state, getters) => {
      return getters.filteredProperties.length
    },
    counties: (state) => {
      const counties = [...new Set(state.properties.map(p => p.county))]
      return ['All', ...counties.sort()]
    }
  }
})

