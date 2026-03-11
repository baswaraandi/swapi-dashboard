import { useDispatch, useSelector } from "react-redux";
import { setSelectedPlanet } from "../../../store/store";

const PlanetList = ({ data, loading, onLoadMore, hasMore, isMoreLoading }) => {
  const dispatch = useDispatch();
  const selectedPlanet = useSelector((state) => state.ui.selectedPlanet);
  const activeFilter = useSelector((state) => state.ui.activeFilter || "ALL");

  const allPlanets = data?.results || [];

  // Logic Filtering berdasarkan Climate
  const filteredPlanets = allPlanets.filter((p) => {
    if (activeFilter === "ALL") return true;
    return p.climate?.toLowerCase().includes(activeFilter.toLowerCase());
  });

  if (loading && allPlanets.length === 0) {
    return (
      <div className="flex flex-col gap-3 animate-pulse p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-20 bg-emerald-500/5 rounded-2xl border border-emerald-500/10"></div>
        ))}
      </div>
    );
  }

  return (
    // Menggunakan flex-1 dan h-full agar mengikuti parent-nya di Page
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-end mb-6 flex-shrink-0">
        <div>
          <h3 className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-[0.3em]">
            Galactic_Coordinates
          </h3>
          <p className="text-lg font-black text-white italic leading-none mt-1">SECTORS</p>
        </div>
        <div className="text-right font-mono">
          <p className="text-[8px] text-emerald-600/50 uppercase">Detected_Planets</p>
          <p className="text-sm text-emerald-400 font-bold">
            {filteredPlanets.length.toString().padStart(2, '0')}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {filteredPlanets.length === 0 ? (
          <div className="h-full flex items-center justify-center opacity-20 flex-col gap-2">
             <span className="text-2xl">🛰️</span>
             <p className="text-[10px] font-mono uppercase tracking-widest text-center">No_Planets_In_Range</p>
          </div>
        ) : (
          filteredPlanets.map((planet, index) => (
            <button
              key={planet.url}
              onClick={() => dispatch(setSelectedPlanet(planet))}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border group relative overflow-hidden ${
                selectedPlanet?.name === planet.name
                  ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                  : "bg-white/[0.02] border-transparent hover:border-emerald-500/20 text-slate-400"
              }`}
            >
              <div className="flex justify-between items-center relative z-10">
                <div className="overflow-hidden">
                  <p className="text-[8px] font-mono uppercase opacity-40 mb-1 truncate">
                    Climate: {planet.climate}
                  </p>
                  <h4 className="font-bold text-sm tracking-widest uppercase group-hover:text-emerald-300 transition-colors truncate">
                    {planet.name}
                  </h4>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  planet.population === "unknown" ? "bg-slate-700" : "bg-emerald-500 animate-pulse"
                }`}></div>
              </div>
            </button>
          ))
        )}

        {hasMore && (
          <button
            onClick={onLoadMore}
            disabled={isMoreLoading}
            className="w-full py-4 mt-2 border border-emerald-500/20 border-dashed rounded-2xl text-emerald-500 font-mono text-[9px] tracking-[0.2em] uppercase hover:bg-emerald-500/5 transition-all"
          >
            {isMoreLoading ? "Scanning..." : "[[ Load More Sectors ]]"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PlanetList;