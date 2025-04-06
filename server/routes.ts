import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication - this now handles /api/login, /api/register, /api/logout, and /api/user
  setupAuth(app);

  // Add any additional API routes here
  
  // Protected route middleware
  const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  };
  
  // Get student profile data
  app.get("/api/profile", isAuthenticated, async (req, res) => {
    try {
      // User profile data is already available in req.user
      res.json(req.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get loan account details
  app.get("/api/loan-details", isAuthenticated, async (req, res) => {
    try {
      const loanDetails = await storage.getLoanDetails(req.user.id);
      if (!loanDetails) {
        return res.status(404).json({ message: "Loan details not found" });
      }
      res.json(loanDetails);
    } catch (error) {
      console.error("Error fetching loan details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get disbursement details
  app.get("/api/disbursement-details", isAuthenticated, async (req, res) => {
    try {
      const details = await storage.getDisbursementDetails(req.user.id);
      if (!details) {
        return res.status(404).json({ message: "Disbursement details not found" });
      }
      res.json(details);
    } catch (error) {
      console.error("Error fetching disbursement details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get repayment schedule
  app.get("/api/repayment-schedule", isAuthenticated, async (req, res) => {
    try {
      const schedule = await storage.getRepaymentSchedule(req.user.id);
      res.json(schedule);
    } catch (error) {
      console.error("Error fetching repayment schedule:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get all student data at once (for dashboard)
  app.get("/api/dashboard-data", isAuthenticated, async (req, res) => {
    try {
      const [loanDetails, disbursementDetails, repaymentSchedule] = await Promise.all([
        storage.getLoanDetails(req.user.id),
        storage.getDisbursementDetails(req.user.id),
        storage.getRepaymentSchedule(req.user.id)
      ]);
      
      res.json({
        profile: req.user,
        loanDetails,
        disbursementDetails,
        repaymentSchedule
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Initialize HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
