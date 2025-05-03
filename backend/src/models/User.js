import { DataTypes } from 'sequelize';

const User = (sequelize) => {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },
    bitcoinAddress: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-zA-Z0-9]{26,35}$/
      }
    }
  }, {
    timestamps: false,
    tableName: 'users'
  });
};

export default User;