import {
  SET_FILTER,
  SET_VIEW_MODE,
  SET_CURRENT_PAGE,
  SAVE_SEARCH,
  TOGGLE_FAVORITE,
  SET_LOADING
} from '../../mutation-types'

// Mutations mutate local module state only; logs assist with UX debugging
export default {
  [SET_FILTER](state, { filterName, value }) {
    state.filters[filterName] = value
    console.log('Filter updated:', filterName, '=', value)
    console.log('All filters:', state.filters)
  },
  [SET_VIEW_MODE](state, mode) {
    state.viewMode = mode
  },
  [SET_CURRENT_PAGE](state, page) {
    state.currentPage = page
  },
  [SAVE_SEARCH](state) {
    state.savedSearches.push({
      id: Date.now(),
      filters: { ...state.filters },
      timestamp: new Date().toISOString()
    })
  },
  [TOGGLE_FAVORITE](state, propertyId) {
    const property = state.properties.find(p => p.id === propertyId)
    if (property) {
      property.isFavorite = !property.isFavorite
    }
  },
  [SET_LOADING](state, isLoading) {
    state.isLoading = isLoading
  }
}
