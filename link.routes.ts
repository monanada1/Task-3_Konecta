import { Router } from 'express';
import { LinkController } from '../controllers/link.controller';
import { authenticate } from '../middleware/auth.middleware';
import { checkLinkExpiry } from '../middleware/expiry.middleware';
import { validate } from '../middleware/validation.middleware';
import { z } from 'zod';

const router = Router();

const createLinkSchema = z.object({
  body: z.object({
    originalUrl: z.string().url(),
    customSlug: z.string().optional(),
    password: z.string().optional(),
    expiresAt: z.string().datetime().optional(),
  }),
});

router.post('/', authenticate, validate(createLinkSchema), LinkController.createLink);
router.get('/:slug', checkLinkExpiry, LinkController.redirect);
router.get('/user/links', authenticate, LinkController.getUserLinks);

export default router;
