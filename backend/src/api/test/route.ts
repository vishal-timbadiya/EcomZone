import { prisma } from '@/lib/prisma';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await prisma.$queryRaw`SELECT 1`;
    return Response.json({ message: "PostgreSQL Connected", result });
  });

export default router;
