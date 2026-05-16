import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, Video, Calendar, CreditCard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

export default function DashboardLayout() {
  const { user, role, logout } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  const getNavLinks = () => {
    switch (role) {
      case 'super_admin':
        return [
          { name: "Platform Overview", path: "/dashboard/admin", icon: LayoutDashboard },
          { name: "Tenants/Schools", path: "/dashboard/admin/tenants", icon: Users },
          { name: "Global Finance", path: "/dashboard/admin/finance", icon: CreditCard },
          { name: "Settings", path: "/dashboard/admin/settings", icon: Settings },
        ];
      case 'school_admin':
        return [
          { name: "School Dashboard", path: "/dashboard/school", icon: LayoutDashboard },
          { name: "Instructors", path: "/dashboard/school/instructors", icon: Users },
          { name: "Students", path: "/dashboard/school/students", icon: Users },
          { name: "Courses", path: "/dashboard/school/courses", icon: BookOpen },
        ];
      case 'instructor':
        return [
          { name: "My Classes", path: "/dashboard/instructor", icon: LayoutDashboard },
          { name: "Course Builder", path: "/dashboard/instructor/courses", icon: BookOpen },
          { name: "Schedule", path: "/dashboard/instructor/schedule", icon: Calendar },
          { name: "Payout Ledger", path: "/dashboard/instructor/ledger", icon: CreditCard },
        ];
      case 'student':
      default:
        return [
          { name: "My Learning", path: "/dashboard/student", icon: BookOpen },
          { name: "Catalog", path: "/catalog", icon: BookOpen },
          { name: "Live Sessions", path: "/dashboard/student/sessions", icon: Video },
          { name: "Certificates", path: "/dashboard/student/certificates", icon: Users },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen bg-deep flex flex-col md:flex-row relative z-10">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-layer1 border-r border-gold-border flex flex-col shrink-0">
        <div className="p-6 border-b border-gold-border flex items-center gap-3">
           <div className="w-8 h-8 border border-gold flex items-center justify-center text-gold font-serif">✞</div>
           <div>
             <h1 className="font-serif text-gold font-bold leading-tight">Faith in Tewahido</h1>
             <div className="font-mono text-[9px] text-muted tracking-wider uppercase">{role?.replace('_', ' ')} Portal</div>
           </div>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const active = location.pathname === link.path || (link.path !== `/dashboard/${role}` && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 font-mono text-[11px] tracking-wider uppercase transition-colors rounded-sm",
                  active ? "bg-gold/10 text-gold border border-gold/30" : "text-muted hover:bg-layer2 hover:text-white border border-transparent"
                )}
              >
                <link.icon className="w-4 h-4 shrink-0" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gold-border">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-2 font-mono text-[11px] text-[#e74c3c] hover:bg-[#e74c3c]/10 rounded-sm w-full transition-colors uppercase tracking-wider">
             <LogOut className="w-4 h-4 shrink-0" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 bg-deep overflow-y-auto">
         <header className="p-6 border-b border-gold-border sticky top-0 bg-deep/80 backdrop-blur-md z-20 flex justify-end">
           <div className="flex flex-col items-end">
              <span className="font-sans text-sm text-white">{user.email}</span>
              <span className="font-mono text-[9px] text-muted tracking-wider uppercase">Role: {role}</span>
           </div>
         </header>
         <div className="flex-1 p-6 lg:p-10">
            <Outlet />
         </div>
      </main>
    </div>
  );
}
