import ProductModel from '../models/prducts.model'

export const getProducts = async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
}

export const getProduct = async (req, res) => {
    const { id } = req.params;

    const product = await ProductModel.findOne({_id: id});
    res.json(product);
}

export const createProduct = async (req, res) => {
    const { name, description, price, imageURL } = req.body;

    const newProduct = new ProductModel({
        name,
        description, 
        price,
        imageURL
    });

    await newProduct.save();
    
    res.json(newProduct);
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = await ProductModel.findByIdAndUpdate(id, req.body, {
        new: true
    });

    res.json(product);

}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const product = await ProductModel.findByIdAndRemove(id);

    res.json(product);
}