import { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  Curve,
} from "recharts";
// BENAR: Arahkan ke folder hooks
import {
  usePeopleData,
  usePlanetsData,
  useFilmsData,
  useSpeciesData,
  useStarshipsData,
} from "../hooks/useSwapi"; // Pastikan nama filenya useSwapi.js
import PeopleComparison from "../components/PeopleComparison"; // IMPORT DISINI

const ConstellationLines = ({ points, color }) => {
  if (!points || points.length < 2) return null;
  const sortedPoints = [...points].sort((a, b) => a.x - b.x);
  return (
    <Curve
      data={sortedPoints}
      type="monotone"
      stroke={color}
      strokeWidth={0.3}
      strokeOpacity={0.2}
      fill="none"
    />
  );
};

const DashboardHome = () => {
  const { data: people, isLoading: lp } = usePeopleData();
  const { data: planets, isLoading: lpl } = usePlanetsData();
  const { data: films, isLoading: lf } = useFilmsData();
  const { data: species, isLoading: ls } = useSpeciesData();
  const { data: starships, isLoading: lst } = useStarshipsData();

  const constellationData = useMemo(() => {
    if (lp || lpl || lf || ls || lst) return [];

    const categories = [
      {
        name: "People",
        count: people?.pages?.[0]?.count || 0,
        color: "#3b82f6",
        glow: "#2563eb",
        xPos: 15,
      },
      {
        name: "Planets",
        count: planets?.pages?.[0]?.count || 0,
        color: "#10b981",
        glow: "#059669",
        xPos: 35,
      },
      {
        name: "Films",
        // PERBAIKAN: Gunakan struktur yang sama dengan yang lain
        // Jika useFilmsData tidak menggunakan infinite scroll, gunakan: films?.count || films?.length || 0
        count: films?.pages?.[0]?.count || films?.count || films?.length || 0,
        color: "#ef4444",
        glow: "#dc2626",
        xPos: 50,
      },
      {
        name: "Species",
        count: species?.pages?.[0]?.count || 0,
        color: "#8b5cf6",
        glow: "#7c3aed",
        xPos: 65,
      },
      {
        name: "Starships",
        count: starships?.pages?.[0]?.count || 0,
        color: "#f59e0b",
        glow: "#d97706",
        xPos: 85,
      },
    ];

    return categories.map((cat) => {
      const points = [];
      // Batasi jumlah titik jika count terlalu besar agar tidak lag,
      // tapi untuk Films (biasanya cuma 6-7) ini tidak masalah.
      for (let i = 0; i < cat.count; i++) {
        points.push({
          x: cat.xPos + (Math.random() - 0.5) * 12,
          y: 15 + Math.random() * 70,
          name: cat.name,
          color: cat.color,
          glow: cat.glow,
          index: i + 1,
        });
      }
      return { ...cat, points };
    });
  }, [lp, lpl, lf, ls, lst, people, planets, films, species, starships]);

  if (lp || lpl || lf || ls || lst) {
    return (
      <div className="h-screen flex items-center justify-center font-mono text-blue-500 animate-pulse uppercase tracking-widest">
        Initialising_Stellar_Map...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-[#020617] min-h-screen">
      {/* SEKSI 1: CHART RASI BINTANG */}
      <div className="p-8 border border-blue-900/30 rounded-3xl shadow-2xl relative overflow-hidden bg-slate-950/50">
        <header className="mb-6 relative z-10">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            Star_Chart_Archives
          </h2>
          <p className="text-blue-500 font-mono text-[9px] tracking-[0.4em] uppercase opacity-70">
            Realtime_Stellar_Object_Counter
          </p>
        </header>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <XAxis type="number" dataKey="x" hide domain={[0, 100]} />
              <YAxis type="number" dataKey="y" hide domain={[0, 100]} />
              <ZAxis type="number" range={[10, 10]} />
              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload?.[0]) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-slate-950 border border-blue-500/30 p-3 rounded-lg shadow-2xl">
                        <p className="text-[10px] text-blue-400 font-bold uppercase">
                          {d.name} ID: #{d.index}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {constellationData.map((cat) => (
                <ConstellationLines
                  key={cat.name}
                  points={cat.points}
                  color={cat.color}
                />
              ))}
              {constellationData.map((cat) => (
                <Scatter
                  key={cat.name}
                  data={cat.points}
                  fill={cat.color}
                  shape={(props) => (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r="1"
                      fill="white"
                      style={{ filter: `drop-shadow(0 0 4px ${cat.color})` }}
                    />
                  )}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {constellationData.map((item) => (
            <div
              key={item.name}
              className="p-3 rounded-xl bg-blue-950/10 border border-blue-900/20"
            >
              <p className="text-[9px] text-slate-500 uppercase font-bold">
                {item.name}
              </p>
              <p className="text-xl font-black text-white">{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEKSI 2: COMPARISON DETAIL */}
      <PeopleComparison peopleData={people?.pages?.[0]?.results} />
    </div>
  );
};

export default DashboardHome;
