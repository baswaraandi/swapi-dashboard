import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../store/store";

const PlanetFilter = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.ui.activeFilter || "ALL");

  // Filter berdasarkan iklim (Climate)
  const filters = [
    { id: "ALL", label: "ALL_SECTORS", icon: "🌌" },
    { id: "arid", label: "ARID", icon: "🏜️" },
    { id: "temperate", label: "TEMPERATE", icon: "🌍" },
    { id: "tropical", label: "TROPICAL", icon: "🏝️" },
    { id: "frozen", label: "FROZEN", icon: "❄️" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => dispatch(setFilter(f.id))}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-[9px] tracking-widest transition-all ${
            activeFilter === f.id
              ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
              : "bg-white/[0.02] border-white/10 text-slate-500 hover:border-emerald-500/30"
          }`}
        >
          <span>{f.icon}</span>
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default PlanetFilter;