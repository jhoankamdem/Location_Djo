const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/sequelize');

const Tenant = require('./Tenant');
const Room = require('./Room');

 class Invoice extends Model{}
    Invoice.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        old_index: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        new_index: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        invoice_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_pay: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            devaultValue: false,
        },
        payment_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    }
);
// Room.hasMany(Invoice);
// Invoice.belongsTo(Room, {
//     foreignKey: {
//         name: 'room_id',
//     },
// });

module.exports = Invoice;