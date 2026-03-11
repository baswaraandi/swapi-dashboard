import { useDispatch, useSelector } from "react-redux";
import { setSelectedSpecies } from "../../../store/store";

const SpeciesList = ({ data, loading, onLoadMore, hasMore, isMoreLoading }) => {
  const dispatch = useDispatch();
  const selectedSpecies = useSelector((state) => state.ui.selectedSpecies);
  const speciesList = data?.results || [];

  if (loading)
    return (
      <div className="flex flex-col gap-3 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-20 bg-cyan-500/5 rounded-2xl border border-cyan-500/10"
          ></div>
        ))}
      </div>
    );

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col h-[650px]">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-[0.3em]">
          Biological_Archive
        </h3>
        <span className="text-[9px] font-mono text-cyan-600">
          COUNT: {data?.count || 0}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {speciesList.map((specimen, index) => (
          <button
            key={index}
            onClick={() => dispatch(setSelectedSpecies(specimen))}
            className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border group relative overflow-hidden ${
              selectedSpecies?.name === specimen.name
                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                : "bg-white/[0.02] border-transparent hover:border-cyan-500/20 text-slate-400"
            }`}
          >
            {selectedSpecies?.name === specimen.name && (
              <div className="absolute left-0 top-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#22d3ee]"></div>
            )}

            <div className="flex justify-between items-center relative z-10">
              <div>
                <p className="text-[9px] font-mono uppercase opacity-50 mb-1">
                  ID: SPEC_{index + 1}
                </p>
                <h4 className="font-bold text-sm tracking-widest uppercase group-hover:text-cyan-300 transition-colors">
                  {specimen.name}
                </h4>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-mono opacity-40 uppercase">
                  {specimen.designation}
                </p>
              </div>
            </div>
          </button>
        ))}

        {hasMore && (
          <button
            onClick={() => onLoadMore()}
            disabled={isMoreLoading}
            className="w-full py-4 mt-2 border border-cyan-500/30 rounded-2xl bg-cyan-500/5 text-cyan-500 font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-cyan-500/10 transition-all"
          >
            {isMoreLoading ? "Extracting More DNA..." : ">>> Load More Species"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SpeciesList;
