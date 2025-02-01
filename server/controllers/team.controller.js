const Team = require('../models/team.model')


const addTeam = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate required fields
        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required" });
        }

        // Create a new team
        const newTeam = await Team.create({ name, description });

        res.status(201).json({ message: "Team created successfully", team: newTeam });
    } catch (error) {
        // Handle unique constraint violation
        if (error.code === 11000) {
            return res.status(400).json({ message: "Team name must be unique" });
        }

        res.status(500).json({ message: "Failed to create team", error: error.message });
    }
}

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find().sort({ createdAt: -1 }); // Sort by creation date (newest first)
        res.status(200).json({ message: "Teams fetched successfully", teams });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch teams", error: error.message });
    }
};


module.exports = {addTeam, getTeams}