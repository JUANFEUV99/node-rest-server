const usuario = require('./routes/usuario');
const config = require('./config/config');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err;
    console.log('DataBase connected');

});

usuario.app.listen(process.env.PORT, () => console.log(`running on port ${process.env.PORT}`));