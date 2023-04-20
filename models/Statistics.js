import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema({
  stats: {},
  player: {},
});

export default mongoose.model("Statistics", statisticsSchema);
