//5oAG51tpf2ThbOmO
//thaslimshaik800
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import equipmentRoutes from "./routes/equipment.route.js"
import delayRoutes from "./routes/delay.route.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use("/api/auth",authRoutes)
app.use("/api/equipment",equipmentRoutes)
app.use("/api/delay", delayRoutes);




app.listen(5000,()=>{
    console.log("server is listening at port number 5000");
    connectDB();
})