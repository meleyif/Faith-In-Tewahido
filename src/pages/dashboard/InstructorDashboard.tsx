import React, { useEffect, useState } from "react";
import { Users, DollarSign, UploadCloud, Calendar, Loader2, CheckCircle2 } from "lucide-react";

export default function InstructorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [loadingPayout, setLoadingPayout] = useState(false);

  useEffect(() => {
    fetch('/api/v1/instructor/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const handlePayout = async () => {
    setLoadingPayout(true);
    try {
      const res = await fetch('/api/v1/instructor/payout', { method: 'POST' });
      if (res.ok) {
        setPayoutRequested(true);
        setStats((prev: any) => ({ ...prev, unpaidEarnings: 0 }));
      }
    } finally {
      setLoadingPayout(false);
    }
  };

  const handleCreateCourse = () => {
    const title = prompt("Enter course title (English):");
    if (title) {
       fetch('/api/v1/courses', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 
           title_en: title, 
           title_am: "አዲስ ኮርስ", 
           description_en: "New dynamically created course.",
           thumbnail_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop",
           price_usd: 19.99 
         })
       }).then(() => window.location.reload());
    }
  };

  if (!stats) return <div className="flex justify-center h-64 items-center"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>;

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
              <div className="text-3xl font-serif text-white">{stats.activeStudents}</div>
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
              <div className="text-3xl font-serif text-white">${stats.unpaidEarnings.toFixed(2)}</div>
            </div>
            <div className="font-mono text-[10px] mt-6 border-t border-gold-border pt-4">
               {payoutRequested ? (
                  <span className="flex items-center gap-2 text-[#1abc9c]"><CheckCircle2 className="w-3 h-3" /> Payout processing (Connect)</span>
               ) : (
                  <button 
                    onClick={handlePayout}
                    disabled={stats.unpaidEarnings <= 0 || loadingPayout}
                    className="text-gold hover:underline flex items-center gap-1 disabled:opacity-50 disabled:no-underline"
                  >
                    {loadingPayout ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                    Request Payout →
                  </button>
               )}
            </div>
          </div>

          <div 
            onClick={handleCreateCourse}
            className="bg-layer1 border border-gold-border p-6 rounded-sm flex flex-col justify-between group cursor-pointer hover:bg-gold/5 transition-colors"
          >
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
           {stats.courses.map((course: any) => (
             <div key={course.id} className={`bg-layer1 border border-gold-border flex flex-col gap-4 p-6 ${course.status === 'draft' ? "border-dashed opacity-70" : ""}`}>
               <div className="flex items-start justify-between">
                  <div>
                     <div className={`font-mono text-[9px] px-2 py-0.5 rounded-sm inline-block uppercase mb-2 ${course.status === 'published' ? 'bg-gold/20 text-gold' : 'bg-muted/20 text-muted'}`}>
                       {course.status}
                     </div>
                     <h4 className="font-serif text-lg text-white">{course.title_en}</h4>
                  </div>
               </div>
               <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gold-border font-mono text-[10px] text-muted uppercase">
                 <span className="flex items-center gap-2"><Users className="w-3 h-3" /> {course.status === 'published' ? '214' : '0'} Enrolled</span>
                 <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {course.modules?.length || 0} Modules</span>
               </div>
             </div>
           ))}
         </div>
      </section>
    </div>
  );
}
