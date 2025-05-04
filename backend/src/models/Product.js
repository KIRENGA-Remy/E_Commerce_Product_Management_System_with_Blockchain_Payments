import { DataTypes } from 'sequelize';

const Product = (sequelize) => {
  return sequelize.define('Product', {
    product_name: {
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
    image_url: {
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
    underscored: true 
  });
};

export default Product;