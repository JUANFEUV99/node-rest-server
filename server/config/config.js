//puerto
process.env.PORT = process.env.PORT || 8000;

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//token
//60seg 60min 24h
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24;
//seed
process.env.SEED = process.env.SEED || 'secret';

//base de datos
let urldatabase;
if (process.env.NODE_ENV === 'dev') {
    urldatabase = 'mongodb://localhost:27017/cafe';
} else {
    urldatabase = process.env.MONGO_URI;
}
process.env.NODE_ENV = urldatabase;

//google-id
process.env.CLIENT_ID = process.env.CLIENT_ID || '1019641513262-mj5n18np8q3vo6qbvm74q1kiqid3rvsv.apps.googleusercontent.com';