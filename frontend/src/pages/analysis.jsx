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

const Analysis = () => {
  const [shopData, setShopData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [filter, setFilter] = useState("all");


  useEffect(() => {
    const now = new Date();
    let startDate = null;
  
    if (filter === "7d") {
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
    } else if (filter === "30d") {
      startDate = new Date();
      startDate.setDate(now.getDate() - 30);
    }
  
    const query = startDate ? `?startDate=${startDate.toISOString()}` : "";
  
    axiosInstance.get(`/delay/shop-wise${query}`).then((res) => setShopData(res.data));
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
  
    axiosInstance.get(`/delay/equipment-wise/${shop}${query}`).then((res) => setEquipmentData(res.data));
  };
  

  return (
    <div className="mt-24 px-4 w-[95vw] mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Shop Delay Analysis(By Count)</h2>
      
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
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={shopData}
            onClick={(e) => handleBarClick(e.activePayload?.[0]?.payload)}
          >
            <XAxis dataKey="shop" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {selectedShop && (
        <>
          <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-800">
            Delays in {selectedShop} by Equipment
          </h2>

          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={equipmentData}>
                <XAxis dataKey="equipment" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Analysis;
