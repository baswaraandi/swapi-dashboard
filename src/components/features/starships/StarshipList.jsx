import { useDispatch, useSelector } from "react-redux";
// Pastikan path dan nama action ini benar sesuai di store.js kamu
import { setSelectedStarship } from "../../../store/store";

const StarshipList = ({
  data,
  loading,
  onLoadMore,
  hasMore,
  isMoreLoading,
  isFetchingNextPage,
}) => {
  const dispatch = useDispatch();

  // 1. Pastikan nama state di store konsisten (ui.selectedStarship)
  const selectedStarship = useSelector((state) => state.ui.selectedStarship);
  const ships = data?.results || [];

  if (loading && !isMoreLoading)
    return (
      <div className="flex flex-col gap-3 animate-pulse h-full">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-20 bg-amber-500/5 rounded-2xl border border-amber-500/10"
          ></div>
        ))}
      </div>
    );

  return (
    // 2. Gunakan h-full agar responsif terhadap container di StarshipsPage
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col h-full max-h-[calc(100vh-250px)]">
      <div className="flex justify-between items-end mb-6 font-mono flex-shrink-0">
        <div>
           <h3 className="text-[10px] text-amber-500/50 uppercase tracking-[0.3em]">
            Shipyard_Manifest
          </h3>
          <p className="text-white text-xs font-bold uppercase mt-1">Hangar_Section_01</p>
        </div>
        <span className="text-[9px] text-amber-600 bg-amber-600/10 px-2 py-1 rounded-md border border-amber-600/20">
          TOTAL_UNITS: {data?.count || 0}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {ships.length === 0 ? (
          <div className="py-20 text-center opacity-20 font-mono text-[10px] uppercase">
             No_Ships_Detected_In_Range
          </div>
        ) : (
          ships.map((ship) => (
            <button
              // 3. PENTING: Gunakan ship.url sebagai key, jangan 'index' 
              // agar React bisa melacak perubahan state dengan benar saat search
              key={ship.url} 
              onClick={() => dispatch(setSelectedStarship(ship))}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border group relative overflow-hidden ${
                selectedStarship?.url === ship.url // Cek berdasarkan URL lebih akurat daripada nama
                  ? "bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.05)]"
                  : "bg-white/[0.02] border-transparent hover:border-amber-500/20 text-slate-400"
              }`}
            >
              {/* Active Indicator Line */}
              {selectedStarship?.url === ship.url && (
                <div className="absolute left-0 top-0 w-1 h-full bg-amber-500 shadow-[0_0_15px_#f59e0b]"></div>
              )}

              <div className="flex justify-between items-center relative z-10">
                <div className="overflow-hidden">
                  <p className="text-[9px] font-mono uppercase opacity-50 mb-1 flex items-center gap-2">
                    <span className="w-1 h-1 bg-amber-500/40 rounded-full"></span>
                    MGLT: {ship.MGLT}
                  </p>
                  <h4 className="font-bold text-sm tracking-widest uppercase group-hover:text-amber-300 transition-colors truncate pr-4">
                    {ship.name}
                  </h4>
                </div>
                <div className="text-right font-mono text-[8px] opacity-40 flex-shrink-0">
                  <p className="tracking-tighter">HYPERDRIVE</p>
                  <p className="text-[10px] text-amber-500/80 font-bold">{ship.hyperdrive_rating}</p>
                </div>
              </div>
            </button>
          ))
        )}

        {/* 4. Tombol Load More harus di dalam div scrollable */}
        {hasMore && (
          <div className="pt-2 pb-4">
            <button
              onClick={() => onLoadMore()}
              disabled={isFetchingNextPage}
              className="w-full py-4 border border-dashed border-amber-500/30 rounded-2xl bg-amber-500/5 text-amber-500 font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-amber-500/10 transition-all disabled:opacity-30"
            >
              {isMoreLoading
                ? "Accessing Secure Archives..."
                : ">>> Load More Ships"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StarshipList;