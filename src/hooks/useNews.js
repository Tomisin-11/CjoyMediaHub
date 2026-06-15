import { useState, useEffect } from "react";

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

const FEEDS = [
  { name: "Punch",    url: "https://punchng.com/feed/",         category: "Politics" },
  { name: "Vanguard", url: "https://www.vanguardngr.com/feed/",  category: "Business" },
  { name: "Channels", url: "https://www.channelstv.com/feed/",   category: "World" },
];

function slugify(text = "") {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}

function relativeTime(dateStr) {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  } catch {
    return "recently";
  }
}

function parseItems(items, source) {
  return items.slice(0, 8).map((item) => ({
    id: slugify(item.title),
    slug: slugify(item.title),
    title: item.title || "",
    excerpt: item.description
      ? item.description.replace(/<[^>]+>/g, "").slice(0, 160)
      : "",
    image: item.thumbnail || item.enclosure?.link || null,
    time: relativeTime(item.pubDate),
    category: source.category,
    source: source.name,
    url: item.link,
    live: true,
  }));
}

export function useNews() {
  const [liveStories, setLiveStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const results = await Promise.allSettled(
          FEEDS.map((feed) =>
            fetch(`${RSS2JSON}${encodeURIComponent(feed.url)}`)
              .then((r) => r.json())
              .then((data) => {
                if (data.status === "ok" && data.items?.length) {
                  return parseItems(data.items, feed);
                }
                return [];
              })
          )
        );

        if (cancelled) return;

        const all = results
          .filter((r) => r.status === "fulfilled")
          .flatMap((r) => r.value);

        if (all.length > 0) {
          setLiveStories(all);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    // Refresh every 10 minutes
    const interval = setInterval(fetchAll, 10 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { liveStories, loading, error };
}

export function getLiveBreaking(stories, limit = 10) {
  return stories.slice(0, limit).map((s) => `${s.source}: ${s.title}`);
}
