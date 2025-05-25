export default function userRepository(user) {
  const repository = user;

  repository.isExistByEmail = async (email) => {
    const _user = await user.findOne({ where: { email } });
    return _user !== null && _user !== undefined;
  }

  repository.getByEmail = async (email) => {
    const _user = await user.findOne({ where: { email } });
    return _user;
  };

  return repository;
}
