import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";


const registerUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body; 

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        req.body.name = `${firstName} ${lastName}`;

        const user = new User(req.body);

        await user.save();

        const token = generateToken(user);

        res.status(201).json({ message: 'User registered successfully' , success: true  , token , user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;   

        // Find user in database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        console.log("Login Password:", password);
        console.log("Stored Hashed Password:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate token
        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', token , success: true , user  });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




export { registerUser, loginUser };