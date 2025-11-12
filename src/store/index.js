import { createStore } from 'vuex'
import properties from './modules/properties'

// Additional modules slot in alongside `properties` as the app grows
export default createStore({
  modules: {
    properties
  }
})

