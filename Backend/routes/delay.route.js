// backend/routes/delay.routes.js
import express from "express";
import { createDelay, getEquipmentWiseDelayDuration, getSelectedShopEquipData, getShopData, getShopWiseDelayDuration, getSuggestions } from "../controllers/delay.controller.js";

const router = express.Router();

router.post("/create", createDelay);

router.get('/descriptions/:shop/:equipment/:subequipment', getSuggestions);
router.get("/shop-wise", getShopData);

router.get("/equipment-wise/:shop", getSelectedShopEquipData);
router.get("/shop-wise-duration",getShopWiseDelayDuration);
router.get("/equipment-wise-duration/:shop",getEquipmentWiseDelayDuration);
export default router;
