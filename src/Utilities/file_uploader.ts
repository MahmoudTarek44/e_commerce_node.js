import { v4 as uuidv4 } from "uuid";
import { Request } from "express";
import multer from "multer";
import { AppError } from "./error_handler";

const options = (path: string) => {
	const storage = multer.diskStorage({
		destination: (
			request: Request,
			file: Express.Multer.File,
			callBack: Function
		) => {
			callBack(null, `Uploads/${path}/`);
		},
		filename: (
			request: Request,
			file: Express.Multer.File,
			callBack: Function
		) => {
			callBack(null, `${uuidv4()}_${file.originalname}`);
		},
	});
	return multer({ storage, fileFilter });
};

const fileFilter = (
	request: Request,
	file: Express.Multer.File,
	callBack: Function
) => {
	if (file.mimetype.startsWith("image")) callBack(null, true);
	else callBack( new AppError('The file should be an image type', 400) , false);
};

const uploadSingle = (field: string, path: string) => {
	return options(path).single(field);
};

const uploadMultiple = (
	fields: { name: string; maxCount: number }[],
	path: string
) => {
	return options(path).fields(fields);
};

export { uploadSingle, uploadMultiple };
