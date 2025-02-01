const Project = require('../models/project.model')

const addProject = async (req, res) => {
    try{
        const {name, description} = req.body;
        
        //validate required fields
        if(!name || !description){
            return res.status(400).json({ message: "Name and description are required" })
        }

        // create a new project
        const newProject = await Project.create(req.body);

        res.status(200).json({message : "Project added successfully.", project : newProject})

    }catch(error){
        // Handle unique constraint validation
        if(error.code === 11000){
            return res.status(400).json({ message: "Project name must be unique." })
        }
        res.status(500).json({ message: "Failed to add project.", error: error.message })
    }

}

const getProjects = async (req, res) => {
    try{
        const projects = await Project.find().sort({createdAt : -1}) // sort by creation date newest first
        res.status(200).json({message : "Projects fetch successfully!", projects})
    }catch(error){
        res.status(500).json({message : "Failed to fetch projects", error : error.message})
    }
}

module.exports = {addProject, getProjects}