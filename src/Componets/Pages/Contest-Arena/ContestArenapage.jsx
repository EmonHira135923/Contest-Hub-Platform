"use client";

import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// ─── Leaflet CSS must be imported once at the top ────────────────────────────
import "leaflet/dist/leaflet.css";

// ─── Dynamically import react-leaflet components (no SSR) ────────────────────
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

// ─── FlyController — must live inside <MapContainer> ─────────────────────────
// Dynamically imported so useMap() only runs client-side
const FlyController = dynamic(
  () =>
    import("react-leaflet").then((m) => {
      const { useMap } = m;
      const Ctrl = ({ target }) => {
        const map = useMap();
        useEffect(() => {
          if (target) {
            map.flyTo([target.latitude, target.longitude], 13, {
              animate: true,
              duration: 1.6,
            });
          }
        }, [target, map]);
        return null;
      };
      return Ctrl;
    }),
  { ssr: false }
);

// ─── Fix Leaflet default icon in Next.js / Webpack ───────────────────────────
const fixLeafletIcon = () => {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const L = require("leaflet");
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const ContestArenaPage = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [locations, setLocations] = useState([]);
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [flyTarget, setFlyTarget] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);
  const inputRef = useRef(null);

  // ── Fix icon once on mount
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  // ── Fetch region data
  useEffect(() => {
    axiosSecure
      .get("/data/bddistrictandregion.json")
      .then((res) => {
        // Support both array and single object
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setLocations(data);
      })
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  // ── Filter logic: match region / district / city / covered_area
  const filtered = query.trim()
    ? locations.filter((loc) => {
        const q = query.toLowerCase();
        return (
          loc.region?.toLowerCase().includes(q) ||
          loc.district?.toLowerCase().includes(q) ||
          loc.city?.toLowerCase().includes(q) ||
          loc.covered_area?.some((area) => area.toLowerCase().includes(q))
        );
      })
    : [];

  // ── Handle selection from dropdown
  const handleSelect = (loc) => {
    setQuery(loc.city || loc.district || loc.region);
    setDropdownOpen(false);
    setFlyTarget(loc);
    setActiveLocation(loc);
  };

  // ── Default map center (Bangladesh)
  const defaultCenter = [23.8103, 90.4125];

  return (
    <div
      className={`h-screen flex flex-col font-sans transition-colors duration-300 overflow-hidden ${
        isDark ? "bg-[#0f1623] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* ── Header ── */}
      <header
        className={`shrink-0 px-6 py-3 flex items-center gap-3 border-b ${
          isDark
            ? "bg-[#161d2e] border-slate-700/60"
            : "bg-white border-slate-200"
        } shadow-sm z-10`}
      >
        <span className="text-2xl">🗺️</span>
        <h1
          className={`text-xl font-bold tracking-tight ${
            isDark ? "text-sky-400" : "text-sky-600"
          }`}
        >
          Contest Arena
          <span
            className={`ml-2 text-sm font-normal ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Region Explorer
          </span>
        </h1>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 min-h-0 flex-col md:flex-row">
        {/* ── Sidebar ── */}
        <aside
          className={`w-full md:w-80 shrink-0 flex flex-col gap-3 p-4 border-r overflow-y-auto ${
            isDark
              ? "bg-[#161d2e] border-slate-700/60"
              : "bg-white border-slate-200"
          }`}
        >
          {/* Search input */}
          <div className="relative">
            <div
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 border transition-all ${
                isDark
                  ? "bg-[#1e2840] border-slate-600 focus-within:border-sky-500"
                  : "bg-slate-100 border-slate-300 focus-within:border-sky-500"
              } shadow-sm`}
            >
              {/* Search icon */}
              <svg
                className={`w-4 h-4 shrink-0 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>

              <input
                ref={inputRef}
                type="text"
                placeholder="Search region, district, city…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setDropdownOpen(true);
                }}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                className={`flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400 ${
                  isDark ? "text-slate-100" : "text-slate-800"
                }`}
              />

              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setDropdownOpen(false);
                    inputRef.current?.focus();
                  }}
                  className={`text-lg leading-none ${
                    isDark
                      ? "text-slate-400 hover:text-slate-200"
                      : "text-slate-400 hover:text-slate-700"
                  } transition-colors`}
                >
                  ×
                </button>
              )}
            </div>

            {/* Dropdown */}
            {dropdownOpen && filtered.length > 0 && (
              <ul
                className={`absolute z-50 top-full mt-1.5 left-0 right-0 rounded-xl border shadow-xl overflow-hidden ${
                  isDark
                    ? "bg-[#1e2840] border-slate-600"
                    : "bg-white border-slate-200"
                }`}
              >
                {filtered.map((loc, i) => (
                  <li key={i}>
                    <button
                      onMouseDown={() => handleSelect(loc)}
                      className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                        isDark
                          ? "hover:bg-sky-900/40 text-slate-200"
                          : "hover:bg-sky-50 text-slate-800"
                      }`}
                    >
                      <span className="mt-0.5 text-sky-500">📍</span>
                      <div>
                        <p className="text-sm font-semibold">
                          {loc.city || loc.district}
                        </p>
                        <p
                          className={`text-xs mt-0.5 ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {loc.region}
                          {loc.covered_area?.length
                            ? ` · ${loc.covered_area.slice(0, 3).join(", ")}`
                            : ""}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {dropdownOpen && query.trim() && filtered.length === 0 && (
              <div
                className={`absolute z-50 top-full mt-1.5 left-0 right-0 rounded-xl border px-4 py-3 text-sm ${
                  isDark
                    ? "bg-[#1e2840] border-slate-600 text-slate-400"
                    : "bg-white border-slate-200 text-slate-500"
                }`}
              >
                No results for &quot;{query}&quot;
              </div>
            )}
          </div>

          {/* Active location card */}
          {activeLocation && (
            <div
              className={`rounded-xl border p-4 transition-all ${
                isDark
                  ? "bg-[#1e2840] border-sky-700/50"
                  : "bg-sky-50 border-sky-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sky-500 text-lg">📍</span>
                <h2 className="font-bold text-base">
                  {activeLocation.city || activeLocation.district}
                </h2>
                <span
                  className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
                    activeLocation.status === "active"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {activeLocation.status}
                </span>
              </div>
              <p
                className={`text-xs mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                <span className="font-medium">Region:</span>{" "}
                {activeLocation.region}
              </p>
              <p
                className={`text-xs mb-2 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                <span className="font-medium">District:</span>{" "}
                {activeLocation.district}
              </p>
              {activeLocation.covered_area?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeLocation.covered_area.map((area, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        isDark
                          ? "border-sky-700 text-sky-300 bg-sky-900/30"
                          : "border-sky-300 text-sky-700 bg-sky-100"
                      }`}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}
              <p
                className={`text-xs mt-3 font-mono ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {activeLocation.latitude?.toFixed(4)},{" "}
                {activeLocation.longitude?.toFixed(4)}
              </p>
            </div>
          )}

          {/* All locations list */}
          <div className="flex flex-col gap-2">
            <p
              className={`text-xs font-semibold uppercase tracking-widest px-1 ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            >
              All Locations ({locations.length})
            </p>
            {locations.map((loc, i) => (
              <button
                key={i}
                onClick={() => handleSelect(loc)}
                className={`text-left rounded-xl px-4 py-3 border transition-all flex items-center gap-3 ${
                  activeLocation === loc
                    ? isDark
                      ? "bg-sky-900/40 border-sky-600 text-sky-300"
                      : "bg-sky-100 border-sky-400 text-sky-800"
                    : isDark
                    ? "bg-[#1e2840] border-slate-700 hover:border-sky-700 text-slate-300"
                    : "bg-white border-slate-200 hover:border-sky-300 text-slate-700"
                }`}
              >
                <span className="text-base">🌏</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {loc.city || loc.district}
                  </p>
                  <p
                    className={`text-xs truncate ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {loc.region}
                  </p>
                </div>
                <span
                  className={`ml-auto text-xs shrink-0 px-1.5 py-0.5 rounded-full ${
                    loc.status === "active"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-slate-500/20 text-slate-400"
                  }`}
                >
                  {loc.status}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* ── Map ── */}
        <main className="flex-1 min-h-0 relative">
          <MapContainer
            center={defaultCenter}
            zoom={10}
            className="w-full h-full"
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url={
                isDark
                  ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              }
            />

            {/* Fly controller */}
            <FlyController target={flyTarget} />

            {/* Markers for all locations */}
            {locations.map((loc, i) => (
              <Marker key={i} position={[loc.latitude, loc.longitude]}>
                <Popup>
                  <div className="text-sm font-sans">
                    <p className="font-bold text-sky-600">
                      {loc.city || loc.district}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {loc.region} · {loc.status}
                    </p>
                    {loc.covered_area?.length > 0 && (
                      <p className="text-xs mt-1 text-slate-600">
                        {loc.covered_area.join(", ")}
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </main>
      </div>
    </div>
  );
};

export default ContestArenaPage;