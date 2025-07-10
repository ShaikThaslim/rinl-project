import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import CreatableSelect from "react-select/creatable";


const DelaysEntry = () => {
  const [shops, setShops] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [subEquipments, setSubEquipments] = useState([]);

  const [selectedShop, setSelectedShop] = useState("");
  const [selectedEquip, setSelectedEquip] = useState("");
  const [selectedSubEquip, setSelectedSubEquip] = useState("");

  const [delayFrom, setDelayFrom] = useState("");
  const [delayUpto, setDelayUpto] = useState("");
  const [delayDesc, setDelayDesc] = useState("");
  const [delayOptions, setDelayOptions] = useState([]);


  useEffect(() => {
    axiosInstance.get("/equipment/shops")
      .then(res => setShops(res.data));
  }, []);

  useEffect(() => {
    if (selectedShop) {
      axiosInstance.get(`/equipment/equipments/${selectedShop}`)
        .then(res => setEquipments(res.data));
      setSubEquipments([]);
      setSelectedEquip("");
      setSelectedSubEquip("");
    }
  }, [selectedShop]);

  useEffect(() => {
    if (selectedEquip) {
      axiosInstance.get(`/equipment/sub-equipments/${selectedShop}/${selectedEquip}`)
        .then(res => setSubEquipments(res.data));
      setSelectedSubEquip("");
    }
  }, [selectedEquip]);

  useEffect(() => {
    if (selectedShop && selectedEquip && selectedSubEquip) {
      axiosInstance
        .get(`/delay/descriptions/${selectedShop}/${selectedEquip}/${selectedSubEquip}`)
        .then(res => {
          const sortedOptions = res.data.map(item => ({
            value: item.value,
            label: `🔥 ${item.label} (${item.count})`,
          }));
          setDelayOptions(sortedOptions);
        })
        .catch(err => {
          console.error("Failed to fetch delay descriptions:", err);
          setDelayOptions([]);
        });
    }
  }, [selectedShop, selectedEquip, selectedSubEquip]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        shop_desc: selectedShop,
        eqpt_desc: selectedEquip,
        sub_eqpt_desc: selectedSubEquip,
        delay_from: delayFrom,
        delay_upto: delayUpto,
        delay_desc: delayDesc,
      };
      await axiosInstance.post("/delay/create", payload);
      alert("Delay entry submitted successfully!");
      handleClear();
    } catch (error) {
      console.error("Error submitting delay entry:", error);
      alert("Submission failed.");
    }
  };

  const handleClear = () => {
    setSelectedShop("");
    setSelectedEquip("");
    setSelectedSubEquip("");
    setDelayFrom("");
    setDelayUpto("");
    setDelayDesc("");
    setDelayOptions("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl w-full mx-auto mt-24 p-8 bg-white rounded-2xl shadow-xl space-y-6"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">Delay Entry Form</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Shop</label>
        <select
          value={selectedShop}
          onChange={(e) => setSelectedShop(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Shop</option>
          {Array.isArray(shops) && shops.map(shop => (
            <option key={shop} value={shop}>{shop}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
        <select
          value={selectedEquip}
          onChange={(e) => setSelectedEquip(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Equipment</option>
          {equipments.map(eq => <option key={eq} value={eq}>{eq}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sub Equipment</label>
        <select
          value={selectedSubEquip}
          onChange={(e) => setSelectedSubEquip(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Sub Equipment</option>
          {subEquipments.map(sub => <option key={sub} value={sub}>{sub}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Delay From</label>
        <input
          type="datetime-local"
          value={delayFrom}
          onChange={(e) => setDelayFrom(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Delay Upto</label>
        <input
          type="datetime-local"
          value={delayUpto}
          onChange={(e) => setDelayUpto(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Delay Description</label>
        <CreatableSelect
            placeholder="Select or type delay description..."
            options={delayOptions}
            onChange={(option) => setDelayDesc(option?.value || "")}
            isClearable
            isSearchable
            className="react-select-container"
            classNamePrefix="react-select"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-200"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default DelaysEntry;


