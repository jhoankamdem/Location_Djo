const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Contract = require('./Contract');
const Tenant = require('./Tenant');

const Room = sequelize.define(
    'Room',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        room_number: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            devaultValue: true,
            allowNull: false,
        },
        type_of_rooms: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        underscored: true,
        Timestamp: true,
    }
);

// Room.associate = (models) => {
//     Room.belongsToMany(models.Tenant, {
//         through: models.Contract,
//         foreignKey: 'room_id',
//         otherKey: 'tenant_id',
//     });
// };



// (async () => {
//     await sequelize.sync({ force: true});
// });


module.exports = Room;