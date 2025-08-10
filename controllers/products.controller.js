const ProductModel = require('../models/Product.model.js')

const getProducts = async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query

  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
  }

  const filter = query ? {
    $or: [
      { category: query },
      { status: query === 'true' }
    ]
  } : {}

  const result = await ProductModel.paginate(filter, options)

  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`

  res.json({
    status: 'success',
    payload: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null,
    nextLink: result.hasNextPage ? `${baseUrl}?page=${result.nextPage}` : null
  })
}

module.exports = {
  getProducts
}