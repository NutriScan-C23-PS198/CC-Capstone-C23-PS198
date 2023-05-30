const Users = require('./users');
const Foods = require('./foods');

Foods.belongsTo(Users, { as: 'user' });

const Models = {};
Models.Users = Users;
Models.Foods = Foods;

module.exports = Models;