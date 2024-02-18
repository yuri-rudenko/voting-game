export default function(req, res, next) {
    if(req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            return res.status(401).json({message: "Not on the website"})
        }
        
        const {characterId} = req.body;

        if(characterId !== token) throw new Error('Not on the website')

        next();

    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}