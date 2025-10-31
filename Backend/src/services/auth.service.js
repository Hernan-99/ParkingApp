import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

const SALT_ROUNDS = 10;

export const register = async ({ name, email, password, role = "USER" }) => {
  const existUser = await User.findOne({ where: { email } });

  if (existUser) throw new Error("Usuario ya registrado");

  const hashPass = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    name,
    email,
    password: hashPass,
    role,
  });
  return user;
};

export const login = async ({ email, password }) => {
  // buscar usuario
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado");

  // comparar contraseña
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Contraseña incorrecta");

  // generar token
  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  return { user, token };
};

// comprobar JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new Error("Token invalido o expirado");
  }
};
