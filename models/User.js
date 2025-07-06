'use strict';

const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const { type } = require("os");
const { table, timeStamp } = require("console");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false,
            primaryKey:true,
        },
        name: {
            type: DataTypes.String,
            allowNull:false,
        },
        email: {
            type:DataTypes.String,
            allowNull:false,
            unique:true,
            validate: {
                isEmail:true,
            }
        },
        password: {
            type:DataTypes.String,
            allowNull:false,
        },
        role: {
            type:DataTypes.ENUM('admin', 'doctor', 'receptionist', 'patient'),
            allowNull:false,
            defaultValue:'patient'
        }
    }, {
        tableName:'users',
        timeStamps:true
    });   
}