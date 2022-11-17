const Users = require('./users.model.js');
const Courses = require('./courses.model.js');
const Categories = require('./categories.model.js');
const Videos = require('./videos.model.js');
const UsersCourses = require('./usersCourses.model.js')

const initModels = () => {
    Users.belongsToMany(Courses, {
        through: UsersCourses,
        foreignKey: 'user_id'
    }); 
    Courses.belongsToMany(Users, {
        through: UsersCourses,
        foreignKey: 'course_id' 
    });
    Categories.hasMany(Courses, {
        foreignKey: 'category_id'
    });
    Courses.belongsTo(Categories, { 
        foreignKey: 'category_id'
    });
    Courses.hasMany(Videos, {
        foreignKey: 'course_id'
    });
    Videos.belongsTo(Courses, {
        foreignKey: 'course_id'
    });
}

module.exports = initModels;