export default function (rol) {
  const repository = rol;

  repository.isExistById = async (id) => {
    const _rol = await rol.findOne({ where: { id } });
    return _rol !== null && _rol !== undefined;
  };

  return repository;
}
