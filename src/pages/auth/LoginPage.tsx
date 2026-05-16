import React, { useState } from "react";
import { LogIn, User, Shield, BookOpen } from "lucide-react";
import { useAuthStore, Role } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  // Mock login to bypass real auth for preview purposes
  const handleMockLogin = (role: Role) => {
    setAuth({ id: "user-123", email: `${role}@faithintewahido.com` }, role, "tenant-default");
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in w-full max-w-md mx-auto mt-12">
      <div className="bg-layer1 border border-gold-border p-8 w-full shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 border-2 border-gold flex items-center justify-center text-gold text-3xl font-serif mb-4">
            ✞
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="font-mono text-[10px] text-muted tracking-wider uppercase">Sign in to your account</p>
        </div>

        <form className="space-y-4 mb-8" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block font-mono text-[10px] text-gold uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-layer2 border border-gold-border px-4 py-3 font-mono text-xs text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] text-gold uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-layer2 border border-gold-border px-4 py-3 font-mono text-xs text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full bg-gold text-deep font-mono text-xs font-bold py-3 uppercase tracking-wider hover:bg-gold-light transition-colors mt-4 mb-2 flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4" /> Sign In securely
          </button>
        </form>

        <div className="relative border-t border-gold-border pt-6 mt-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-layer1 px-2 font-mono text-[9px] text-muted uppercase tracking-wider">
            Preview Roles
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button 
              onClick={() => handleMockLogin('super_admin')}
              className="border border-gold-border bg-layer2 py-2 px-2 flex flex-col items-center gap-1 hover:border-gold transition-colors group"
            >
              <Shield className="w-4 h-4 text-muted group-hover:text-gold transition-colors" />
              <span className="font-mono text-[9px] text-white uppercase">Super Admin</span>
            </button>
            <button 
              onClick={() => handleMockLogin('instructor')}
              className="border border-gold-border bg-layer2 py-2 px-2 flex flex-col items-center gap-1 hover:border-gold transition-colors group"
            >
              <BookOpen className="w-4 h-4 text-muted group-hover:text-gold transition-colors" />
              <span className="font-mono text-[9px] text-white uppercase">Instructor</span>
            </button>
            <button 
              onClick={() => handleMockLogin('student')}
              className="border border-gold-border bg-layer2 py-2 px-2 flex flex-col items-center gap-1 hover:border-gold transition-colors group"
            >
              <User className="w-4 h-4 text-muted group-hover:text-gold transition-colors" />
              <span className="font-mono text-[9px] text-white uppercase">Student</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
