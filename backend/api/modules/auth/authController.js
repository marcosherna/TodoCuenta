import { hashPassword } from "../../libs/bcrypt.js";

export default function autController(authService) {
  const controller = {};

  controller.register = async (req, res) => {
    const { name, email, password, id_rol } = req.body;

    const hashedPassword = await hashPassword(password);
    const newUser = await authService.register({
      name,
      email,
      password: hashedPassword,
      id_rol,
    });

    res.status(201).json(newUser);
  };

  return controller;
}
