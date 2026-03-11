import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Import hook custom untuk mengambil data SWAPI
import { usePeopleData } from "../hooks/useSwapi";
// Import komponen pendukung
import SearchHUD from "../components/features/people/SearchHUD";
import PeopleList from "../components/features/people/PeopleList";
import PeopleDetail from "../components/features/people/PeopleDetail";
import PeopleFilter from "../components/features/people/PeopleFilter";

const PeoplePage = () => {
  // 1. Ambil searchTerm mentah dari Redux (update realtime saat ngetik)
  const searchTerm = useSelector((state) => state.ui.searchTerm || "");
  
  // 2. State untuk menampung nilai pencarian yang sudah di-delay (debounce)
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // 3. Logic Debouncing: Tunggu 500ms setelah user berhenti mengetik
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    // Bersihkan timeout jika user mengetik lagi sebelum 500ms selesai
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 4. Panggil API menggunakan nilai yang sudah di-debounce
  const queryResult = usePeopleData(debouncedSearch);

  // 5. Ambil data karakter yang dipilih dari Redux untuk ditampilkan di panel detail
  const selectedPerson = useSelector((state) => state.ui.selectedPerson);

  return (
    <div className="animate-fadeIn space-y-6 h-screen flex flex-col pb-10">
      
      {/* SECTION: SEARCH & TITLE HUD */}
      <div className="flex-shrink-0">
        <SearchHUD />
        <PeopleFilter />
      </div>

      {/* SECTION: MAIN CONTENT (LIST & DETAIL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        
        {/* KOLOM KIRI: LIST KARAKTER */}
        <div className="lg:col-span-4 h-full">
          {/* Kita kirim queryResult sebagai props ke PeopleList */}
          <PeopleList queryResult={queryResult} />
        </div>

        {/* KOLOM KANAN: DETAIL KARAKTER */}
        <div className="lg:col-span-8 h-full">
          {selectedPerson ? (
            <div className="h-full overflow-y-auto custom-scrollbar bg-slate-900/20 rounded-3xl border border-blue-500/5">
              <PeopleDetail person={selectedPerson} />
            </div>
          ) : (
            /* Tampilan Placeholder saat belum ada subjek yang dipilih */
            <div className="h-full flex flex-col items-center justify-center border border-dashed border-blue-500/20 rounded-3xl bg-blue-950/5 p-10 group">
              <div className="w-20 h-20 border-2 border-blue-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse group-hover:border-blue-500/30 transition-colors">
                <span className="text-blue-500/40 text-3xl group-hover:text-blue-500 transition-colors">
                  👤
                </span>
              </div>
              <div className="space-y-2 text-center">
                <p className="font-mono text-blue-500/60 text-xs uppercase tracking-[0.4em] animate-pulse">
                  Awaiting_Subject_Selection
                </p>
                <p className="font-mono text-[9px] text-blue-500/30 uppercase tracking-widest">
                  Neural_Link_Status: Standby
                </p>
              </div>
              
              {/* Dekorasi Pojok (Optional untuk kesan Sci-Fi) */}
              <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-blue-500/20"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-blue-500/20"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;