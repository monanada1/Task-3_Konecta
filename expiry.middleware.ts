import { Request, Response, NextFunction } from 'express';
import { links } from '../models';
import { db } from '../config/db';
import { eq } from 'drizzle-orm';

export async function checkLinkExpiry(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;
  const link = await db.select().from(links).where(eq(links.shortSlug, slug));
  
  if (!link[0]) {
    return res.status(404).json({ error: 'Link not found' });
  }

  if (link[0].expiresAt && new Date(link[0].expiresAt) < new Date()) {
    return res.status(410).json({ error: 'Link has expired' });
  }

  req.link = link[0];
  next();
}
