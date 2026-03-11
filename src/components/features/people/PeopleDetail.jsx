import DataField from "../../common/DataField";

const PeopleDetail = ({ person }) => {
  if (!person) return null;

  const getSaberColor = () => {
    const name = person.name.toLowerCase();
    const eye = person.eye_color.toLowerCase();

    // 1. PENGECUALIAN DROID (Tetap Biru agar tidak merah seperti Sith)
    if (
      name.includes("r2-d2") ||
      name.includes("c-3po") ||
      name.includes("r5-d4")
    )
      return "blue";

    // 2. LOGIKA WARNA HIJAU (Luke, Yoda, Qui-Gon)
    const greenSaberUsers = [
      "luke skywalker",
      "yoda",
      "qui-gon jinn",
      "ahsoka tano",
    ];
    if (greenSaberUsers.includes(name)) return "green";

    // 3. LOGIKA WARNA UNGU (Mace Windu satu-satunya)
    if (name.includes("mace windu")) return "purple";

    // 4. LOGIKA WARNA MERAH (Sith / Dark Side)
    if (name.includes("darth") || eye.includes("red") || eye.includes("yellow"))
      return "red";

    // 5. DEFAULT JEDI (Obi-Wan, Anakin, dll)
    return "blue";
  };

  const saberColor = getSaberColor();

  // Helper untuk menentukan warna Tailwind & Shadow
  const getSaberStyles = (color) => {
    switch (color) {
      case "green":
        return "bg-green-400 shadow-[0_0_15px_#4ade80,0_0_30px_#166534] text-green-500";
      case "red":
        return "bg-red-500 shadow-[0_0_15px_#ef4444,0_0_30px_#7f1d1d] text-red-500";
      case "purple":
        return "bg-purple-500 shadow-[0_0_15px_#a855f7,0_0_30px_#581c87] text-purple-500";
      default: // Blue
        return "bg-blue-400 shadow-[0_0_15px_#3b82f6,0_0_30px_#1e3a8a] text-blue-500";
    }
  };

  const saberStyles = getSaberStyles(saberColor);

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full min-h-[600px] transition-all duration-500">
      {/* 1. ANIMASI LASER SCAN */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-[2px] bg-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.8)] absolute animate-[laserScan_3s_infinite]"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-6 mb-8 group">
          {/* 2. REFINED LIGHTSABER DESIGN */}
          <div className="relative flex flex-col items-center">
            {/* Blade (Bilah) dengan Glow Dinamis */}
            <div className="relative w-1.5 h-16 transition-all duration-700">
              <div
                className={`absolute bottom-0 left-0 w-full h-full rounded-full blur-[1px] z-10 ${saberStyles.split(" ").slice(0, 2).join(" ")}`}
              ></div>
              {/* Core Putih Tengah agar terlihat nyata */}
              <div className="absolute bottom-0 left-[25%] w-[50%] h-full bg-white rounded-full z-20 opacity-90"></div>
            </div>

            {/* Hilt (Gagang) */}
            <div className="w-3 h-5 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-b-sm border-t border-slate-600 relative z-30">
              <div className="absolute top-1 w-full h-[2px] bg-black/40"></div>
              <div className="absolute top-2.5 w-full h-[2px] bg-black/40"></div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight group-hover:translate-x-1 transition-transform uppercase">
              {person.name}
            </h2>
            <p
              className={`text-[10px] font-mono tracking-[0.3em] uppercase animate-pulse font-bold ${saberStyles.split(" ").pop()}`}
            >
              {saberColor === "red"
                ? "Dark Side Detected"
                : "Jedi Archive Verified"}
            </p>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <DataField label="Birth Year" value={person.birth_year} />
          <DataField label="Gender" value={person.gender} />
          <DataField label="Height" value={`${person.height} cm`} />
          <DataField label="Mass" value={`${person.mass} kg`} />
          <DataField label="Hair Color" value={person.hair_color} />
          <DataField label="Eye Color" value={person.eye_color} />
          <DataField label="Skin Color" value={person.skin_color} />
          <DataField label="Homeworld" value="Retrieving..." />
        </div>

        {/* Info Cards */}
        <div className="mt-12 flex gap-4">
          <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
            <p className="text-[9px] text-slate-500 font-bold uppercase mb-2">
              Films Data
            </p>
            <p className="text-xl font-bold group-hover:scale-105 transition-transform">
              {person.films.length}{" "}
              <span className="text-[10px] text-blue-500 font-normal">
                APPEARANCES
              </span>
            </p>
          </div>
          <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
            <p className="text-[9px] text-slate-500 font-bold uppercase mb-2">
              Vehicles Data
            </p>
            <p className="text-xl font-bold group-hover:scale-105 transition-transform">
              {person.vehicles.length}{" "}
              <span className="text-[10px] text-blue-500 font-normal">
                UNITS
              </span>
            </p>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes laserScan {
          0% { top: -10%; opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
      `,
        }}
      />
    </div>
  );
};

export default PeopleDetail;
    