const express = require('express')

const morgan = require('morgan')
const microCors = require("micro-cors");
const bodyParse = require('body-parser')

const connectDB = require('./Config/db')


const { readdirSync } = require('fs')
// const productRouters = require('./Routes/product')
// const authRouters = require('./Routes/auth')


const app = express();
const cors = microCors({ orgin: "https://jarmoo-portfolio-alpha.vercel.app" });
connectDB()

app.use((req, res, next) => {
    cors(req, res);

    if (req.method === "OPTIONS") {
        return res.status(200).send("ok");
    }

    next();
});

app.use(morgan('dev'))
app.use(cors())
app.options("*", cors);
app.use(express.json());
app.use(bodyParse.json({ limit: '10mb' }))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Route 1
// app.get('/product', (req, res) => {
//     res.send('Hello Endpoint 555')
// })

// Route 2
// app.use('/api', productRouters)
// app.use('/api', authRouters)

// Route 3
readdirSync('./Routes')
    .map((r) => app.use('/api', require('./Routes/' + r)))


app.listen(5000, () => console.log('Server is Running 5000'))