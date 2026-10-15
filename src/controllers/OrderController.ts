
import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import logger from '../lib/logger';

export class OrderController {
  constructor(private orderService: OrderService) {}

  processOrder = async (req: Request, res: Response) => {
    try {
      const result = await this.orderService.processOrder(req.body);

      return res.status(201).json(result);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro interno';

      logger.error(`Erro ao processar pedido: ${message}`);

      const clientErrors = [
        'Dados do pedido inválidos',
        'Cliente obrigatório',
        'Carrinho vazio',
        'Item ou quantidade inválida',
        'Método de pagamento não suportado'
      ];

      const isProductNotFound =
        message.startsWith('Produto ') &&
        message.endsWith(' não encontrado');

      if (clientErrors.includes(message) || isProductNotFound) {
        return res.status(400).json({ error: message });
      }

      if (
        message === 'Dados do cartão incompletos' ||
        message === 'Cartão recusado'
      ) {
        return res.status(400).json({ error: message });
      }

      return res.status(500).json({
        error: 'Erro interno ao processar o pedido'
      });
    }
  };
}
