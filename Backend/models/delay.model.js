// backend/models/delay.model.js
import mongoose from "mongoose";

const delaySchema = new mongoose.Schema({
  shop_desc: { type: String, required: true },
  eqpt_desc: { type: String, required: true },
  sub_eqpt_desc: { type: String },
  delay_from: { type: Date, required: true },
  delay_upto: { type: Date, required: true },
  delay_desc: { type: String, required: true },
}, { timestamps: true });

const Delay = mongoose.model("Delay", delaySchema);

export default Delay;
