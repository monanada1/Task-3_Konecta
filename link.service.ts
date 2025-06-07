import { db } from '../config/db';
import { links } from '../models';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import bcrypt from 'bcrypt';

export class LinkService {
  static async createLink(
    originalUrl: string,
    userId?: number,
    customSlug?: string,
    password?: string,
    expiresAt?: Date
  ) {
    const slug = customSlug || nanoid(8);
    let passwordHash = null;
    
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    const result = await db.insert(links).values({
      originalUrl,
      shortSlug: slug,
      createdBy: userId,
      createdAt: new Date(),
      expiresAt,
      passwordHash,
    }).returning();

    const qrCode = await QRCode.toDataURL(`${process.env.BASE_URL}/${slug}`);
    
    return { ...result[0], qrCode };
  }

  static async getLinkBySlug(slug: string) {
    const result = await db.select().from(links).where(eq(links.shortSlug, slug));
    return result[0];
  }

  static async incrementClickCount(linkId: number) {
    await db.update(links)
      .set({ clickCount: links.clickCount + 1 })
      .where(eq(links.id, linkId));
  }

  static async getLinksByUser(userId: number) {
    return db.select().from(links).where(eq(links.createdBy, userId));
  }
}
