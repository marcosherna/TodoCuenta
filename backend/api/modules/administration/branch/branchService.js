import BadRequest from "../../../errors/badRequest.js";
import NotFound from "../../../errors/notFound.js";

export default function branchService(branchRepository) {
  const service = {};

  service.create = async (branchData) => {
    const { name, location } = branchData;

    const isExist = await branchRepository.isExistByName(name);
    if (isExist) throw new BadRequest("Branch already exists with this name");

    return branchRepository.create({ name, location });
  };

  service.getAll = async (page, limit) => {
    return await branchRepository.paginate(page, limit);
  };

  service.getById = async (id) => {
    const branch = await branchRepository.findOne({ where: { id } });
    if (!branch) throw new NotFound("Branch not found with this ID");
    return branch;
  };

  service.update = async (id, branchData) => {
    const { id: branchId, name, location } = branchData;

    if (!branchId) throw new BadRequest("Branch ID is required for update");


    if (branchId && branchId != id)
      throw new BadRequest(
        "Branch ID in data does not match the ID in the URL"
      );

    const isExist = await branchRepository.isExistById(id); 
    if (!isExist) throw new NotFound("Branch not found with this ID");

    if (name) {
      const isNameExist = await branchRepository.isExistByName(name);
      if (isNameExist) throw new BadRequest("Branch already exists with this name");
    }

    return await branchRepository.updateBranch(id, { name, location });
  };

  service.delete = async (id) => {
    const isExist = await branchRepository.isExistById(id);

    if (!isExist) throw new NotFound("Branch not found with this ID");

    return branchRepository.destroy({ where: { id } });
  };

  return service;
}
