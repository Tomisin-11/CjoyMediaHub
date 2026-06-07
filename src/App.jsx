import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import BreakingTicker from "./components/BreakingTicker";
import { Footer } from "./components/UI";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import GalleryPage from "./pages/GalleryPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <div className="flex-1 ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/:category" element={<CategoryPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}