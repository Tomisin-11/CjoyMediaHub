import { BREAKING_ITEMS } from "../data/news";

export default function BreakingTicker() {
  // Duplicate items so the loop is seamless
  const items = [...BREAKING_ITEMS, ...BREAKING_ITEMS];

  return (
    <div className="bg-white border-b-[3px] border-zinc-900 flex items-stretch overflow-hidden">
      {/* Label */}
      <div className="shrink-0 bg-zinc-900 text-white px-4 flex items-center z-10">
        <span className="text-[10px] font-black tracking-widest uppercase whitespace-nowrap flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
          Breaking
        </span>
      </div>

      {/* Ticker track */}
      <div className="ticker-wrap flex-1 py-2">
        <div className="ticker-inner">
          {items.map((item, i) => (
            <span key={i} className="text-sm font-semibold text-zinc-900 whitespace-nowrap inline-flex items-center gap-6">
              {item}
              <span className="text-zinc-300 font-light">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
