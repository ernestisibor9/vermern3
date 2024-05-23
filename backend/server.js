const express = require('express');
const app = express();
// const dbConfig = require('./config/dbConfig')
const dbConnect = require('./config/dbConnect');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userRoute = require('./route/user/userRoute');
const adminRoute = require('./route/admin/adminRoute');
const movieRoute = require('./route/movie/movieRoute');
const bookingRoute = require('./route/booking/bookingRoute');
// const productRoute = require('./route/product/productRoute');
dotenv.config()

app.use(express.json());
app.use(cors({origin:true, credentials:true}));
// app.use(cookieParser());

dbConnect()

// Prefix
app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)
app.use('/api/movie', movieRoute)
app.use('/api/booking', bookingRoute)

// route
app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});