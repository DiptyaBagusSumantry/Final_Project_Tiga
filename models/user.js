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
      // this.hasMany(models.Product);
      // this.hasMany(models.TransactionHistory);
      // this.hasMany(models.Category);
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
        isIn: {
          args: [["Male", "Female"]],
          msg: "pilih Male atau Female"
        }
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
       isIn: {
        args: [[1 , 2]],
        msg: "Role Masukan 1 untuk Admin, 2. untuk customer" // 1. ADMIN 2.Customer
    } 
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
        max: {
          args: 100000000,
          msg: "Balance maksimal 100.000.000"
        },
        min: {
          args: 1,
          msg: "Balance tidak Boleh 0"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};