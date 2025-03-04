const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Account = require('./Account');
const Building = require('./Building');

const User = sequelize.define(
    'User',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // set(value) {
                // Storing passwords in plaintext in the database is terrible.
                // Hashing the value with an appropriate cryptographic hash function is better.
            //     this.setDataValue('password', hash(value, 10));
            // },
        },
    },
    {
        underscored: true,
    }
);

User.belongsTo(Account, {
    foreignKey: {
        name: 'account_id',
    },
});
Account.hasOne(User);

User.hasMany(Building, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    },
});
Building.belongsTo(User);

module.exports = User;