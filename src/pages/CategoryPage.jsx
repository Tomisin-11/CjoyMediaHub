import { useParams, Link } from "react-router-dom";
import { ALL_ARTICLES, CATEGORY_SECTIONS } from "../data/news";
import { Badge, SectionHead, ArticleCard } from "../components/UI";

const CAT_IMAGES = {
  politics:     "https://picsum.photos/seed/pol001/1200/400",
  sports:       "https://picsum.photos/seed/spt001/1200/400",
  entertainment:"https://picsum.photos/seed/ent001/1200/400",
  health:       "https://picsum.photos/seed/hlt001/1200/400",
  security:     "https://picsum.photos/seed/sec001/1200/400",
  business:     "https://picsum.photos/seed/biz001/1200/400",
  technology:   "https://picsum.photos/seed/tec001/1200/400",
  fashion:      "https://picsum.photos/seed/fsh001/1200/400",
};

const FALLBACK = (i) => `https://picsum.photos/seed/art${i}/800/500`;

const handleImgError = (e, i) => {
  e.target.onerror = null;
  e.target.src = FALLBACK(i);
};

export default function CategoryPage() {
  const { category } = useParams();
  const label = category.charAt(0).toUpperCase() + category.slice(1);

  const articles = ALL_ARTICLES.filter(
    (a) => a.category && a.category.toLowerCase() === category.toLowerCase()
  );

  const catSection = CATEGORY_SECTIONS.find(s => s.slug === category);
  const sectionStories = catSection ? catSection.stories.map(s => ({ ...s, category: label })) : [];

  const seen = new Set();
  const merged = [...articles, ...sectionStories].filter(a => {
    if (seen.has(a.id)) return false;
    seen.add(a.id);
    return true;
  });

  const [featured, second, ...rest] = merged.length ? merged : [];
  // Only show 3 in "More Stories" grid
  const moreStories = rest.slice(0, 3);

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6">
      {merged.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-zinc-500 text-sm font-semibold mb-4">No stories found in this category yet.</p>
          <Link to="/" className="text-sm font-bold underline text-zinc-900">Back to home</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">

            {/* Featured hero story */}
            {featured && (
              <div className="border-b border-zinc-200 pb-8 mb-8">
                <SectionHead title="Top Story" />
                <Link to={`/article/${featured.slug}`} className="group block">
                  <div className="overflow-hidden">
                    <img
                      src={featured.image || FALLBACK(0)}
                      alt={featured.title}
                      className="w-full h-56 object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                      onError={(e) => handleImgError(e, 0)}
                    />
                  </div>
                  <div className="pt-4">
                    <Badge cat={label} />
                    <h2 className="mt-3 text-2xl font-black leading-tight text-zinc-900 group-hover:underline" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {featured.title}
                    </h2>
                    {featured.excerpt && <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{featured.excerpt}</p>}
                    <span className="text-xs text-zinc-500 mt-2 block">{featured.time}</span>
                  </div>
                </Link>
              </div>
            )}

            {/* Second featured */}
            {second && (
              <div className="border-b border-zinc-200 pb-8 mb-8">
                <Link to={`/article/${second.slug}`} className="group flex gap-5">
                  <div className="overflow-hidden shrink-0">
                    <img
                      src={second.image || FALLBACK(1)}
                      alt={second.title}
                      className="w-48 h-32 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => handleImgError(e, 1)}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge cat={label} />
                    <h3 className="mt-2 text-lg font-bold leading-snug text-zinc-900 group-hover:underline line-clamp-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {second.title}
                    </h3>
                    {second.excerpt && <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{second.excerpt}</p>}
                    <span className="text-xs text-zinc-500 mt-2 block">{second.time}</span>
                  </div>
                </Link>
              </div>
            )}

            {/* Grid of remaining articles — max 3 */}
            {moreStories.length > 0 && (
              <>
                <SectionHead title="More Stories" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8">
                  {moreStories.map((s, i) => (
                    <Link key={s.id} to={`/article/${s.slug}`} className="group block">
                      <div className="overflow-hidden">
                        <img
                          src={s.image || FALLBACK(i + 2)}
                          alt={s.title}
                          className="w-full h-36 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => handleImgError(e, i + 2)}
                        />
                      </div>
                      <div className="pt-2">
                        <Badge cat={label} small />
                        <h4 className="mt-2 text-sm font-bold leading-snug text-zinc-900 group-hover:underline line-clamp-3">
                          {s.title}
                        </h4>
                        {s.excerpt && <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{s.excerpt}</p>}
                        <span className="text-[10px] text-zinc-400 mt-1 block">{s.time}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:border-l lg:border-zinc-200 lg:pl-6">
            <SectionHead title="Other Sections" />
            <div className="space-y-1 mb-8">
              {Object.entries(CAT_IMAGES)
                .filter(([c]) => c !== category)
                .map(([c, img]) => (
                  <Link key={c} to={`/${c}`} className="flex items-center gap-3 group hover:bg-zinc-50 p-2 -mx-2 transition-colors">
                    <img
                      src={img}
                      alt={c}
                      className="w-16 h-12 object-cover shrink-0"
                      loading="lazy"
                      onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK(c.length); }}
                    />
                    <span className="text-sm font-bold capitalize text-zinc-800 group-hover:underline">{c}</span>
                  </Link>
                ))}
            </div>

            {/* Latest from this category — only 3 */}
            {merged.slice(0, 3).length > 0 && (
              <>
                <SectionHead title={`Latest in ${label}`} />
                <div className="divide-y divide-zinc-100">
                  {merged.slice(0, 3).map((s, i) => (
                    <Link key={s.id} to={`/article/${s.slug}`} className="flex gap-3 py-3 group hover:bg-zinc-50 transition-colors">
                      <img
                        src={s.image || FALLBACK(i + 20)}
                        alt={s.title}
                        className="w-14 h-10 object-cover shrink-0"
                        loading="lazy"
                        onError={(e) => handleImgError(e, i + 20)}
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold leading-snug text-zinc-900 group-hover:underline line-clamp-3">{s.title}</h5>
                        <span className="text-[10px] text-zinc-400 mt-0.5 block">{s.time}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
