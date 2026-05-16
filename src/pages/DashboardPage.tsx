import React, { useEffect, useState } from "react";
import { BookOpen, Video, ShieldCheck, PlayCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/enrollments/me')
      .then(res => res.json())
      .then(data => {
        if (data.enrollments) setEnrollments(data.enrollments);
        setLoading(false);
      });
  }, []);

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
              Enrolled in {enrollments.length} active courses. Next live session in 2 days.
            </p>
          </div>
          <div className="bg-layer1 border border-gold-border p-6 hover:border-gold transition-colors relative group col-span-1 md:col-span-2">
            <div className="flex items-start justify-between">
               <div>
                 <div className="font-mono text-[10px] text-gold mb-2 opacity-70">CURRENT MODULE</div>
                 <h3 className="font-serif text-lg font-semibold text-white mb-2">
                   {enrollments.length > 0 ? `${enrollments[0]?.course?.title_en || 'Loading'} - Continue` : 'No Active Modules'}
                 </h3>
                 <p className="text-xs text-muted font-mono leading-relaxed mb-6">
                   {enrollments.length > 0 ? `Continue your progress. You have completed ${enrollments[0]?.progress_pct}% of this module.` : 'Browse the catalog to start learning.'}
                 </p>
               </div>
               {enrollments.length > 0 && (
                 <div className="w-16 h-16 rounded-full border-4 border-layer2 border-t-gold border-r-gold flex items-center justify-center font-mono text-gold text-lg">
                   {Math.round(enrollments[0]?.progress_pct || 0)}%
                 </div>
               )}
            </div>
            {enrollments.length > 0 ? (
              <Link to={`/course/${enrollments[0]?.courseId}`} className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/30 px-4 py-2 font-mono text-xs hover:bg-gold/20 transition-colors uppercase tracking-wider">
                <PlayCircle className="w-4 h-4" /> Resume Learning
              </Link>
            ) : (
              <Link to="/catalog" className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/30 px-4 py-2 font-mono text-xs hover:bg-gold/20 transition-colors uppercase tracking-wider">
                Browse Catalog
              </Link>
            )}
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

        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="animate-pulse bg-layer1 h-[320px] border border-gold-border"></div>
              ))}
           </div>
        ) : enrollments.length === 0 ? (
           <div className="bg-layer1 border border-gold-border border-dashed p-10 text-center">
             <BookOpen className="w-8 h-8 text-gold mx-auto mb-4" />
             <h3 className="font-serif text-xl text-white mb-2">No Courses Yet</h3>
             <p className="font-mono text-xs text-muted mb-6 max-w-md mx-auto">You haven't enrolled in any courses yet. Discover our curriculum to begin your journey.</p>
             <Link to="/catalog" className="inline-flex bg-gold text-deep px-6 py-2 font-mono text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-colors">Go to Catalog</Link>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {enrollments.map((enr) => (
              <div key={enr.courseId} className="bg-layer1 border border-gold-border flex flex-col group overflow-hidden">
                <Link to={`/course/${enr.courseId}`} className="block">
                  <div className="aspect-video w-full bg-layer2 relative overflow-hidden">
                    <img src={enr.course?.thumbnail_url} alt={enr.course?.title_en} className={`object-cover w-full h-full transition-opacity ${enr.progress_pct === 100 ? 'opacity-40 grayscale group-hover:grayscale-0' : 'opacity-80 group-hover:opacity-100'}`} />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-gold font-mono text-[9px] px-2 py-1 uppercase tracking-wider">
                      {enr.progress_pct === 100 ? 'Completed' : 'Active'}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-serif text-lg text-white mb-2 group-hover:text-gold transition-colors">{enr.course?.title_en}</h3>
                    <p className="font-mono text-xs text-muted mb-6 flex-1 line-clamp-2">{enr.course?.description_en}</p>
                    
                    <div className="w-full bg-layer3 h-1 mb-4 rounded-full overflow-hidden">
                      <div className="bg-gold h-full transition-all duration-1000" style={{ width: `${enr.progress_pct}%` }}></div>
                    </div>
                    <div className="flex justify-between font-mono text-[10px] text-muted mb-0">
                      <span>{enr.course?.modules?.length || 0} Modules</span>
                      <span className="text-gold">{Math.round(enr.progress_pct)}%</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
