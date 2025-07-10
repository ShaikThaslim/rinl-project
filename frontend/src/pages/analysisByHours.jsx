import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { axiosInstance } from "../lib/axios";

const AnalysisByHours = () => {
  const [shopData, setShopData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const now = new Date();
    let startDate = null;

    if (filter === "7d") {
      const past7 = new Date();
      past7.setDate(now.getDate() - 7);
      startDate = past7;
    } else if (filter === "30d") {
      const past30 = new Date();
      past30.setDate(now.getDate() - 30);
      startDate = past30;
    }

    const query = startDate ? `?startDate=${startDate.toISOString()}` : "";
    axiosInstance
      .get(`/delay/shop-wise-duration${query}`)
      .then((res) => setShopData(res.data));
  }, [filter]);

  const handleBarClick = (data) => {
    const shop = data.shop;
    setSelectedShop(shop);
    let startDate = null;
  const now = new Date();

  if (filter === "7d") {
    startDate = new Date();
    startDate.setDate(now.getDate() - 7);
  } else if (filter === "30d") {
    startDate = new Date();
    startDate.setDate(now.getDate() - 30);
  }
  const query = startDate ? `?startDate=${startDate.toISOString()}` : "";
    axiosInstance
      .get(`/delay/equipment-wise-duration/${shop}${query}`)
      .then((res) => setEquipmentData(res.data));
  };

  return (
    <div className="mt-24 px-4 w-[95vw] mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Shop Delay Analysis (By Hours)</h2>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8">
        {["all", "7d", "30d"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg ${
              filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {f === "all" ? "All Time" : f === "7d" ? "Last 7 Days" : "Last 30 Days"}
          </button>
        ))}
      </div>

      {/* Wider Shop Chart */}
      <div className="w-full overflow-x-auto mb-12">
        <div className="min-w-[1000px] h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={shopData}
              onClick={(e) => handleBarClick(e.activePayload?.[0]?.payload)}
            >
              <XAxis dataKey="shop" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalDuration" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Wider Equipment Chart */}
      {selectedShop && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Delay in {selectedShop} by Equipment (Hours)
          </h2>

          <div className="w-full overflow-x-auto">
            <div className="min-w-[1000px] h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={equipmentData}>
                  <XAxis dataKey="equipment" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalDuration" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalysisByHours;
