import React from "react";
import { useState } from "react";
import { GALLERY_ITEMS } from "../data/news";
import { SectionHead } from "../components/UI";

const FALLBACK = (i) => `https://picsum.photos/seed/gal${i}/800/500`;

const handleImgError = (e, i) => {
  e.target.onerror = null;
  e.target.src = FALLBACK(i);
};

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.type === filter);

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {["all", "photo", "video"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-black uppercase tracking-wide px-4 py-2 border transition-colors ${
                filter === f ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-600 border-zinc-300 hover:border-zinc-900"
              }`}
            >
              {f === "all" ? `All (${GALLERY_ITEMS.length})` : `${f}s (${GALLERY_ITEMS.filter(g => g.type === f).length})`}
            </button>
          ))}
        </div>
        <p className="text-xs text-zinc-500 font-semibold">{filtered.length} items showing</p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {filtered.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setSelected(g)}
            className={`relative group overflow-hidden text-left ${
              i === 0 ? "sm:col-span-2 sm:row-span-2" : i === 7 ? "sm:col-span-2" : ""
            }`}
          >
            <img
              src={g.image || FALLBACK(i)}
              alt={g.caption}
              className={`w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ${
                i === 0 ? "h-52 sm:h-80" : i === 7 ? "h-44" : "h-40"
              }`}
              loading="lazy"
              onError={(e) => handleImgError(e, i)}
            />
            {g.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-60 w-12 h-12 flex items-center justify-center group-hover:bg-opacity-80 transition-colors">
                  <svg width="14" height="16" fill="white" viewBox="0 0 10 12"><path d="M0 0l10 6-10 6z"/></svg>
                </div>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-1 group-hover:translate-y-0 transition-transform">
              <p className="text-white text-xs font-semibold line-clamp-2">{g.caption}</p>
              <span className={`text-[9px] font-black uppercase tracking-widest mt-0.5 block ${g.type === "video" ? "text-red-400" : "text-zinc-400"}`}>
                {g.type}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-white font-bold">{selected.caption}</p>
                <span className={`text-[10px] font-black uppercase tracking-widest ${selected.type === "video" ? "text-red-400" : "text-zinc-400"}`}>
                  {selected.type}
                </span>
              </div>
              <button onClick={() => setSelected(null)} className="text-white text-2xl hover:text-zinc-300 w-10 h-10 flex items-center justify-center border border-zinc-700 hover:border-white transition-colors">
                ✕
              </button>
            </div>
            <img
              src={selected.image || FALLBACK(selected.id)}
              alt={selected.caption}
              className="w-full max-h-[75vh] object-contain"
              onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK(selected.id); }}
            />
            {selected.type === "video" && (
              <div className="mt-4 text-center">
                <button className="bg-red-600 text-white text-sm font-bold px-6 py-2 hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto">
                  <svg width="12" height="14" fill="white" viewBox="0 0 10 12"><path d="M0 0l10 6-10 6z"/></svg>
                  Play Video
                </button>
              </div>
            )}
            {/* Navigation */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  const idx = filtered.findIndex(g => g.id === selected.id);
                  if (idx > 0) setSelected(filtered[idx - 1]);
                }}
                className="text-xs text-zinc-400 hover:text-white font-bold uppercase tracking-wide border border-zinc-700 px-4 py-2 hover:border-white transition-colors"
              >
                ← Prev
              </button>
              <span className="text-xs text-zinc-600 self-center">
                {filtered.findIndex(g => g.id === selected.id) + 1} / {filtered.length}
              </span>
              <button
                onClick={() => {
                  const idx = filtered.findIndex(g => g.id === selected.id);
                  if (idx < filtered.length - 1) setSelected(filtered[idx + 1]);
                }}
                className="text-xs text-zinc-400 hover:text-white font-bold uppercase tracking-wide border border-zinc-700 px-4 py-2 hover:border-white transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}