import Sequelize from 'sequelize';

export const sequelize = new Sequelize('coursedb', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
});
