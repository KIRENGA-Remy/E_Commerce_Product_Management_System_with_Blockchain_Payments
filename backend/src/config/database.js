import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       
  process.env.DB_USER,       
  process.env.DB_PASSWORD,   
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  }
);

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('\nDatabase connected successfully.\n');
    return true;
  } catch (error) {
    console.error('\nUnable to connect to the database:', error);
    process.exit(1); 
  }
};

// Sync all models
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models synchronized successfully.\n');
  } catch (error) {
    console.error('Model synchronization failed:', error);
    process.exit(1);
  }
};

export { 
  sequelize,
  testConnection,
  syncModels
};