const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL || 'postgres://afscor:prof@localhost:5432/location_db', {dialect: 'postgres'});

const connectDB = async () => {
    try{
      await sequelize.authenticate();
      console.log('Connection has been established successfully');
    } catch (error){
      console.error('Unable to connect to the database', error);
    }
  }
connectDB();



module.exports = sequelize;