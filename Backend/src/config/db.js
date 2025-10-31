import dotenv from "dotenv";
dotenv.config();

import mysql2 from "mysql2/promise";

let pool;
try {
  pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true,
  });
} catch (err) {
  console.log(`Error al crear el pool de conexiones ${err.message}`);
  throw err;
}

const checkConnection = async () => {
  try {
    const connect = await pool.getConnection();
    connect.release();
  } catch (err) {
    console.error(`Error al conectarse a la base de datos ${err.message}`);
    throw new Error("Fallo la conexion a la base de datos");
  }
};

export { pool, checkConnection };
