const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./Router/index');

const app = express();

const port = 8989;
const hostname = 'localhost';
// const localDBUrl = 'mongodb://127.0.0.1:27017/zomato_21';
const atlasDBUrl = 'mongodb+srv://zomato_DB:digitalzomato@cluster0.gztze.mongodb.net/zomato_DB?retryWrites=true&w=majority';

// CORS - Cross Origin Resource Sharing 

app.use(cors());
app.use(express.json());
app.use('/api', router);

mongoose.connect(atlasDBUrl, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(res => {
        app.listen(port, hostname, () => {
            console.log(`Server is running at ${hostname}:${port}`)
        });
    })
    .catch(err => console.log(err));

