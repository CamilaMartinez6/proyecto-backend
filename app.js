const viewsRouter = require('./routes/views.router.js')
const cartsRouter = require('./routes/carts.router.js')
const productsRouter = require('./routes/products.router.js')

const express = require('express')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
const exphbs = require('express-handlebars')

const productsManager = require('./productsManager.js')
const cartManager = require('./cartManager.js')
const { default: mongoose } = require('mongoose')

const app = express()
const httpServer = app.listen(8080, () => console.log ("funcionando en 8080"))
const io = new Server(httpServer)

mongoose.connect('mongodb+srv://camilamacarenamartinez6:GU5zX6GNDnEB12Tg@camicluster.in8pzsu.mongodb.net/')
 .then(()=> {
    console.log('bd conectada')
 })

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
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

io.on('connection', socket => {
    console.log('conectado')

    socket.emit('updateProducts', productsManager.getProducts())

    socket.on('addProduct', product => {
        productsManager.addProduct(product)
        io.emit('updateProducts', productsManager.getProducts())
    })

    socket.on('deleteProduct', productId => {
        productsManager.deleteProduct(productId)
        io.emit('updateProducts', productsManager.getProducts())
    })
})

