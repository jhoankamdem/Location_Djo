const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/sequelize');

const Account = sequelize.define(
    'Account',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        full_name: {
            type: DataTypes.VIRTUAL,
            get() {
              return `${this.first_name} ${this.last_name}`;
            },
            set(value) {
              throw new Error('Do not try to set the `full_name` value!');
            },
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        cni: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        deliver_on: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    },
    {
        underscored: true,
    }
);




module.exports = Account;