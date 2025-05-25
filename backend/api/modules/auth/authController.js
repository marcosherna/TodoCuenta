export default function autController(authService) {
  const controller = {};

  controller.getAllUsers = async (req, res) => {
    try {
      const users = await authService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  controller.signIn = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (username === "admin" && password === "password") {
        return res.status(200).json({ message: "Authenticated successfully" });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  controller.signUp = async (req, res) => {
    try {
      const { username, password } = req.body;

      // Here you would typically save the user to a database
      // For this example, we will just return a success message
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  controller.register = async (req, res) => {
    try {
      const { name, email, password, id_rol } = req.body;
      const newUser = await authService.register({
        name,
        email,
        password,
        id_rol,
      });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  return controller;
}
