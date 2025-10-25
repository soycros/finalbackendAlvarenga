import mongoose from 'mongoose';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: String,
  thumbnails: [String]
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
