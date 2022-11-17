const {db, DataTypes} = require('../utils/database.js');

const UsersCourses = db.define('user_courses', {}, { timestamps: false });

module.exports = UsersCourses;