import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(() => {
  console.log(
    `Servidor corriendo en el puerto http://localhost:${server.address().port}`
  );
});
