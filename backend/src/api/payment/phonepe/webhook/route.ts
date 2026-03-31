import { prisma } from '@/lib/prisma';
// PaymentStatus enum doesn't exist in the schema, using string literals instead
import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
      const body = req.body;
  
      const merchantTransactionId =
        body?.data?.merchantTransactionId;
  
      const paymentState =
        body?.data?.state;
  
      if (!merchantTransactionId) {
        return res.status(400).json({ message: "Invalid webhook" });
      }
  
      if (paymentState === "COMPLETED") {
        await prisma.order.update({
          where: { orderId: merchantTransactionId },
          data: {
            paymentStatus: "SUCCESS",
          },
        });
      }
  
      if (paymentState === "FAILED") {
        await prisma.order.update({
          where: { orderId: merchantTransactionId },
          data: {
            paymentStatus: "FAILED",
          },
        });
      }
  
      return res.json({ message: "Webhook processed" });
    } catch (error: any) {
      console.error("Webhook Error:", error.message);
      return res.status(500).json({ message: "Webhook failed" });
    }
  });

export default router;
