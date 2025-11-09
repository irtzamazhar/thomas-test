# Georgia Foreclosure - Vue 3 + Vuex Application

A modern foreclosure property listing application built with Vue 3 and Vuex for state management.

## 🚀 Features

- **Property Listings**: Browse foreclosure properties with detailed information
- **Interactive Map View**: Visual representation of properties on a map
- **Advanced Filtering**: Filter properties by county, month, beds, baths, and more
- **View Modes**: Switch between tile and list views
- **Pagination**: Navigate through properties efficiently
- **Favorites**: Mark properties as favorites
- **Save Searches**: Save your filter preferences
- **Export Functionality**: Export property lists

## 📦 Tech Stack

- **Vue 3.5.24** - Progressive JavaScript Framework
- **Vuex 4.1.0** - State Management
- **Vite 7.1.11** - Build Tool & Dev Server

## 🏗️ Project Structure

```
src/
├── store/
│   └── index.js              # Vuex store (state, mutations, actions, getters)
├── components/
│   ├── AppHeader.vue         # Navigation header
│   ├── FilterBar.vue         # Top filter dropdowns
│   ├── MapView.vue           # Map visualization
│   ├── PropertyList.vue      # Property grid container
│   ├── PropertyCard.vue      # Individual property card
│   └── Pagination.vue        # Pagination controls
├── assets/                   # Static assets
├── App.vue                   # Main application component
└── main.js                   # Application entry point
```

## 🎯 Vuex State Management

### State
- `properties`: Array of foreclosure properties
- `filters`: Filter settings (county, month, beds, baths, etc.)
- `viewMode`: Display mode ('tile' or 'list')
- `currentPage`: Current pagination page
- `savedSearches`: Saved search configurations

### Getters
- `filteredProperties`: Properties after applying filters
- `paginatedProperties`: Current page of filtered properties
- `totalPages`: Total number of pages
- `totalProperties`: Total count of filtered properties
- `counties`: Available counties for filtering

### Actions
- `updateFilter`: Update filter values
- `setViewMode`: Change view mode
- `setPage`: Navigate to specific page
- `saveSearch`: Save current filters
- `toggleFavorite`: Mark/unmark property as favorite

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 💡 Key Components

### AppHeader
Navigation header with logo, menu links, and profile section.

### FilterBar
Dropdown filters for County, Month, and List type.

### MapView
Visual map representation showing property locations with cluster markers.

### PropertyList
Main container displaying properties in grid/list format with filtering controls and action buttons.

### PropertyCard
Individual property card showing:
- Property image with county badge and favorite button
- Address
- Square footage, beds, baths
- After Repair Value and Foreclosure Amount
- Link to Zillow listing

### Pagination
Navigation controls for browsing through multiple pages of properties.

## 🎨 Design Features

- Modern, clean UI matching the provided design
- Responsive layout (desktop and mobile)
- Smooth transitions and hover effects
- Professional color scheme
- Intuitive user interactions

## 📱 Responsive Design

The application is fully responsive and adapts to different screen sizes:
- Desktop: Side-by-side map and property list
- Tablet/Mobile: Stacked layout with map on top

## 🔧 Customization

To add more properties, edit the `mockProperties` array in `src/store/index.js`:

```javascript
const mockProperties = [
  {
    id: 1,
    address: 'Property Address',
    county: 'County Name',
    price: 250000,
    afterRepairValue: 320000,
    foreclosureAmt: 180000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    image: 'image-url',
    zillowUrl: 'zillow-listing-url',
    lat: 33.7490,
    lng: -84.3880
  },
  // Add more properties...
]
```

## 📄 License

This project is for demonstration purposes.
