const express = require('express');
const app = express();
app.use(require('./routes/index'));
const config = require('./config/config');
const mongoose = require('mongoose');
const path = require('path');
app.use(express.static(path.resolve(__dirname, '../public')));


mongoose.connect(process.env.NODE_ENV, (err, res) => {
    if (err) throw err;
    console.log('DataBase connected');

});

app.listen(process.env.PORT, () => console.log(`running on port ${process.env.PORT}`));