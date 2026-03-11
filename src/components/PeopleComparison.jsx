import { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const parseValue = (val) => {
  if (!val) return 0;
  // Menangani "unknown" dari SWAPI
  if (val === "unknown") return 0;
  const num = parseInt(val.replace(/,/g, ""));
  return isNaN(num) ? 0 : num;
};

const PeopleComparison = ({ peopleData }) => {
  const allPeople = peopleData || [];

  const [slotA, setSlotA] = useState(0);
  const [slotB, setSlotB] = useState(1);

  const charA = allPeople[slotA];
  const charB = allPeople[slotB];

  // Logic Chart tetap sama
  const chartData = [
    {
      subject: "Height",
      A: parseValue(charA?.height),
      B: parseValue(charB?.height),
      fullMark: 250,
    },
    {
      subject: "Mass",
      A: parseValue(charA?.mass),
      B: parseValue(charB?.mass),
      fullMark: 150,
    },
    {
      subject: "Films",
      A: (charA?.films?.length || 0) * 20,
      B: (charB?.films?.length || 0) * 20,
      fullMark: 100,
    },
    {
      subject: "Vehicles",
      A: (charA?.vehicles?.length || 0) * 30,
      B: (charB?.vehicles?.length || 0) * 30,
      fullMark: 100,
    },
    {
      subject: "Starships",
      A: (charA?.starships?.length || 0) * 30,
      B: (charB?.starships?.length || 0) * 30,
      fullMark: 100,
    },
  ];

  const InfoRow = ({ label, value, color, align = "left" }) => (
    <div
      className={`flex flex-col ${align === "right" ? "items-end" : "items-start"} border-b border-white/5 py-2`}
    >
      <span className="text-[10px] text-slate-500 uppercase font-mono tracking-tighter">
        {label}
      </span>
      <span
        className="text-xs font-bold uppercase tracking-wider"
        style={{ color }}
      >
        {value || "Unknown"}
      </span>
    </div>
  );

  if (allPeople.length === 0)
    return (
      <div className="text-blue-500 font-mono p-10 animate-pulse">
        CONNECTING_TO_ARCHIVES...
      </div>
    );

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
          Tactical_Intelligence_Sync
        </h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SLOT A - Perhatikan z-20 agar tidak tertutup chart */}
        <div className="lg:col-span-3 bg-blue-950/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-md relative z-20">
          <label className="text-[9px] font-mono text-blue-400/60 uppercase mb-2 block">
            Source_Alpha
          </label>
          <select
            value={slotA}
            onChange={(e) => setSlotA(Number(e.target.value))}
            className="w-full bg-slate-900 border border-blue-500/50 rounded-lg p-2 text-xs font-bold text-blue-400 mb-6 cursor-pointer focus:ring-1 focus:ring-blue-500 outline-none"
          >
            {allPeople.map((p, i) => (
              <option
                key={`a-${i}`}
                value={i}
                className="bg-slate-900 text-white italic"
              >
                {p.name}
              </option>
            ))}
          </select>

          <div className="space-y-2">
            <p className="text-2xl font-black text-white leading-tight uppercase mb-4 border-l-4 border-blue-500 pl-3">
              {charA?.name}
            </p>
            <InfoRow label="Gender" value={charA?.gender} color="#3b82f6" />
            <InfoRow
              label="Birth Year"
              value={charA?.birth_year}
              color="#3b82f6"
            />
            <InfoRow
              label="Eye Color"
              value={charA?.eye_color}
              color="#3b82f6"
            />
          </div>
        </div>

        {/* CHART - z-10 (di bawah dropdown) */}
        <div className="lg:col-span-6 bg-black/40 border border-white/5 rounded-3xl p-4 flex flex-col items-center justify-center min-h-[400px] relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#64748b", fontSize: 10, fontWeight: "bold" }}
              />
              <Radar
                name="A"
                dataKey="A"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.4}
              />
              <Radar
                name="B"
                dataKey="B"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* SLOT B */}
        <div className="lg:col-span-3 bg-red-950/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-md relative z-20">
          <label className="text-[9px] font-mono text-red-400/60 uppercase mb-2 block text-right">
            Source_Bravo
          </label>
          <select
            value={slotB}
            onChange={(e) => setSlotB(Number(e.target.value))}
            className="w-full bg-slate-900 border border-red-500/50 rounded-lg p-2 text-xs font-bold text-red-400 mb-6 cursor-pointer focus:ring-1 focus:ring-red-500 outline-none text-right"
          >
            {allPeople.map((p, i) => (
              <option
                key={`b-${i}`}
                value={i}
                className="bg-slate-900 text-white italic"
              >
                {p.name}
              </option>
            ))}
          </select>

          <div className="space-y-2 text-right">
            <p className="text-2xl font-black text-white leading-tight uppercase mb-4 border-r-4 border-red-500 pr-3">
              {charB?.name}
            </p>
            <InfoRow
              label="Gender"
              value={charB?.gender}
              color="#ef4444"
              align="right"
            />
            <InfoRow
              label="Birth Year"
              value={charB?.birth_year}
              color="#ef4444"
              align="right"
            />
            <InfoRow
              label="Eye Color"
              value={charB?.eye_color}
              color="#ef4444"
              align="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleComparison;
