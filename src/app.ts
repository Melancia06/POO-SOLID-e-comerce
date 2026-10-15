
import express from 'express';
import { PrismaClient } from '@prisma/client';

import { OrderController } from './controllers/OrderController';
import { OrderService } from './services/OrderService';
import { NotificationService } from './services/NotificationService';

import { PrismaOrderRepository } from './repositories/PrismaOrderRepository';
import { EtherealMailProvider } from './providers/EtherealMailProvider';

import { CreditCardPayment } from './payments/CreditCardPayment';
import { PixPayment } from './payments/PixPayment';
import { IPaymentMethod } from './payments/IPaymentMethod';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

const orderRepository = new PrismaOrderRepository(prisma);

const mailProvider = new EtherealMailProvider();
const notificationService = new NotificationService(mailProvider);

const payments: Record<string, IPaymentMethod> = {
  credit_card: new CreditCardPayment(),
  pix: new PixPayment()
};

const orderService = new OrderService(
  orderRepository,
  notificationService,
  payments
);

const orderController = new OrderController(orderService);

app.post('/orders', orderController.processOrder);

export default app;
