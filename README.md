# Georgia Foreclosure Dashboard

Static dashboard prototype built with **Vue 3**, **Vuex**, **Vue Router**, and **Tailwind CSS v4**.  
It showcases foreclosure listings alongside an interactive map, responsive layout, and filtering controls.

## Project Structure

```
src/
├─ api/                   # Placeholder for axios/services
├─ assets/                # Global styles, images
├─ components/
│   ├─ common/            # Reusable UI primitives (cards, pagination)
│   ├─ layout/            # Shell components (header, navigation)
│   └─ ui/                # Feature-specific widgets (map, property list)
├─ layouts/               # Layout wrappers (e.g., MainLayout)
├─ pages/                 # Route-level views (dashboard, auth, settings)
├─ router/                # Vue Router instance
├─ store/                 # Vuex modules and mutation types
├─ styles/                # Global SCSS/CSS entry points
└─ utils/                 # Helper utilities (formatters, validators, constants)
```

## Tech Stack

- **Vue 3 (Composition API)**
- **Vuex 4** for state management (`src/store/modules/properties`)
- **Vue Router 4** for client routing (`src/router`)
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Vite 7** for dev/build tooling

## Getting Started

Ensure you have **Node.js 20+** (or 22+) installed.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

### Environment Variables

Duplicate the provided example and fill in your Google Maps credentials:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key |
| `VITE_GOOGLE_MAP_ID` | Optional Map ID for cloud-styled maps |

#### Environment Modes

Vite loads environment files based on the current command:

| File | When it is used |
| --- | --- |
| `.env` | Base values shared by every environment |
| `.env.local` | Local overrides for `npm run dev` (not committed) |
| `.env.production` | Production overrides for `npm run build` / deploys |

For example, to use a staging key locally without checking it in:

```bash
cp .env.example .env.local
# edit .env.local with your local-only keys
```

During builds (`npm run build`), values from `.env` and `.env.production` are merged automatically.

### Other Scripts

```bash
npm run build    # Production bundle (dist/)
```

## Key Features

- Responsive split-screen layout (map + property list)
- Map overlay filters (county, month, list type)
- Property filters (beds/baths, value ranges) powered by Vuex actions/getters
- Tile and table view toggle with pagination controls
- Mobile hamburger navigation and Tailwind-based styling

## Notes

- Mock property data lives in `src/store/modules/properties/state.js`
- Google Maps requires `VITE_GOOGLE_MAPS_API_KEY` (set in `.env` during real integration)
- Additional directories (`api`, `utils`, `styles`, etc.) are scaffolded for future expansion


