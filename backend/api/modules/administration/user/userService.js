import Notfound from "../../../errors/notFound.js";
import Conflict from "../../../errors/conflict.js";
import { hashPassword } from "../../../libs/bcrypt.js";

export default function userService(userRepository) {
  const service = {};

  service.getAll = async () => {
    const users = await userRepository.findAll();
    return users;
  };

  service.create = async (userData) => {
    const { password } = userData;
    const existingUser = await userRepository.getByEmail(userData.email);

    if (existingUser) throw new Conflict("User with this email already exists");

    const hashedPassword = await hashPassword(password);
    const newUser = await userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return newUser;
  };

  service.update = async (id, userData) => {
    const user = await userRepository.findByPk(id);

    if (!user) throw new Notfound("User not found");
    if (id != userData.id) throw new Conflict("User ID mismatch");

    if(userData.password) {
      const hashedPassword = await hashPassword(userData.password);
      userData.password = hashedPassword;
    }

    const updatedUser = await userRepository.updateAndResponse(id, userData);

    return updatedUser;
  };

  service.delete = async (id) => {
    const user = await userRepository.findByPk(id);
    if (!user) throw new Notfound("User not found");

    await userRepository.destroy({ where: { id } });
  };

  return service;
}
