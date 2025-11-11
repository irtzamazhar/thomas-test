<template>
  <div class="map-wrapper">
    <div ref="mapElement" class="map-canvas"></div>

    <div class="map-toolbar">
      <button class="toolbar-pill" @click="toggleToolbarDropdown('county')">
        {{ selectedCountyLabel }}
        <svg width="12" height="7" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="#00384f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <transition name="fade">
          <div
            v-if="openDropdown === 'county'"
            class="toolbar-dropdown"
          >
            <button
              v-for="option in countyOptions"
              :key="option.value"
              @click="selectToolbarOption('county', option)"
              :class="['dropdown-option', option.value === selectedCounty ? 'dropdown-option--active' : '']"
            >
              {{ option.label }}
            </button>
          </div>
        </transition>
      </button>
      <button class="toolbar-pill" @click="toggleToolbarDropdown('month')">
        {{ selectedMonthLabel }}
        <svg width="12" height="7" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="#00384f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <transition name="fade">
          <div
            v-if="openDropdown === 'month'"
            class="toolbar-dropdown"
          >
            <button
              v-for="option in monthOptions"
              :key="option.value"
              @click="selectToolbarOption('month', option)"
              :class="['dropdown-option', option.value === selectedMonth ? 'dropdown-option--active' : '']"
            >
              {{ option.label }}
            </button>
          </div>
        </transition>
      </button>
      <button class="toolbar-pill" @click="toggleToolbarDropdown('list')">
        {{ selectedListLabel }}
        <svg width="12" height="7" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="#00384f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <transition name="fade">
          <div
            v-if="openDropdown === 'list'"
            class="toolbar-dropdown"
          >
            <button
              v-for="option in listOptions"
              :key="option.value"
              @click="selectToolbarOption('list', option)"
              :class="['dropdown-option', option.value === selectedList ? 'dropdown-option--active' : '']"
            >
              {{ option.label }}
            </button>
          </div>
        </transition>
      </button>
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
    const pinElementClass = ref(null)
    const mapError = ref('')
    const infoWindow = ref(null)
    const openDropdown = ref(null)
    const DEFAULT_CENTER = { lat: 33.749, lng: -84.388 }
    const DEFAULT_ZOOM = 9
    const mapId = import.meta.env.VITE_GOOGLE_MAP_ID || ''
    
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
    
    const countyOptions = computed(() => [
      { label: 'County', value: 'All' },
      ...counties.value.filter(c => c !== 'All').map(c => ({ label: c, value: c }))
    ])

    const monthOptions = [
      { label: 'Month', value: 'All' },
      { label: 'January', value: 'January' },
      { label: 'February', value: 'February' },
      { label: 'March', value: 'March' },
      { label: 'April', value: 'April' },
      { label: 'May', value: 'May' },
      { label: 'June', value: 'June' },
      { label: 'July', value: 'July' },
      { label: 'August', value: 'August' },
      { label: 'September', value: 'September' },
      { label: 'October', value: 'October' },
      { label: 'November', value: 'November' },
      { label: 'December', value: 'December' }
    ]

    const listOptions = [
      { label: 'List', value: 'All' },
      { label: 'Residential', value: 'Residential' },
      { label: 'Commercial', value: 'Commercial' },
      { label: 'Land', value: 'Land' }
    ]

    const selectedCountyLabel = computed(() => {
      const current = countyOptions.value.find(o => o.value === selectedCounty.value)
      return current ? current.label : 'County'
    })

    const selectedMonthLabel = computed(() => {
      const current = monthOptions.find(o => o.value === selectedMonth.value)
      return current ? current.label : 'Month'
    })

    const selectedListLabel = computed(() => {
      const current = listOptions.find(o => o.value === selectedList.value)
      return current ? current.label : 'List'
    })

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
      markers.value.forEach(marker => {
        if (typeof marker.setMap === 'function') {
          marker.setMap(null)
        } else {
          marker.map = null
        }
      })
      markers.value = []
    }

    const useAdvancedMarkers = () => Boolean(mapId && advancedMarkerClass.value && pinElementClass.value)

    const createMarkers = () => {
      if (!map.value) return
      clearMarkers()

      properties.value.forEach(property => {
        if (!property.lat || !property.lng) return
        const priceLabel = formatValue(property.afterRepairValue || property.price)

        let marker

        if (useAdvancedMarkers()) {
          const pin = new pinElementClass.value({
            glyph: priceLabel,
            glyphColor: '#ffffff',
            background: '#0f6cbc',
            borderColor: '#ffffff',
            scale: 1.05
          })

          marker = new advancedMarkerClass.value({
            map: map.value,
            position: { lat: property.lat, lng: property.lng },
            content: pin.element
          })
        } else {
          marker = new window.google.maps.Marker({
            map: map.value,
            position: { lat: property.lat, lng: property.lng },
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#0f6cbc',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2
            },
            title: `${property.address} • $${property.afterRepairValue ? property.afterRepairValue.toLocaleString() : priceLabel}`
          })
        }

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
        pinElementClass.value = markerLib.PinElement
        infoWindow.value = new window.google.maps.InfoWindow()

        map.value = new Map(mapElement.value, {
          center: DEFAULT_CENTER,
          zoom: DEFAULT_ZOOM,
          ...(mapId ? { mapId } : {}),
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

    const toggleToolbarDropdown = (key) => {
      openDropdown.value = openDropdown.value === key ? null : key
    }

    const selectToolbarOption = (key, option) => {
      if (key === 'county') {
        selectedCounty.value = option.value
        updateCountyFilter()
      } else if (key === 'month') {
        selectedMonth.value = option.value
        updateMonthFilter()
      } else if (key === 'list') {
        selectedList.value = option.value
        updateListFilter()
      }
      openDropdown.value = null
    }

    const handleOutsideClick = (event) => {
      if (!openDropdown.value) return
      const toolbar = mapElement.value?.parentElement?.querySelector('.map-toolbar')
      if (toolbar && !toolbar.contains(event.target)) {
        openDropdown.value = null
      }
    }

    onMounted(() => {
      initMap()
      document.addEventListener('click', handleOutsideClick)
    })

    onBeforeUnmount(() => {
      clearMarkers()
      infoWindow.value?.close()
      document.removeEventListener('click', handleOutsideClick)
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
      resetView,
      toggleToolbarDropdown,
      selectToolbarOption,
      openDropdown,
      countyOptions,
      monthOptions,
      listOptions,
      selectedCountyLabel,
      selectedMonthLabel,
      selectedListLabel
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
  background: rgba(255, 255, 255, 0.98);
  border-radius: 9999px;
  box-shadow: 0 22px 45px rgba(3, 39, 59, 0.16);
  z-index: 20;
  padding: 6px 10px;
  flex-wrap: nowrap;
}

.toolbar-pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 32px;
  border-radius: 9999px;
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 600;
  color: #1e2f3a;
  cursor: pointer;
  transition: color 0.2s ease;
  position: relative;
}

.toolbar-pill + .toolbar-pill::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 24px;
  background: rgba(6, 53, 72, 0.18);
}

.toolbar-pill svg {
  flex-shrink: 0;
}

.toolbar-pill:hover {
  color: #0b2738;
}

.toolbar-pill {
  position: relative;
}

.toolbar-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 25px 60px rgba(16, 46, 66, 0.2);
  padding: 10px 8px;
  display: grid;
  gap: 4px;
  z-index: 10;
  min-width: 180px;
}

.dropdown-option {
  border: none;
  background: transparent;
  text-align: left;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #364856;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.dropdown-option:hover {
  background: rgba(15, 72, 108, 0.08);
  color: #0f486c;
}

.dropdown-option--active {
  background: rgba(15, 108, 188, 0.12);
  color: #0f6cbc;
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
