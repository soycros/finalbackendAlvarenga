import productModel from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = await productModel.create(req.body);
    res.status(201).json({
      message: 'Producto creado correctamente',
      product: newProduct
    });
  } catch (err) {
    console.error('Error al crear el producto:', err); // 👈 clave
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updated = await productModel.findByIdAndUpdate(pid, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json({ message: 'Producto actualizado', product: updated });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deleted = await productModel.findByIdAndDelete(pid);
    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json({ message: 'Producto eliminado', product: deleted });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
