import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true, // allows consumers to target this module without key collisions
  state,
  mutations,
  actions,
  getters
}
