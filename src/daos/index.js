import ProductosDaoArchivo from './productos/ProductosDaoArchivo.js';
import CarritosDaoArchivo from './carritos/CarritosDaoArchivo.js';
import ProductosDaoFirebase from './productos/ProductosDaoFirebase.js';
import CarritosDaoFirebase from './carritos/CarritosDaoFirebase.js';
import ProductosDaoMongoDb from './productos/ProductosDaoMongoDb.js';
import CarritosDaoMongoDb from './carritos/CarritosDaoMongoDb.js';
import ProductosDaoMem from './productos/ProductosDaoMem.js';
import CarritosDaoMem from './carritos/CarritosDaoMem.js';
import dotenv from 'dotenv';
dotenv.config();

let productosDao;
let carritosDao;

switch (process.env.PERS || 'json') {
  case 'json':
    productosDao = new ProductosDaoArchivo();
    carritosDao = new CarritosDaoArchivo();
    break;
  case 'firebase':
    productosDao = new ProductosDaoFirebase();
    carritosDao = new CarritosDaoFirebase();
    break;
  case 'mongodb':
    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDb();
    break;
  case 'memoria':
    productosDao = new ProductosDaoMem();
    carritosDao = new CarritosDaoMem();
    break;
}

export { productosDao, carritosDao };