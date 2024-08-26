import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

//Esta sección le ayudará a obtener una lista de todos los registros.
router.get("/", async (req, res) => {
    let collection = await db.collection("productos");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  });

//Esta sección le ayudará a obtener un registro único por id.
router.get("/:id", async (req, res) => {
    let collection = await db.collection("productos");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

//Esta sección le ayudará a crear un nuevo registro.
router.post("/", async (req, res) => {
    try {
      let newDocument = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      };
      let collection = await db.collection("productos");
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al agregar producto");
    }
  });

//Esta sección le ayudará a actualizar un registro por id.
router.patch("/:id", async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      const updates = {
        $set: {
          name: req.body.name,
          position: req.body.position,
          level: req.body.level,
        },
      };
  
      let collection = await db.collection("productos");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al actualizar el producto");
    }
  });

//Esta sección le ayudará a eliminar un producto.
router.delete("/:id", async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
  
      const collection = db.collection("productos");
      let result = await collection.deleteOne(query);
  
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al eliminar producto");
    }
  });
  
  export default router;