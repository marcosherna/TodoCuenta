export default function autController(authService) {
  const controller = {};

  controller.signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.signIn(email, password);

    res.status(200).json(user);
  };

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
