import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../store/store";

const PeopleFilter = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.ui.activeFilter || "ALL");

  const filters = [
    { id: "ALL", label: "ALL_UNITS", icon: "🌐" },
    { id: "male", label: "MALE", icon: "👨" },
    { id: "female", label: "FEMALE", icon: "👩" },
    { id: "n/a", label: "DROID", icon: "🤖" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4 animate-fadeIn">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => dispatch(setFilter(f.id))}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border font-mono text-[9px] tracking-[0.2em] transition-all duration-300 ${
            activeFilter === f.id
              ? "bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              : "bg-white/[0.02] border-white/10 text-slate-500 hover:border-blue-500/30 hover:text-blue-300"
          }`}
        >
          <span className="opacity-70">{f.icon}</span>
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default PeopleFilter;