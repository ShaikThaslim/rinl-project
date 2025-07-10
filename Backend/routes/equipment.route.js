import express from "express";
import { uploadEquipmentData } from "../controllers/equipment.controller.js";
import Equipment from "../models/equipment.model.js";
const router = express.Router();


//for upload data using postman
router.post("/upload", uploadEquipmentData);




router.get("/shops", async (req, res) => {
    const shops = await Equipment.distinct("shop_desc");
    res.json(shops);
  });
router.get("/equipments/:shopDesc", async (req, res) => {
    const eqpts = await Equipment.find({ shop_desc: req.params.shopDesc }).distinct("eqpt_code");
    res.json(eqpts);
  });
router.get("/sub-equipments/:shopDesc/:eqptCode", async (req, res) => {
    const subs = await Equipment.find({
      shop_desc: req.params.shopDesc,
      eqpt_code: req.params.eqptCode
    }).distinct("sub_eqpt_code");
    res.json(subs);
  });
  export default router;