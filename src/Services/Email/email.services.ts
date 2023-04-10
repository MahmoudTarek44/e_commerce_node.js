import { verificationMessage } from "./verificationMessage.services";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const { SERVICE_EMAIL, SERVICE_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: SERVICE_EMAIL,
		pass: SERVICE_PASSWORD,
	},
});

export const sendEmail = async (email: string, token: string) => {
	await transporter.sendMail({
		from: `"Mahmoud Tarek 👻" <${SERVICE_EMAIL}>`,
		to: email,
		subject: "Hello from Node.js Exam no.1 ✔",
		html: verificationMessage(token),
	});
};
