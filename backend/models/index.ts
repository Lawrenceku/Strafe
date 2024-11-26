const config = require('../config/db.config.ts');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
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

module.exports = db;