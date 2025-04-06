import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication - this now handles /api/login, /api/register, /api/logout, and /api/user
  setupAuth(app);

  // Add any additional API routes here
  
  // Example protected route
  app.get("/api/protected-data", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    res.json({ 
      message: "This is protected data", 
      userData: {
        username: req.user.username,
        id: req.user.id
      }
    });
  });

  // Initialize HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
