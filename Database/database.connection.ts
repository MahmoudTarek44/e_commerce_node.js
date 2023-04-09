import mongoose from "mongoose";

const DBConnection = () => {
	mongoose.set("strictQuery", true);
	mongoose
		.connect(process.env.DATABASE_CONNECTION!) 
		.then((connection) =>
			console.log(`Database connected to IP: ${connection.connections[0].host}`)
		)
		.catch((error) => {
			throw new Error(`Database connection errors: ${error}`);
		});
};
export default DBConnection;
