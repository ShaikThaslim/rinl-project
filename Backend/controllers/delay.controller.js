// backend/controllers/delay.controller.js
import Delay from "../models/delay.model.js";

export const createDelay = async (req, res) => {
  try {
    const { shop_desc, eqpt_desc, sub_eqpt_desc, delay_from, delay_upto, delay_desc } = req.body;

    if (!shop_desc || !eqpt_desc || !delay_from || !delay_upto || !delay_desc) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newDelay = new Delay({
      shop_desc,
      eqpt_desc,
      sub_eqpt_desc,
      delay_from,
      delay_upto,
      delay_desc,
    });

    await newDelay.save();
    res.status(201).json({ message: "Delay logged successfully." });
  } catch (error) {
    console.error("Error saving delay:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSuggestions=async (req, res) => {
  const { shop, equipment, subequipment } = req.params;

  try {
    const results = await Delay.aggregate([
      {
        $match: {
          shop_desc: shop,
          eqpt_desc: equipment,
          sub_eqpt_desc: subequipment,
          delay_desc: { $ne: "" }
        }
      },
      {
        $group: {
          _id: "$delay_desc",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }, // most frequent first
      { $limit: 10 }
    ]);

    res.json(results.map(item => ({
      value: item._id,
      label: item._id,
      count: item.count
    })));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
export const getShopData = async (req, res) => {
  const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
  const matchStage = startDate ? { delay_from: { $gte: startDate } } : {};

  const data = await Delay.aggregate([
    { $match: matchStage },
    { $group: { _id: "$shop_desc", count: { $sum: 1 } } }
  ]);

  res.json(data.map(d => ({ shop: d._id, count: d.count })));
};


export const getSelectedShopEquipData = async (req, res) => {
  const { shop } = req.params;
  const startDate = req.query.startDate ? new Date(req.query.startDate) : null;

  const matchStage = {
    shop_desc: shop,
  };
  if (startDate) {
    matchStage.delay_from = { $gte: startDate };
  }

  const data = await Delay.aggregate([
    { $match: matchStage },
    { $group: { _id: "$eqpt_desc", count: { $sum: 1 } } }
  ]);

  res.json(data.map(d => ({ equipment: d._id, count: d.count })));
};


export const getShopWiseDelayDuration = async (req, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    console.log("Requested startDate:", req.query.startDate);
    console.log("Parsed startDate:", startDate);

    const matchStage = startDate ? { delay_from: { $gte: startDate } } : {};

    const result = await Delay.aggregate([
      { $match: matchStage },
      {
        $project: {
          shop_desc: 1,
          delayDuration: {
            $divide: [
              { $subtract: ["$delay_upto", "$delay_from"] },
              1000 * 60 * 60, // duration in hours
            ],
          },
        },
      },
      {
        $group: {
          _id: "$shop_desc",
          totalDuration: { $sum: "$delayDuration" },
        },
      },
      {
        $project: {
          shop: "$_id",
          totalDuration: 1,
          _id: 0,
        },
      },
      { $sort: { totalDuration: -1 } },
    ]);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting shop delays" });
  }
};

export const getEquipmentWiseDelayDuration = async (req, res) => {
  try {
    const { shop } = req.params;
    const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    const matchStage = {
      shop_desc: shop,
    };
    if (startDate) {
      matchStage.delay_from = { $gte: startDate };
    }
    const result = await Delay.aggregate([
      { $match: matchStage },
      {
        $project: {
          eqpt_desc: 1,
          delayDuration: {
            $divide: [
              { $subtract: ["$delay_upto", "$delay_from"] },
              1000 * 60 * 60, // duration in hours
            ],
          },
        },
      },
      {
        $group: {
          _id: "$eqpt_desc",
          totalDuration: { $sum: "$delayDuration" },
        },
      },
      {
        $project: {
          equipment: "$_id",
          totalDuration: 1,
          _id: 0,
        },
      },
      { $sort: { totalDuration: -1 } },
    ]);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting equipment delays" });
  }
};
