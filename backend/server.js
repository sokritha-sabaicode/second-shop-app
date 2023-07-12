import { config } from "./configs/index.js";
import app from "./app.js";
import connect from "./database/index.js";

const startServer = async function () {
  // Ensure that the database is initialized
  await connect();

  // Create a server instance
  app.listen(config.PORT, () => {
    console.log("Server is listening on port " + config.PORT);
  });
};

startServer().catch((e) => {
  console.error(e);
  process.exit(1);
});
