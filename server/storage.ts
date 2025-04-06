import { users, type User, type InsertUser, loanDetails, type LoanDetails, disbursementDetails, type DisbursementDetails, repaymentSchedule, type RepaymentSchedule } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getLoanDetails(userId: number): Promise<LoanDetails | undefined>;
  getDisbursementDetails(userId: number): Promise<DisbursementDetails | undefined>;
  getRepaymentSchedule(userId: number): Promise<RepaymentSchedule[]>;
  initializeUserData(userId: number): Promise<void>;
  sessionStore: any; // Using any for session store type
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
      
    // Initialize demo data for the new user
    await this.initializeUserData(user.id);
    
    return user;
  }
  
  async getLoanDetails(userId: number): Promise<LoanDetails | undefined> {
    const [details] = await db.select().from(loanDetails).where(eq(loanDetails.userId, userId));
    return details;
  }
  
  async getDisbursementDetails(userId: number): Promise<DisbursementDetails | undefined> {
    const [details] = await db.select().from(disbursementDetails).where(eq(disbursementDetails.userId, userId));
    return details;
  }
  
  async getRepaymentSchedule(userId: number): Promise<RepaymentSchedule[]> {
    return await db.select().from(repaymentSchedule).where(eq(repaymentSchedule.userId, userId));
  }
  
  async initializeUserData(userId: number): Promise<void> {
    // Add demo loan details
    await db.insert(loanDetails).values({
      userId: userId
    });
    
    // Add demo disbursement details
    await db.insert(disbursementDetails).values({
      userId: userId
    });
    
    // Add demo repayment schedule
    const repaymentData = [];
    for (let i = 1; i <= 5; i++) {
      const month = i + 7; // Start from August
      const year = 2028;
      
      repaymentData.push({
        userId: userId,
        installmentNumber: i,
        principalAmount: String(56380 - ((i - 1) * 762)),  // Decreasing principal
        monthlyInstallmentAmount: "762",
        installmentDate: `01-${month < 10 ? '0' + month : month}-${year}`,
        paymentStatus: 'N'
      });
    }
    
    await db.insert(repaymentSchedule).values(repaymentData);
  }
}

export const storage = new DatabaseStorage();
