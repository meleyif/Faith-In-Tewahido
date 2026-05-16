import React, { useState } from "react";
import { Users, DollarSign, BookOpen, Clock, Settings, Save } from "lucide-react";

export default function AdminDashboard() {
  const [tenantName, setTenantName] = useState("St. Mary's Ethiopian Orthodox");
  const [tenantDomain, setTenantDomain] = useState("stmarys");
  const [accentColor, setAccentColor] = useState("#D4AF37");
  const [customCss, setCustomCss] = useState("");

  const handleSave = () => {
    alert(`Tenant configuration saved for ${tenantName}!\nIn a real app, this updates Supabase and Edge Functions trigger CSS rebuilds.`);
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <section>
        <div className="flex items-center gap-2 mb-2 text-gold font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="opacity-50">//</span> Overview
        </div>
        <h2 className="font-serif text-3xl font-bold text-white mb-8">
          Super Admin Control
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-layer1 border border-gold-border p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
               <h3 className="font-mono text-[10px] text-muted tracking-wider uppercase">Active Tenants</h3>
               <Users className="w-4 h-4 text-gold" />
            </div>
            <div className="text-3xl font-serif text-white">42</div>
            <div className="font-mono text-[9px] text-[#1abc9c] mt-2">+3 this month</div>
          </div>
          <div className="bg-layer1 border border-gold-border p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
               <h3 className="font-mono text-[10px] text-muted tracking-wider uppercase">Platform Monthly Rev</h3>
               <DollarSign className="w-4 h-4 text-gold" />
            </div>
            <div className="text-3xl font-serif text-white">$12.4k</div>
            <div className="font-mono text-[9px] text-[#1abc9c] mt-2">+15% vs last month</div>
          </div>
          <div className="bg-layer1 border border-gold-border p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
               <h3 className="font-mono text-[10px] text-muted tracking-wider uppercase">Total Students</h3>
               <BookOpen className="w-4 h-4 text-gold" />
            </div>
            <div className="text-3xl font-serif text-white">8,409</div>
            <div className="font-mono text-[9px] text-muted mt-2">Across all schools</div>
          </div>
          <div className="bg-layer1 border border-gold-border p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
               <h3 className="font-mono text-[10px] text-muted tracking-wider uppercase">System Health</h3>
               <Clock className="w-4 h-4 text-[#1abc9c]" />
            </div>
            <div className="text-3xl font-serif text-white">99.9%</div>
            <div className="font-mono text-[9px] text-muted mt-2">All services operational</div>
          </div>
        </div>
      </section>

      <section>
         <div className="flex items-center justify-between border-b border-gold-border pb-4 mb-6">
           <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
             <Settings className="w-5 h-5 text-gold" /> Active Tenant Configuration
           </h3>
           <button 
             onClick={handleSave}
             className="flex items-center gap-2 bg-gold text-deep font-mono text-xs font-bold px-4 py-2 uppercase hover:bg-gold-light transition-colors"
           >
             <Save className="w-4 h-4" /> Save
           </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-layer1 border border-gold-border p-6 space-y-4">
               <div>
                  <label className="block font-mono text-[10px] uppercase text-muted mb-2">School / Parish Name</label>
                  <input 
                    type="text" 
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    className="w-full bg-layer2 border border-gold-border focus:border-gold outline-none px-4 py-3 text-white font-mono text-xs transition-colors" 
                  />
               </div>
               <div>
                  <label className="block font-mono text-[10px] uppercase text-muted mb-2">Subdomain Mapping</label>
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      value={tenantDomain}
                      onChange={(e) => setTenantDomain(e.target.value)}
                      className="w-full bg-layer2 border border-gold-border border-r-0 focus:border-gold outline-none px-4 py-3 text-white font-mono text-xs transition-colors" 
                    />
                    <div className="bg-layer3 border border-gold-border px-4 py-3 font-mono text-xs text-muted">
                       .faithintewahido.com
                    </div>
                  </div>
               </div>
               <div>
                  <label className="block font-mono text-[10px] uppercase text-muted mb-2">Theme Accent Color (HEX)</label>
                  <div className="flex gap-4 items-center">
                    <input 
                      type="text" 
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-full bg-layer2 border border-gold-border focus:border-gold outline-none px-4 py-3 text-white font-mono text-xs transition-colors" 
                    />
                    <div className="w-10 h-10 border border-gold-border shrink-0" style={{ backgroundColor: accentColor }}></div>
                  </div>
               </div>
            </div>

            <div className="bg-layer1 border border-gold-border p-6 flex flex-col">
               <label className="block font-mono text-[10px] uppercase text-muted mb-2">Custom CSS Override</label>
               <textarea 
                 value={customCss}
                 onChange={(e) => setCustomCss(e.target.value)}
                 placeholder="/* Add tenant specific CSS variables or overrides here */"
                 className="w-full flex-1 bg-layer2 border border-gold-border focus:border-gold outline-none p-4 text-white font-mono text-xs transition-colors resize-none"
               ></textarea>
            </div>
         </div>

         <h3 className="font-serif text-xl font-bold text-white mb-6 border-b border-gold-border pb-4">Recent Tenant Onboarding</h3>
         <div className="bg-layer1 border border-gold-border">
           <table className="w-full text-left font-mono text-xs">
             <thead className="border-b border-gold-border text-muted text-[10px] uppercase">
               <tr>
                 <th className="p-4 font-normal">Tenant Name</th>
                 <th className="p-4 font-normal">Plan</th>
                 <th className="p-4 font-normal">Status</th>
                 <th className="p-4 font-normal">Date</th>
               </tr>
             </thead>
             <tbody>
               <tr className="border-b border-gold-border/50 text-white hover:bg-layer2 transition-colors">
                 <td className="p-4">St. Mary's Ethiopian Orthodox</td>
                 <td className="p-4 text-gold">Enterprise</td>
                 <td className="p-4"><span className="bg-[#1abc9c]/20 text-[#1abc9c] px-2 py-1 rounded-sm">Active</span></td>
                 <td className="p-4 text-muted">May 15, 2026</td>
               </tr>
               <tr className="border-b border-gold-border/50 text-white hover:bg-layer2 transition-colors">
                 <td className="p-4">Holy Trinity Cathedral</td>
                 <td className="p-4 text-gold">Pro</td>
                 <td className="p-4"><span className="bg-[#f39c12]/20 text-[#f39c12] px-2 py-1 rounded-sm">Pending</span></td>
                 <td className="p-4 text-muted">May 12, 2026</td>
               </tr>
             </tbody>
           </table>
         </div>
      </section>
    </div>
  );
}
