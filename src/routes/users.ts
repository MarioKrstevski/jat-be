// src/routes/users.ts
import express from "express";
import * as usersController from "../controllers/users.controller";

const router = express.Router();

// Define routes for users
router.get("/:userId", usersController.getUser);
router.post("/", usersController.createUser);

export default router;
