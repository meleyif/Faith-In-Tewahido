import React, { useEffect, useState } from "react";
import { Search, Filter, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function CatalogPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.courses) setCourses(data.courses);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-gold font-mono text-[10px] tracking-[0.2em] uppercase">
            <span className="opacity-50">//</span> Discover
          </div>
          <h2 className="font-serif text-3xl font-bold text-white mb-2">
            Course Catalog
          </h2>
          <p className="text-muted font-mono text-xs max-w-lg leading-relaxed">
            Explore our curriculum of faith, history, and language. New courses are added monthly.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="bg-layer2 border border-gold-border pl-10 pr-4 py-2 font-mono text-xs text-white placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors w-full md:w-64"
            />
          </div>
          <button className="bg-layer2 border border-gold-border px-4 py-2 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="animate-pulse bg-layer1 h-[320px] border border-gold-border"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link to={`/course/${course.id}`} key={course.id} className="bg-layer1 border border-gold-border flex flex-col group overflow-hidden hover:border-gold transition-colors">
              <div className="aspect-video w-full bg-layer2 relative overflow-hidden">
                <img src={course.thumbnail_url} alt={course.title_en} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-gold font-mono text-[10px] px-2 py-1 tracking-wider border border-gold-border">
                  ${course.price_usd}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="font-mono text-[9px] text-muted tracking-wider uppercase mb-3 hidden">
                  {course.title_am}
                </div>
                <h3 className="font-serif text-lg text-white mb-2">{course.title_en}</h3>
                <h4 className="font-sans text-sm text-gold mb-4">{course.title_am}</h4>
                <p className="font-mono text-xs text-muted leading-relaxed flex-1">{course.description_en}</p>
                <div className="mt-6 pt-4 border-t border-gold-border flex items-center justify-between font-mono text-[10px] text-muted">
                  <span>8 Modules</span>
                  <span className="text-gold flex items-center gap-1 group-hover:underline underline-offset-4">Learn More →</span>
                </div>
              </div>
            </Link>
          ))}
          
          <div className="bg-layer1 border border-gold-border border-dashed flex flex-col items-center justify-center p-8 text-center opacity-60">
            <Lock className="w-8 h-8 text-muted mb-4" />
            <h3 className="font-serif text-lg text-white mb-2">History of the Church</h3>
            <p className="font-mono text-xs text-muted mb-4">Coming next month. Stay tuned for our deep dive into early Ethiopian Christianity.</p>
          </div>
        </div>
      )}
    </div>
  );
}
