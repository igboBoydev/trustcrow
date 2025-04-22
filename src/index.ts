import dotenv from "dotenv";
dotenv.config();
require("./database/sequelize");
import { Server } from "http";
import { PORT } from "./config";

import server from "./utils/server";
const http = new Server(server);

let API = http.listen(PORT || 2023, () => {
  console.log(`Server started on port ${PORT}`);
});

export { API, http };
