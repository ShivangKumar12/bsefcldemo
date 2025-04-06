import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { loginSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);

  // Login route
  app.post("/api/login", async (req, res) => {
    try {
      // Validate request body against login schema
      const validatedData = loginSchema.parse(req.body);
      
      // Check if user exists
      const user = await storage.getUserByUsername(validatedData.username);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // In a real application, we would compare hashed passwords
      // For this demo, we're using plain text comparison
      if (user.password !== validatedData.password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Update last login time
      const now = new Date().toISOString();
      
      // Return user information (excluding password)
      const { password, ...userInfo } = user;
      return res.status(200).json({ ...userInfo, lastLogin: now });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Initialize HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
