import { User } from "../models/user.model.js";

export const getAll = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] },
  });
};

export const getById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
};

export const update = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("Usuario no encontrado");

  await user.update(data);
  return await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
};

export const del = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("Usuario no encontrado");

  await user.destroy();
  return { message: "Cuenta eliminada correctamente" };
};
