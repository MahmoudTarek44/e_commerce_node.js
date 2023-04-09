import { v4 as uuidv4 } from "uuid";
import { Request } from "express";
import multer from "multer";

const fileUpload = (field: string, path: string) => {
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
	const upload = multer({ storage, fileFilter });
	return upload.single(field);
};

const fileFilter = (
	request: Request,
	file: Express.Multer.File,
	callBack: Function
) => {
	if (file.mimetype.startsWith("image")) callBack(null, true);
	else callBack(null, false);
};

export default fileUpload;
