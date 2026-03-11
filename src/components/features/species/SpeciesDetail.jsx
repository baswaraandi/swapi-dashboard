import DataField from "../../common/DataField";

const SpeciesDetail = ({ species }) => {
  if (!species)
    return (
      <div className="h-full border border-dashed border-cyan-500/20 rounded-3xl flex items-center justify-center text-cyan-900 font-mono text-sm tracking-widest uppercase animate-pulse">
        [ Awaiting DNA Sample ]
      </div>
    );

  return (
    <div className="bg-black/40 border border-cyan-500/20 rounded-3xl p-8 relative overflow-hidden h-full min-h-[600px]">
      {/* Background Lab Grid */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative z-10">
        <header className="mb-10 flex justify-between items-start border-b border-cyan-500/10 pb-6">
          <div>
            <p className="text-cyan-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-1">
              Genotype_Classification: {species.classification}
            </p>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
              {species.name}
            </h2>
          </div>
          <div className="text-right font-mono">
            <p className="text-slate-500 text-[10px]">LIFESPAN</p>
            <p className="text-xl text-cyan-400">
              {species.average_lifespan} YEARS
            </p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* BIOLOGICAL VISUALIZER */}
          <div className="relative w-64 h-80 flex items-center justify-center bg-cyan-500/5 rounded-2xl border border-cyan-500/10 overflow-hidden">
            {/* Simple DNA Animation Effect */}
            <div className="flex gap-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
                  <div className="w-2 h-12 border-x border-cyan-500/30 mx-auto"></div>
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]"></div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-0 w-full text-center">
              <span className="text-[8px] font-mono text-cyan-500 animate-pulse">
                SCANNING GENOME...
              </span>
            </div>
          </div>

          {/* BIOLOGICAL DATA */}
          <div className="flex-1 grid grid-cols-2 gap-6 w-full">
            <DataField label="Classification" value={species.classification} />
            <DataField label="Designation" value={species.designation} />
            <DataField label="Language" value={species.language} />
            <DataField
              label="Avg Height"
              value={`${species.average_height} cm`}
            />
            <DataField label="Skin Colors" value={species.skin_colors} />
            <DataField label="Eye Colors" value={species.eye_colors} />
          </div>
        </div>

        {/* RELATED ENTITIES */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
            <p className="text-[9px] text-cyan-700 font-bold uppercase mb-1">
              Specimen Count
            </p>
            <p className="text-2xl font-bold">
              {species.people.length}{" "}
              <span className="text-xs font-normal text-slate-500">
                RECORDS
              </span>
            </p>
          </div>
          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
            <p className="text-[9px] text-cyan-700 font-bold uppercase mb-1">
              Cultural History
            </p>
            <p className="text-2xl font-bold">
              {species.films.length}{" "}
              <span className="text-xs font-normal text-slate-500">ERA(S)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesDetail;
