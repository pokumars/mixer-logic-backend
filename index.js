const config = require('./utility/config');
const app = require('./app');
const logger = require('./utility/logger')


app.listen(config.PORT, () =>{
  logger.info(`Server running on port ${config.PORT}`);
});
