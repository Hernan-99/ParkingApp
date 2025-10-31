import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { syncModels } from "./src/models/index.js";
import { checkConnection } from "./src/config/db.js";
import routes from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// rutas
app.use("/api", routes);

const server = app.listen(PORT, async () => {
  try {
    await checkConnection(); // MySQL2 pool
    await syncModels(); // Sequelize modelos
    console.log(
      `Servidor corriendo en el puerto http://localhost:${
        server.address().port
      }`
    );
  } catch (err) {
    console.error(`No se pudo conectar a la base de datos, ${err}`);
    process.exit(1);
  }
});

// TEST CONEXION
// const server = app.listen(async () => {
//   try {
//     await syncModels();
//     console.log(`Servidor corriendo en http://localhost:${PORT}`);
//   } catch (err) {
//     console.error("No se pudo sincronizar los modelos:", err);
//   }
// });
