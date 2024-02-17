import addDefaultCharacters from "../functions/addDefaultCharacters.js";
import { Character } from "../models/models.js";

class DeviceController {

    async getCharacters() {
        try {
            


        } 
        catch (error) {
            return error.message;
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
            res.json(error.message);
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
            res.json(error.message);
        }
    }

    async postVote() {
        try {
            


        } 
        catch (error) {
            return error.message;
        }
    }

}

export default new DeviceController()