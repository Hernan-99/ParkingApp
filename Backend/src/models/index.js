import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false, // si lo pongo en true, puedo ver queries SQL en consola
  }
);

// funcion para probar la conexion y sincronizacion de modelos
export const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexion exitosa");

    // Solo sincroniza la definición de modelos, sin alterar las tablas
    await sequelize.sync({ alter: false });
    console.log("Modelos sincronizados correctamente");
  } catch (err) {
    console.log(`Error al sincronizar los modelos: ${err}`);
    throw err;
  }
};
