const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true // Project names must be unique
    }, 
    description: { 
        type: String // Optional field for project details
    }, 
    user : {
        type: mongoose.Schema.Types.ObjectId, // Refers to User model
        ref: 'User',
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
   });

   module.exports = mongoose.model('Project', projectSchema);