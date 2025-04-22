import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../config";

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  define: {
    freezeTableName: true,
  },
  logging: false, // Disable logging here
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to POSTGRES database has been established successfully"
    );
  })
  .catch((error: any) => {
    console.error("Unable to connect to POSTGRES database: ", error);
  });

const shutdown = async () => {
  console.log("Closing database connection...");
  await sequelize.close();
  console.log("Database connection closed.");
  process.exit(0);
};

// Listen for termination signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export { sequelize };
