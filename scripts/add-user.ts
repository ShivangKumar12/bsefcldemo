import { db } from "../server/db";
import { users } from "../shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function main() {
  try {
    // Hash the password
    const hashedPassword = await hashPassword("Shivang@1234");
    
    // Add the user with the hashed password
    const [user] = await db
      .insert(users)
      .values({
        username: "shivangkumarcgc@gmail.com",
        password: hashedPassword,
        fullName: "SHIVANG KUMAR",
        email: "shivangkumarcgc@gmail.com",
        mobile: "9852001237",
        isActive: true
      })
      .returning();
    
    console.log("User added successfully:");
    console.log(user);
    
    process.exit(0);
  } catch (error) {
    console.error("Error adding user:", error);
    process.exit(1);
  }
}

main();