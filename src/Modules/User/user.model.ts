import userModel from "../../../Database/Models/user.model";
import { AppError } from "../../Utilities/error_handler";
import { NextFunction } from "express";
import { ObjectId } from "mongoose";
import { User } from "./user.types";
class userDatabaseModel {
	async create(
		user: User,
		profile_picture: string | undefined,
		next: NextFunction
	) {
		const { name, email, password, age } = user;
		const created = new userModel({
			name,
			email,
			password,
			age,
			profile_picture,
		});
		await created
			.save()
			.catch((error: Error) => next(new AppError(error.message, 400)));
		return created;
	}

	async update(user: User, user_id: ObjectId | string, next: NextFunction) {
		const update = {
			name: user.name,
			email: user.email,
			password: user.password,
			age: user.age,
			phone: user.phone,
			profile_pic: user.profile_picture,
		};
		const updated = await userModel
			.findByIdAndUpdate(user_id, update, { new: true })
			.catch((error) => {
				return next(new AppError(error.message, 400, error));
			});
		return updated;
	}
}

export default userDatabaseModel;
