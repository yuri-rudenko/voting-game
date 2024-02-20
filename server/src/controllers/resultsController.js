import { Character, Vote } from "../models/models.js";

class ResultsController {

    async getMostVoted(req, res) {
        try {
            
            const {number} = req.params;
            const limit = parseInt(number);
            
            let newCharacters;

            const top = await Character.find().sort({ votesNumber: -1 }).limit(limit);

            res.json(top);

        } 
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getCharacter(req, res) {
        try {
            
            const {id} = req.params;

            const char = await Character.findById(id)

            res.json(char);

        } 
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getLastVotes(req, res) {
        const {number} = req.params;

        const char = await Vote.find().sort({ createdAt: -1 }).limit(number);

        res.json(char);
    }
    async getVotesAmount(req, res) {
        try {
            const count = await Vote.countDocuments(); 

            res.json(count);
        } 
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new ResultsController()