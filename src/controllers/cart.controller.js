import cartModel from '../models/cartModel.js';
import productModel from '../models/productModel.js';
import ticketModel from '../models/ticketModel.js'; 
import { v4 as uuidv4 } from 'uuid'; 

export const createCart = async (req, res) => {
  try {
    const newCart = await cartModel.create({ products: [] });
    res.status(201).json({ cartId: newCart._id });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid).populate('products.product');
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const product = await productModel.findById(pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    const existing = cart.products.find(p => p.product.toString() === pid);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.status(200).json({ message: 'Producto agregado al carrito', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    res.status(200).json({ message: 'Producto eliminado del carrito', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
};

export const updateCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = products;
    await cart.save();
    res.status(200).json({ message: 'Carrito actualizado', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const productInCart = cart.products.find(p => p.product.toString() === pid);
    if (!productInCart) return res.status(404).json({ error: 'Producto no está en el carrito' });

    productInCart.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: 'Cantidad actualizada', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar cantidad' });
  }
};

// Vaciar el carrito
export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = [];
    await cart.save();
    res.status(200).json({ message: 'Carrito vaciado', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error al vaciar el carrito' });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid).populate('products.product');
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    let total = 0;
    const purchased = [];

    for (const item of cart.products) {
      const product = item.product;
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await product.save();
        total += product.price * item.quantity;
        purchased.push(item.product._id.toString());
      }
    }

    cart.products = cart.products.filter(p => !purchased.includes(p.product.toString()));
    await cart.save();

    const ticket = await ticketModel.create({
      code: uuidv4(),
      amount: total,
      purchaser: req.user.email,
      purchase_datetime: new Date()
    });

    res.status(200).json({ message: 'Compra realizada', ticket });
} catch (err) {
  console.error('🧨 Error al finalizar la compra:', err);
  res.status(500).json({ error: 'Error al finalizar la compra' });
}

};
