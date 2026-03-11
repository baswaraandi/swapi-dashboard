import DataField from "../../common/DataField";

const StarshipDetail = ({ starship }) => {
  if (!starship)
    return (
      <div className="h-full border border-dashed border-amber-500/20 rounded-3xl flex items-center justify-center text-amber-900 font-mono text-sm tracking-widest uppercase animate-pulse">
        [ Awaiting Hangar Clearance ]
      </div>
    );

  return (
    <div className="bg-black/40 border border-amber-500/20 rounded-3xl p-8 relative overflow-hidden h-full min-h-[600px]">
      {/* Background Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#f59e0b 0.5px, transparent 0.5px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="relative z-10">
        <header className="mb-10 flex justify-between items-start border-b border-amber-500/10 pb-6">
          <div>
            <p className="text-amber-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-1">
              Registry: {starship.starship_class}
            </p>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
              {starship.name}
            </h2>
            <p className="text-slate-500 text-xs mt-1 italic">
              {starship.model}
            </p>
          </div>
          <div className="text-right font-mono">
            <p className="text-slate-500 text-[10px]">HYPERDRIVE RATING</p>
            <p className="text-2xl text-amber-400">
              CLASS {starship.hyperdrive_rating}
            </p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* TECHNICAL VISUALIZER */}
          <div className="relative w-80 h-48 flex items-center justify-center bg-amber-500/5 rounded-xl border border-amber-500/20 overflow-hidden group">
            {/* Vector Line Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-[2px] bg-amber-500/40 shadow-[0_0_15px_#f59e0b] animate-[pulse_2s_infinite]"></div>
              <div className="absolute w-[2px] h-32 bg-amber-500/20"></div>
            </div>
            <span className="relative z-10 font-mono text-[10px] text-amber-500/60 uppercase">
              Schematic_Preview_NA
            </span>
          </div>

          {/* SHIP SPECIFICATIONS */}
          <div className="flex-1 grid grid-cols-2 gap-6 w-full">
            <DataField label="Manufacturer" value={starship.manufacturer} />
            <DataField
              label="Cost"
              value={
                starship.cost_in_credits === "unknown"
                  ? "N/A"
                  : `${Number(starship.cost_in_credits).toLocaleString()} Credits`
              }
            />
            <DataField label="Length" value={`${starship.length}m`} />
            <DataField
              label="Max Speed"
              value={starship.max_atmosphering_speed}
            />
            <DataField label="Crew" value={starship.crew} />
            <DataField label="Passengers" value={starship.passengers} />
            <DataField label="MGLT" value={starship.MGLT} />
            <DataField label="Cargo" value={starship.cargo_capacity} />
          </div>
        </div>

        <div className="mt-10 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex justify-around text-center font-mono">
          <div>
            <p className="text-[9px] text-slate-500">CONSUMABLES</p>
            <p className="text-sm text-amber-200 uppercase">
              {starship.consumables}
            </p>
          </div>
          <div className="w-[1px] bg-white/5"></div>
          <div>
            <p className="text-[9px] text-slate-500">PILOT_RECORDS</p>
            <p className="text-sm text-amber-200">
              {starship.pilots.length} LOGGED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarshipDetail;
