const User = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true, allowNull: false},
        email: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.STRING.ENUM('user', 'admin'), defaultValue: 'user'},
        bitcoinAddress: {type: DataTypes.STRING}
    },
    {
        timestamps: false 
    });
    return UserModel;
}

export default User;