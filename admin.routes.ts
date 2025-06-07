import { Router } from 'express';
import { authenticate, adminOnly } from '../middleware/auth.middleware';
import { LinkService } from '../services/link.service';
import { VisitService } from '../services/visit.service';

const router = Router();

router.use(authenticate, adminOnly);

router.get('/links', async (req, res) => {
  const allLinks = await LinkService.getAllLinks();
  res.render('admin/links', { links: allLinks });
});

router.get('/visits', async (req, res) => {
  const allVisits = await VisitService.getAllVisits();
  res.render('admin/visits', { visits: allVisits });
});

export default router;
