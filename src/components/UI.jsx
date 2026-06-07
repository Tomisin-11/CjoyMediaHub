import { Link } from "react-router-dom";

export const Badge = ({ cat, small }) => (
  <span className={`inline-block bg-zinc-900 text-white font-black uppercase tracking-wider ${small ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-0.5"}`}>
    {cat}
  </span>
);

export const SectionHead = ({ title, link }) => (
  <div className="flex items-center justify-between border-b-[3px] border-zinc-900 pb-2 mb-5">
    <h2 className="text-base font-black uppercase tracking-wide text-zinc-900">{title}</h2>
    {link && (
      <Link to={link} className="text-xs font-bold text-zinc-900 underline underline-offset-2 hover:no-underline">
        More
      </Link>
    )}
  </div>
);

export const ArticleCard = ({ story, horizontal }) => {
  const imgSrc = story.image || `https://picsum.photos/seed/${story.slug || story.id}/800/500`;

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = `https://picsum.photos/seed/fallback${story.id}/800/500`;
  };

  if (horizontal) {
    return (
      <Link to={`/article/${story.slug}`} className="flex gap-3 group hover:bg-zinc-50 transition-colors p-2 -mx-2">
        <img
          src={imgSrc}
          alt={story.title}
          className="w-24 object-cover shrink-0"
          style={{ height: "72px", minWidth: "96px" }}
          loading="lazy"
          onError={handleImgError}
        />
        <div>
          {story.category && <Badge cat={story.category} small />}
          <h4 className="mt-1 text-xs font-bold leading-snug text-zinc-900 line-clamp-3 group-hover:underline">
            {story.title}
          </h4>
          <span className="text-[10px] text-zinc-500 mt-1 block">{story.time}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${story.slug}`} className="group block cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={imgSrc}
          alt={story.title}
          className="w-full h-36 object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={handleImgError}
        />
      </div>
      <div className="pt-2">
        {story.category && <Badge cat={story.category} small />}
        <h4 className="mt-1.5 text-sm font-bold leading-snug text-zinc-900 group-hover:underline line-clamp-3">
          {story.title}
        </h4>
        <span className="text-[10px] text-zinc-500 mt-1 block">{story.time}</span>
      </div>
    </Link>
  );
};

export const Footer = () => (
  <footer style={{ backgroundColor: "#000000" }} className="text-white mt-10">
    <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-6">
      {/* Top grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-zinc-800 pb-8 mb-6">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/">
            <span className="font-black text-2xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              CJOY <span className="font-light text-zinc-400">Media Hub</span>
            </span>
          </Link>
          <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
            Nigeria's most trusted digital news platform — breaking stories, in-depth analysis and live coverage from across the country and the world.
          </p>
          <div className="flex gap-3 mt-4">
            {["Twitter", "Facebook", "Instagram", "YouTube"].map((s) => (
              <a key={s} href="#" className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-wide transition-colors">{s}</a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Sections</h4>
          <div className="space-y-2">
            {["Politics", "Sports", "Entertainment", "Health", "Security"].map((l) => (
              <Link key={l} to={`/${l.toLowerCase()}`} className="block text-xs text-zinc-400 hover:text-white font-semibold transition-colors">{l}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">More</h4>
          <div className="space-y-2">
            {["Business", "Technology", "Fashion", "Gallery"].map((l) => (
              <Link key={l} to={`/${l.toLowerCase()}`} className="block text-xs text-zinc-400 hover:text-white font-semibold transition-colors">{l}</Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Newsletter</h4>
          <p className="text-xs text-zinc-500 mb-3">Get the top stories every morning, straight to your inbox.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-600 px-3 py-2 focus:outline-none focus:border-white transition-colors"
            />
            <button className="bg-white text-black text-xs font-black px-4 py-2 hover:bg-zinc-200 transition-colors shrink-0">
              GO
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-xs text-zinc-600">© 2026 Cjoy Media Hub · All rights reserved · Lagos, Nigeria</p>
        <div className="flex gap-4">
          {["Privacy Policy", "Terms of Use", "Advertise", "Contact"].map((l) => (
            <a key={l} href="#" className="text-[10px] text-zinc-600 hover:text-white transition-colors uppercase tracking-wide">{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
