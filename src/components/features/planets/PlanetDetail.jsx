import DataField from "../../common/DataField";

const PlanetDetail = ({ planet }) => {
  if (!planet)
    return (
      <div className="h-full border border-dashed border-white/10 rounded-3xl flex items-center justify-center text-slate-600 font-mono text-sm tracking-widest uppercase animate-pulse">
        [ Awaiting Galactic Coordinates ]
      </div>
    );

  return (
    <div className="bg-black/40 border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full min-h-[600px]">
      {/* BACKGROUND SCANNER GRID */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#3b82f6 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="relative z-10">
        <header className="mb-10 flex justify-between items-start border-b border-white/5 pb-6">
          <div>
            <p className="text-emerald-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-1">
              Sector_Scanned: {planet.climate}
            </p>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
              {planet.name}
            </h2>
          </div>
          <div className="text-right font-mono">
            <p className="text-slate-500 text-[10px]">DIAMETER</p>
            <p className="text-xl text-emerald-400">
              {Number(planet.diameter).toLocaleString()} KM
            </p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* HOLOGRAM PLANET VISUALIZER */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer Orbit Ring */}
            <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 border border-emerald-500/10 border-dashed rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

            {/* The Planet Sphere */}
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-emerald-900 via-emerald-600 to-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.4)] relative overflow-hidden group">
              {/* Texture Simulation */}
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              {/* Atmosphere Glow */}
              <div className="absolute inset-0 shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8)]"></div>
            </div>

            {/* Scanner Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 blur-sm animate-[scan_4s_ease-in-out_infinite]"></div>
          </div>

          {/* DATA SPECIFICATIONS */}
          <div className="flex-1 grid grid-cols-2 gap-6 w-full">
            <DataField label="Climate" value={planet.climate} />
            <DataField label="Gravity" value={planet.gravity} />
            <DataField label="Terrain" value={planet.terrain} />
            <DataField
              label="Population"
              value={
                planet.population === "unknown"
                  ? "N/A"
                  : Number(planet.population).toLocaleString()
              }
            />
            <DataField
              label="Rotation Period"
              value={`${planet.rotation_period} Hours`}
            />
            <DataField
              label="Orbital Period"
              value={`${planet.orbital_period} Days`}
            />
          </div>
        </div>

        {/* FOOTER CODES */}
        <div className="mt-12 pt-6 border-t border-white/5 flex justify-between font-mono text-[9px] text-slate-600">
          <p>LOC_REF: {planet.url.split("/").filter(Boolean).pop()}</p>
          <p>SCAN_STATUS: COMPLETE</p>
          <p>© GALACTIC_GEOGRAPHIC_SYSTEM</p>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { transform: translateY(256px); opacity: 1; }
        }
      `,
        }}
      />
    </div>
  );
};

export default PlanetDetail;
