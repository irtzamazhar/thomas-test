<template>
  <div class="property-card">
    <div class="property-image-wrapper">
      <img :src="property.image" :alt="property.address" class="property-image" />
      <div class="property-badge">{{ property.county }}</div>
      <button class="favorite-btn" @click="handleToggleFavorite">
        <svg width="20" height="20" viewBox="0 0 20 20" :fill="property.isFavorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
          <path d="M10 17.5L3.5 11C1.5 9 1.5 5.5 3.5 3.5C5.5 1.5 9 1.5 10 3.5C11 1.5 14.5 1.5 16.5 3.5C18.5 5.5 18.5 9 16.5 11L10 17.5Z"/>
        </svg>
      </button>
    </div>
    
    <div class="property-content">
      <h3 class="property-address">{{ property.address }}</h3>
      
      <div class="property-details">
        <div class="detail-row">
          <span class="detail-label">Sq. Ft.</span>
          <span class="detail-value">{{ property.sqft ? property.sqft.toLocaleString() : '-' }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Beds</span>
          <span class="detail-value">{{ property.beds || '-' }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Baths</span>
          <span class="detail-value">{{ property.baths || '-' }}</span>
        </div>
      </div>
      
      <div class="property-pricing">
        <div class="price-box primary">
          <div class="price-label">After Repair Value</div>
          <div class="price-value">${{ formatPrice(property.afterRepairValue) }}</div>
        </div>
        <div class="price-box">
          <div class="price-label">Foreclosure Amt</div>
          <div class="price-value">{{ property.foreclosureAmt ? '$' + formatPrice(property.foreclosureAmt) : '$-' }}</div>
        </div>
      </div>
      
      <a :href="property.zillowUrl" target="_blank" class="zillow-link">
        View on Zillow →
      </a>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

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
    
    const formatPrice = (price) => {
      if (!price) return '-'
      return price.toLocaleString()
    }
    
    const handleToggleFavorite = () => {
      store.dispatch('toggleFavorite', props.property.id)
    }
    
    return {
      formatPrice,
      handleToggleFavorite
    }
  }
}
</script>

<style scoped>
.property-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.property-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.property-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #ef4444;
  transition: all 0.2s;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.property-content {
  padding: 1.25rem;
}

.property-address {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.property-details {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.detail-value {
  font-size: 14px;
  color: #1f2937;
  font-weight: 600;
}

.property-pricing {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.price-box {
  flex: 1;
  padding: 0.75rem;
  border-radius: 6px;
  background: #f9fafb;
}

.price-box.primary {
  background: #1e3a5f;
  color: white;
}

.price-label {
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 0.25rem;
  opacity: 0.8;
}

.price-box.primary .price-label {
  color: rgba(255, 255, 255, 0.8);
}

.price-value {
  font-size: 15px;
  font-weight: 700;
}

.price-box:not(.primary) .price-label {
  color: #6b7280;
}

.price-box:not(.primary) .price-value {
  color: #1f2937;
}

.zillow-link {
  display: inline-block;
  color: #2563eb;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: color 0.2s;
}

.zillow-link:hover {
  color: #1d4ed8;
}
</style>

