import { Router } from "express";
import gameController from "../controllers/gameController.js";

const router = new Router();

router.put('/characters', gameController.getCharacters);
router.post('/character', gameController.postCharacter);
// router.post('/characters', gameController.postCharacters);
router.post('/vote', gameController.postVote);

export default router;