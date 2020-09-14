import UserModel from '../models/users.model'
import jwt from 'jsonwebtoken'

import config from '../libs/config'

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const usernameExist = await UserModel.findOne({ username });
        if(usernameExist) return res.status(401).json({ mesasge: "Username already exist" });

        const emailExist = await UserModel.findOne({ email });
        if(emailExist) return res.status(401).json({ mesasge: "Email already exist" });

        const newUser = new UserModel({
            username,
            email
        });

        newUser.password = await newUser.encryptPassword(password);

        const user = await newUser.save();

        //JWT
        const token = jwt.sign({ id: user._id }, config.SECRET, {
            expiresIn: 86400
        });

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if(!user) return res.status(404).json({ mesasge: "User not exist" });        

        const compare = await user.comparePassword(password);
        if(!compare) return res.status(404).json({ message: "Incorrect password" });

        //JWT
        const token = jwt.sign({ id: user._id }, config.SECRET, {
            expiresIn: 86400
        });

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}