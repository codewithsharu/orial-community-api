import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		httpOnly: true, // more secure
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
		sameSite: "lax", // Changed from strict to lax to allow cross-origin requests
		secure: process.env.NODE_ENV === "production", // Only use secure in production
	});

	return token;
};

export default generateTokenAndSetCookie;
