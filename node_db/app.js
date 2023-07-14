import express from "express";
import cors from "cors";
import query from "./db/index.js";
import register from "./controller/auth/register.js";
import login from "./controller/auth/login.js";
import logout from "./controller/auth/logout.js";
import view from "./controller/user/view.js";
import listAll from "./controller/user/listAll.js";
import { check } from "express-validator";
import validatorResponse from "./middleware/validatorResponse.js";
import isAuthenticated from "./middleware/isAuthenticated.js";
import isAdmin from "./middleware/isAdmin.js";
import checkStatus from "./controller/health/checkStatus.js";
import registerstudent from "./controller/auth/registerstudent.js";

//const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

// public routes
app.get("/", checkStatus);
app.get("/public", (req, res) =>
	res.status(200).json({ message: "Public route" })
);
// private routes
app.get("/private", isAuthenticated, (req, res) =>
	res.status(200).json({ message: "Private route", user: req.user })
);

//check if user is admin route
app.get("/admin", isAuthenticated, isAdmin, (req, res) =>
	res.status(200).json({ message: "Admin route", user: req.user })
);

//route to check server status
app.get("/", (req, res) => {
	res.status(200).json({ status: "okkk" });
});

//list all users
app.get("/api/users", listAll);
//select non deleted users
app.get("/api/active", view);
//register
app.post(
	"/api/register",
	check("email").notEmpty().bail().isEmail().bail(),
	check("username").notEmpty().bail().isLength({ min: 4 }).bail(),
	check("password").notEmpty().bail().isLength({ min: 4 }).bail(),
	check("password_confirmation").notEmpty().bail().isLength({ min: 4 }).bail(),
	check("lokasi").notEmpty().bail(),
	check("phone").notEmpty().bail().isLength({ min: 4 }).bail(),
	check("result_spm").notEmpty().bail(),
	check("sex").notEmpty().bail(),
	check("subjek").notEmpty().bail(),
	check("aboutme").notEmpty().bail(),
	//validatorResponse,
	register
);
//registerStudent
app.post(
	"/api/registerstudent",
	check("email").notEmpty().bail().isEmail().bail(),
	check("username").notEmpty().bail().isLength({ min: 4 }).bail(),
	check("password").notEmpty().bail().isLength({ min: 4 }).bail(),
	check("password_confirmation").notEmpty().bail().isLength({ min: 4 }).bail(),
	check("phone").notEmpty().bail().isLength({ min: 4 }).bail(),
	//validatorResponse,
	registerstudent
);
//login
app.post(
	"/api/login",
	check("identifier").notEmpty().bail(),
	check("password").notEmpty().bail().isLength({ min: 4 }).bail(),
	validatorResponse,
	login
);
//logout
app.put("/api/logout", isAuthenticated, logout);

// app.get("/api/users/:username", async (req, res) => {
// 	const username = req.params.username;
// 	const dbRes = await query("SELECT * FROM users WHERE username=1$", [
// 		username,
// 	]);
// 	if (dbRes.rows.length === 0) {
// 		const notFoundRes = {
// 			message: "No users found!",
// 		};

// 		res.status(404).json(notFoundRes);
// 	}
// 	const succesRes = {
// 		message: "${dbRes.rowCount} users are found",
// 		data: dbRes.rows,
// 	};
// });

// //search by username
//app.get("/api/users/:username", isAuthenticated, async (req, res) => {
app.get("/api/users/:username", async (req, res) => {
	const username = req.params.username;
	const dbRes = await query("SELECT * FROM users WHERE username=$1", [
		username,
	]);

	if (dbRes.rows.length === 0) {
		const notFoundRes = {
			message: "No users found!",
		};
		res.status(404).json(notFoundRes);
	}

	const serverRes = {
		message: "User has been found!!",
		data: dbRes.rows,
	};
	res.status(200).json({ serverRes });
});

export default app;
