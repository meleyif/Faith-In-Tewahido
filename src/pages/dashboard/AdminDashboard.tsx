import React from "react";
import { Users, DollarSign, BookOpen, Clock } from "lucide-react";

export default function AdminDashboard() {
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
