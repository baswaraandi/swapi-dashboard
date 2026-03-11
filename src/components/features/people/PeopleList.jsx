import { useDispatch, useSelector } from "react-redux";
import { setSelectedPerson } from "../../../store/store";

const PeopleList = ({ queryResult }) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.ui.selectedPerson);
  
  // 1. Ambil state activeFilter dari Redux
  const activeFilter = useSelector((state) => state.ui.activeFilter || "ALL");

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = queryResult;

  // Menggabungkan semua hasil dari tiap halaman API
  const allPeople = data?.pages?.flatMap((page) => page.results) || [];

  // 2. LOGIKA FILTER: Saring data berdasarkan gender
  const filteredPeople = allPeople.filter((person) => {
    if (activeFilter === "ALL") return true;
    // Kita gunakan person.gender untuk mencocokkan dengan filter (male, female, n/a)
    return person.gender === activeFilter;
  });

  // Loading State Awal
  if (isLoading && !isFetchingNextPage) {
    return (
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 h-full flex items-center justify-center">
        <div className="text-[10px] font-mono text-blue-500 animate-pulse uppercase tracking-[0.4em]">
          Accessing_Archives...
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="bg-white/[0.02] border border-red-500/10 rounded-3xl p-6 h-full flex items-center justify-center">
        <div className="text-[10px] font-mono text-red-500 uppercase">
          Signal_Lost: Database_Unreachable
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col h-full max-h-[calc(100vh-220px)] overflow-hidden">
      {/* Header List */}
      <div className="flex justify-between items-end mb-6 flex-shrink-0">
        <div>
          <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">
            Subject_Database
          </h3>
          <p className="text-[18px] font-black text-white italic leading-none mt-1">
            ARCHIVES
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-mono text-blue-500/50 uppercase">
            {activeFilter === "ALL" ? "Total_Entries" : `Filtered_${activeFilter}`}
          </p>
          <p className="text-sm font-mono text-blue-400 font-bold">
            {/* Tampilkan jumlah data yang sudah difilter */}
            {filteredPeople.length.toString().padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* Area Scrollable */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {filteredPeople.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-30 space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-center">
              No_{activeFilter}_Units_Detected
            </p>
            {/* Tawarkan untuk load data lebih banyak jika sedang memfilter tapi hasil 0 */}
            {hasNextPage && (
              <p className="text-[8px] font-mono italic">Try downloading more records...</p>
            )}
          </div>
        ) : (
          // 3. Gunakan filteredPeople untuk mapping
          filteredPeople.map((p) => (
            <button
              key={p.url}
              onClick={() => dispatch(setSelectedPerson(p))}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                selectedItem?.url === p.url
                  ? "bg-blue-600/20 border border-blue-500/40 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                  : "bg-white/[0.02] border border-transparent hover:border-white/10 hover:bg-white/[0.05] text-slate-400"
              }`}
            >
              <div className="flex flex-col items-start text-left overflow-hidden">
                <span className="text-sm font-bold tracking-tight group-hover:text-white transition-colors truncate w-full">
                  {p.name}
                </span>
                <span className="text-[9px] font-mono opacity-40 uppercase mt-1">
                  Access_Code: {p.url.split('/').filter(Boolean).pop()}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                 <div className={`w-1 h-1 rounded-full ${selectedItem?.url === p.url ? "bg-blue-400 animate-pulse" : "bg-transparent"}`}></div>
                 <span className={`text-[10px] font-mono italic uppercase transition-all ${
                   selectedItem?.url === p.url ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                 }`}>
                   {selectedItem?.url === p.url ? "Active" : "Open"}
                 </span>
              </div>
            </button>
          ))
        )}

        {/* Tombol Load More */}
        {hasNextPage && (
          <div className="pt-4 pb-6">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className={`w-full py-4 border border-dashed border-blue-500/20 rounded-2xl text-[10px] font-mono text-blue-500 uppercase tracking-widest hover:bg-blue-500/5 hover:border-blue-500/50 hover:text-white transition-all disabled:opacity-30`}
            >
              {isFetchingNextPage ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                  Syncing_Records...
                </span>
              ) : (
                "[[ Download_Next_Data_Batch ]]"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleList;