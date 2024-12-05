const configguration = require('../config/db.config.ts');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(configguration.DB, configguration.USER, configguration.PASSWORD, {
  host: configguration.HOST,
  dialect: configguration.dialect,
  // logging: console.log,
  pool: {
    max: configguration.pool.max,
    min: configguration.pool.min,
    acquire: configguration.pool.acquire,
    idle: configguration.pool.idle
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