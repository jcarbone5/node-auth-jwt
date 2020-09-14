import jwt from 'jsonwebtoken';
import config from '../libs/config'
import UserModel from '../models/users.model';

export default async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token) return res.status(404).json({ message: 'Not token provider' })

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await UserModel.findById(req.userId);
    if(!user) return res.status(404).json({ message: 'User not found' })

    next();
}