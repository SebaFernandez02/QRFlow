import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      nombre: req.body.nombre,
      categoria: req.body.categoria,
      precio: req.body.precio,
      cantidad: req.body.cantidad,
      stockMin: req.body.stockMin,
      precioMax: req.body.precioMax,
      proveedor: req.body.proveedor,
    };
    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        stockMin: req.body.stockMin,
        precioMax: req.body.precioMax,
        proveedor: req.body.proveedor,
      },
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

//Ruta para agregar stock de un producto segun el ID
router.patch("/add-stock/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const cantidad = req.body.cantidad;

    const collection = await db.collection("records");
    const producto = await collection.findOne(query);

    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    const stockActualizado = parseInt(producto.cantidad) + parseInt(cantidad);

    await collection.updateOne(query, { $set: { cantidad: stockActualizado } });

    res.status(200).send({
      message: "Stock agregado correctamente",
      stock: stockActualizado,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error agregando el stock");
  }
});

//Ruta para reducir el stock de un producto segun el ID
router.patch("/remove-stock/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const cantidad = req.body.cantidad;

    const collection = await db.collection("records");
    const producto = await collection.findOne(query);

    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    const stockActualizado = parseInt(producto.cantidad) - parseInt(cantidad);

    if (stockActualizado < 0) {
      return res.status(400).send("El Stock no puede ser negativo");
    }

    await collection.updateOne(query, { $set: { cantidad: stockActualizado } });

    /*
    if(stockActualizado <= producto.puntoDeReorden){
      //Llamar a api de proovedor, etc
    }
    */

    res.status(200).send({
      stock: stockActualizado,
      puntoReorden: producto.stockMin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reduciendo el stock");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("records");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
