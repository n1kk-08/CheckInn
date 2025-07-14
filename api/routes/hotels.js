import express from "express";

import { createHotel, deleteHotel, getHotels, getHotel, updateHotel, countBycity, countByType, getHotelRooms } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE hotels

router.post("/",verifyAdmin, createHotel)

// Updating hotels
router.put("/:id",verifyAdmin, updateHotel)

// Deleting hotels

router.delete("/:id" ,verifyAdmin, deleteHotel)

//Get specific hotel
router.get("/find/:id" , getHotel)

//Get all the hotels

router.get("/" , getHotels)

router.get("/countbycity" , countBycity)
router.get("/countbytype" , countByType)
router.get("/room/:id", getHotelRooms)

export default router;