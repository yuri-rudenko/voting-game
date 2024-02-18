import { Router } from "express";
import gameController from "../controllers/gameController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import resultsController from "../controllers/resultsController.js";

const router = new Router();

router.put('/characters', gameController.getCharacters);
router.post('/character', gameController.postCharacter);
// router.post('/characters', gameController.postCharacters);
router.post('/vote', authMiddleware, gameController.postVote);

router.get('/results/top/:number', resultsController.getMostVoted);
router.get('/results/character/:id', resultsController.getCharacter);
router.get('/results/votes/:number', resultsController.getLastVotes);

export default router;