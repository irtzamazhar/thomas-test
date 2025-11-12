import {
  SET_FILTER,
  SET_VIEW_MODE,
  SET_CURRENT_PAGE,
  SET_LOADING,
  SAVE_SEARCH,
  TOGGLE_FAVORITE
} from '../../mutation-types'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Actions encapsulate async UX flows (loading states, debounced updates, etc.)
export default {
  async updateFilter({ commit }, payload) {
    const showLoading = payload.filterName === 'beds' || payload.filterName === 'baths'

    if (showLoading) {
      commit(SET_LOADING, true)
      await delay(500)
    }

    commit(SET_FILTER, payload)
    commit(SET_CURRENT_PAGE, 1)

    if (showLoading) {
      commit(SET_LOADING, false)
    }
  },
  setViewMode({ commit }, mode) {
    commit(SET_VIEW_MODE, mode)
  },
  async setPage({ commit }, page) {
    commit(SET_LOADING, true)
    await delay(300)
    commit(SET_CURRENT_PAGE, page)
    commit(SET_LOADING, false)
  },
  saveSearch({ commit }) {
    commit(SAVE_SEARCH)
  },
  toggleFavorite({ commit }, propertyId) {
    commit(TOGGLE_FAVORITE, propertyId)
  }
}
