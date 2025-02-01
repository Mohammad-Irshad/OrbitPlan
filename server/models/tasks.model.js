const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    project: { 
        type: mongoose.Schema.Types.ObjectId, // Refers to Project model
        ref: 'Project', 
        required: true 
    }, 
    team: { 
        type: mongoose.Schema.Types.ObjectId, // Refers to Team model
        ref: 'Team',
        required: true 
    }, 
    owners: [
        { 
            type: mongoose.Schema.Types.ObjectId,  // Refers to User model (owners)
            ref: 'User', 
            required: true 
        } 
    ],
    tags: [{ 
        type: String // Array of tags
    }], 
    timeToComplete: { 
        type: Number,  // Number of days to complete the task
        required: true 
    }, 
    status: {
        type: String, // Task status
        enum: ['To Do', 'In Progress', 'Completed', 'Blocked'],    // Enum for task status
        default: 'To Do'
    }, 
    dueDate : {
        type : Date,
        required : true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Automatically update the `updatedAt` field whenever the document is updated

taskSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Task', taskSchema);
   