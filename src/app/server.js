const makeApp = require('./app');
const logger = require('./logger');

const PORT = process.env.PORT || 3000;
const app = makeApp();

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
});
