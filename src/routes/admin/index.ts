import express from "express";
import { admin_login } from "../../controllers/admin";

const router = express.Router();
router.post("/login", admin_login);

export default router;
