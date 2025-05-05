const viewsRouter = require('./routes/views.router.js')

const express = require('express')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
const exphbs = require('express-handlebars')

const productsManager = require('./productsManager.js')
const cartManager = require('./cartManager.js')

const app = express()
const httpServer = app.listen(8080, () => console.log ("funcionando en 8080"))
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const products = productsManager.getProducts()
    res.render('index', { products })
})

app.get('/realtimeproducts', (req, res) => {
    const products = productsManager.getProducts()
    res.render('realTimeProducts', { products })
})

app.use('/', viewsRouter);

io.on('connection', socket => {
    console.log('conectado')

    socket.emit('updateProducts', productsManager.getProducts());

    socket.on('addProduct', product => {
        productsManager.addProduct(product)
        io.emit('updateProducts', productsManager.getProducts())
    })

    socket.on('deleteProduct', productId => {
        productsManager.deleteProduct(productId)
        io.emit('updateProducts', productsManager.getProducts())
    })
})

