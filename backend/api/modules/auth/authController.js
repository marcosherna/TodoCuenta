import { sign } from "../../libs/jwt.js"

export default function autController(authService) {
  const controller = {};

  controller.signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.signIn(email, password);

    const token = sign(user.get({ plain: true }))

    res.status(200).json({
      message: "Sign in successfully",
      token
    });
  };

  controller.register = async (req, res) => {
    const { name, email, password, id_rol } = req.body;

    const newUser = await authService.register({
      name,
      email,
      password,
      id_rol,
    });

    const token = sign(newUser.get({ plain: true }))

    res.status(201).json({
      message: "register successfully",
      token
    });
  };

  return controller;
}
