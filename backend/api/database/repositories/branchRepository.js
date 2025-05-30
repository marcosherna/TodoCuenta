export default function branchRepository(entities) {
  const { Branch } = entities;
  const repository = Branch;

  repository.isExistById = async (id) => {
    const branch = await repository.findOne({ where: { id } });
    return branch !== null && branch !== undefined;
  };

  repository.isExistByName = async (name) => {
    const branch = await repository.findOne({ where: { name } });
    return branch !== null && branch !== undefined;
  };

  repository.updateBranch = async (id, branchData) => {
    await repository.update(branchData, {
      where: { id },
    });

    return await repository.findOne({ where: { id } });
  };

  repository.paginate = async (page, limit) => {
    const offset = (page - 1) * limit;
    const { count, rows } = await repository.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    }); 

    return {
      count,
      page,
      limit, 
      rows,
    };
  };

  return repository;
}
