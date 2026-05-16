import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PlayCircle, FileText, CheckCircle2, Lock, Clock, CalendarDays } from "lucide-react";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    // Mocking the fetch
    const mockCourse = {
      id: courseId,
      title_en: "Introduction to Ge'ez",
      title_am: "የግዕዝ ቋንቋ መግቢያ",
      description_en: "Learn the foundational alphabet and grammar of the ancient liturgical language. This course is designed for beginners and covers the basics required for participating in the chants and readings.",
      description_am: "የጥንታዊውን የአምልኮ ቋንቋ ፊደል እና ሰዋሰው ይማሩ።",
      thumbnail_url: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1200&h=600&fit=crop",
      instructor: { name: "Aba Samuel", title: "Lead Instructor" },
      modules: [
        { id: 1, title: "The Alphabet (Fidel)", duration: "45 min", type: "video", status: "completed" },
        { id: 2, title: "Basic Grammar Rules", duration: "60 min", type: "video", status: "in_progress" },
        { id: 3, title: "Reading Practice 1", duration: "30 min", type: "pdf", status: "locked" },
        { id: 4, title: "Live Q&A Session", duration: "60 min", type: "live", status: "locked" }
      ]
    };
    
    // Simulate network
    setTimeout(() => {
      setCourse(mockCourse);
    }, 500);
  }, [courseId]);

  if (!course) {
    return <div className="animate-pulse bg-layer1 h-[400px] border border-gold-border w-full"></div>;
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
                {course.instructor.name.charAt(0)}
              </div>
              <div>
                <div className="font-serif text-white">{course.instructor.name}</div>
                <div className="font-mono text-[10px] text-gold">{course.instructor.title}</div>
              </div>
            </div>
            <button className="w-full bg-gold text-deep font-mono text-xs font-bold py-3 uppercase tracking-wider hover:bg-gold-light transition-colors">
              Continue Course
            </button>
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
          {course.modules.map((mod: any, index: number) => {
             const Icon = mod.type === 'video' ? PlayCircle : mod.type === 'pdf' ? FileText : CalendarDays;
             let statusColor = "text-muted border-transparent";
             let bg = "bg-layer1";
             let iconColor = "text-muted";
             
             if (mod.status === 'completed') {
               statusColor = "text-[#1abc9c] border-[#1abc9c]/30";
               iconColor = "text-[#1abc9c]";
             } else if (mod.status === 'in_progress') {
               statusColor = "text-gold border-gold/50";
               bg = "bg-gold/5";
               iconColor = "text-gold";
             }
             
             return (
              <div key={mod.id} className={`p-5 flex items-center gap-6 border border-gold-border ${bg} transition-colors group`}>
                <div className="font-mono text-xs text-muted w-6">{(index + 1).toString().padStart(2, '0')}</div>
                
                <div className="flex-shrink-0">
                  {mod.status === 'completed' ? (
                    <CheckCircle2 className={`w-5 h-5 ${iconColor}`} />
                  ) : mod.status === 'locked' ? (
                    <Lock className={`w-5 h-5 ${iconColor} opacity-50`} />
                  ) : (
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-serif text-lg ${mod.status === 'locked' ? 'text-muted' : 'text-white'}`}>
                    {mod.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {mod.duration}</span>
                    <span>• {mod.type}</span>
                  </div>
                </div>
                
                {mod.status !== 'locked' && (
                  <button className="hidden sm:block border border-gold-border px-4 py-2 font-mono text-xs text-gold hover:bg-gold/10 transition-colors uppercase tracking-wider">
                    {mod.status === 'completed' ? 'Review' : 'Start'}
                  </button>
                )}
              </div>
             )
          })}
        </div>
      </div>
    </div>
  );
}
