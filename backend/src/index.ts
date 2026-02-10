import { SequelizeConfig } from "./db.config";
import "./models/tasks";
import "./models/stages";
import express from "express";
import tasksRoutes from "./routes/tasksRoutes";
import stagesRoutes from "./routes/stagesRoutes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use("/api", tasksRoutes);
app.use("/api", stagesRoutes);

export async function initializeDatabase() {
  try {
    await SequelizeConfig.authenticate();
    console.log("Database connection has been established successfully.");
    await SequelizeConfig.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();