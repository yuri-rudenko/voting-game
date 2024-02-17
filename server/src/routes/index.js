import { Router } from "express";
import gameController from "../controllers/gameController.js";

const router = new Router();

router.get('/', gameController.getCharacters);
router.post('/', gameController.postVote);

export default router;