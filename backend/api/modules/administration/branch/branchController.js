import BadRequest from "../../../errors/badRequest.js";

export default function branchController(branchService) {
  const controller = {};

  controller.create = async (req, res) => {
    const branchData = req.body;
    const branch = await branchService.create(branchData);
    res.status(201).json(branch);
  };

  controller.getAll = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1
    ) {
      throw new BadRequest("Invalid page or limit parameters");
    }

    const {
      count,
      page: currentPage,
      limit: limitPage,
      rows,
    } = await branchService.getAll(pageNumber, limitNumber);

    const totalPages = Math.ceil(count / limitPage);

    res.status(200).json({
      data: rows,
      pagination: {
        totalItems: count,
        totalPages: totalPages,
        currentPage: currentPage,
        limit: limitPage,
      },
    });
  };

  controller.getById = async (req, res) => {
    const { id } = req.params;
    const branch = await branchService.getById(id);
    res.status(200).json(branch);
  };

  controller.update = async (req, res) => {
    const { id } = req.params;
    const branchData = req.body;
    const branch = await branchService.update(id, branchData);
    res.status(200).json(branch);
  };

  controller.delete = async (req, res) => {
    const { id } = req.params;
    await branchService.delete(id);
    res.status(204).send();
  };

  return controller;
}
