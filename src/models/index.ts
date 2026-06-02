'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import process from 'process';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Sử dụng require cho file JSON là hợp lý
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.ts' || file.slice(-3) === '.js') &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach(file => {
    // Import module
    const modelModule = require(path.join(__dirname, file));
    
    /**
     * SỬA LỖI TẠI ĐÂY:
     * Kiểm tra xem model được export qua 'default' (ESM) hay trực tiếp (CommonJS)
     */
    const modelDefiner = modelModule.default || modelModule;

    if (typeof modelDefiner === 'function') {
      const model = modelDefiner(sequelize, DataTypes);
      db[model.name] = model;
    } else {
      console.warn(`⚠️  File ${file} không export một function. Bỏ qua...`);
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;