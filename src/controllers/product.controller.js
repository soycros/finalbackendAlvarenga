export const getProducts = (req, res) => {
  res.status(200).json({ message: 'Listado de productos (simulado)' });
};

export const getProductById = (req, res) => {
  const { pid } = req.params;
  res.status(200).json({ message: `Detalle del producto ${pid} (simulado)` });
};

export const createProduct = (req, res) => {
  const product = req.body;
  res.status(201).json({ message: 'Producto creado (simulado)', product });
};

export const updateProduct = (req, res) => {
  const { pid } = req.params;
  const updates = req.body;
  res.status(200).json({ message: `Producto ${pid} actualizado (simulado)`, updates });
};

export const deleteProduct = (req, res) => {
  const { pid } = req.params;
  res.status(200).json({ message: `Producto ${pid} eliminado (simulado)` });
};
