import { createStore } from 'vuex'

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
    loanScore: 720,
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
    loanScore: 680,
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
    loanScore: 640,
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
    loanScore: 705,
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
    loanScore: 760,
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
    loanScore: 690,
    zillowUrl: 'https://www.zillow.com/homedetails/45678901',
    lat: 33.7748,
    lng: -84.2963
  },
  {
    id: 7,
    address: '2146 Brookview Drive, Austell, GA 30106',
    county: 'Cobb',
    price: 275000,
    afterRepairValue: 355000,
    foreclosureAmt: 210000,
    beds: 4,
    baths: 2,
    sqft: 1980,
    buildYear: 2002,
    image: 'https://images.unsplash.com/photo-1600585154340-0ef3c08dcdb6?w=500&h=300&fit=crop',
    month: 'July',
    loanScore: 710,
    zillowUrl: 'https://www.zillow.com/homedetails/56789012',
    lat: 33.8124,
    lng: -84.6256
  },
  {
    id: 8,
    address: '88 Peachtree Circle NE, Atlanta, GA 30309',
    county: 'Fulton',
    price: 420000,
    afterRepairValue: 540000,
    foreclosureAmt: 310000,
    beds: 3,
    baths: 2.5,
    sqft: 2150,
    buildYear: 2015,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop',
    month: 'August',
    loanScore: 775,
    zillowUrl: 'https://www.zillow.com/homedetails/67890123',
    lat: 33.7905,
    lng: -84.3831
  },
  {
    id: 9,
    address: '1572 Northlake Way, Tucker, GA 30084',
    county: 'DeKalb',
    price: 235000,
    afterRepairValue: 315000,
    foreclosureAmt: 190000,
    beds: 3,
    baths: 2,
    sqft: 1725,
    buildYear: 1992,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&h=300&fit=crop',
    month: 'September',
    loanScore: 655,
    zillowUrl: 'https://www.zillow.com/homedetails/78901234',
    lat: 33.8504,
    lng: -84.2043
  },
  {
    id: 10,
    address: '1184 Summit Chase Drive, Loganville, GA 30052',
    county: 'Gwinnett',
    price: 315000,
    afterRepairValue: 415000,
    foreclosureAmt: 260000,
    beds: 4,
    baths: 3,
    sqft: 2520,
    buildYear: 2007,
    image: 'https://images.unsplash.com/photo-1605276374104-0a114bb55c57?w=500&h=300&fit=crop',
    month: 'October',
    loanScore: 702,
    zillowUrl: 'https://www.zillow.com/homedetails/89012345',
    lat: 33.8445,
    lng: -83.8968
  },
  {
    id: 11,
    address: '609 River Mist Drive, Suwanee, GA 30024',
    county: 'Gwinnett',
    price: 495000,
    afterRepairValue: 610000,
    foreclosureAmt: 350000,
    beds: 5,
    baths: 4,
    sqft: 3150,
    buildYear: 2013,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
    month: 'November',
    loanScore: 790,
    zillowUrl: 'https://www.zillow.com/homedetails/90123456',
    lat: 34.0498,
    lng: -84.0719
  },
  {
    id: 12,
    address: '220 Kings Row, Peachtree City, GA 30269',
    county: 'Fayette',
    price: 365000,
    afterRepairValue: 470000,
    foreclosureAmt: 295000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    buildYear: 2008,
    image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?w=500&h=300&fit=crop',
    month: 'December',
    loanScore: 735,
    zillowUrl: 'https://www.zillow.com/homedetails/91234567',
    lat: 33.3943,
    lng: -84.5955
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
        maxDebt: null,
        minLoanScore: null,
        maxLoanScore: null
      },
      viewMode: 'tile',
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
      
      if (state.filters.minValue) {
        filtered = filtered.filter(p => p.afterRepairValue && p.afterRepairValue >= state.filters.minValue)
      }

      if (state.filters.maxValue) {
        filtered = filtered.filter(p => p.afterRepairValue && p.afterRepairValue <= state.filters.maxValue)
      }

      if (state.filters.minDebt) {
        filtered = filtered.filter(p => p.foreclosureAmt && p.foreclosureAmt >= state.filters.minDebt)
      }

      if (state.filters.maxDebt) {
        filtered = filtered.filter(p => p.foreclosureAmt && p.foreclosureAmt <= state.filters.maxDebt)
      }

      if (state.filters.minLoanScore) {
        filtered = filtered.filter(p => p.loanScore && p.loanScore >= state.filters.minLoanScore)
      }

      if (state.filters.maxLoanScore) {
        filtered = filtered.filter(p => p.loanScore && p.loanScore <= state.filters.maxLoanScore)
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

