import express from "express";
import {
    mline_create,
    mline_edit,
    mline_delete
} from "../../controllers/geo";
import { verifyToken } from "../../middlewares/verify";

const router = express.Router();

router.patch("/create", verifyToken, mline_create);
router.patch("/edit", verifyToken, mline_edit);
router.patch("/delete", verifyToken, mline_delete);

export default router;