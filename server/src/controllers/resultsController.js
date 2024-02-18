import { Character } from "../models/models.js";

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
}

export default new ResultsController()