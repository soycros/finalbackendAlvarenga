import cartModel from '../models/cartModel.js';
import productModel from '../models/productModel.js';
import ticketModel from '../models/ticketModel.js';
import { v4 as uuidv4 } from 'uuid';

export const purchaseCart = async (req, res) => {
  const user = req.user;
  const cart = await cartModel.findById(user.cart).populate('products.product');

  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

  let total = 0;
  const productsPurchased = [];
  const productsFailed = [];

  for (const item of cart.products) {
    const product = item.product;
    if (product.stock >= item.quantity) {
      product.stock -= item.quantity;
      await product.save();
      total += product.price * item.quantity;
      productsPurchased.push(item);
    } else {
      productsFailed.push(item);
    }
  }

  const ticket = await ticketModel.create({
    code: uuidv4(),
    amount: total,
    purchaser: user.email
  });

  cart.products = productsFailed;
  await cart.save();

  res.json({
    message: 'Compra procesada',
    ticket,
    productosSinStock: productsFailed
  });
};
