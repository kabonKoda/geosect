import express from "express";
import {
    geo_intersect,
    geo_within,
    geo_near
} from "../../controllers/geo";
import { verifyToken } from "../../middlewares/verify";

const router = express.Router();

router.patch("/intersect", verifyToken, geo_intersect);
router.patch("/within", verifyToken, geo_within);
router.patch("/near", verifyToken, geo_near);

export default router;