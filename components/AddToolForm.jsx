"use client";

import { useState } from "react";
import { Package, Plus } from "lucide-react";

const TOOL_OPTIONS = [
  { name: "Hammer", image: "hammer.jpeg", category: "punching" },
  { name: "Knife", image: "knife.jpeg", category: "sharp" },
  { name: "Screwdriver", image: "screwdriver.png", category: "fixing" },
  { name: "Wrench", image: "wrench.jpg", category: "fixing" },
];

export default function AddToolForm({ onSuccess }) {
  const [selectedTool, setSelectedTool] = useState(TOOL_OPTIONS[0].name);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get the selected tool object from the array
    const selectedToolObj = TOOL_OPTIONS.find(
      (tool) => tool.name === selectedTool
    );

    const toolData = {
      name: selectedToolObj.name,
      image: selectedToolObj.image,
      quantity: parseInt(quantity, 10), // Ensure quantity is a number
      category: selectedToolObj.category, // Fixed category from the array
    };

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toolData),
      });

      if (res.ok) {
        alert("Tool added successfully!");
        // Reset the quantity field
        setQuantity(1);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        alert("Failed to add tool.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-lg shadow-sm bg-white">
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Tool:</label>
        <select
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value)}
          className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {TOOL_OPTIONS.map((tool) => (
            <option key={tool.name} value={tool.name}>
              {tool.name} ({tool.category})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity:</label>
        <div className="flex rounded-md">
          <button
            type="button"
            onClick={() => quantity > 1 && setQuantity(Number(quantity) - 1)}
            className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="flex-1 p-2.5 text-center border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setQuantity(Number(quantity) + 1)}
            className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Tool
            </>
          )}
        </button>
      </div>
    </form>
  );
}