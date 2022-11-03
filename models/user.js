'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product);
      this.hasMany(models.TransactionHistory);
      this.hasMany(models.Category)
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Full Name Tidak Boleh Kosong"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Data harus valid!"
        },
        notEmpty: {
          args: true,
          msg: "Email Tidak Boleh Kosong"
        },
        isEmail:{
          args: true,
          msg: "Email Format Salah"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password harus di isi"
        },
        len:[6,10]

      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Gander tidak boleh kosong"
        },
        equals: ['male', 'female']
    }
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Role harus di isi"
        },
       equals: [1 , 2] // 1. ADMIN 2.Customer
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Balance Harus di Isi"
        },
        isInt: {
          args: true,
          msg: "Balance Harus Masukan Angka"
        },
        len: [1,100000000]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};