import mongoose from "mongoose";

const statisticSchema = new mongoose.Schema({}, { strict: false });

const Statistic = mongoose.model("Statistic", statisticSchema);
export default Statistic;
