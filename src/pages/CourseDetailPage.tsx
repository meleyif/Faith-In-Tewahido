import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PlayCircle, FileText, CheckCircle2, Lock, Clock, CalendarDays, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [course, setCourse] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch course details
    fetch(`/api/v1/courses/${courseId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setCourse(data);
        
        // Fetch enrollments to check status
        if (user) {
           return fetch('/api/v1/enrollments/me').then(res => res.json());
        }
        return { enrollments: [] };
      })
      .then(enrData => {
         if (enrData.enrollments) {
            const hasEnrollment = enrData.enrollments.some((e: any) => e.courseId === courseId);
            setIsEnrolled(hasEnrollment);
         }
         setLoading(false);
      })
      .catch(err => {
         console.error(err);
         setLoading(false);
      });
  }, [courseId, user]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    setIsEnrolling(true);
    try {
      const res = await fetch('/api/v1/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      });
      if (res.ok) {
        setIsEnrolled(true);
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>;
  }

  if (!course) {
    return <div className="text-center font-mono py-20 text-gold">COURSE NOT FOUND // 404</div>;
  }

  return (
    <div className="space-y-12 animate-fade-in pb-16">
      
      {/* Hero */}
      <div className="relative border border-gold-border bg-layer1 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <img src={course.thumbnail_url} alt="Cover" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-layer1 via-layer1/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-12 items-end">
          <div className="flex-1">
            <div className="font-mono text-[10px] text-gold tracking-widest uppercase mb-4 opacity-80 backdrop-blur-sm inline-block px-3 py-1 bg-black/40 border border-gold/30">
              Course Details
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {course.title_en}
            </h1>
            <h2 className="font-sans text-xl text-gold mb-6">{course.title_am}</h2>
            <p className="font-mono text-sm text-muted max-w-2xl leading-loose">
              {course.description_en}
            </p>
          </div>
          
          <div className="bg-layer2/80 backdrop-blur-md border border-gold-border p-6 min-w-[280px] shrink-0">
            <div className="font-mono text-[10px] text-muted tracking-wider uppercase mb-4">Instructor</div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-layer3 border border-gold-border rounded-full flex items-center justify-center font-serif text-gold text-xl">
                {course.instructor?.name?.charAt(0) || 'I'}
              </div>
              <div>
                <div className="font-serif text-white">{course.instructor?.name || 'Instructor'}</div>
                <div className="font-mono text-[10px] text-gold">{course.instructor?.title || 'Teacher'}</div>
              </div>
            </div>
            
             {isEnrolled ? (
               <button className="w-full bg-layer3 border border-gold text-gold font-mono text-xs font-bold py-3 uppercase tracking-wider hover:bg-gold/10 transition-colors">
                 Resume Learning
               </button>
             ) : (
               <button 
                 onClick={handleEnroll} 
                 disabled={isEnrolling}
                 className="w-full bg-gold text-deep font-mono text-xs font-bold py-3 uppercase tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
               >
                 {isEnrolling ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                 {isEnrolling ? 'Enrolling...' : `Enroll Now - ${course.price_usd ? '$'+course.price_usd : 'Free'}`}
               </button>
             )}
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-4xl">
        <div className="flex items-center gap-2 mb-2 text-gold font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="opacity-50">//</span> Curriculum
        </div>
        <h3 className="font-serif text-2xl font-bold text-white mb-8">
          Course Modules
        </h3>
        
        <div className="space-y-4">
          {course.modules?.length > 0 ? course.modules.map((mod: any, index: number) => {
             const Icon = mod.type === 'video' ? PlayCircle : mod.type === 'pdf' ? FileText : CalendarDays;
             let statusColor = "text-muted border-transparent";
             let bg = "bg-layer1";
             let iconColor = "text-muted";
             
             // If not enrolled, force status to locked for preview unless it's a free preview
             const effectiveStatus = isEnrolled ? mod.status : 'locked';
             
             if (effectiveStatus === 'completed') {
               statusColor = "text-[#1abc9c] border-[#1abc9c]/30";
               iconColor = "text-[#1abc9c]";
             } else if (effectiveStatus === 'in_progress') {
               statusColor = "text-gold border-gold/50";
               bg = "bg-gold/5";
               iconColor = "text-gold";
             }
             
             return (
              <div key={mod.id} className={`p-5 flex items-center gap-6 border border-gold-border ${bg} transition-colors group`}>
                <div className="font-mono text-xs text-muted w-6">{(index + 1).toString().padStart(2, '0')}</div>
                
                <div className="flex-shrink-0">
                  {effectiveStatus === 'completed' ? (
                    <CheckCircle2 className={`w-5 h-5 ${iconColor}`} />
                  ) : effectiveStatus === 'locked' ? (
                    <Lock className={`w-5 h-5 ${iconColor} opacity-50`} />
                  ) : (
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-serif text-lg ${effectiveStatus === 'locked' ? 'text-muted' : 'text-white'}`}>
                    {mod.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {mod.duration}</span>
                    <span>• {mod.type}</span>
                  </div>
                </div>
                
                {effectiveStatus !== 'locked' && (
                  <button className="hidden sm:block border border-gold-border px-4 py-2 font-mono text-xs text-gold hover:bg-gold/10 transition-colors uppercase tracking-wider">
                    {effectiveStatus === 'completed' ? 'Review' : 'Start'}
                  </button>
                )}
              </div>
             )
          }) : (
             <div className="text-muted font-mono text-xs italic">Course modules are being prepared.</div>
          )}
        </div>
      </div>
    </div>
  );
}
