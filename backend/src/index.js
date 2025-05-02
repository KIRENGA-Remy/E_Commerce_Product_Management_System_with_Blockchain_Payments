import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("HERE WE GO");
})
app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})