import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import projectionsRouter from "./routes/projections.js";
import statisticsRouter from "./routes/statistics.js";
import {
  fetchYearsAndWeeksStatisticsData,
  deleteStatisticsData,
} from "./data/statistics.js";
import { fetchYearsAndWeeksProjectionsData } from "./data/projections.js";

config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(morgan("common"));

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("Server on Port", PORT);
});

// Database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");

    // Delete data
    // deleteStatisticsData("2023", null);

    // Fetch and store data
    // fetchYearsAndWeeksProjectionsData(); // RUN PERIODICALLY
    // fetchYearsAndWeeksStatisticsData(); // RUN ONLY ONCE
  })
  .catch((error) => console.log(`${error} did not connect`));

// Routes
app.use("/projections", projectionsRouter);
app.use("/statistics", statisticsRouter);
