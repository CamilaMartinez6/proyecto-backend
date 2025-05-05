const socket = io()

const productList = document.getElementById('product-list')
const addForm = document.getElementById('add-form')
const deleteForm = document.getElementById('delete-form')

socket.on('updateProducts', products => {
  productList.innerHTML = ''
  products.forEach(prod => {
    const li = document.createElement('li')
    li.innerText = `${prod.id} | ${prod.title} - $${prod.price}`
    productList.appendChild(li)
  })
})

addForm.addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(addForm)
  const newProduct = Object.fromEntries(formData)
  newProduct.price = parseFloat(newProduct.price)
  socket.emit('addProduct', newProduct)
  addForm.reset()
})

deleteForm.addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(deleteForm)
  const id = formData.get('id')
  socket.emit('deleteProduct', id)
  deleteForm.reset()
})