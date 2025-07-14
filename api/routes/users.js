import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userController.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user you are authenticated")
// })

// router.get("/checkuser/:id" , verifyUser, (req, res, next) => {
//     res.send("hello you are logged in")
// })
// router.get("/checkadmin/:id" , verifyAdmin, (req, res, next) => {
//     res.send("hello you are logged in as admin")
// })

router.get("/" ,verifyAdmin, getUsers)

router.get("/:id" ,verifyUser, getUser)

router.put("/:id",verifyUser, updateUser)

router.delete("/:id",verifyUser, deleteUser)

export default router;