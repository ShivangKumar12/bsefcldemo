import { pgTable, text, serial, integer, boolean, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile").notNull(),
  isActive: boolean("is_active").default(true),
  lastLogin: text("last_login"),
  registrationId: text("registration_id").default("6172140"),
  address: text("address").default("S/O: MUNNA KUMAR, ROAD NO-8, NARAYANI NAGAR SANCHIPATTI, HAJIPUR HAJIPUR"),
  coApplicantName: text("co_applicant_name").default("MUNNA KUMAR"),
  coApplicantAddress: text("co_applicant_address").default("ROAD NO.8, NARAYANI NAGAR, SANCHIPATTI, HAJIPUR, VAISHALI, BIHAR"),
  coApplicantContact: text("co_applicant_contact").default("9931286972"),
  instituteName: text("institute_name").default("CHANDIGARH ENGINEERING COLLEGE"),
  instituteAddress: text("institute_address").default("LANDRAN, KHARAR-BANUR HIGHWAY, SECTOR-112, GREATER MOHALI, PUNJABLANDRAN, MOHALI-140307(PUNJAB)"),
  instituteContact: text("institute_contact").default("1723984200"),
  appliedCourse: text("applied_course").default("B.TECH B.E. B.SC-COMPUTER SCIENCE AND ENGINEERING"),
  courseDuration: integer("course_duration").default(48),
});

export const loanDetails = pgTable("loan_details", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  loanAccountNumber: text("loan_account_number").default("6172140"),
  loanSanctioned: numeric("loan_sanctioned").default("400000.00"),
  loanDisbursed: numeric("loan_disbursed").default("57142.00"),
  repaymentTenure: integer("repayment_tenure").default(84),
  virtualAccountNo: text("virtual_account_no").default("BSEFCL1006172402"),
  totalOverdueAmount: numeric("total_overdue_amount").default("0.00"),
  nextDueDate: text("next_due_date").default("01/08/2028"),
});

export const disbursementDetails = pgTable("disbursement_details", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  beneficiaryName: text("beneficiary_name").default("CHANDIGARH ENGINEERING COLLEGE"),
  accountNo: text("account_no").default("918010087044345"),
  ifscCode: text("ifsc_code").default("UTIB0004977"),
  loanDisbursed: numeric("loan_disbursed").default("57142"),
  disbursementDate: text("disbursement_date").default("06/05/2024"),
  modeOfPayment: text("mode_of_payment").default("RTGS"),
  utrDdNo: text("utr_dd_no").default("N1272430232183791"),
  ddTrackingNo: text("dd_tracking_no").default("NA"),
  status: text("status").default("Success"),
});

export const repaymentSchedule = pgTable("repayment_schedule", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  installmentNumber: integer("installment_number").notNull(),
  principalAmount: numeric("principal_amount").notNull(),
  monthlyInstallmentAmount: numeric("monthly_installment_amount").notNull(),
  installmentDate: text("installment_date").notNull(),
  paymentStatus: text("payment_status").default("N"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  mobile: true,
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type User = typeof users.$inferSelect;
export type LoanDetails = typeof loanDetails.$inferSelect;
export type DisbursementDetails = typeof disbursementDetails.$inferSelect;
export type RepaymentSchedule = typeof repaymentSchedule.$inferSelect;
