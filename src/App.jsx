import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import PeoplePage from "./pages/PeoplePage";
import MoviesPage from "./pages/MoviesPage";
import PlanetsPage from "./pages/PlanetsPage";
import SpeciesPage from "./pages/SpeciesPage";
import StarshipsPage from "./pages/StarshipsPage";
import DashboardHome from "./pages/DashboardHome";

function App() {
  return (
    <Router>
      {/* Pastikan lg:drawer-open ada agar sidebar menetap di layar besar */}
      <div className="drawer lg:drawer-open min-h-screen bg-[#0d1117] text-slate-200">
        <input id="f1-drawer" type="checkbox" className="drawer-toggle" />

        {/* 1. Konten Utama (Diletakkan di atas atau bawah Sidebar sesuai aturan Drawer) */}
        <div className="drawer-content flex flex-col">
          {/* Tombol Toggle untuk Mobile (Opsional) */}
          <div className="lg:hidden p-4">
            <label htmlFor="f1-drawer" className="btn btn-ghost drawer-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <main className="p-6 lg:p-10">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/planets" element={<PlanetsPage />} />
              <Route path="/species" element={<SpeciesPage />} />
              <Route path="/starships" element={<StarshipsPage />} />
              {/* Tambahkan fallback jika URL ngawur */}
              <Route
                path="*"
                element={
                  <div className="font-starjedi text-center mt-20">
                    404 - Transmission Lost
                  </div>
                }
              />
            </Routes>
          </main>
        </div>

        {/* 2. Sidebar */}
        <Sidebar />
      </div>
    </Router>
  );
}

export default App;
