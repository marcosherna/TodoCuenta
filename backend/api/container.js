import { asFunction, createContainer, Lifetime } from "awilix";
import server from "./server.js";
import startUp from "./startUp.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const container = createContainer({
  injectionMode: "CLASSIC",
});

container.register({
  server: asFunction(server).singleton(),
  startUp: asFunction(startUp).singleton(),
});

const loadContainer = async () => {
  await container.loadModules([["routers/**/*.js"], ["modules/**/*.js"]], {
    esModules: true,
    cwd: __dirname,
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
    },
  });

  return container;
};

export default loadContainer;
