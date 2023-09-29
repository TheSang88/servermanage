import express from "express";
const UserRouter = express.Router();
import verifyToken from '../middleware/auth.js'
import { register, login, jsonwt } from '../controller/auth.js'

UserRouter.get("/", verifyToken, jsonwt)
UserRouter.post("/register", register)
UserRouter.post("/login", login)


export default UserRouter;