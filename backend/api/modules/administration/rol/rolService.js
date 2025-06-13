export default function rolService(rolRepository) {
  const service = {};

  service.getAll = async () => {
    const roles = await rolRepository.findAll();
    return roles;
  };

  return service;
}
