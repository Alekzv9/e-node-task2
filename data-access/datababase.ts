import { Sequelize } from 'sequelize';

const db = process.env.DB || '';
const username = process.env.DB_USERNAME || '';
const password = process.env.DB_PASSWORD || '';

export const sequelize = new Sequelize(db, username, password, {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});
