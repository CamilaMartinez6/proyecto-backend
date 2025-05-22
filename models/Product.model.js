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
  code: {
    type: String,
    unique: true,
  },
  stock: Number,
  thumbnails: [String]
})

productSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model('Product', productSchema)
module.exports = ProductModel 