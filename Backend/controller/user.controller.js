import Users from "../models/User.model.js";
import generateToken from "../db/GenerateToken.js";

const registeruser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(404).send("Please provide all fields");
    }

    const userExists = await Users.findOne({ email });

    if (userExists) {
        return res.status(400).send("User already exists");
    }
    
    
    const user = await Users.create({ username, email, password });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
            pickupline : user.pickupline,
            isPremium : false,
            nextMove : user.nextMove
        });
    } else {
        return res.status(400).send("Invalid user data");
    }
};


const authUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).send("Please provide all fields");
    }

    const userExists = await Users.findOne({ email });

    if (userExists && userExists.matchPassword(password)) {
        res.json({
            _id: userExists._id,
            username: userExists.username,
            email: userExists.email,
            token: generateToken(userExists._id),
            pickupline : userExists.pickupline,
            isPremium : userExists.ispremium,
            nextMove : userExists.nextMove
        });
    } else {
        return res.status(401).send("Invalid email or password");
    }
};
const pickupLine = async (req, res) => {
    const { id } = req.body;

    const user = await Users.findById(id);
    if (user.pickupline > 0) {
        user.pickupline -= 1;
        await user.save();
        res.status(200).send("Pickup line updated");
    } else {
        res.status(400).send("No pickup lines left");
    }
}

export { registeruser, authUser, pickupLine }
