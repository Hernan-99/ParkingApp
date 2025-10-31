import { register, login } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await register({ name, email, password, role });

    // No devolvemos la contraseña
    const { password: _, ...userData } = user.toJSON();
    res.status(201).json({ message: "Usuario registrado", user: userData });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login({ email, password });

    const { password: _, ...userData } = user.toJSON();

    res.status(200).json({
      message: "Login exitoso",
      user: userData,
      token,
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
