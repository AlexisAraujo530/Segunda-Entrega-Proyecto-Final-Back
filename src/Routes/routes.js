import express from "express";
const { Router } = express;
const router = Router();
import { productosDao as productosApi, carritosDao as carritosApi } from "../daos/index.js";
const admin = true;

// return a product by id
router.get("/api/productos/:id", (req, res) => {
  const {id} = req.params;
  const producto = productosApi.listar(id);
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({error: "Producto no encontrado"});
  }
});
// return all products
router.get("/api/productos", (req, res) => {
  const productos = productosApi.listarTodos();
  res.json(productos);
})

// add a new product
router.post("/api/productos", (req, res) => {
  res.send(admin ? productosApi.guardar(req.body) : {error: -1, description: 'método POST en ruta /productos solo disponible para administradores'});
});

// update a product
router.put("/api/productos/:id", (req, res) => {
  const {id} = req.params
  const body = req.body
  res.send(admin ? productosApi.actualizar(body) : {error: -2, description: 'método PUT en ruta /productos solo disponible para administradores'});
});

// delete a product
router.delete("/api/productos/:id", (req, res) => {
  res.send(admin ? productosApi.borrar(req.params.id) : {error: -3, description: 'método DELETE en ruta /productos solo disponible para administradores'});
})

// create a new cart and return the id
router.post("/api/carrito/", (req, res) => {
  const prods = req.body;
  res.send(carritosApi.guardar(prods));
})

// delete a cart by id
router.delete("/api/carrito/:id", (req, res) => {
  res.send(carritosApi.borrar(req.params.id));
})

// get all products of a cart by id
router.get("/api/carrito/:id/productos", (req, res) => {
  const {id} = req.params;
  const carrito = carritosApi.listar(id);
  if (carrito) {
    res.json(carrito);
  } else {
    res.status(404).json({error: "Carrito no encontrado"});
  }
})

// add a product to a cart by id
router.post("/api/carrito/:id/productos", (req, res) => {
  const {id} = req.params;
  const producto = productosApi.listar(req.body.id);
  if (producto && {id}) {
    res.send(carritosApi.listar(id).productos.push(producto));
  } else {
    res.status(404).json({error: "Producto o carrito no encontrado"});
  }
})

// delete a product from a cart by id
router.delete("/api/carrito/:id/productos/:id_prod", (req, res) => {
  const {id, id_prod} = req.params;
  res.send(carritosApi.listar(id).productos.splice(( id_prod - 1 ), 1));
})

export default router;