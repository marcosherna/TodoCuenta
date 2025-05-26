export default function (entities) {
  const { Rol } = entities;
  const repository = Rol;

  repository.isExistById = async (id) => {
    const rol = await repository.findOne({ where: { id } });
    return rol !== null && rol !== undefined;
  };

  return repository;
}
