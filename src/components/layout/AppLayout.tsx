import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BookOpen, LogIn, LayoutDashboard } from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuthStore } from "../../store/useAuthStore";

export default function AppLayout() {
  const location = useLocation();
  const { user, role } = useAuthStore();

  const navLinks = [
    { name: "Catalog", path: "/catalog", icon: BookOpen },
    user 
      ? { name: "Dashboard", path: `/dashboard/${role}`, icon: LayoutDashboard }
      : { name: "Login", path: "/auth/login", icon: LogIn }
  ];

  return (
    <div className="min-h-screen relative z-10 flex flex-col items-center">
      <div className="w-full max-w-7xl px-8 flex flex-col flex-1">
        
        {/* HEADER */}
        <header className="border-b border-gold-border py-10 mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 border-2 border-gold flex items-center justify-center text-gold text-2xl font-serif shrink-0 group-hover:bg-gold/10 transition-colors">
              ✞
            </div>
            <div className="flex flex-col">
              <h1 className="font-serif text-[22px] font-bold text-gold tracking-wide leading-tight">
                Faith in Tewahido
              </h1>
              <p className="text-[11px] text-muted tracking-[0.15em] uppercase mt-0.5">
                Digital Academy
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            {navLinks.map((link) => {
              const active = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex auto items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase transition-colors rounded hover:bg-layer2 border",
                    active
                      ? "text-gold border-gold/30 bg-gold/10"
                      : "text-muted border-transparent"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full pb-20">
          <Outlet />
        </main>
        
        {/* FOOTER */}
        <footer className="border-t border-gold-border py-10 mt-20 flex items-center justify-between gap-4 font-mono text-[10px] text-muted uppercase tracking-wider">
          <div>
            <span className="text-gold">✞ Faith in Tewahido Digital Academy</span> <br/>
            Architecture Blueprint v1.0 — MVP
          </div>
          <div className="text-right">
            Stack: React · Express · Vite <br/>
            Target: <span className="text-gold">Production Ready</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
