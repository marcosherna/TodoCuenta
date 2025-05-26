export default function userRepository(entities) {
  const { User, Rol } = entities;
  const repository = User;

  repository.isExistByEmail = async (email) => {
    const user = await repository.findOne({ where: { email } });
    return user !== null && user !== undefined;
  };

  repository.getByEmail = async (email) => {
    const user = await repository.findOne({
      where: { email },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Rol,
          as: "rol",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    return user;
  };

  return repository;
}
