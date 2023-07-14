import query from "../../db/index.js";

const listAll = async (req, res) => {
	const dbRes = await query(
		"SELECT email, username, lokasi, sex, result_spm, subjek, aboutme, phone FROM users WHERE isMurid IS NOT TRUE OR isMurid IS NULL ORDER BY created_at desc"
	);
	const serverRes = {
		message: "${dbRes.rowCount}",
		data: dbRes.rows,
	};
	res.status(200).json(serverRes);
};

export default listAll;
