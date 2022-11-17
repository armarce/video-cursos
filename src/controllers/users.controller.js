const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users.model.js');
const Courses = require('../models/courses.model.js');
require('dotenv').config();

class usersController{

    static async create(req, res) {

        const {firstName, lastName, email, password} = req.body;

        const salt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(password, salt);

        try{

            const user = await Users.create({firstName, lastName, email, password: hashPassword});

            res.status(201).json({userId: user.userId, firstName, lastName, email});
            
        }catch(error){



        }

    }

    static async login(req, res){

        const {email, password} = req.body;

        try{

            const user = await Users.findOne({
                where: {email}
            });
            
            const hashPassword = user.password;
    
            const compare = await bcrypt.compare(password, hashPassword);

            if(compare){
                
                const token = jwt.sign({ user_id: user.userId}, process.env.JWT_SECRET, {expiresIn: '3h'});

                res.status(202).json({token});

            }else{

                res.status(500).json({error: {message: 'Invalid password or email'}});

            }

        }catch(error){

            res.sendStatus(500);

        }

    }

    static async getAll(req, res){

        try{

            const users = await Users.findAll({ attributes: { exclude: ['password', 'createdAt', 'updatedAt']}});

            res.status(200).json(users);

        }catch(error){

            res.sendStatus(500);

        }

    }

    static async getOne(req, res, next){

        const {user_id} = req.params;

        try{

            const user = await Users.findByPk(user_id, { attributes: { exclude: ['password', 'createdAt', 'updatedAt']}});

            if(user){
                
                res.status(200).json({success: true, response: user});

            }else{

                return next('userNotFound');

            }

        }catch(error){

            return next({errorCode: 'userNotFound', error: error});

        }

    }
    
    static async getCoursesByUser(req, res){

        const {user_id} = req.params;

        try{

            const userCourses = await Users.findAll({
                attributes: { exclude: ["createdAt", "updatedAt", "password"] },
                include: {
                    model: Courses,
                    attributes: ['title']
                }, 
                where: {user_id}
            });
            
            if(userCourses & userCourses.length > 0){
                
                res.status(200).json(userCourses);

            }else{

                res.status(500).json({error: {message: "User not found"}});

            }

        }catch(error){

            res.status(500).json({error: {message: "User not found"}});

        }

    }
    
    static async updatePartial(req, res){

        const {user_id} = req.params;
        const {firstName, lastName, password} = req.body;

        try{

            const user = await Users.findByPk(user_id);
            
            if(firstName) user.firstName = firstName;
            if(lastName) user.lastName = lastName;
            if(password) user.password = password;
            
            await user.save();

            const userUpdated = await Users.findByPk(user_id, { attributes: { exclude: ['password', 'createdAt', 'updatedAt']}});

            res.status(201).json(userUpdated);

        }catch(error){

            res.status(500).json({error});

        }

    }

    static async delete(req, res){

        const user_id = req.userId;

        try{

            const user = await Users.findByPk(user_id);

            if(user){

                user.destroy();
                
                res.sendStatus(202);

            }else{

                res.status(500).json({error: {message: "User not found"}});

            }            

        }catch{

            res.status(500).json({error: {message: "User not found"}});

        }

    }

}

module.exports = usersController;