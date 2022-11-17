const UsersCourses = require("../models/usersCourses.model.js");
const Users = require("../models/users.model.js");
const Courses = require("../models/courses.model.js");
const {forEach} = require("p-iteration");

class usersCoursesController {
    static async create (req, res) {

        const { courses } = req.body; // [1, 2, 3]
        const userId = req.userId;
        
        try{

            await forEach(courses, async(course) => {

                let userCourse = await UsersCourses.findOne({where: {user_id: userId, course_id: course}});
                
                if(!userCourse){

                    await UsersCourses.create({user_id: userId, course_id: course});

                }
                
            });

            const userCourses = await Users.findAll({
                where: {user_id: userId},
                attributes: { exclude: ["createdAt", "updatedAt", "password"] },
                include: {
                    model: Courses,
                    attributes: ['title']
                }
            });

            res.status(201).json(userCourses);
            
        }catch(error){

            res.status(500).json({error: 'error'});

        };

    };

    static async getAll (req, res){
        try {
            const userCourse = await UsersCourses.findAll();
            res.status(200).json(userCourse);
        } catch (error) {
            res.sendStatus(500);
        };
    };
};

module.exports = usersCoursesController;