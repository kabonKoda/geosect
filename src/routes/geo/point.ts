import express from "express";
import {
    point_create,
    point_edit,
    point_delete
} from "../../controllers/geo";
import { verifyToken } from "../../middlewares/verify";

const router = express.Router();

router.patch("/create", verifyToken, point_create);
router.patch("/edit", verifyToken, point_edit);
router.patch("/delete", verifyToken, point_delete);

export default router;