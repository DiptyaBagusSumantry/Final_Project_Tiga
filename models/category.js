'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.User)
      this.hasMany(models.Product);
    }
  }
  Category.init({
    tipe: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Type Already Registered!"
      },
      validate: {
        notNull:{
          args: true,
          msg: "Type Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "Type Can't Be Empty!"
        }
      }
    },
    sold_product_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          args: true,
          msg: "Sold Amount Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "Sold Amount Can't Be Empty!"
        },
        isInt: {
          args: true,
          msg: "Please Insert Correct Format For Sold Amount"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    hooks: {
      beforeValidate: (category, opt) => {
        category.sold_product_amount = category.sold_product_amount || 0
      }
    }
  });
  return Category;
};