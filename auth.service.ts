import { db } from '../config/db';
import { users } from '../models';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
  static async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.insert(users).values({
      email,
      hashedPassword,
      createdAt: new Date(),
    }).returning();
    return result[0];
  }

  static async login(email: string, password: string) {
    const user = await db.select().from(users).where(eq(users.email, email));
    if (!user[0]) throw new Error('User not found');
    
    const isValid = await bcrypt.compare(password, user[0].hashedPassword);
    if (!isValid) throw new Error('Invalid password');
    
    const token = jwt.sign({ id: user[0].id, email: user[0].email }, JWT_SECRET, {
      expiresIn: '1h',
    });
    
    return token;
  }

  static async verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }
}
