import cartModel from '../models/cartModel.js';
import productModel from '../models/productModel.js';
import ticketModel from '../models/ticketModel.js';
import { v4 as uuidv4 } from 'uuid';

export const purchaseCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await cartModel.findById(user.cart).populate('products.product');

    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ error: 'Carrito no encontrado o vacío' });
    }

    let total = 0;
    const productsPurchased = [];
    const productsFailed = [];

    for (const item of cart.products) {
      const product = item.product;
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await product.save();
        total += product.price * item.quantity;
        productsPurchased.push({
          product: product._id,
          quantity: item.quantity,
          price: product.price
        });
      } else {
        productsFailed.push({
          product: product._id,
          quantity: item.quantity,
          availableStock: product.stock
        });
      }
    }

    const ticket = await ticketModel.create({
      code: uuidv4(),
      amount: total,
      purchaser: user.email,
      products: productsPurchased // si tu modelo Ticket lo permite
    });

    cart.products = productsFailed.map(item => ({
      product: item.product,
      quantity: item.quantity
    }));
    await cart.save();

    res.status(200).json({
      message: 'Compra procesada exitosamente',
      ticket,
      productosComprados: productsPurchased,
      productosSinStock: productsFailed
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la compra', detalle: error.message });
  }
};
