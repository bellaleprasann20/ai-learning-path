import express from "express";
import multer from "multer";
import { generateRoadmap } from "../controllers/aiController.js";

const router = express.Router();
const storage = multer.memoryStorage(); 

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Final path: POST /api/generate-roadmap
router.post("/generate-roadmap", upload.single("file"), generateRoadmap);

export default router;