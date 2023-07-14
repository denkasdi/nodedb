import query from "../../db/index.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
	try {
		const body = req.body;
		//hash password bcrypt
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(body.password, salt);
		const dbRes = await query(
			"INSERT INTO users (email, username, password, isAdmin, lokasi, phone, result_spm, sex, subjek, aboutme) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
			[
				body.email,
				body.username,
				hashedPassword,
				body.isAdmin,
				body.lokasi,
				body.phone,
				body.result_spm,
				body.sex,
				body.subjek,
				body.aboutme,
			]
		);
		// .then(
		// 	async () =>
		// 		await query("SELECT * FROM users WHERE username=$1", [body.username])
		// );

		const serverRes = {
			message: "A user created",
			log: req.password,
			hashedPassword,
		};
		res.status(200).json(serverRes);
	} catch (error) {
		const { name, table, constraint, detail } = error;
		const serverRes = {
			message: detail,
			error: { name, table, constraint },
		};
		console.log(error);
		res.status(500).json(serverRes);
	}
};

export default register;
