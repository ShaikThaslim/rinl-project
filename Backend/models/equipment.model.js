// backend/models/Equipment.js
import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  shop_code: String,
  shop_desc: String,
  eqpt_code: String,
  sub_eqpt_code: String,
},{timestamps:true});

const Equipment=mongoose.model("Equipment", equipmentSchema);
export default Equipment;
