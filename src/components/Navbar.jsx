import React from "react";
// Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CATEGORIES } from "../data/news";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const linkPath = (cat) =>
    cat === "Home" ? "/" : `/${cat.toLowerCase().replace(/\s+/g, "-")}`;

  const isActive = (cat) => {
    const p = linkPath(cat);
    return p === "/" ? pathname === "/" : pathname.startsWith(p);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="bg-white border-b border-gray-200 lg:relative fixed top-0 left-0 right-0 z-40">

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 lg:px-8 h-14 lg:max-w-screen-xl lg:mx-auto">

          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-xl text-black tracking-tight flex items-center gap-0 shrink-0"
            style={{ fontFamily: "'Libre Franklin', Arial, sans-serif", fontStyle: 'normal' }}
          >
            CJOY{" "}
            <span className="bg-black text-white text-base font-bold px-2 py-0.5 ml-1">
              Media Hub
            </span>
          </Link>

          {/* Desktop buttons */}
          <div className="hidden lg:flex items-center gap-1.5">
            <button className="bg-black text-white text-sm font-semibold px-5 py-2 hover:bg-zinc-800 transition-colors">
              Register
            </button>
            <button className="text-sm font-medium text-black px-4 py-2 hover:underline transition-colors">
              Sign In
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-1 text-black"
            aria-label="Open menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* BOTTOM NAV — inline (always visible inside header) */}
        <div className="hidden lg:flex items-center border-t border-gray-100 px-6 lg:px-8 lg:max-w-screen-xl lg:mx-auto">
          <nav className="flex items-center flex-1 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={linkPath(cat)}
                className={`px-3.5 py-2.5 text-sm whitespace-nowrap border-b-[2.5px] transition-colors ${
                  isActive(cat)
                    ? "font-bold border-black text-black"
                    : "font-medium border-transparent text-gray-500 hover:text-black hover:border-gray-300"
                }`}
              >
                {cat}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 w-44 shrink-0 ml-6 focus-within:ring-2 focus-within:ring-black transition-all">
            <svg width="13" height="13" fill="none" stroke="#9ca3af" strokeWidth="2.2" viewBox="0 0 24 24" className="shrink-0">
              <circle cx="11" cy="11" r="7" /><line x1="17" y1="17" x2="22" y2="22" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-black placeholder-gray-400 outline-none w-full"
            />
          </div>
        </div>
      </header>

      {/* Mobile spacer so page content clears the fixed nav */}
      <div className="lg:hidden h-14" />

      {/* FIXED BOTTOM NAV — desktop only, appears on scroll */}
      <div
        className={`hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-transform duration-300 ${
          scrolled ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center w-full px-6 lg:px-8 lg:max-w-screen-xl lg:mx-auto">
          <nav className="flex items-center flex-1 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={linkPath(cat)}
                className={`px-3.5 py-2.5 text-sm whitespace-nowrap border-b-[2.5px] transition-colors ${
                  isActive(cat)
                    ? "font-bold border-black text-black"
                    : "font-medium border-transparent text-gray-500 hover:text-black hover:border-gray-300"
                }`}
              >
                {cat}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 w-44 shrink-0 ml-6 focus-within:ring-2 focus-within:ring-black transition-all">
            <svg width="13" height="13" fill="none" stroke="#9ca3af" strokeWidth="2.2" viewBox="0 0 24 24" className="shrink-0">
              <circle cx="11" cy="11" r="7" /><line x1="17" y1="17" x2="22" y2="22" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-black placeholder-gray-400 outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setOpen(false)} />
          <div className="relative w-72 bg-white h-full flex flex-col shadow-2xl overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-bold text-base text-black">Menu</span>
              <button onClick={() => setOpen(false)} className="p-1 text-gray-500 hover:text-black" aria-label="Close menu">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search first */}
            <div className="px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5 focus-within:ring-2 focus-within:ring-black transition-all">
                <svg width="13" height="13" fill="none" stroke="#9ca3af" strokeWidth="2.2" viewBox="0 0 24 24" className="shrink-0">
                  <circle cx="11" cy="11" r="7" /><line x1="17" y1="17" x2="22" y2="22" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm text-black placeholder-gray-400 outline-none w-full"
                />
              </div>
            </div>

            {/* Category links */}
            <div className="flex-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to={linkPath(cat)}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-5 py-4 text-sm border-b border-gray-50 transition-colors ${
                    isActive(cat)
                      ? "font-bold text-black bg-gray-50"
                      : "font-medium text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Register / Sign In — bottom */}
            <div className="flex items-center gap-2 px-5 py-5 border-t border-gray-100 mt-auto">
              <button className="flex-1 bg-black text-white text-sm font-semibold py-2.5 hover:bg-zinc-800 transition-colors">
                Register
              </button>
              <button className="text-sm font-medium text-black px-3 py-2.5 hover:underline">
                Sign In
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}