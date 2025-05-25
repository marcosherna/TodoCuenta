export default function userController(userService) {
  const controller = {};

  controller.getAll = async (req, res) => {
    const users = await userService.getAll();
    res.status(200).json(users);
  };

  return controller;
}
