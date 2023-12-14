import { app } from "./app";
import "dotenv/config";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("App finalizado");
});
