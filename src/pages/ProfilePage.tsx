import React, { useState } from "react";
import { User, Mail, Shield, BookOpen, Settings, LogOut, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, profile, setRole } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    setLoading(true);
    setTimeout(() => {
      setRole('guest');
      navigate('/');
    }, 800);
  };

  const handleEditProfile = () => {
    alert("In a full implementation, this opens a form to update name, avatar, and bio.");
  };

  const handleNotImplemented = (feature: string) => {
    alert(`${feature} settings would be integrated with the backend here.`);
  };

  if (!user && !loading) {
    return (
       <div className="text-center py-20 text-muted font-mono animate-fade-in">
         Please log in to view your profile.
       </div>
    );
  }

  const roleDisplay = profile?.role === 'super_admin' ? 'Super Admin'
                    : profile?.role === 'school_admin' ? 'School Administrator'
                    : profile?.role === 'instructor' ? 'Instructor'
                    : 'Student';

  return (
    <div className="space-y-12 animate-fade-in max-w-3xl">
      <div>
        <div className="flex items-center gap-2 mb-2 text-gold font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="opacity-50">//</span> Account
        </div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">
          User Profile
        </h2>
      </div>

      <div className="bg-layer1 border border-gold-border p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8">
        <div className="w-24 h-24 bg-layer2 border-2 border-gold flex items-center justify-center shrink-0">
          <User className="w-10 h-10 text-gold" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-serif text-2xl text-white mb-1">{profile?.display_name || user?.email?.split('@')[0] || "User"}</h3>
          <p className="font-mono text-xs text-muted mb-4">{user?.email || "user@example.com"}</p>
          <div className="inline-flex items-center gap-2 border border-[#a569bd]/40 bg-[#a569bd]/10 px-3 py-1 font-mono text-[10px] text-[#a569bd] uppercase tracking-wider">
            <Shield className="w-3 h-3" /> {roleDisplay}
          </div>
        </div>
        <button onClick={handleEditProfile} className="bg-layer2 border border-gold-border px-4 py-2 font-mono text-xs text-muted hover:text-white transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-layer1 border border-gold-border p-6">
          <h4 className="font-mono text-[10px] text-gold uppercase tracking-wider mb-6">Settings</h4>
          <div className="space-y-4">
            <button onClick={() => handleNotImplemented('Preferences')} className="w-full flex items-center justify-between text-white hover:text-gold transition-colors font-sans py-2 border-b border-white/5">
              <span className="flex items-center gap-3"><Settings className="w-4 h-4 text-muted" /> Preferences</span>
              <span className="font-mono text-[10px] text-muted">&gt;</span>
            </button>
            <button onClick={() => handleNotImplemented('Notifications')} className="w-full flex items-center justify-between text-white hover:text-gold transition-colors font-sans py-2 border-b border-white/5">
              <span className="flex items-center gap-3"><Mail className="w-4 h-4 text-muted" /> Notifications</span>
              <span className="font-mono text-[10px] text-muted">&gt;</span>
            </button>
            <button onClick={() => handleNotImplemented('Language')} className="w-full flex items-center justify-between text-white hover:text-gold transition-colors font-sans py-2 border-b border-white/5">
              <span className="flex items-center gap-3"><BookOpen className="w-4 h-4 text-muted" /> Language</span>
              <span className="font-mono text-[10px] text-muted">Amharic &gt;</span>
            </button>
          </div>
        </div>

        <div className="bg-layer1 border border-gold-border p-6">
          <h4 className="font-mono text-[10px] text-gold uppercase tracking-wider mb-6">Account Actions</h4>
          <div className="space-y-4">
             <button onClick={() => handleNotImplemented('Billing')} className="w-full flex items-center justify-between text-white hover:text-gold transition-colors font-sans py-2 border-b border-white/5">
              <span>Billing & Subscriptions</span>
              <span className="font-mono text-[10px] text-muted">&gt;</span>
            </button>
            <button onClick={() => handleNotImplemented('Certificates')} className="w-full flex items-center justify-between text-white hover:text-gold transition-colors font-sans py-2 border-b border-white/5">
              <span>Certificates</span>
              <span className="font-mono text-[10px] text-muted">&gt;</span>
            </button>
            <button 
              onClick={handleSignOut}
              disabled={loading}
              className="w-full flex items-center gap-3 text-[#e74c3c] hover:text-[#c0392b] transition-colors font-sans py-2 mt-4 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
              {loading ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
