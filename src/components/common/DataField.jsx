const DataField = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-1 group">
      {/* Label Kecil di Atas */}
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-amber-500/50 transition-colors">
        {label}
      </span>

      {/* Nilai Utama */}
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 transition-all group-hover:bg-white/10 group-hover:border-white/20">
        <p className="text-sm text-slate-200 font-medium truncate italic">
          {value && value !== "unknown" && value !== "n/a" ? value : "---"}
        </p>
      </div>
    </div>
  );
};

export default DataField;
