module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,   // makes sure no other user record has this value
            validate: {
                isEmail: true   // email validation built into sequelize
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [7, 100]
            }
        }
    }, {
        hooks: {
            beforeValidate: function (user, options) {
                // convert user.email to all-lowercase before validation
                // to avoid dupe emails because of capitalization.
                if (typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                } 
            }
        }
    });
};