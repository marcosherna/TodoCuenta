export default function authService(userRepository, rolRepository) {
  const service = {};

  service.getAllUsers = async () => {
    try {
      return [];
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  };

  service.register = async (user) => {
    const { name, email, password, id_rol } = user;
    const existingUser = await userRepository.isExistByEmail(email);
    const existingRol = await rolRepository.isExistById(id_rol);

    if (existingUser) throw new Error("User already exists");
    if (!existingRol) throw new Error("Role does not exist"); 

    const newUser = await userRepository.create({
      name,
      email,
      password,
      id_rol,
    });
    return newUser;
  };

  return service;
}
