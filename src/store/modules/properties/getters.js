export default {
  // Shapes the property list with the active filter stack; debug logs surface coverage
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

    if (state.filters.county && state.filters.county !== 'All') {
      filtered = filtered.filter(p => p.county === state.filters.county)
      console.log('After county filter:', filtered.length, 'properties')
    }

    if (state.filters.beds) {
      filtered = filtered.filter(p => p.beds && p.beds >= state.filters.beds)
      console.log('After beds filter:', filtered.length, 'properties (beds >=', state.filters.beds, ')')
    }

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
  },
  isLoading: (state) => state.isLoading,
  viewMode: (state) => state.viewMode
}
