import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../../store/store"; // Sesuaikan path store kamu

const SearchHUD = () => {
  const dispatch = useDispatch();
  // Ambil nilai search dari Redux agar input tetap sinkron
  const searchTerm = useSelector((state) => state.ui.searchTerm || "");

  const handleInputChange = (e) => {
    // Update store Redux secara realtime saat mengetik
    dispatch(setSearchTerm(e.target.value));
  };

  const handleScan = (e) => {
    e.preventDefault();
    // Opsional: Kamu bisa tambahkan efek suara atau trigger animasi di sini
    console.log("Scanning for subject:", searchTerm);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
      <div>
        <h1 className="font-starjedi text-3xl text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] leading-none">
          people <span className="text-white">archives</span>
        </h1>
        <p className="text-[9px] font-mono text-blue-500/50 uppercase tracking-[0.3em] mt-2">
          Global_Subject_Database_Access
        </p>
      </div>

      <form onSubmit={handleScan} className="relative group w-full lg:w-auto">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <span className="text-blue-500/30 font-mono text-[10px]">QRY:</span>
        </div>
        
        <input
          type="text"
          placeholder="SEARCH_BY_NAME..."
          className="bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-16 py-3 text-xs focus:outline-none focus:border-blue-500/50 w-full lg:w-80 transition-all font-mono text-blue-100 placeholder:text-blue-900 shadow-inner"
          value={searchTerm}
          onChange={handleInputChange}
        />
        
        <button
          type="submit"
          className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-blue-500 transition-all italic font-bold text-[9px] tracking-widest uppercase"
        >
          SCAN
        </button>
      </form>
    </div>
  );
};

export default SearchHUD;