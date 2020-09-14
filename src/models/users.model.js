import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
    username: { type: String, trim: true, unique: true },
    email: { type: String, trim: true, unique: true },
    password: { type: String }
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export default model('user', UserSchema);