import app from "./app.js";
const PORT = 8080;

app.listen(PORT, () => {
	console.log(`Server run on port 8080`);
});
//${process.env.DB_HOST} ${process.env.DB_USER} ${process.env.DB_DATABASE} ${process.env.DB_PASSWORD}
