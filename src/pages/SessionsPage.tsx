import React from "react";
import { Video, Clock, Users, Link as LinkIcon, Calendar } from "lucide-react";

export default function SessionsPage() {
  const sessions = [
    {
      id: 1,
      title: "Ge'ez Q&A: Verbs and Tenses",
      course: "Introduction to Ge'ez",
      instructor: "Aba Samuel",
      date: "Today",
      time: "18:00 EST",
      duration: "60 min",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Chant Practice 2",
      course: "Liturgical Chants",
      instructor: "Memhir Yonas",
      date: "Tomorrow",
      time: "17:00 EST",
      duration: "45 min",
      status: "scheduled"
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-2 text-gold font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="opacity-50">//</span> Virtual Classrooms
        </div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">
          Live Sessions
        </h2>
        <p className="text-muted font-mono text-xs max-w-lg leading-relaxed">
          Join your upcoming live classes. Links are activated 15 minutes before the session starts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessions.map((session, i) => (
          <div key={session.id} className="bg-layer1 border border-gold-border p-6 flex flex-col group relative">
            {i === 0 && (
              <div className="absolute top-0 right-0 bg-gold text-deep font-mono text-[9px] font-bold px-3 py-1 uppercase tracking-wider">
                Starting Soon
              </div>
            )}
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-layer2 border border-gold-border flex items-center justify-center shrink-0">
                 <Calendar className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-muted tracking-wider uppercase mb-1">{session.course}</div>
                <h3 className="font-serif text-xl text-white mb-1">{session.title}</h3>
                <div className="font-mono text-[10px] text-[#5dade2] uppercase">{session.instructor}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-gold-border">
               <div className="flex flex-col">
                 <span className="font-mono text-[9px] text-muted uppercase tracking-wider mb-1">When</span>
                 <span className="font-mono text-sm text-white">{session.date}</span>
                 <span className="font-mono text-xs text-gold">{session.time}</span>
               </div>
               <div className="flex flex-col">
                 <span className="font-mono text-[9px] text-muted uppercase tracking-wider mb-1">Duration</span>
                 <span className="font-mono text-sm text-white">{session.duration}</span>
               </div>
            </div>

            <button 
              className={`mt-auto w-full flex items-center justify-center gap-2 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
                i === 0 
                  ? 'bg-gold/10 text-gold border border-gold/30 hover:bg-gold hover:text-deep font-bold' 
                  : 'bg-layer2 text-muted border border-gold-border opacity-50 cursor-not-allowed'
              }`}
            >
              <Video className="w-4 h-4" /> 
              {i === 0 ? 'Join Classroom' : 'Link Not Ready'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
