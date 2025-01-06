require("dotenv").config();
const bcrypt = require("bcrypt");
const Register = require("../Models/TraineeModel");

// Controller for logging in the user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the entered email matches the admin email
        if (email === process.env.ADMIN_EMAIL) {
            // Compare the entered password with the admin password
            const isAdminPasswordMatch = process.env.ADMIN_PASSWORD;
            if (!isAdminPasswordMatch) {
                return res.status(400).json({ message: "Invalid admin password" });
            }

            // Admin login successful
            return res.status(200).json({
                message: "Admin login successful",
                userID: "admin",
                role: "admin",
                name: "Administrator",
                email: process.env.ADMIN_EMAIL
            });
        }

        // Check if the user exists in the database
        const user = await Register.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the entered password with the user's hashed password
        const isUserPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isUserPasswordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // User login successful
        return res.status(200).json({
            message: "Login successful",
            userID: user.userID,
            role: "user",
            name: user.name,
            email: user.email
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.loginUser = loginUser;
