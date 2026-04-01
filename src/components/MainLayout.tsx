import { Outlet, NavLink, Link } from "react-router-dom";
import { useEffect } from "react";
import "./MainLayout.css";

interface MainLayoutProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainLayout({ open, setOpen, dark, setDark }: MainLayoutProps) {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX < 15) setOpen(true);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setOpen]);

  return (
    <div className="layout">
      <div className="edgeHint" onMouseEnter={() => setOpen(true)} />

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`} onMouseLeave={() => setOpen(false)}>
        <Link to="/" className="logo">
          <div className="logo-icon">DT</div>
          <span className="logo-text">Dev Toolkit</span>
        </Link>

        <nav className="menu">
          <div className="menu-label">Tools</div>
          <NavLink to="/sql-beautifier"><span className="nav-icon">🧹</span> SQL Beautifier</NavLink>
          <NavLink to="/text-diff"><span className="nav-icon">🔍</span> Text Diff</NavLink>
          <NavLink to="/json-formatter"><span className="nav-icon">📦</span> JSON Formatter</NavLink>
          <NavLink to="/base64"><span className="nav-icon">🔐</span> Base64 Tool</NavLink>
        </nav>
      </aside>

      {/* Top bar */}
      <div className="topBar">
        <button className="menuToggle" onClick={() => setOpen(prev => !prev)}>
          ☰
        </button>
        <button className="themeToggle" onClick={() => setDark(d => !d)}>
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Page content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}