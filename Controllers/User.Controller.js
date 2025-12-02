import User from "../Models/User.Model.js";

const CreateUser = async (req, res) => {
    try {
        const { email, password, UpdatedEmail } = req.body;

        const validation = [
            {
                condition: !email,
                message: "Email is required"
            },
            {
                condition: email && !/^\S+@\S+\.\S+$/.test(email),
                message: "Email is not valid"
            },
            {
                condition: !password,
                message: "Password is required"
            },
            {
                condition: typeof UpdatedEmail !== "boolean",
                message: "UpdatedEmail must be a boolean"
            }
        ];

        // Check for errors
        for (let v of validation) {
            if (v.condition) {
                return res.status(400).json({ success: false, message: v.message });
            }
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const user = new User({ email, password, UpdatedEmail });
        await user.save();
        // Continue logic...
        return res.status(200).json({ success: true, message: "User validated" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
};


export { CreateUser };