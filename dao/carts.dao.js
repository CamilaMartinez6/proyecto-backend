const Cart = require('./models/Cart');

class CartsDAO {
  create(data) { 
    return Cart.create(data); 
  }

  findById(id) { 
    return Cart.findById(id).populate('products.product'); 
  }

  update(id, data) { 
    return Cart.findByIdAndUpdate(id, data, { new: true }); 
  }

  delete(id) { 
    return Cart.findByIdAndDelete(id); 
  }
}

module.exports = new CartsDAO();
