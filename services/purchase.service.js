const ticketsRepo = require('../repositories/tickets.repository');
const cartsRepo = require('../repositories/carts.repository');
const productsRepo = require('../repositories/products.repository');

async function purchase(cartId, purchaserEmail) {
  const cart = await cartsRepo.getById(cartId);
  if (!cart) throw new Error('Carrito no encontrado');

  const purchased = [];
  const notPurchased = [];

  let total = 0;

  for (const item of cart.items) {
    const prod = await productsRepo.getById(item.product);
    if (!prod) { notPurchased.push(item); continue; }

    if (prod.stock >= item.quantity) {
      await productsRepo.decrementStock(prod._id, item.quantity);
      const subtotal = prod.price * item.quantity;
      total += subtotal;
      purchased.push({ product: prod._id, quantity: item.quantity, price: prod.price, subtotal });
    } else {
      notPurchased.push(item);
    }
  }

  let ticket = null;
  if (purchased.length > 0) {
    ticket = await ticketsRepo.create({
      code: `TCK-${Date.now()}`,
      amount: total,
      purchaser: purchaserEmail,
      items: purchased
    });
    await cartsRepo.replaceItems(cartId, notPurchased);
  }

  return { ticket, purchased, notPurchased, total };
}

module.exports = { purchase };
