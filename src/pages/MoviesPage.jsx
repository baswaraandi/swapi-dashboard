import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// 1. Arahkan ke hooks, bukan api
import { useFilmsData } from "../hooks/useSwapi";
import MovieList from "../components/features/movie/MovieList";
import MovieDetail from "../components/features/movie/MovieDetail";

const MoviesPage = () => {
  // 2. Local state untuk pencarian (atau bisa pakai Redux jika sudah ada)
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 3. Logika Debounce sederhana agar tidak boros API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 4. Masukkan debouncedSearch ke hook
  const { data, isLoading } = useFilmsData(debouncedSearch);
  const selectedFilm = useSelector((state) => state.ui.selectedFilm);

  return (
    <div className="animate-fadeIn space-y-6">
      {/* 5. Search Bar untuk Movie */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="SEARCH_MOVIE_DATABASE..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900/50 border border-blue-500/30 rounded-xl px-4 py-2 text-sm text-blue-400 placeholder:text-blue-900 focus:border-blue-500 outline-none font-mono transition-all"
        />
        <div className="absolute right-3 top-2.5 text-[10px] text-blue-900 font-mono uppercase">
          {isLoading ? "Searching..." : "Ready"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* List Movie (Kiri) */}
        <div className="lg:col-span-4 h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
          <MovieList data={data?.results} loading={isLoading} />
        </div>

        {/* Detail Movie (Kanan) */}
        <div className="lg:col-span-8">
          {selectedFilm ? (
            <MovieDetail film={selectedFilm} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center border border-dashed border-blue-500/20 rounded-3xl bg-blue-950/5 p-10 text-center">
              <div className="w-16 h-16 border-2 border-blue-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <span className="text-blue-500 text-2xl">🎬</span>
              </div>
              <p className="font-mono text-blue-500/40 text-xs uppercase tracking-widest">
                Waiting_For_Holocron_Selection...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
