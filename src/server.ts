
import app from './app';
import logger from './lib/logger';

const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Servidor iniciado na porta ${PORT}`);
});

async function shutdown() {
  server.close(() => {
    logger.info('Servidor encerrado');
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
