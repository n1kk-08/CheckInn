import express, { Router } from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/roomController.js";

const router = Router();


router.post("/:hotelid", verifyAdmin, createRoom)
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)
router.get("/:id", getRoom)
router.get("/",  getRooms)


export default router