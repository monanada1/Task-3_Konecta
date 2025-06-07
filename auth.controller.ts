import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password } = registerSchema.parse(req.body);
      const user = await AuthService.register(email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const token = await AuthService.login(email, password);
      res.cookie('token', token, { httpOnly: true });
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}
