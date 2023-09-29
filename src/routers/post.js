import express from "express";
const UserRouter = express.Router();
import verifyToken from '../middleware/auth.js'
import { jswpost, ceratePost, updatePost, deletePost } from "../controller/post.js";

UserRouter.get("/", verifyToken, jswpost)
UserRouter.post("/", verifyToken, ceratePost)
UserRouter.put("/:id", verifyToken, updatePost)
UserRouter.delete("/:id", verifyToken, deletePost)



export default UserRouter;