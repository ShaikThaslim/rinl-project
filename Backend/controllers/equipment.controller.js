import Equipment from "../models/equipment.model.js";

export const uploadEquipmentData = async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ message: "Expected an array of equipment records." });
    }

    const result = await Equipment.insertMany(data);
    res.status(201).json({
      message: "Equipment data uploaded successfully",
      insertedCount: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error uploading equipment data:", error);
    res.status(500).json({ message: "Server error" });
  }
};
