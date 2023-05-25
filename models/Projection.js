import mongoose from "mongoose";

const projectionSchema = new mongoose.Schema({}, { strict: false });

const Projection = mongoose.model("Projection", projectionSchema);
export default Projection;
