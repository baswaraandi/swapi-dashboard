import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { id: "00", label: "dashboard", path: "/" },
    { id: "01", label: "people", path: "/people" },
    { id: "02", label: "planets", path: "/planets" },
    { id: "03", label: "films", path: "/movies" },
    { id: "04", label: "species", path: "/species" },
    { id: "05", label: "starships", path: "/starships" },
  ];

  return (
    <div className="drawer-side z-50">
      <label htmlFor="f1-drawer" className="drawer-overlay"></label>

      <div className="flex flex-col w-80 min-h-screen bg-[#0d1117] border-r border-white/5 text-slate-300">
        {/* Header: Logo Star Wars */}
        <div className="p-10 mb-2 flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
            alt="Star Wars"
            className="w-36 invert opacity-90 hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* User Status Card */}
        <div className="px-8 mb-10 text-center">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4 group hover:border-blue-500/30 transition-colors cursor-default">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
              <span className="text-blue-500 font-bold uppercase">AB</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white uppercase tracking-tight">
                Andyka Baswara
              </p>
              <p className="text-[9px] text-blue-500 font-mono tracking-[0.2em] uppercase animate-pulse">
                Jedi Commander
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-8 overflow-y-auto custom-scrollbar">
          <ul className="space-y-6 pb-10">
            {menuItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  // SANGAT PENTING: 'end' memastikan rute '/' tidak aktif 
                  // saat kita berada di rute anak seperti '/people'
                  end={item.path === "/"}
                  className={({ isActive }) => `
                    font-starjedi text-lg transition-all duration-300 block
                    ${
                      isActive
                        ? "text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-110 translate-x-4"
                        : "text-slate-500 hover:text-white hover:translate-x-2"
                    }
                  `}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-8 mt-auto border-t border-white/5 opacity-40 text-[10px] font-mono tracking-widest text-center">
          ARCHIVE ACCESS TERMINAL 1138
        </div>
      </div>
    </div>
  );
};

export default Sidebar;