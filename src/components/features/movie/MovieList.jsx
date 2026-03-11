import { useDispatch, useSelector } from "react-redux";
import { setSelectedFilm } from "../../../store/store";

const MovieList = ({ data, loading }) => {
  const dispatch = useDispatch();
  const selectedFilm = useSelector((state) => state.ui.selectedFilm);

  if (loading)
    return (
      <div className="animate-pulse text-blue-500 font-mono">
        LOADING_ARCHIVES...
      </div>
    );

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col h-[650px]">
      <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-4">
        Holocron Records
      </h3>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {data?.map((film) => (
          <button
            key={film.episode_id}
            onClick={() => dispatch(setSelectedFilm(film))}
            className={`w-full text-left p-4 rounded-2xl transition-all border ${
              selectedFilm?.episode_id === film.episode_id
                ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-500"
                : "bg-white/[0.02] border-transparent hover:bg-white/[0.05] text-slate-400"
            }`}
          >
            <p className="text-[9px] font-mono uppercase opacity-60">
              Episode {film.episode_id}
            </p>
            <h4 className="font-bold text-sm tracking-wide uppercase">
              {film.title}
            </h4>
          </button>
        ))}
      </div>
    </div>
  );
};


export default MovieList;