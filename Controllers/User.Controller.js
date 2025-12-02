import User from "../Models/User.Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * Create a new user account
 * {{baseUrl}}/User/CreateUser
 */
const CreateUser = async (req, res) => {
    try {
        const { email, password, UpdatedEmail } = req.body;

        // Validation
        const validation = [
            { condition: !email, message: "Email is required." },
            { condition: email && !/^\S+@\S+\.\S+$/.test(email), message: "Please provide a valid email address." },
            { condition: !password, message: "Password is required." },
            { condition: typeof UpdatedEmail !== "boolean", message: "UpdatedEmail must be a boolean value." }
        ];

        for (const v of validation) {
            if (v.condition) return res.status(400).json({ success: false, message: v.message });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ success: false, message: "User already exists with this email." });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({ email, password: hashedPassword, UpdatedEmail });
        await user.save();

        return res.status(201).json({ success: true, message: "Signup successful.", user });

    } catch (error) {
        console.error("CreateUser Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error while creating user.", error });
    }
};

/**
 * Login user and generate JWT token
 * {{baseUrl}}/User/Login
 */
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, message: "Invalid email or password." });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ success: false, message: "Invalid email or password." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: "1d" });

        return res.status(200).json({ success: true, message: "Login successful.", user, token });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error during login.", error });
    }
};

/**
 * Update user profile information
 * {{baseUrl}}/User/AddUserInfo
 */
const addUserInformation = async (req, res) => {
    try {
        const { Name, userName, phone, company, address, town, Region, country, postalCode, taxNumber, NotificationEmail, PendingOrderEmail, OOSEmail, UpdatedEmail } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        user.Name = Name ?? user.Name;
        user.userName = userName ?? user.userName;
        user.phone = phone ?? user.phone;
        user.company = company ?? user.company;
        user.address = address ?? user.address;
        user.town = town ?? user.town;
        user.Region = Region ?? user.Region;
        user.country = country ?? user.country;
        user.postalCode = postalCode ?? user.postalCode;
        user.taxNumber = taxNumber ?? user.taxNumber;
        user.NotificationEmail = NotificationEmail ?? user.NotificationEmail;
        user.PendingOrderEmail = PendingOrderEmail ?? user.PendingOrderEmail;
        user.OOSEmail = OOSEmail ?? user.OOSEmail;
        user.UpdatedEmail = UpdatedEmail ?? user.UpdatedEmail;

        await user.save();

        return res.status(200).json({ success: true, message: "User information updated successfully.", user });

    } catch (error) {
        console.error("addUserInformation Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error while updating user information.", error });
    }
};

/**
 * Get user profile details
 * {{baseUrl}}/User/getUserDetail
 */
const getUserDetail = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        return res.status(200).json({ success: true, message: "User details fetched successfully.", user });

    } catch (error) {
        console.error("getUserDetail Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error while fetching user details.", error });
    }
};

export { CreateUser, Login, addUserInformation, getUserDetail };
