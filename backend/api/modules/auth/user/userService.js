export default function userService(userRepository) {
  const service = {};

  service.getAll = async () => {
    const users = await userRepository.findAll();
    return users;
  };

  return service;
}
