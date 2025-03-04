const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/sequelize');

// const User = require('./User');
const Room = require('./Room');

const Building = sequelize.define(
    'Building',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        address_1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address_2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        water_price: {
            type: DataTypes.DECIMAL(18,2),
            allowNull: true,
        },
        light_price: {
            type: DataTypes.DECIMAL(18,2),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        nb_house: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        nb_studio: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        nb_rooms: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        nb_appartment: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        service_type: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'all',
        },

    },
    {
        underscored: true,
    }

);
Building.hasMany(Room);
Room.belongsTo(Building, {
    foreignKey: {
        name: 'building_id',
    }
});



module.exports = Building;