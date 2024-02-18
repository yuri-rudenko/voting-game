import addDefaultCharacters from "../functions/addDefaultCharacters.js";
import { Character } from "../models/models.js";

class DeviceController {

    async getCharacters(req, res) {
        try {
            
            const {usedCharacters} = req.body;
            
            let newCharacters;

            if(usedCharacters) {
                const usedCharactersIds = usedCharacters.map(char => char._id)
                newCharacters = await Character.aggregate([
                    { $match: { _id: { $nin: usedCharactersIds } } },
                    { $sample: { size: 20 } }
                ]);
            }
            else {
                newCharacters = await Character.aggregate([
                    { $sample: { size: 20 } }
                ]);
            }


            res.json(newCharacters);

        } 
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async postCharacters(req, res) {

        try {
            
            let characters = await addDefaultCharacters();

            characters.forEach((i, index) => {
                Character.create({
                    name: i.name,
                    img: i.img,
                    title: i.title,
                    popularity: index,
                })
            })

            res.json(characters)

        } 
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async postCharacter(req, res) {

        try {
            
            let {name, img, title, popularity} = req.body;
            
            const character = await Character.create({name, img, title, popularity})

            res.json(character)

        } 
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async postVote(req, res) {
        try {
            


        } 
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default new DeviceController()