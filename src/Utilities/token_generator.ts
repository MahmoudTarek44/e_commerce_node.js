import jwt from "jsonwebtoken";

const VERIFICATION_SECRET = `${process.env.JWT_VERIFY_SECRET}`;
const SECRET = `${process.env.JWT_SECRET}`;

const generateUserToken = (user: any) => {
	const token = jwt.sign({ user }, SECRET);
	return token;
};

const userVerificationToken = (email: string) => {
	const token = jwt.sign({ email }, VERIFICATION_SECRET);
	return token;
};

export { generateUserToken, userVerificationToken };
