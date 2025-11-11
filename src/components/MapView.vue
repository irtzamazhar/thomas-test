<template>
  <div class="map-wrapper">
    <div ref="mapElement" class="map-canvas"></div>

    <div class="map-toolbar">
      <div class="toolbar-chip">
        <label class="toolbar-label" for="county">County</label>
        <select id="county" v-model="selectedCounty" @change="updateCountyFilter" class="toolbar-select">
          <option value="All">All Counties</option>
          <option v-for="county in counties.filter(c => c !== 'All')" :key="county" :value="county">
            {{ county }}
          </option>
        </select>
      </div>

      <div class="toolbar-chip">
        <label class="toolbar-label" for="month">Month</label>
        <select id="month" v-model="selectedMonth" @change="updateMonthFilter" class="toolbar-select">
          <option value="All">All Months</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <div class="toolbar-chip">
        <label class="toolbar-label" for="list">List</label>
        <select id="list" v-model="selectedList" @change="updateListFilter" class="toolbar-select">
          <option value="All">All Types</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Land">Land</option>
        </select>
      </div>
    </div>

    <div class="map-type-toggle">
      <button
        :class="['toggle-btn', mapType === 'roadmap' ? 'toggle-btn--active' : '']"
        @click="setMapType('roadmap')"
      >
        Map
      </button>
      <button
        :class="['toggle-btn', mapType === 'satellite' ? 'toggle-btn--active' : '']"
        @click="setMapType('satellite')"
      >
        Satellite
      </button>
    </div>

    <div class="map-controls">
      <button class="control-btn" @click="zoomIn" title="Zoom in">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="control-btn" @click="zoomOut" title="Zoom out">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="control-btn control-btn--square" @click="resetView" title="Reset view">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2h4M14 2h-4M2 14h4M14 14h-4M2 2v4M14 2v4M2 14v-4M14 14v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <transition name="fade">
      <div v-if="mapError" class="map-error">
        <p class="map-error__title">Unable to load Google Maps</p>
        <p class="map-error__body">{{ mapError }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

let googleMapsLoader

export default {
  name: 'MapView',
  setup() {
    const store = useStore()
    const properties = computed(() => store.getters.filteredProperties)
    const counties = computed(() => store.getters.counties)
    
    const selectedCounty = ref('All')
    const selectedMonth = ref('All')
    const selectedList = ref('All')
    const mapType = ref('roadmap')
    const mapElement = ref(null)
    const map = ref(null)
    const markers = ref([])
    const advancedMarkerClass = ref(null)
    const mapError = ref('')
    const infoWindow = ref(null)
    const DEFAULT_CENTER = { lat: 33.749, lng: -84.388 }
    const DEFAULT_ZOOM = 9
    
    const updateCountyFilter = () => {
      store.dispatch('updateFilter', {
        filterName: 'county',
        value: selectedCounty.value
      })
    }
    
    const updateMonthFilter = () => {
      store.dispatch('updateFilter', {
        filterName: 'month',
        value: selectedMonth.value
      })
    }
    
    const updateListFilter = () => {
      store.dispatch('updateFilter', {
        filterName: 'list',
        value: selectedList.value
      })
    }
    
    const formatValue = (value) => {
      if (!value) return '-'
      if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M`
      }
      if (value >= 1_000) {
        return `${Math.round(value / 1_000)}k`
      }
      return value.toString()
    }

    const clearMarkers = () => {
      markers.value.forEach(marker => marker.map = null)
      markers.value = []
    }

    const createMarkers = () => {
      if (!map.value || !advancedMarkerClass.value) return
      clearMarkers()

      properties.value.forEach(property => {
        if (!property.lat || !property.lng) return
        const priceLabel = formatValue(property.afterRepairValue || property.price)

        const markerContent = document.createElement('div')
        markerContent.className = 'gm-price-marker'
        markerContent.textContent = priceLabel

        const marker = new advancedMarkerClass.value({
          map: map.value,
          position: { lat: property.lat, lng: property.lng },
          content: markerContent
        })

        marker.addListener('click', () => {
          if (!infoWindow.value) return
          infoWindow.value.setContent(`
            <div class="gm-info">
              <strong>${property.address}</strong>
              <div>${property.beds || '-'} bd • ${property.baths || '-'} ba</div>
              <div>After Repair Value: $${property.afterRepairValue ? property.afterRepairValue.toLocaleString() : '-'}</div>
            </div>
          `)
          infoWindow.value.open({ anchor: marker, map: map.value })
        })

        markers.value.push(marker)
      })
    }

    const fitMapToMarkers = () => {
      if (!map.value || markers.value.length === 0) {
        map.value?.setCenter(DEFAULT_CENTER)
        map.value?.setZoom(DEFAULT_ZOOM)
        return
      }

      const bounds = new window.google.maps.LatLngBounds()
      markers.value.forEach(marker => {
        if (marker.position) bounds.extend(marker.position)
      })
      map.value.fitBounds(bounds, { top: 80, right: 80, bottom: 80, left: 80 })
    }

    const ensureLoader = () => {
      if (googleMapsLoader) return googleMapsLoader

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      if (!apiKey) {
        mapError.value = 'Missing Google Maps API key (set VITE_GOOGLE_MAPS_API_KEY).'
        googleMapsLoader = Promise.reject(new Error(mapError.value))
        return googleMapsLoader
      }

      googleMapsLoader = new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve(window.google.maps)
          return
        }

        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=marker`
        script.async = true
        script.defer = true
        script.onload = () => resolve(window.google.maps)
        script.onerror = () => {
          mapError.value = 'Failed to load Google Maps. Please verify the API key and network connectivity.'
          reject(new Error(mapError.value))
        }
        document.head.appendChild(script)
      })

      return googleMapsLoader
    }

    const initMap = async () => {
      try {
        const maps = await ensureLoader()
        if (!maps) return

        const { Map } = await window.google.maps.importLibrary('maps')
        const markerLib = await window.google.maps.importLibrary('marker')
        advancedMarkerClass.value = markerLib.AdvancedMarkerElement
        infoWindow.value = new window.google.maps.InfoWindow()

        map.value = new Map(mapElement.value, {
          center: DEFAULT_CENTER,
          zoom: DEFAULT_ZOOM,
          mapTypeId: mapType.value,
          disableDefaultUI: true,
          clickableIcons: false,
          gestureHandling: 'greedy'
        })

        createMarkers()
        fitMapToMarkers()
      } catch (error) {
        console.error('Google Maps initialisation failed:', error)
      }
    }

    const setMapType = (type) => {
      mapType.value = type
      if (map.value) {
        map.value.setMapTypeId(type)
      }
    }

    const zoomIn = () => {
      if (!map.value) return
      map.value.setZoom(map.value.getZoom() + 1)
    }

    const zoomOut = () => {
      if (!map.value) return
      map.value.setZoom(map.value.getZoom() - 1)
    }

    const resetView = () => {
      fitMapToMarkers()
    }

    onMounted(() => {
      initMap()
    })

    onBeforeUnmount(() => {
      clearMarkers()
      infoWindow.value?.close()
    })

    watch(properties, () => {
      if (!map.value) return
      createMarkers()
      fitMapToMarkers()
    })

    watch(mapType, (type) => {
      if (map.value) {
        map.value.setMapTypeId(type)
      }
    })
    
    return {
      properties,
      counties,
      selectedCounty,
      selectedMonth,
      selectedList,
      mapType,
      mapElement,
      mapError,
      updateCountyFilter,
      updateMonthFilter,
      updateListFilter,
      setMapType,
      zoomIn,
      zoomOut,
      resetView
    }
  }
}
</script>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #e6eef5;
}

.map-canvas {
  width: 100%;
  height: 100%;
}

.map-toolbar {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 9999px;
  box-shadow: 0 10px 30px rgba(15, 41, 61, 0.15);
  z-index: 20;
  flex-wrap: wrap;
}

.toolbar-chip {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 120px;
}

.toolbar-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #375d7d;
  font-weight: 700;
}

.toolbar-select {
  border: none;
  background: transparent;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1c2a38;
  padding-right: 18px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23375d7d' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.25rem center;
}

.toolbar-select:focus {
  outline: none;
}

.map-type-toggle {
  position: absolute;
  top: 110px;
  left: 16px;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(15, 41, 61, 0.1);
  z-index: 20;
}

.toggle-btn {
  border: none;
  background: #ffffff;
  color: #3a4b5c;
  padding: 10px 18px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.toggle-btn + .toggle-btn {
  border-left: 1px solid #e0e6ed;
}

.toggle-btn--active {
  background: #ffffff;
  color: #0b4d82;
  box-shadow: inset 0 0 0 2px rgba(11, 77, 130, 0.15);
}

.map-controls {
  position: absolute;
  right: 18px;
  bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 20;
}

.control-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #d5dde7;
  background: rgba(255, 255, 255, 0.95);
  color: #3b5166;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.control-btn:hover {
  background: #f2f6fa;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(15, 41, 61, 0.18);
}

.control-btn--square {
  margin-top: 6px;
}

.map-error {
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  max-width: 320px;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  box-shadow: 0 14px 40px rgba(15, 41, 61, 0.2);
  color: #1f2f3d;
  text-align: center;
  z-index: 30;
}

.map-error__title {
  margin: 0 0 6px;
  font-weight: 700;
  font-size: 1rem;
}

.map-error__body {
  margin: 0;
  font-size: 0.9rem;
  color: #44586c;
}

@media (max-width: 768px) {
  .map-toolbar {
    top: 12px;
    padding: 10px 14px;
    gap: 10px;
  }

  .toolbar-chip {
    min-width: 110px;
  }

  .map-type-toggle {
    top: 90px;
    left: 12px;
  }

  .map-controls {
    right: 12px;
    bottom: 18px;
  }
}

:deep(.gm-price-marker) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 46px;
  height: 46px;
  padding: 0 10px;
  border-radius: 9999px;
  background: linear-gradient(160deg, #0f6cbc 0%, #3d9dff 100%);
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 700;
  box-shadow: 0 6px 16px rgba(12, 79, 135, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.85);
}

:deep(.gm-price-marker:hover) {
  transform: scale(1.05);
}

:deep(.gm-info) {
  font-size: 0.85rem;
  color: #1e2b36;
  display: grid;
  gap: 4px;
  max-width: 220px;
}

:deep(.gm-style-iw-d) {
  overflow: hidden !important;
}
</style>
