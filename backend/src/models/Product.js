import { DataTypes } from 'sequelize';

const Product = (sequelize) => {
  return sequelize.define('Product', {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 2000]
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    }
  }, {
    timestamps: false,
    tableName: 'products',
    underscored: true // Optional: for snake_case column names
  });
};

export default Product;