import React from "react";
import { Users, DollarSign, UploadCloud, Calendar } from "lucide-react";

export default function InstructorDashboard() {
  return (
    <div className="space-y-12 animate-fade-in">
      <section>
        <div className="flex items-center gap-2 mb-2 text-gold font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="opacity-50">//</span> Overview
        </div>
        <h2 className="font-serif text-3xl font-bold text-white mb-8">
          Instructor Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-layer1 border border-gold-border p-6 rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-mono text-[10px] text-muted tracking-wider uppercase">Active Students</h3>
                 <Users className="w-4 h-4 text-gold" />
              </div>
              <div className="text-3xl font-serif text-white">342</div>
            </div>
            <div className="font-mono text-[10px] mt-6 text-[#1abc9c] flex items-center justify-between border-t border-gold-border pt-4">
              <span>View Roster →</span>
            </div>
          </div>

          <div className="bg-layer1 border border-gold-border p-6 rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-mono text-[10px] text-muted tracking-wider uppercase">Unpaid Earnings</h3>
                 <DollarSign className="w-4 h-4 text-gold" />
              </div>
              <div className="text-3xl font-serif text-white">$1,450.00</div>
            </div>
            <div className="font-mono text-[10px] mt-6 text-gold flex items-center justify-between border-t border-gold-border pt-4 hover:underline cursor-pointer">
              <span>Request Payout →</span>
            </div>
          </div>

          <div className="bg-layer1 border border-gold-border p-6 rounded-sm flex flex-col justify-between group cursor-pointer hover:bg-gold/5 transition-colors">
            <div>
              <div className="w-12 h-12 bg-layer2 border border-gold border-dashed flex items-center justify-center mb-4 group-hover:border-solid transition-all">
                <UploadCloud className="w-5 h-5 text-gold" />
              </div>
              <div className="font-serif text-lg text-white">Create New Course</div>
            </div>
            <div className="font-mono text-[9px] text-muted mt-4 leading-relaxed">
              Upload video lessons, PDFs, and create quizzes for your students.
            </div>
          </div>
        </div>
      </section>

      <section>
         <h3 className="font-serif text-xl font-bold text-white mb-6 border-b border-gold-border pb-4">My Courses</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           <div className="bg-layer1 border border-gold-border p-6 flex flex-col gap-4">
             <div className="flex items-start justify-between">
                <div>
                   <div className="font-mono text-[9px] bg-gold/20 text-gold px-2 py-0.5 rounded-sm inline-block uppercase mb-2">Published</div>
                   <h4 className="font-serif text-lg text-white">Introduction to Ge'ez</h4>
                </div>
             </div>
             <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gold-border font-mono text-[10px] text-muted uppercase">
               <span className="flex items-center gap-2"><Users className="w-3 h-3" /> 214 Enrolled</span>
               <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Next Session: Tomorrow</span>
             </div>
           </div>

           <div className="bg-layer1 border border-gold-border border-dashed p-6 flex flex-col justify-center items-center gap-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
             <h4 className="font-serif text-lg text-white">Liturgical Chants</h4>
             <div className="font-mono text-[9px] text-muted uppercase">Draft - 4/12 Modules complete</div>
             <button className="bg-layer2 border border-gold-border px-4 py-2 font-mono text-[10px] text-white hover:text-gold transition-colors">Continue Editing</button>
           </div>
         </div>
      </section>
    </div>
  );
}
