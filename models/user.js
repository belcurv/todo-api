var bcrypt = require('bcrypt'),
    _      = require('underscore');

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
        salt: {
            type: DataTypes.STRING
        },
        password_hash: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.VIRTUAL,   // virtual not stored but IS accessible
            allowNull: false,
            validate: {
                len: [7, 100]
            },
            set: function (value) {
                var salt = bcrypt.genSaltSync(10),
                    hashedPassword = bcrypt.hashSync(value, salt);
                
                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
    }, {
        hooks: {        // see docs.sequelizejs.com
            beforeValidate: function (user, options) {
                // convert user.email to all-lowercase before validation
                // to avoid dupe emails because of capitalization.
                if (typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                } 
            }
        },
        instanceMethods: {
            toPublicJSON: function () {
                // only return our public properties
                var json = this.toJSON();
                return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
            }
        }
    });
};