import express from "express";
import {
    mpoly_create,
    mpoly_edit,
    mpoly_delete
} from "../../controllers/geo";
import { verifyToken } from "../../middlewares/verify";

const router = express.Router();

router.patch("/create", verifyToken, mpoly_create);
router.patch("/edit", verifyToken, mpoly_edit);
router.patch("/delete", verifyToken, mpoly_delete);

export default router;