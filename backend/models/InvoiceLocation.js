const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

module.exports = sequelize.define(
    'InvoiceLocation',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);