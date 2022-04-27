import express from "express";
import {
    polygon_create,
    polygon_edit,
    polygon_delete
} from "../../controllers/geo";
import { verifyToken } from "../../middlewares/verify";

const router = express.Router();

router.patch("/create", verifyToken, polygon_create);
router.patch("/edit", verifyToken, polygon_edit);
router.patch("/delete", verifyToken, polygon_delete);

export default router;