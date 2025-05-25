import Conflict from "../../errors/conflict.js"; 

export default function authService(userRepository, rolRepository) {
  const service = {};
 
  service.register = async (user) => {
    const { name, email, password, id_rol } = user;
    const existingUser = await userRepository.isExistByEmail(email);
    const existingRol = await rolRepository.isExistById(id_rol);

    if (existingUser) throw new Conflict("User already exists");
    if (!existingRol) throw new Conflict("Role does not exist"); 

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
