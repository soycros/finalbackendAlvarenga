import cartModel from '../models/cartModel.js';

export const createCart = async (req, res) => {
  try {
    const newCart = await cartModel.create({ products: [] });
    res.status(201).json({ cartId: newCart._id });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
};
