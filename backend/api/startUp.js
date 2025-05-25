import dotenv from "dotenv";

dotenv.config();

export default async function startUp(server, database) {
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || "localhost"; 

  return new Promise((resolve, reject) => {
    database
      .authenticate()
      .then(() => {
        return database.sync(); 
      })
      .then(() => {
        console.log("Database connection has been established successfully."); 
        server.listen(PORT, HOST, () => {
          console.log(`Server is running on http://${HOST}:${PORT}`);
          resolve();
        });
      })
      .catch((error) => { 
        reject(error);
      });
  });
}
