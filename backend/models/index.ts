import config from '../config/db.config';

import { Dialect, Sequelize } from 'sequelize';

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect as Dialect,
  // logging: console.log,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

interface Db {
  Sequelize: typeof Sequelize;
  sequelize: typeof sequelize;
  user?: any;
}


const db: Db = { 
  Sequelize,
  sequelize,
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);

export default db