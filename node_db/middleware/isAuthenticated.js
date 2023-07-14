import jwt from "jsonwebtoken";

const TOKEN_SECRET = "asdaasd2321dx12d1asd1121212sqs346sda";
//const TOKEN_SECRET = process.env.JWT_SECRET;

const isAuthenticated = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token === null) return res.status(401).json({ message: "Unauthorised" });

	jwt.verify(token, TOKEN_SECRET, (err, user) => {
		if (err) return res.status(401).json({ message: "Unauthorised" });
		req.user = user;
		next();
	});
};

export default isAuthenticated;
