import BadRequest from "../../../errors/badRequest.js";

export default function userController(userService) {
  const controller = {};

  controller.getAll = async (req, res) => {
    const users = await userService.getAll();
    res.status(200).json(users);
  };

  controller.create = async (req, res) => {
    const { email, password, name, id_rol } = req.body;
    const newUser = await userService.create({ email, password, name, id_rol });
    res.status(201).json(newUser);
  };

  controller.update = async (req, res) => {
    const { id } = req.params;
    const { id: idUser, email, password, name, id_rol } = req.body;

    if (!id) throw new BadRequest("User ID is required for update");
    if (!idUser)
      throw new BadRequest("At least one field must be provided for update");

    const updatedUser = await userService.update(id, {
      id: idUser,
      email,
      password,
      name,
      id_rol,
    });
    res.status(200).json(updatedUser);
  };

  controller.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) throw new BadRequest("User ID is required for deletion");

    await userService.delete(id);
    res.status(204).send();
  };

  return controller;
}
