import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Centralized logging simulator for Node.js backend
const logger = {
  info: (msg: string, meta?: any) => console.info(JSON.stringify({ level: 'INFO', msg, meta, time: new Date().toISOString() })),
  error: (msg: string, err?: any) => console.error(JSON.stringify({ level: 'ERROR', msg, err: err?.message || err, time: new Date().toISOString() })),
};

// In-memory data store for mock functionality
const db = {
  courses: [
    {
      id: "1",
      title_en: "Introduction to Ge'ez",
      title_am: "የግዕዝ ቋንቋ መግቢያ",
      description_en: "Learn the foundational alphabet and grammar of the ancient liturgical language.",
      description_am: "የጥንታዊውን የአምልኮ ቋንቋ ፊደል እና ሰዋሰው ይማሩ።",
      thumbnail_url: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&h=400&fit=crop",
      price_usd: 29.99,
      status: "published",
      instructor: { name: "Aba Samuel", title: "Lead Instructor" },
      modules: [
        { id: 1, title: "The Alphabet (Fidel)", duration: "45 min", type: "video", status: "completed" },
        { id: 2, title: "Basic Grammar Rules", duration: "60 min", type: "video", status: "in_progress" },
        { id: 3, title: "Reading Practice 1", duration: "30 min", type: "pdf", status: "locked" },
        { id: 4, title: "Live Q&A Session", duration: "60 min", type: "live", status: "locked" }
      ]
    },
    {
      id: "2",
      title_en: "Liturgical Chants",
      title_am: "የዜማ መግቢያ",
      description_en: "Discover the beautiful melodies and history of Ethiopian Orthodox chants.",
      description_am: "የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ዜማዎችን እና ታሪካቸውን ያግኙ።",
      thumbnail_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop",
      price_usd: 39.99,
      status: "published",
      instructor: { name: "Memhir Yonas", title: "Chant Master" },
      modules: [
        { id: 1, title: "Basic Tones", duration: "30 min", type: "video", status: "locked" },
      ]
    }
  ],
  enrollments: [
    { userId: "user-123", courseId: "1", progress_pct: 80 },
    { userId: "user-123", courseId: "2", progress_pct: 100 }
  ],
  sessions: [
    {
      id: 1,
      title: "Ge'ez Q&A: Verbs and Tenses",
      course: "Introduction to Ge'ez",
      instructor: "Aba Samuel",
      date: new Date(Date.now() + 1000 * 60 * 10).toLocaleDateString(),
      time: "18:00 EST",
      duration: "60 min",
      status: "upcoming"
    }
  ],
  instructorPayouts: {
    unpaid: 1450.00
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());
  
  // Request Logging Middleware
  app.use((req, res, next) => {
    logger.info(`Incoming Request: ${req.method} ${req.path}`, { ip: req.ip });
    next();
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Courses API
  app.get("/api/v1/courses", (req, res) => {
    res.json({ courses: db.courses });
  });

  app.get("/api/v1/courses/:id", (req, res) => {
    const course = db.courses.find(c => c.id === req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  });

  app.post("/api/v1/courses", (req, res) => {
    const newCourse = {
      id: String(db.courses.length + 1),
      ...req.body,
      status: 'draft',
      modules: []
    };
    db.courses.push(newCourse);
    res.json(newCourse);
  });

  // Enrollments API
  app.get("/api/v1/enrollments/me", (req, res) => {
    // Hardcoded to our mock user for now
    const userEnrollments = db.enrollments.filter(e => e.userId === "user-123");
    const populated = userEnrollments.map(e => ({
      ...e,
      course: db.courses.find(c => c.id === e.courseId)
    }));
    res.json({ enrollments: populated });
  });

  app.post("/api/v1/enrollments", (req, res) => {
    const { courseId } = req.body;
    const existing = db.enrollments.find(e => e.userId === "user-123" && e.courseId === courseId);
    if (!existing) {
      db.enrollments.push({ userId: "user-123", courseId, progress_pct: 0 });
    }
    res.json({ success: true });
  });

  // Sessions API
  app.get("/api/v1/sessions/upcoming", (req, res) => {
    res.json({ sessions: db.sessions });
  });

  // Instructor API
  app.get("/api/v1/instructor/stats", (req, res) => {
    res.json({
      activeStudents: 342,
      unpaidEarnings: db.instructorPayouts.unpaid,
      courses: db.courses // Just using all mock courses for now
    });
  });

  app.post("/api/v1/instructor/payout", (req, res) => {
    db.instructorPayouts.unpaid = 0;
    res.json({ success: true, message: "Payout requested" });
  });

  // Global Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error("Unhandled Exception caught by centralized handler", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Ensure dev server binds to 0.0.0.0 and port 3000
  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  logger.error("Failed to start server", err);
  process.exit(1);
});

