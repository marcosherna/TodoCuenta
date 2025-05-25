import { asFunction, asValue, createContainer, Lifetime } from "awilix";
import path from "path";
import { fileURLToPath } from "url";

import server from "./server.js";
import startUp from "./startUp.js";
import { sequelize } from "./database/connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const container = createContainer({
  injectionMode: "CLASSIC",
});

container.register({
  server: asFunction(server).singleton(),
  startUp: asFunction(startUp).singleton(),
  database: asValue(sequelize),
});

const loadContainer = async () => {
  await container.loadModules(
    [["routers/**/*.js"], ["modules/**/*.js"], ["database/models/**/*.js"], ["database/repositories/**/*.js"]],
    {
      esModules: true,
      cwd: __dirname,
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
      },
    }
  );

  return container;
};

export default loadContainer;
