import { getAll, getById, update, del } from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getById(id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    // Solo el propio usuario puede editarse
    if (req.user.id !== id) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para editar esta cuenta" });
    }
    const user = await update(id, data);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Solo el propio usuario puede eliminar su cuenta
    if (req.user.id !== id) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar esta cuenta" });
    }
    const result = await del(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
