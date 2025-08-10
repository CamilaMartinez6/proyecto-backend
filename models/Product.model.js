const mongoose = require('mongoose')
const mongoosePaginate = require ('mongoose-paginate-v2')

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  status: {
    type: Boolean,
    default: true,
  },
  id: {
    type: Number,
    unique: true,
  },
  stock: Number,
})

productSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model('Product', productSchema)
module.exports = ProductModel 