import DataField from "../../common/DataField";

const MovieDetail = ({ film }) => {
  if (!film)
    return (
      <div className="h-full border border-white/5 rounded-3xl flex items-center justify-center text-slate-600 italic">
        Select a transmission to decrypt...
      </div>
    );

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full min-h-[600px]">
      {/* Cinematic Background Effect */}
      <div className="absolute inset-0 bg-radial-gradient from-yellow-500/5 to-transparent pointer-events-none"></div>

      <div className="relative z-10">
        <header className="mb-8 border-b border-white/5 pb-6">
          <p className="text-yellow-500 font-mono text-xs mb-1 tracking-tighter hover:scale-105 transition-transform inline-block cursor-default">
            GALACTIC_EPISODE_{film.episode_id}
          </p>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
            {film.title}
          </h2>
          <div className="flex gap-4 mt-2 text-[10px] font-mono text-slate-500 uppercase">
            <span>Dir: {film.director}</span>
            <span>Rel: {film.release_date}</span>
          </div>
        </header>

        {/* --- THE FAMOUS 3D CRAWL AREA --- */}
        <div
          className="bg-black/60 rounded-2xl p-6 border border-white/5 mb-8 h-64 overflow-hidden relative"
          style={{ perspective: "250px" }}
        >
          {/* Gradient Overlay untuk Efek 'Hilang di Kejauhan' */}
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/90 to-transparent z-20 pointer-events-none"></div>

          <div
            className="animate-[crawl_90s_linear_infinite] text-yellow-400 font-bold text-justify leading-relaxed text-sm origin-bottom"
            style={{
              transform: "rotateX(25deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="text-center mb-10 mt-10">
              <p className="text-sm font-mono tracking-widest text-yellow-300">
                EPISODE {film.episode_id}
              </p>
              <h1 className="text-4xl font-black text-yellow-400 uppercase tracking-tighter scale-y-125 leading-none">
                {film.title}
              </h1>
            </div>

            {film.opening_crawl}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <DataField label="Director" value={film.director} />
          <DataField label="Producer" value={film.producer} />
          <DataField
            label="Planets"
            value={`${film.planets.length} Locations`}
          />
          <DataField
            label="Characters"
            value={`${film.characters.length} Registered`}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
