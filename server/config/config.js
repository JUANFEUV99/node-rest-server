//puerto
process.env.PORT = process.env.PORT || 8000;

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//base de datos
let urldatabase;
if (process.env.NODE_ENV === 'dev') {
    urldatabase = 'mongodb://localhost:27017/cafe';
} else {
    urldatabase = process.env.MONGO_URI;
}
process.env.NODE_ENV = urldatabase;