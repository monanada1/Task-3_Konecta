import { db } from '../config/db';
import { visits } from '../models';
import geoip from 'geoip-lite';

export class VisitService {
  static async recordVisit(
    linkId: number,
    ipAddress: string,
    userAgent: string,
    referrer: string
  ) {
    const geo = geoip.lookup(ipAddress);
    const country = geo?.country;
    
    await db.insert(visits).values({
      linkId,
      ipAddress,
      userAgent,
      referrer,
      country,
      clickedAt: new Date(),
    });
  }

  static async getVisitsForLink(linkId: number) {
    return db.select().from(visits).where(eq(visits.linkId, linkId));
  }
}
