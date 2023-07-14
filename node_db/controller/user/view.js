import query from "../../db/index.js";

const view = async (req, res) => {
	const dbRes = await query(
		"SELECT email, username FROM users WHERE deleted_at IS NULL"
	);
	const serverRes = {
		message: "${dbRes.rowCount}",
		data: dbRes.rows,
	};
	res.status(200).json(serverRes);
};

export default view;
