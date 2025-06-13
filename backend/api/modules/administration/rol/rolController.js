export default function rolController(rolService) {
  const controller = {};

  controller.getAll = async (req, res) => {
    const roles = await rolService.getAll();
    res.status(200).json(roles);
  };

  return controller;
}
