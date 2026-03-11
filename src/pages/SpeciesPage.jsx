import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// 1. Arahkan ke hooks layer
import { useSpeciesData } from "../hooks/useSwapi"; 
import SpeciesList from "../components/features/species/SpeciesList";
import SpeciesDetail from "../components/features/species/SpeciesDetail";

const SpeciesPage = () => {
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
    isFetchingNextPage 
  } = useSpeciesData(debouncedSearch);

  const selectedSpecies = useSelector((state) => state.ui.selectedSpecies);

  // 4. Transformasi data infinite query
  const allSpecies = data?.pages?.flatMap((page) => page.results) || [];

  const formattedData = {
    results: allSpecies,
    count: data?.pages?.[0]?.count || 0,
  };

  if (isError) return (
    <div className="p-8 text-center font-mono text-cyan-600 animate-pulse">
      DATABASE_LINK_SEVERED: GENETIC_DATA_UNREACHABLE
    </div>
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 5. Species Search HUD */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-cyan-500/50 font-mono text-[10px]">DNA:</span>
        </div>
        <input 
          type="text"
          placeholder="SCAN_BIOLOGICAL_RECORDS..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900/40 border border-cyan-500/20 rounded-xl pl-12 pr-4 py-2 text-sm text-cyan-400 placeholder:text-cyan-900 focus:border-cyan-500/50 outline-none font-mono transition-all backdrop-blur-sm"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="w-4 h-4 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Species List */}
        <div className="lg:col-span-4 h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar pr-2">
          <SpeciesList 
            data={formattedData} 
            loading={isLoading} 
            onLoadMore={fetchNextPage}
            hasMore={hasNextPage}
            isMoreLoading={isFetchingNextPage}
          />
        </div>

        {/* Main Content: Species Detail */}
        <div className="lg:col-span-8">
          {selectedSpecies ? (
            <SpeciesDetail species={selectedSpecies} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center border border-cyan-500/10 rounded-3xl bg-cyan-950/5 relative overflow-hidden group">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500 via-transparent to-transparent"></div>
               
               <div className="text-cyan-500/20 text-5xl mb-4 animate-pulse">🧬</div>
               <p className="font-mono text-cyan-500/40 text-[10px] uppercase tracking-[0.3em]">
                  Awaiting_Xenobiology_Classification
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeciesPage;