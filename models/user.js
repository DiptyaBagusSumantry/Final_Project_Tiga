'use strict';
const {Model} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.TransactionHistory);
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {
          args: true,
          msg: "Full Name Can't Be Empty!"
        },
        notNull : {
          args: true,
          msg: "Full Name Can't Be Null!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email Already Registered!"
      },
      validate: {
        notNull: {
          args: true,
          msg: "Email Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "Email Can't Be Empty!"
        },
        isEmail:{
          args: true,
          msg: "Invalid Email Address"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "Password Can't Be Empty!"
        },
        len:{
          args: [6,10],
          msg: "Password Must Contain 6-10 Characters"
        }

      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Gender Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "Gender Can't Be Empty!"
        },
        isIn: {
          args: [["Male", "Female"]],
          msg: "Please Enter 'Male' Or 'Female'"
        }
    }
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Role Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "Role Can't Be Empty!"
        },
       isIn: {
        args: [[1 , 2]],
        msg: "Please Enter 1 For Admin or 2 For Customer" // 1. ADMIN 2.Customer
    } 
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Balance Must Be Valid!"
        },
        notEmpty: {
          args: true,
          msg: "Balance Must Be Filled"
        },
        isInt: {
          args: true,
          msg: "Please Insert Correct Format For Balance"
        },
        max: {
          args: 100000000,
          msg: "Maximum Balance is Rp.100.000.000"
        },
        min: {
          args: [0],
          msg: "Minimum Balance is Rp.0"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',  
    hooks: {
      beforeValidate: (user, opt) => {
        user.role = user.role || 2
        user.balance = user.balance || 0
      },
      beforeCreate: (user, opt) =>{
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
       } 
    }
  });
  return User;
};