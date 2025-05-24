import loadContainer from "./api/container.js";

( async () => {
    await loadContainer()
    .then((container) => container.resolve("startUp"))
    .catch((error) => {
        console.error("Error loading container:", error);
        process.exit(1);
    });
})()

