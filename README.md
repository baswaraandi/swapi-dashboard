# 🌌 STAR WARS ARCHIVES: NEURAL DASHBOARD

---

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" width="200" alt="Star Wars Logo">
</p>

> **SECURE ENCRYPTED ACCESS GRANTED.** > Welcome, Commander **Andyka**. The Galactic Database is now online. Accessing subject records, planetary coordinates, and fleet data across the Outer Rim.

---

## 🚀 OVERVIEW

This is a high-performance **Star Wars Single Page Application (SPA)** designed as a tactical monitoring tool. It demonstrates the implementation of modern web architecture, focused on **Scalable State Management**, high-efficiency data fetching, and a Cyberpunk HUD-inspired User Interface.

**🌐 LIVE DEMO:** [https://starwars-spa.vercel.app/](https://starwars-spa.vercel.app/)

### 🛠 TECH STACK

- **Core Framework:** `React 18` (Vite)
- **State Management:** `Redux Toolkit` (Global UI, Search, & Filtering)
- **Server State:** `TanStack Query` (Asynchronous data fetching & caching)
- **Styling:** `Tailwind CSS` (Custom HUD theme & Glassmorphism)
- **API:** `SWAPI` (The Star Wars API)
- **Tools:** `Lucide React`, `Star Jedi Fonts`, `Eslint`

---

## 📂 PROJECT STRUCTURE

The repository is organized using a **Feature-Based Pattern**, ensuring that logic, components, and styles are modular and easy to maintain.

```text
src/
├── api/                # API Configuration (swapi.js)
├── assets/             # Media & Static Files
├── components/
│   ├── common/         # Shared UI (DataField.jsx)
│   ├── dashboard/      # Dashboard Specific Components
│   ├── features/       # Feature-driven Modules
│   │   ├── movie/      # Movie modules
│   │   ├── people/     # Personnel data
│   │   ├── planets/    # Celestial data
│   │   ├── species/    # Species information
│   │   └── starships/  # Fleet management (StarshipList, Detail)
│   ├── layout/         # Layout Wrappers
│   └── PeopleComparison.jsx
├── hooks/              # Custom Hooks (useSwapi.js)
├── pages/              # Page Components (DashboardHome, MoviesPage, etc.)
├── store/              # Redux Slices & Store Configuration
└── App.jsx             # Root Component & Routes

```

---

## ⚡ KEY ARCHITECTURAL FEATURES

### 1. Advanced State Management

Utilizes **Redux Toolkit** to synchronize UI states. Whether you select a pilot in the Personnel tab or filter a planet by climate, the state remains consistent throughout the application, eliminating "prop drilling" and ensuring a single source of truth.

### 2. Tactical Search & Debouncing

Implements a **500ms Debounce Logic** on the Search HUD. This ensures that database queries are only executed when the user has finished typing, drastically reducing API overhead and improving system performance.

### 3. Multi-Category Filtering System

Custom filters are implemented for different data types to enhance user exploration:

* **Personnel:** Filter by Gender (Male, Female, Droid/NA).
* **Planets:** Filter by Climate (Arid, Temperate, Tropical, Frozen).

### 4. Infinite Archive Sync

Integrated **Infinite Scrolling** using `useInfiniteQuery`. The dashboard automatically handles batch data fetching and "Load More" logic for seamless exploration of the vast Imperial Archives.

---

## 🛠 INSTALLATION & SETUP

To initialize this dashboard in your local sector, execute the following commands:

1. **Clone the repository:**
```bash
git clone [https://github.com/AndykaBaswara/star-wars-dashboard.git](https://github.com/AndykaBaswara/star-wars-dashboard.git)

```


2. **Navigate to the command deck:**
```bash
cd star-wars-dashboard

```


3. **Install dependencies:**
```bash
npm install

```


4. **Initialize the engine:**
```bash
npm run dev

```


5. **Access the dashboard:** Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) in your browser.

---

## 👨‍💻 ARCHITECT

**Andyka Baswara Putra** *Professional IT Programmer | Computer Science Graduate* *"May the source be with you."*

<p align="center">
<img src="https://www.google.com/search?q=https://forthebadge.com/images/badges/built-with-love.svg" alt="Built with love">
<img src="https://www.google.com/search?q=https://forthebadge.com/images/badges/made-with-javascript.svg" alt="Made with JS">
<img src="https://www.google.com/search?q=https://forthebadge.com/images/badges/visual-studio-code.svg" alt="VS Code">
</p>