import { makeApp } from './app';
import logger from './logger';

/**
 * @fileoverview Server Entry Point - Starts the Express server
 */

const PORT = process.env['PORT'] || 3000;
const app = makeApp();

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
