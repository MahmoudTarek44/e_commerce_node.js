import { ObjectId } from "mongoose";

export interface User {
	isActive: boolean;
	_id?: ObjectId;
	name: string;
	email: string;
	age: number;
	phone: string;
	password: string;
	profile_picture?: string;
	role: string;
}
