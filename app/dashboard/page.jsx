"use client";

import { useState, useEffect } from "react";
import AddToolForm from "@/components/AddToolForm";
import Image from "next/image";
import { ChartBar, Search, Plus, Package, ArrowDown } from "lucide-react";
import LabLoader from "@/components/LabLoader";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const [tools, setTools] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lowStockItems, setLowStockItems] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchTools() {
      const res = await fetch("/api/tools");
      const data = await res.json();
      setTools(data.tools);
      setTotalQuantity(data.totalQuantity);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(data.tools.map((tool) => tool.category)),
      ];
      setCategories(uniqueCategories);

      // Find low stock items (items with quantity < 5)
      const lowStock = data.tools.filter((tool) => tool.quantity < 5);
      setLowStockItems(lowStock);
    }
    fetchTools();
  }, []);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate summary statistics
  const uniqueItemCount = tools.length;
  const lowStockCount = lowStockItems.length;
  const averageQuantity =
    tools.length > 0 ? Math.round(totalQuantity / tools.length) : 0;

  return (
    <div>
      {loading && <LabLoader />}
      {!loading && (
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="mb-8 flex">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">
                Laboratory Information Management System
              </h1>
              <p className="text-gray-600">Admin Dashboard</p>
            </div>
            <div className="absolute top-12 right-4">
      <button
        onClick={() => router.push('/request')}
        className="flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Requests
      </button>
    </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Total Items</p>
                  <p className="text-2xl font-bold">{uniqueItemCount}</p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Total Quantity</p>
                  <p className="text-2xl font-bold">{totalQuantity}</p>
                </div>
                <ChartBar className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Average Quantity</p>
                  <p className="text-2xl font-bold">{averageQuantity}</p>
                </div>
                <ChartBar className="h-8 w-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Low Stock Items</p>
                  <p className="text-2xl font-bold">{lowStockCount}</p>
                </div>
                <ArrowDown className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search items..."
                  className="w-full p-2 pl-10 border rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <select
              className="p-2 border rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </button>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold mb-4">
                Add New Laboratory Item
              </h2>
              <AddToolForm onSuccess={() => setShowAddForm(false)} />
            </div>
          )}

          {/* Low Stock Alert */}
          {lowStockItems.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-md mb-6">
              <h3 className="text-orange-700 font-bold mb-2">
                Low Stock Alert
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {lowStockItems.map((item) => (
                  <div
                    key={`low-${item._id || item.name}`}
                    className="flex items-center"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    <span className="text-sm">
                      {item.name} ({item.quantity} remaining)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inventory Grid */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Inventory Items</h2>

            {filteredTools.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No items found matching your search criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredTools.map((tool) => (
                  <div
                    key={tool._id || tool.name}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                      {tool.image ? (
                        <Image
                          src={`/images/${tool.image}`}
                          alt={tool.name}
                          width={128}
                          height={128}
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <Package className="h-16 w-16 text-gray-300" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold truncate">{tool.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">
                          {tool.category || "Uncategorized"}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            tool.quantity < 5
                              ? "bg-red-100 text-red-800"
                              : tool.quantity < 10
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {tool.quantity} in stock
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
