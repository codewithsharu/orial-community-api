import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		httpOnly: true, // more secure
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Set to 'none' for cross-site in production
		secure: process.env.NODE_ENV === "production", // Always true in production to work with SameSite=None
		domain: process.env.NODE_ENV === "production" ? "orial-community-api.onrender.com" : undefined, // Explicitly set domain for production
	});

	return token;
};

export default generateTokenAndSetCookie;
