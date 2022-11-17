const Videos = require("../models/videos.model.js");

class videosController {

    static async create (req, res){

        const {title, url, courseId} = req.body;

        try {

            const video = await Videos.create({title, url, courseId});
            res.status(201).json(video);

        } catch (error) {

            res.status(400).json({error: error});

        };

    };

    static async getAll (req, res){

        try{

            const videos = await Videos.findAll();
            res.status(200).json(videos);

        }catch(error){

            res.sendStatus(500);

            
        };
        
    };

    static async delete (req, res){

        const {video_id}= req.params;

        try {

            const video = await Videos.findByPk(video_id)

            if (video) {

                video.destroy();
                res.sendStatus(202);

            }else{

                res.status(500).json([{ message: "video not found"}]);

            }
        } catch (error) {

            res.status(500).json([{ message: "video not found"}]);

        }
    }
};

module.exports = videosController;