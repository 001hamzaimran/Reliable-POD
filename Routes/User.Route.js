import { Router } from "express"; 
import { CreateUser } from "../Controllers/User.Controller.js";

const UserRouter = Router();

UserRouter.post('/User/CreateUser', CreateUser)

export default UserRouter