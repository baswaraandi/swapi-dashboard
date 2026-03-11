import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// 1. Arahkan ke hooks layer
import { useStarshipsData } from "../hooks/useSwapi"; 
import StarshipList from "../components/features/starships/StarshipList";
import StarshipDetail from "../components/features/starships/StarshipDetail";

const StarshipsPage = () => {
  // 2. State untuk Search & Debouncing
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 3. Gunakan hook dengan parameter search
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useStarshipsData(debouncedSearch);

  // Perhatikan: pastikan key di Redux konsisten (selectedStarship vs selectedStarships)
  const selectedStarship = useSelector((state) => state.ui.selectedStarship);

  // 4. Transformasi data infinite query
  const allShips = data?.pages?.flatMap((page) => page.results) || [];

  const formattedData = {
    results: allShips,
    count: data?.pages?.[0]?.count || 0,
  };

  if (isError)
    return (
      <div className="p-8 text-center font-mono text-amber-600 animate-pulse">
        HANGAR_COMMS_FAILURE: SHIP_DATABASE_OFFLINE
      </div>
    );

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 5. Starship Search HUD */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-amber-500/50 font-mono text-[10px]">RADAR:</span>
        </div>
        <input 
          type="text"
          placeholder="IDENTIFY_VESSEL_SIGNATURE..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900/40 border border-amber-500/20 rounded-xl pl-14 pr-4 py-2 text-sm text-amber-400 placeholder:text-amber-900 focus:border-amber-500/50 outline-none font-mono transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(245,158,11,0.05)]"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="w-4 h-4 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Starship List */}
        <div className="lg:col-span-4 h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar pr-2">
          <StarshipList
            data={formattedData}
            loading={isLoading}
            onLoadMore={fetchNextPage}
            hasMore={hasNextPage}
            isMoreLoading={isFetchingNextPage}
          />
        </div>

        {/* Main Content: Starship Detail */}
        <div className="lg:col-span-8">
          {selectedStarship ? (
            <StarshipDetail starship={selectedStarship} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center border border-amber-500/10 rounded-3xl bg-amber-950/5 relative overflow-hidden group">
               {/* Grid Pattern Effect */}
               <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
               
               <div className="text-amber-500/20 text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">🚀</div>
               <p className="font-mono text-amber-500/40 text-[10px] uppercase tracking-[0.3em] text-center px-4">
                  Awaiting_Hangar_Clearance_Selection
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StarshipsPage;