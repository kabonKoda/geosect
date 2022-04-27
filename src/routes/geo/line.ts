import express from "express";
import {
    line_create,
    line_edit,
    line_delete
} from "../../controllers/geo";
import { verifyToken } from "../../middlewares/verify";

const router = express.Router();

router.patch("/create", verifyToken, line_create);
router.patch("/edit", verifyToken, line_edit);
router.patch("/delete", verifyToken, line_delete);

export default router;