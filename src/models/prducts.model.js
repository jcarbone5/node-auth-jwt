import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    price: { type: Number },
    imageURL: { type: String }
});

export default model('product', ProductSchema);