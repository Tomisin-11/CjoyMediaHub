import React from "react";
import { useState } from "react";
import { GALLERY_ITEMS } from "../data/news";

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);

  const selectedIdx = selected ? GALLERY_ITEMS.findIndex(g => g.id === selected.id) : -1;

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">

      {/* Count */}
      <p className="text-xs text-zinc-500 font-semibold mb-4">{GALLERY_ITEMS.length} photos</p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {GALLERY_ITEMS.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setSelected(g)}
            className="relative group overflow-hidden block"
          >
            <img
              src={g.image}
              alt=""
              className="w-full h-44 object-cover object-center group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
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
            {/* Close */}
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setSelected(null)}
                className="text-white text-2xl w-10 h-10 flex items-center justify-center border border-zinc-700 hover:border-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Image */}
            <img
              src={selected.image}
              alt=""
              className="w-full max-h-[75vh] object-contain"
            />

            {/* Navigation */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => selectedIdx > 0 && setSelected(GALLERY_ITEMS[selectedIdx - 1])}
                disabled={selectedIdx === 0}
                className="text-xs text-zinc-400 hover:text-white font-bold uppercase tracking-wide border border-zinc-700 px-4 py-2 hover:border-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              <span className="text-xs text-zinc-600 self-center">
                {selectedIdx + 1} / {GALLERY_ITEMS.length}
              </span>
              <button
                onClick={() => selectedIdx < GALLERY_ITEMS.length - 1 && setSelected(GALLERY_ITEMS[selectedIdx + 1])}
                disabled={selectedIdx === GALLERY_ITEMS.length - 1}
                className="text-xs text-zinc-400 hover:text-white font-bold uppercase tracking-wide border border-zinc-700 px-4 py-2 hover:border-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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