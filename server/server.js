import express from "express";
import cors from "cors";
import records from "./routes/records.js";
import proveedor from "./routes/proveedor.js";
import correo from "./routes/email.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/records", records);
app.use("/proveedor", proveedor);
app.use("/email", correo);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
