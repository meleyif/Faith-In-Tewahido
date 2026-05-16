import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Centralized logging simulator for Node.js backend
const logger = {
  info: (msg: string, meta?: any) => console.info(JSON.stringify({ level: 'INFO', msg, meta, time: new Date().toISOString() })),
  error: (msg: string, err?: any) => console.error(JSON.stringify({ level: 'ERROR', msg, err: err?.message || err, time: new Date().toISOString() })),
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

  // Example API routes (Mocking functionality for multi-tenant structure)
  app.get("/api/v1/courses", (req, res) => {
    try {
      res.json({
        courses: [
          {
            id: "1",
            title_en: "Introduction to Ge'ez",
            title_am: "የግዕዝ ቋንቋ መግቢያ",
            description_en: "Learn the foundational alphabet and grammar of the ancient liturgical language.",
            description_am: "የጥንታዊውን የአምልኮ ቋንቋ ፊደል እና ሰዋሰው ይማሩ።",
            thumbnail_url: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&h=400&fit=crop",
            price_usd: 29.99,
            status: "published"
          },
          {
            id: "2",
            title_en: "Liturgical Chants",
            title_am: "የዜማ መግቢያ",
            description_en: "Discover the beautiful melodies and history of Ethiopian Orthodox chants.",
            description_am: "የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ዜማዎችን እና ታሪካቸውን ያግኙ።",
            thumbnail_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop",
            price_usd: 39.99,
            status: "published"
          }
        ]
      });
    } catch (error) {
       logger.error("Failed to fetch courses", error);
       res.status(500).json({ error: "Internal Server Error" });
    }
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

