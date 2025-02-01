const Tag = require('../models/tag.model')

const addTag = async (req, res) => {
   try{
    const {name} = req.body;
    
    // validate required field
    if(!name){
        return res.status(400).json({message : "Name of the tag is require!"})
    }

    // create a new tag
    const newTag = await Tag.create({name})

    res.status(200).json({message : "New tag is added successfully!", tag : newTag})

   }catch(error){
    //Handle unique constraint violation
    if(error.code === 11000){
        return res.status(400).json({ message: "Tag name must be unique" });
    }
    res.status(500).json({message : "Failed to add tag", error : error.message})
   }
}

const getTag = async (req, res) => {
    try{
        const tags = await Tag.find().sort({createdAt: -1})
        res.status(200).json({message : "Tags fetch successfully!", tags})
    }catch(error){
        res.status(500).json({ message: "Failed to fetch tags", error: error.message });
    }
}

module.exports = {addTag, getTag}