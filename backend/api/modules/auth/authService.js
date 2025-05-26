import Conflict from "../../errors/conflict.js";
import NotFound from "../../errors/notFound.js";
import Unauthorized from "../../errors/unauthorized.js"; 
import { hashPassword, comparePasswords } from "../../libs/bcrypt.js";

export default function authService(userRepository, rolRepository) {
  const service = {};

  service.signIn = async (email, password) => {
    const user = await userRepository.getByEmail(email);
    if (!user) throw new NotFound("User not found");

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) throw new Unauthorized("Invalid password");

    return user;
  };

  service.register = async (user) => {
    const { name, email, password, id_rol } = user;
    const existingUser = await userRepository.isExistByEmail(email);
    const existingRol = await rolRepository.isExistById(id_rol);

    if (existingUser) throw new Conflict("User already exists");
    if (!existingRol) throw new Conflict("Role does not exist");

    const hashedPassword = await hashPassword(password);

    const newUser = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      id_rol,
    });
    return newUser;
  };

  return service;
}
