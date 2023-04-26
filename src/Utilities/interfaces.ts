import { Request } from "express";
import { User } from "../Modules/User/user.types";

interface modifiedRequest extends Request {
	user: User;
}

export default modifiedRequest;
