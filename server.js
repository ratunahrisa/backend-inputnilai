const express = require ('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./app/routes/user.route');
const authRoutes = require('./app/routes/auth.route');
const matkulRoutes = require('./app/routes/matkul.route');

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
const {NODE_ENV} = process.env;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

app.get('/', (_req, res) => {
    res.send('Welcome to my API')
})

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/matkul", matkulRoutes);



module.exports = app.listen(port, () => {
    process.stdout.write(`Active Port: ${port} \n `);
    process.stdout.write(`Environment: ${NODE_ENV} \n`);
})

app.listen(8080, () => {
    console.log(`Server running on port ${port}`);
});