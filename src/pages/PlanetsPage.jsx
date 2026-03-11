import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePlanetsData } from "../hooks/useSwapi"; 
import { setSearchTerm as setGlobalSearch } from "../store/store"; // Hubungkan ke store
import PlanetList from "../components/features/planets/PlanetList";
import PlanetDetail from "../components/features/planets/PlanetDetail";
import PlanetFilter from "../components/features/planets/PlanetFilter";

const PlanetsPage = () => {
  const dispatch = useDispatch();
  
  // Ambil search dari Redux agar sinkron dengan HUD global jika ada
  const searchTerm = useSelector((state) => state.ui.searchTerm || "");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePlanetsData(debouncedSearch);

  const selectedPlanet = useSelector((state) => state.ui.selectedPlanet);

  const allPlanets = data?.pages?.flatMap((page) => page.results) || [];
  const formattedData = {
    results: allPlanets,
    count: data?.pages?.[0]?.count || 0,
  };

  return (
    // h-screen minus padding agar muat di satu layar tanpa scroll body utama
    <div className="space-y-6 animate-fadeIn h-[calc(100vh-140px)] flex flex-col pb-6">
      
      {/* HEADER SECTION */}
      <div className="flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative w-full max-w-md group">
              <span className="absolute left-4 top-2.5 text-emerald-500/40 font-mono text-[10px]">QRY:</span>
              <input 
                type="text"
                placeholder="PLANET_NAME..."
                value={searchTerm}
                onChange={(e) => dispatch(setGlobalSearch(e.target.value))}
                className="w-full bg-slate-900/40 border border-emerald-500/20 rounded-xl pl-14 pr-4 py-2.5 text-sm text-emerald-400 focus:border-emerald-500/50 outline-none font-mono"
              />
           </div>
        </div>
        <PlanetFilter />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Sidebar: Planet List */}
        <div className="lg:col-span-4 h-full min-h-0">
          <PlanetList
            data={formattedData}
            loading={isLoading}
            onLoadMore={fetchNextPage}
            hasMore={hasNextPage}
            isMoreLoading={isFetchingNextPage}
          />
        </div>

        {/* Main Content: Planet Detail */}
        <div className="lg:col-span-8 h-full overflow-y-auto custom-scrollbar bg-slate-950/30 rounded-3xl border border-emerald-500/5">
          {selectedPlanet ? (
            <PlanetDetail planet={selectedPlanet} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center border border-dashed border-emerald-500/10 rounded-3xl relative overflow-hidden group p-10">
               <div className="text-emerald-500/10 text-7xl mb-6 group-hover:scale-110 transition-transform duration-1000">🪐</div>
               <p className="font-mono text-emerald-500/30 text-[10px] uppercase tracking-[0.4em] text-center">
                  Awaiting_Stellar_Coordinate_Input
               </p>
               {/* Decorative Lines */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-gradient-to-b from-emerald-500/20 to-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetsPage;