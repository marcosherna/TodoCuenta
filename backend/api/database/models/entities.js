import { glob } from "glob";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

export default async function setupEntities(database) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const models = {};
  const modelFiles = await glob.sync("**/*.js", {
    cwd: __dirname,
    ignore: ["entities.js"],
  });

  for (const file of modelFiles) {
    const fullPath = path.join(__dirname, file);

    const moduleUrl = pathToFileURL(fullPath).href;

    const modelFactory = (await import(moduleUrl)).default;
    const model = modelFactory(database);
    models[model.name] = model;
  }

  Object.values(models).forEach((model) => {
    if (typeof model.associate === "function") {
      model.associate(models);
    }
  });

  return models;
}
