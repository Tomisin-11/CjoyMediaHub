import React from "react";
import { Link } from "react-router-dom";
import { HERO, SIDEBAR_STORIES, LATEST, MORE_ROWS, CATEGORY_SECTIONS, GALLERY_ITEMS } from "../data/news";

const FALLBACKS = [
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop",
];

const getImg = (story, i) => {
  return story?.image || FALLBACKS[Math.abs(i) % FALLBACKS.length];
};

const onErr = (e, i) => {
  e.target.onerror = null;
  e.target.src = FALLBACKS[Math.abs(i) % FALLBACKS.length];
};

const f = { fontFamily: "'Libre Franklin', Arial, sans-serif" };
const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const TAGS = ["Politics", "World", "Business", "Technology", "Sports", "Health", "Fashion", "Entertainment", "Science", "Security"];
const getTag = (i) => TAGS[Math.abs(i) % TAGS.length];

function SectionTitle({ title, to, light = false, accent = false }) {
  return (
    <div className={`flex items-center justify-between mb-5 ${accent ? "border-l-4 border-red-600 pl-3" : `pb-1.5 border-b ${light ? "border-zinc-700" : "border-gray-200"}`}`}>
      <h2 className={`text-xs font-black uppercase tracking-widest ${light ? "text-white" : "text-black"}`} style={f}>
        {title}
      </h2>
      {to && (
        <Link to={to} className={`text-xs font-semibold transition-colors ${light ? "text-zinc-400 hover:text-white" : "text-zinc-400 hover:text-black"}`} style={f}>
          See all ›
        </Link>
      )}
    </div>
  );
}

function Meta({ time, tag, light = false }) {
  return (
    <p className="text-xs mt-1.5 flex items-center gap-1.5" style={f}>
      <span className="text-zinc-400">{time}</span>
      {tag && (
        <>
          <span className="opacity-30">·</span>
          <span className={`font-bold uppercase tracking-wide text-[10px] ${light ? "text-zinc-300" : "text-zinc-600"}`}>{tag}</span>
        </>
      )}
    </p>
  );
}

function FeaturedCard({ story, index, large = false, light = false, overlay = false }) {
  if (overlay) {
    return (
      <Link to={`/article/${story.slug}`} className="group relative block overflow-hidden">
        <img
          src={getImg(story, index)}
          alt={story.title}
          className={`w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ${large ? "h-56 sm:h-72" : "h-44"}`}
          loading="lazy"
          onError={(e) => onErr(e, index)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={`font-black leading-snug text-white group-hover:underline line-clamp-3 ${large ? "text-lg sm:text-xl" : "text-sm"}`} style={serif}>
            {story.title}
          </h3>
          <Meta time={story.time} tag={getTag(index)} light />
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${story.slug}`} className="group block">
      <div className="overflow-hidden">
        <img
          src={getImg(story, index)}
          alt={story.title}
          className={`w-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ${large ? "h-52 sm:h-64 lg:h-72" : "h-40 sm:h-44"}`}
          loading="lazy"
          onError={(e) => onErr(e, index)}
        />
      </div>
      <div className="pt-2">
        <h3 className={`font-bold leading-snug group-hover:underline line-clamp-3 ${large ? "text-xl sm:text-2xl" : "text-sm"} ${light ? "text-white" : "text-gray-900"}`} style={serif}>
          {story.title}
        </h3>
        {story.excerpt && (
          <p className={`text-sm mt-1 line-clamp-2 ${light ? "text-zinc-400" : "text-gray-500"}`} style={f}>
            {story.excerpt}
          </p>
        )}
        <Meta time={story.time} tag={getTag(index)} light={light} />
      </div>
    </Link>
  );
}

function StoryRow({ story, index, light = false }) {
  return (
    <Link to={`/article/${story.slug}`} className={`flex items-start gap-3 py-4 border-b group last:border-0 ${light ? "border-zinc-700" : "border-gray-200"}`}>
      <img
        src={getImg(story, index)}
        alt={story.title}
        className="w-28 h-20 object-cover object-center shrink-0"
        loading="lazy"
        onError={(e) => onErr(e, index)}
      />
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-bold leading-snug group-hover:underline line-clamp-3 mb-2 ${light ? "text-white" : "text-gray-900"}`} style={f}>
          {story.title}
        </h4>
        <p className={`text-xs ${light ? "text-zinc-400" : "text-gray-400"}`} style={f}>
          {story.time}
          {story.category && (
            <span className="ml-2 pl-2 border-l border-gray-300 font-semibold uppercase tracking-wide text-[10px]">
              {story.category}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}

function TextStoryRow({ story, index, light = false, numbered = false }) {
  return (
    <Link to={`/article/${story.slug}`} className={`flex items-start gap-3 py-3 border-b group last:border-0 ${light ? "border-zinc-700" : "border-gray-100"}`}>
      {numbered && (
        <span className="text-2xl font-black leading-none mt-0.5 shrink-0 w-8 text-right" style={{ ...f, color: light ? "#555" : "#e0e0e0" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-bold leading-snug group-hover:underline line-clamp-3 ${light ? "text-white" : "text-gray-900"}`} style={f}>
          {story.title}
        </h4>
        {story.excerpt && (
          <p className={`text-xs mt-0.5 line-clamp-2 ${light ? "text-zinc-500" : "text-gray-500"}`} style={f}>
            {story.excerpt}
          </p>
        )}
        <Meta time={story.time} tag={getTag(index)} light={light} />
      </div>
    </Link>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  const left = SIDEBAR_STORIES.slice(1, 3);
  const right = SIDEBAR_STORIES.slice(1, 6);

  return (
    <section>
      {/* Desktop */}
      <div className="hidden lg:flex lg:gap-0 border border-gray-200" style={{ height: "480px" }}>

        {/* Left — 3 stories */}
        <div className="flex flex-col divide-y divide-gray-200 border-r w-[22%] shrink-0 overflow-hidden">
          {left.map((s, i) => (
            <Link key={s.id} to={`/article/${s.slug}`} className="group p-3 hover:bg-gray-50 transition-colors flex-1 flex flex-col overflow-hidden">
              <img
                src={getImg(s, i)}
                alt={s.title}
                className="w-full h-20 object-cover object-center mb-2 shrink-0"
                loading="lazy"
                onError={(e) => onErr(e, i)}
              />
              <h4 className="text-xs font-bold leading-snug text-gray-900 group-hover:underline line-clamp-2 mb-1" style={f}>
                {s.title}
              </h4>
              {s.excerpt && (
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1" style={f}>
                  {s.excerpt}
                </p>
              )}
              <Meta time={s.time} tag={getTag(i)} />
            </Link>
          ))}
        </div>

        {/* Center — fixed height, text bottom-left */}
        <div className="border-r border-gray-200 flex-1 relative overflow-hidden">
          <Link to={`/article/${HERO.slug}`} className="group block absolute inset-0">
            <img
              src={getImg(HERO, 0)}
              alt={HERO.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => onErr(e, 0)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h2 className="text-2xl xl:text-3xl font-black leading-tight text-white group-hover:underline" style={f}>
                {HERO.title}
              </h2>
              {HERO.excerpt && (
                <p className="text-sm text-zinc-200 mt-2 leading-relaxed" style={f}>
                  {HERO.excerpt}
                </p>
              )}
              <Meta time={HERO.time} tag={getTag(0)} light />
            </div>
          </Link>
        </div>

        {/* Right — 4 stories, no images */}
        <div className="flex flex-col divide-y divide-gray-200 w-[22%] shrink-0 overflow-hidden">
          {right.map((s, i) => (
            <Link key={s.id} to={`/article/${s.slug}`} className="group p-3 hover:bg-gray-50 transition-colors flex-1 flex flex-col overflow-hidden">
              <h4 className="text-xs font-bold leading-snug text-gray-900 group-hover:underline line-clamp-4 flex-1" style={f}>
                {s.title}
              </h4>
              {s.excerpt && <p className="text-xs text-gray-500 mt-1 line-clamp-2" style={f}>{s.excerpt}</p>}
              <Meta time={s.time} tag={getTag(i + 3)} />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden -mx-4 sm:-mx-6">
        <Link to={`/article/${HERO.slug}`} className="group block relative">
          <img
            src={getImg(HERO, 0)}
            alt={HERO.title}
            className="w-full h-[420px] sm:h-[500px] object-cover object-center"
            onError={(e) => onErr(e, 0)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-6">
            <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-red-600 text-white px-2 py-0.5 mb-2">{HERO.category}</span>
            <h2 className="text-2xl font-black leading-snug text-white group-hover:underline" style={serif}>{HERO.title}</h2>
            {HERO.excerpt && (
              <p className="text-sm text-zinc-300 mt-2 leading-relaxed line-clamp-2" style={f}>{HERO.excerpt}</p>
            )}
            <Meta time={HERO.time} tag={getTag(0)} light />
          </div>
        </Link>
        <div className="px-4 sm:px-6 divide-y divide-gray-100">
          {SIDEBAR_STORIES.slice(0, 4).map((s, i) => (
            <StoryRow key={s.id} story={s} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── LATEST — 4 cards only ─────────────────────────────────────────────────────
function LatestSection({ stories }) {
  const top4 = stories.slice(0, 4);

  return (
    <section>
      <SectionTitle title="Latest Stories" to="/politics" accent />
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4">
        {top4.map((s, i) => (
          <FeaturedCard key={s.id} story={s} index={i} overlay />
        ))}
      </div>
      {/* Mobile */}
      <div className="lg:hidden divide-y divide-gray-100">
        {top4.map((s, i) => (
          <StoryRow key={s.id} story={s} index={i} />
        ))}
      </div>
    </section>
  );
}

// ── EDITOR'S PICKS ────────────────────────────────────────────────────────────
function MyNewsSection({ stories = [] }) {
  const items = stories.length ? stories : LATEST.slice(4, 8);

  return (
    <section style={{ backgroundColor: "#0a0a0a" }} className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-screen-xl mx-auto">
        <SectionTitle title="Editor's Picks" to="/entertainment" light />
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4">
          {items.slice(0, 4).map((s, i) => (
            <FeaturedCard key={s.id} story={s} index={i + 4} light overlay />
          ))}
        </div>
        <div className="lg:hidden divide-y divide-zinc-800">
          {items.slice(0, 4).map((s, i) => (
            <TextStoryRow key={s.id} story={s} index={i + 4} light />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CATEGORY SECTION ──────────────────────────────────────────────────────────
function CategorySection({ section, layoutIndex }) {
  const stories = section.stories || [];
  const [featured, second, third, ...rest] = stories;
  if (!featured) return null;

  // Layout 0: big left image + right text list (max 4 total)
  if (layoutIndex % 4 === 0) {
    return (
      <section>
        <SectionTitle title={section.name} to={`/${section.slug}`} />
        <div className="hidden lg:grid lg:grid-cols-[2fr_1fr] lg:gap-6">
          <FeaturedCard story={featured} index={0} large overlay />
          <div className="flex flex-col divide-y divide-gray-100">
            {[second, third].filter(Boolean).map((s, i) => (
              <TextStoryRow key={s.id} story={s} index={i + 1} numbered />
            ))}
          </div>
        </div>
        <div className="lg:hidden">
          <FeaturedCard story={featured} index={0} overlay />
          <div className="mt-2 divide-y divide-gray-100">
            {stories.slice(1, 4).map((s, i) => (
              <StoryRow key={s.id} story={s} index={i + 1} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Layout 1: 3-col equal grid
  if (layoutIndex % 4 === 1) {
    return (
      <section>
        <SectionTitle title={section.name} to={`/${section.slug}`} />
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
          {[featured, second, third].filter(Boolean).map((s, i) => (
            <FeaturedCard key={s.id} story={s} index={i} overlay />
          ))}
        </div>
        <div className="lg:hidden">
          <FeaturedCard story={featured} index={0} overlay />
          <div className="mt-2 divide-y divide-gray-100">
            {stories.slice(1, 4).map((s, i) => (
              <StoryRow key={s.id} story={s} index={i + 1} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Layout 2: right-heavy
  if (layoutIndex % 4 === 2) {
    return (
      <section>
        <SectionTitle title={section.name} to={`/${section.slug}`} accent />
        <div className="hidden lg:grid lg:grid-cols-[1fr_2fr] lg:gap-6">
          <div className="flex flex-col divide-y divide-gray-100">
            {[second, third].filter(Boolean).map((s, i) => (
              <TextStoryRow key={s.id} story={s} index={i + 1} numbered />
            ))}
          </div>
          <FeaturedCard story={featured} index={0} large overlay />
        </div>
        <div className="lg:hidden">
          <FeaturedCard story={featured} index={0} overlay />
          <div className="mt-2 divide-y divide-gray-100">
            {stories.slice(1, 4).map((s, i) => (
              <StoryRow key={s.id} story={s} index={i + 1} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Layout 3: dark full-width — 3 cards
  return (
    <section style={{ backgroundColor: "#111" }} className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-screen-xl mx-auto">
        <SectionTitle title={section.name} to={`/${section.slug}`} light />
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
          {[featured, second, third].filter(Boolean).map((s, i) => (
            <FeaturedCard key={s.id} story={s} index={i} light overlay />
          ))}
        </div>
        <div className="lg:hidden divide-y divide-zinc-700">
          {stories.slice(0, 4).map((s, i) => (
            <TextStoryRow key={s.id} story={s} index={i} light />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── GALLERY ───────────────────────────────────────────────────────────────────
function GalleryThumb({ g, i, className = "" }) {
  return (
    <Link to="/gallery" className={`group relative block overflow-hidden ${className}`}>
      <img
        src={getImg(g, i)}
        alt=""
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-400"
        loading="lazy"
        onError={(e) => onErr(e, i + 50)}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
    </Link>
  );
}

function GalleryStrip() {
  const imgs = GALLERY_ITEMS.slice(0, 13);

  return (
    <section>
      <SectionTitle title="Photo Gallery" to="/gallery" accent />

      {/* ── Desktop layout ── */}
      <div className="hidden lg:block space-y-2">

        {/* Row 1: 1 big + 3 medium */}
        <div className="grid grid-cols-4 gap-2" style={{ height: 320 }}>
          <GalleryThumb g={imgs[0]} i={0} className="col-span-2" />
          <GalleryThumb g={imgs[1]} i={1} />
          <GalleryThumb g={imgs[2]} i={2} />
        </div>

        {/* Row 2: 4 equal */}
        <div className="grid grid-cols-4 gap-2" style={{ height: 200 }}>
          {imgs.slice(3, 7).map((g, i) => (
            <GalleryThumb key={g.id} g={g} i={i + 3} />
          ))}
        </div>

        {/* Row 3: 3 medium + 1 big */}
        <div className="grid grid-cols-4 gap-2" style={{ height: 240 }}>
          <GalleryThumb g={imgs[7]} i={7} />
          <GalleryThumb g={imgs[8]} i={8} />
          <GalleryThumb g={imgs[9]} i={9} />
          <GalleryThumb g={imgs[10]} i={10} className="col-span-1" />
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="lg:hidden space-y-2">

        {/* Big hero */}
        <GalleryThumb g={imgs[0]} i={0} className="block h-56 w-full" />

        {/* 2-col grid */}
        <div className="grid grid-cols-2 gap-2">
          {imgs.slice(1, 7).map((g, i) => (
            <GalleryThumb key={g.id} g={g} i={i + 1} className="h-36" />
          ))}
        </div>

        {/* 3-col strip */}
        <div className="grid grid-cols-3 gap-2">
          {imgs.slice(7, 13).map((g, i) => (
            <GalleryThumb key={g.id} g={g} i={i + 7} className="h-28" />
          ))}
        </div>
      </div>

      <div className="text-center mt-5">
        <Link
          to="/gallery"
          className="inline-block border border-zinc-900 text-zinc-900 text-xs font-black uppercase tracking-widest px-8 py-3 hover:bg-zinc-900 hover:text-white transition-colors"
        >
          View Full Gallery ({GALLERY_ITEMS.length} photos)
        </Link>
      </div>
    </section>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const allLatest = [...(LATEST || []), ...(MORE_ROWS || []).flat()];
  const sections = CATEGORY_SECTIONS || [];

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <HeroSection />
      <LatestSection stories={allLatest} />
      <MyNewsSection />
      <div className="space-y-12">
        {sections.map((sec, i) => (
          <CategorySection key={sec.slug} section={sec} layoutIndex={i} />
        ))}
      </div>
      <GalleryStrip />
    </main>
  );
}