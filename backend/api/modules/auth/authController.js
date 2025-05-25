export default function autController(authService) {
  const controller = {};

  controller.register = async (req, res) => {
    const { name, email, password, id_rol } = req.body;
    const newUser = await authService.register({
      name,
      email,
      password,
      id_rol,
    });

    res.status(201).json(newUser);
  };

  return controller;
}
