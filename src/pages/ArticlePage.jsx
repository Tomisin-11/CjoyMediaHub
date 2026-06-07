import React from "react";
import { useParams, Link } from "react-router-dom";
import { ALL_ARTICLES, LATEST, CATEGORY_SECTIONS } from "../data/news";

const FALLBACK = (s) => `https://picsum.photos/seed/${s || "article"}/800/500`;

const handleImgError = (e, seed) => {
  e.target.onerror = null;
  e.target.src = FALLBACK(seed);
};

export default function ArticlePage() {
  const { slug } = useParams();
  const article = ALL_ARTICLES.find((a) => a.slug === slug);

  // Get related: same category first, then others
  const related = ALL_ARTICLES
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const sameA = a.category === article?.category ? -1 : 1;
      const sameB = b.category === article?.category ? -1 : 1;
      return sameA - sameB;
    })
    .slice(0, 8);

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4">Article not found</h1>
        <Link to="/" className="text-sm font-bold underline text-zinc-700">← Back to Home</Link>
      </div>
    );
  }

  const paragraphs = (article.content || "Full article content coming soon.")
    .split("\n\n")
    .filter(Boolean);

  const articleImg = article.image || FALLBACK(article.slug);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto lg:max-w-none lg:grid lg:grid-cols-3 lg:gap-10">

        {/* ── MAIN ARTICLE ── */}
        <article className="lg:col-span-2">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4 flex-wrap">
            <Link to="/" className="hover:underline">Home</Link>
            <span>›</span>
            {article.category && (
              <>
                <Link to={`/${article.category.toLowerCase()}`} className="hover:underline capitalize">
                  {article.category}
                </Link>
                <span>›</span>
              </>
            )}
            <span className="text-zinc-400 line-clamp-1">{article.title}</span>
          </div>

          {/* Category tag */}
          {article.category && (
            <div className="mb-3">
              <Link
                to={`/${article.category.toLowerCase()}`}
                className="inline-block bg-black text-white text-[11px] font-bold uppercase tracking-wider px-2 py-1 hover:bg-red-600 transition-colors"
              >
                {article.category}
              </Link>
            </div>
          )}

          {/* Headline */}
          <h1
            className="text-2xl sm:text-3xl font-black leading-tight text-zinc-900 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-base text-zinc-600 leading-relaxed mb-4 border-l-4 border-black pl-4">
              {article.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-zinc-500 pb-4 border-b border-zinc-200 mb-5 flex-wrap">
            {article.author && (
              <span>By <span className="font-bold text-zinc-800">{article.author}</span></span>
            )}
            <span>·</span>
            <span>{article.time}</span>
            <span>·</span>
            <span>3 min read</span>
          </div>

          {/* Hero image */}
          <div className="mb-6 overflow-hidden">
            <img
              src={articleImg}
              alt={article.title}
              className="w-full h-[240px] sm:h-[380px] object-cover object-center"
              onError={(e) => handleImgError(e, article.slug)}
            />
            <p className="text-[10px] text-zinc-400 mt-1 italic">Photo: CJOY Media Hub / {article.time}</p>
          </div>

          {/* Body */}
          <div className="space-y-4">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-[15px] text-zinc-800 leading-relaxed"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          {article.category && (
            <div className="mt-8 flex flex-wrap gap-2">
              {[article.category, "Nigeria", "News", "2026"].map((tag) => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-wide border border-zinc-300 px-2.5 py-1 text-zinc-600 hover:bg-zinc-100 cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Share row */}
          <div className="mt-8 pt-5 border-t border-zinc-200 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wide">Share:</span>
            {["Twitter / X", "Facebook", "WhatsApp", "Copy Link"].map((s) => (
              <button
                key={s}
                className="text-xs font-bold border border-zinc-300 px-3 py-1.5 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors text-zinc-700"
              >
                {s}
              </button>
            ))}
          </div>
        </article>

        {/* ── SIDEBAR ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-8">
            {/* More Stories */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b-[3px] border-zinc-900 pb-2">
                <h2 className="text-sm font-black uppercase tracking-wide text-zinc-900">
                  More Stories
                </h2>
              </div>
              <div className="divide-y divide-zinc-100">
                {related.slice(0, 6).map((r, i) => (
                  <Link
                    key={r.id}
                    to={`/article/${r.slug}`}
                    className="flex items-start gap-3 py-3 group hover:bg-zinc-50 transition-colors -mx-2 px-2"
                  >
                    <div className="shrink-0">
                      <img
                        src={r.image || FALLBACK(r.slug)}
                        alt={r.title}
                        className="w-20 h-14 object-cover object-center"
                        loading="lazy"
                        onError={(e) => handleImgError(e, r.slug || r.id)}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      {r.category && (
                        <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block mb-0.5">{r.category}</span>
                      )}
                      <h4
                        className="text-xs font-bold leading-snug text-zinc-900 group-hover:underline line-clamp-3"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        {r.title}
                      </h4>
                      <span className="text-[10px] text-zinc-400 mt-0.5 block">{r.time}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b-[3px] border-zinc-900 pb-2">
                <h2 className="text-sm font-black uppercase tracking-wide text-zinc-900">Trending</h2>
              </div>
              <div className="space-y-3">
                {related.slice(6).map((r, i) => (
                  <Link
                    key={r.id}
                    to={`/article/${r.slug}`}
                    className="flex gap-3 group items-start"
                  >
                    <span className="text-3xl font-black text-zinc-100 leading-none shrink-0 mt-0.5 w-8 text-right">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold leading-snug text-zinc-900 group-hover:underline line-clamp-3">
                        {r.title}
                      </h5>
                      <span className="text-[10px] text-zinc-400 mt-0.5 block">{r.time}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── RELATED STORIES (mobile) ── */}
      <div className="lg:hidden mt-8 border-t border-zinc-200 pt-6">
        <div className="border-b-[3px] border-zinc-900 pb-2 mb-4">
          <h2 className="text-sm font-black uppercase tracking-wide text-zinc-900">More Stories</h2>
        </div>
        <div className="divide-y divide-zinc-100">
          {related.slice(0, 5).map((r) => (
            <Link
              key={r.id}
              to={`/article/${r.slug}`}
              className="flex items-start gap-3 py-4 group hover:bg-zinc-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                {r.category && (
                  <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block mb-0.5">{r.category}</span>
                )}
                <h4 className="text-sm font-bold leading-snug text-zinc-900 group-hover:underline line-clamp-3">
                  {r.title}
                </h4>
                <span className="text-xs text-zinc-500 mt-1 block">{r.time}</span>
              </div>
              <img
                src={r.image || FALLBACK(r.slug)}
                alt={r.title}
                className="w-20 h-14 object-cover object-center shrink-0"
                loading="lazy"
                onError={(e) => handleImgError(e, r.slug || r.id)}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
