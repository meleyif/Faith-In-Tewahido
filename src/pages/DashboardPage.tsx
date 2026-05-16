import React from "react";
import { BookOpen, Video, ShieldCheck, PlayCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="space-y-16 animate-fade-in">
      <section>
        <div className="flex items-center gap-2 mb-2 text-gold font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="opacity-50">//</span> Welcome Back
        </div>
        <h2 className="font-serif text-3xl font-bold text-white mb-8">
          Student Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-layer1 border border-gold-border p-6 hover:border-gold transition-colors relative group">
            <ShieldCheck className="w-8 h-8 text-gold mb-4" />
            <div className="font-mono text-[10px] text-gold mb-2 opacity-70">ROLE / STUDENT</div>
            <h3 className="font-serif text-lg font-semibold text-white mb-2">High School Profile</h3>
            <p className="text-xs text-muted font-mono leading-relaxed">
              Enrolled in 2 active courses. 1 certificate earned. Next live session in 2 days.
            </p>
          </div>
          <div className="bg-layer1 border border-gold-border p-6 hover:border-gold transition-colors relative group col-span-1 md:col-span-2">
            <div className="flex items-start justify-between">
               <div>
                 <div className="font-mono text-[10px] text-gold mb-2 opacity-70">CURRENT MODULE</div>
                 <h3 className="font-serif text-lg font-semibold text-white mb-2">Introduction to Ge'ez - Week 3</h3>
                 <p className="text-xs text-muted font-mono leading-relaxed mb-6">
                   Continue your progress. You have completed 80% of this module.
                 </p>
               </div>
               <div className="w-16 h-16 rounded-full border-4 border-layer2 border-t-gold border-r-gold flex items-center justify-center font-mono text-gold text-lg">
                 80%
               </div>
            </div>
            <Link to="/course/1" className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/30 px-4 py-2 font-mono text-xs hover:bg-gold/20 transition-colors uppercase tracking-wider">
              <PlayCircle className="w-4 h-4" /> Resume Learning
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-2 text-gold font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="opacity-50">//</span> Enrolled Courses
        </div>
        <h2 className="font-serif text-2xl font-bold text-white mb-8">
          My Learning Path
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-layer1 border border-gold-border flex flex-col group overflow-hidden">
            <div className="aspect-video w-full bg-layer2 relative overflow-hidden">
               <img src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&h=400&fit=crop" alt="Ge'ez" className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
               <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-gold font-mono text-[9px] px-2 py-1 uppercase tracking-wider">
                 Active
               </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-serif text-lg text-gold mb-2">Introduction to Ge'ez</h3>
              <p className="font-mono text-xs text-muted mb-6 flex-1">Learn the foundational alphabet and grammar of the ancient liturgical language.</p>
              
              <div className="w-full bg-layer3 h-1 mb-4 rounded-full overflow-hidden">
                <div className="bg-gold h-full w-[80%]"></div>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-muted mb-0">
                <span>8 / 10 Lessons</span>
                <span className="text-gold">80%</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-layer1 border border-gold-border flex flex-col group overflow-hidden">
            <div className="aspect-video w-full bg-layer2 relative overflow-hidden">
               <img src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop" alt="Chants" className="object-cover w-full h-full opacity-40 grayscale group-hover:grayscale-0 transition-all" />
               <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-muted font-mono text-[9px] px-2 py-1 uppercase tracking-wider">
                 Completed
               </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-serif text-lg text-white mb-2">Liturgical Chants</h3>
              <p className="font-mono text-xs text-muted mb-6 flex-1">Discover the beautiful melodies and history of Ethiopian Orthodox chants.</p>
              
              <div className="w-full bg-layer3 h-1 mb-4 rounded-full overflow-hidden">
                <div className="bg-gold h-full w-[100%]"></div>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-muted mb-0">
                <span>12 / 12 Lessons</span>
                <span className="text-gold">100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
