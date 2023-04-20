import mongoose from "mongoose";

const projectionsSchema = new mongoose.Schema({
  stats: {},
  player: {},
});

export default mongoose.model("Projections", projectionsSchema);
