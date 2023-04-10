import userModel from "../../../Database/Models/user.model";
import { AppError } from "../../Utilities/error_handler";
import { NextFunction } from "express";
import { ObjectId } from "mongoose";
import { User } from "./user.types";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

class userDatabaseModel {
	async create(user: User, profile_picture: string | undefined, next: NextFunction) {
		const { name, email, password, age } = user;
		const hash = bcrypt.hashSync( password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string, 10));
        const created = await userModel.create({ name, email, password: hash, age, profile_picture })
		    .catch((error)=> { return next(new AppError(error.message, 400, error))})
        return created;
	}

    async update(user: User, user_id: ObjectId, next: NextFunction) {
        const update = {
            name: user.name,
            email: user.email,
            password: user.password,
            age: user.age,
            phone:user.phone,
            profile_pic: user.profile_picture,
        };
        const updated = await userModel.findByIdAndUpdate(user_id, update, { new: true })
            .catch((error)=> { return next(new AppError(error.message, 400, error))})
        return updated;
	}
}

export default userDatabaseModel;
