import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import "./App.css";

const gadgetColumns = [
  { accessorKey: "deviceName", header: "Gadget Name" },
  { accessorKey: "deviceCateg", header: "Category" },
  { accessorKey: "manuf", header: "Manufacturer" },
  { accessorKey: "health", header: "Health Rating" },
  { accessorKey: "brand", header: "Tech Brand Name" },
  { accessorKey: "role", header: "User Role" },
];

const categories = ["Smartphone", "Laptop", "Wearable", "Audio"];

function App() {
  const [deviceName, setDeviceName] = useState("");
  const [deviceCateg, setDeviceCateg] = useState("");
  const [manuf, setManuf] = useState("");
  const [health, setHealth] = useState("");
  const [brand, setBrand] = useState("");
  const [role, setRole] = useState("");

  const [devnameError, setDevnameError] = useState("");
  const [categError, setCategError] = useState("");
  const [manufError, setManufError] = useState("");
  const [healthError, setHealthError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [roleError, setRoleError] = useState("");

  const [gadgets, setGadgets] = useState([]);
  const [currentView, setCurrentView] = useState("form");
  const [clickedGadget, setClickedGadget] = useState(null);
  const [activeGadget, setActiveGadget] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });

  const visibleGadgets =
    categoryFilter === "All"
      ? gadgets
      : gadgets.filter(
          (gadget) => gadget.deviceCateg === categoryFilter,
        );

  const gadgetTable = useReactTable({
    data: visibleGadgets,
    columns: gadgetColumns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  useEffect(() => {
    setActiveGadget(clickedGadget);
  }, [clickedGadget]);

  const validateDeviceName = (value) => {
    if (value.trim() === "") {
      setDevnameError("Gadget name is required.");
      return false;
    }

    if (value.trim().length < 3) {
      setDevnameError("Gadget name must be at least 3 characters.");
      return false;
    }

    setDevnameError("");
    return true;
  };

  const validateDeviceCateg = (value) => {
    if (value === "") {
      setCategError("Category is required.");
      return false;
    }

    setCategError("");
    return true;
  };

  const validateManuf = (value) => {
    if (value.trim() === "") {
      setManufError("Manufacturer is required.");
      return false;
    }

    setManufError("");
    return true;
  };

  const validateHealth = (value) => {
    if (value === "") {
      setHealthError("Health rating is required.");
      return false;
    }

    if (Number(value) < 1 || Number(value) > 100) {
      setHealthError("Health rating must be between 1 and 100.");
      return false;
    }

    setHealthError("");
    return true;
  };

  const validateBrand = (value) => {
    if (value.trim() === "") {
      setBrandError("Tech brand name is required.");
      return false;
    }

    setBrandError("");
    return true;
  };

  const validateRole = (value) => {
    if (value === "") {
      setRoleError("User role is required.");
      return false;
    }

    setRoleError("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameIfValid = validateDeviceName(deviceName);
    const categIfValid = validateDeviceCateg(deviceCateg);
    const manufIfValid = validateManuf(manuf);
    const healthIfValid = validateHealth(health);
    const brandIfValid = validateBrand(brand);
    const roleIfValid = validateRole(role);

    const formIfValid =
      nameIfValid &&
      categIfValid &&
      manufIfValid &&
      healthIfValid &&
      brandIfValid &&
      roleIfValid;

    if (!formIfValid) {
      return;
    }

    const newGadget = {
      id: Date.now(),
      deviceName,
      deviceCateg,
      manuf,
      health: Number(health),
      brand,
      role,
    };

    setGadgets((prev) => [...prev, newGadget]);

    setCategoryFilter("All");
    setClickedGadget(null);

    setPagination({
      pageIndex: Math.floor(gadgets.length / 3),
      pageSize: 3,
    });

    setDeviceName("");
    setDeviceCateg("");
    setManuf("");
    setHealth("");
    setBrand("");
    setRole("");

    setCurrentView("registry");
  };

  const handleFilter = (event) => {
    setCategoryFilter(event.target.value);

    setPagination({
      pageIndex: 0,
      pageSize: 3,
    });

    setClickedGadget(null);
  };

  const inputClass =
    "w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

  const labelClass =
    "mb-1 block text-sm font-medium text-slate-700";

  const errorClass =
    "mt-1 text-sm text-red-600";

  const pageBtnClass =
    "rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">
          Tech Gadget &amp; Inventory Hub
        </h1>

        {currentView === "form" ? (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Add Gadget
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter the gadget information below.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="deviceName"
                  className={labelClass}
                >
                  Gadget Name
                </label>

                <input
                  type="text"
                  id="deviceName"
                  value={deviceName}
                  placeholder="e.g. iPhone 15"
                  onChange={(e) => {
                    setDeviceName(e.target.value);
                    validateDeviceName(e.target.value);
                  }}
                  className={inputClass}
                />

                {devnameError && (
                  <p className={errorClass}>{devnameError}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="deviceCateg"
                  className={labelClass}
                >
                  Category
                </label>

                <select
                  id="deviceCateg"
                  value={deviceCateg}
                  onChange={(e) => {
                    setDeviceCateg(e.target.value);
                    validateDeviceCateg(e.target.value);
                  }}
                  className={inputClass}
                >
                  <option value="">Select a category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {categError && (
                  <p className={errorClass}>{categError}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="manuf"
                  className={labelClass}
                >
                  Manufacturer
                </label>

                <input
                  id="manuf"
                  type="text"
                  value={manuf}
                  placeholder="e.g. Apple"
                  onChange={(e) => {
                    setManuf(e.target.value);
                    validateManuf(e.target.value);
                  }}
                  className={inputClass}
                />

                {manufError && (
                  <p className={errorClass}>{manufError}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="health"
                  className={labelClass}
                >
                  Health Rating (1-100)
                </label>

                <input
                  id="health"
                  type="number"
                  value={health}
                  min="1"
                  max="100"
                  placeholder="e.g. 85"
                  onChange={(e) => {
                    setHealth(e.target.value);
                    validateHealth(e.target.value);
                  }}
                  className={inputClass}
                />

                {healthError && (
                  <p className={errorClass}>{healthError}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="brand"
                  className={labelClass}
                >
                  Tech Brand Name
                </label>

                <input
                  id="brand"
                  type="text"
                  value={brand}
                  placeholder="e.g. iPhone"
                  onChange={(e) => {
                    setBrand(e.target.value);
                    validateBrand(e.target.value);
                  }}
                  className={inputClass}
                />

                {brandError && (
                  <p className={errorClass}>{brandError}</p>
                )}
              </div>

              <div>
                <p className={labelClass}>User Role</p>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="role"
                      value="Engineer"
                      checked={role === "Engineer"}
                      onChange={(e) => {
                        setRole(e.target.value);
                        validateRole(e.target.value);
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    Engineer
                  </label>

                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="role"
                      value="Tester"
                      checked={role === "Tester"}
                      onChange={(e) => {
                        setRole(e.target.value);
                        validateRole(e.target.value);
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    Tester
                  </label>
                </div>

                {roleError && (
                  <p className={errorClass}>{roleError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Gadget
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Gadget Registry
              </h2>

              <button
                type="button"
                onClick={() => {
                  setCurrentView("form");
                  setClickedGadget(null);
                }}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Add Gadget
              </button>
            </div>

            <div>
              <label
                htmlFor="categoryFilter"
                className={labelClass}
              >
                Filter by category
              </label>

              <select
                id="categoryFilter"
                value={categoryFilter}
                onChange={handleFilter}
                className={`${inputClass} sm:max-w-xs`}
              >
                <option value="All">All categories</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto rounded-md border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-100">
                  {gadgetTable.getHeaderGroups().map(
                    (headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-3 py-2 text-left font-medium text-slate-700"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </th>
                        ))}
                      </tr>
                    ),
                  )}
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {gadgetTable.getRowModel().rows.length > 0 ? (
                    gadgetTable
                      .getRowModel()
                      .rows.map((row) => (
                        <tr
                          key={row.id}
                          onClick={() =>
                            setClickedGadget(row.original)
                          }
                          className={`cursor-pointer transition ${
                            clickedGadget?.id === row.original.id
                              ? "bg-indigo-50"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className="px-3 py-2"
                            >
                              {cell.column.id === "health" ? (
                                <span
                                  className={`font-semibold ${
                                    cell.getValue() >= 80
                                      ? "text-green-600"
                                      : cell.getValue() >= 50
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                  }`}
                                >
                                  {cell.getValue()}/100
                                </span>
                              ) : (
                                flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={gadgetColumns.length}
                        className="px-3 py-8 text-center text-slate-500"
                      >
                        No gadgets match this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => gadgetTable.previousPage()}
                disabled={!gadgetTable.getCanPreviousPage()}
                className={pageBtnClass}
              >
                Previous
              </button>

              <p className="text-sm text-slate-600">
                Page{" "}
                {gadgetTable.getState().pagination.pageIndex + 1}{" "}
                of {gadgetTable.getPageCount() || 1}
              </p>

              <button
                type="button"
                onClick={() => gadgetTable.nextPage()}
                disabled={!gadgetTable.getCanNextPage()}
                className={pageBtnClass}
              >
                Next
              </button>
            </div>

            {activeGadget ? (
              <div className="rounded-md border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">
                    {activeGadget.deviceName}
                  </h3>

                  <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                    {activeGadget.role}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Category
                    </p>

                    <p className="font-medium text-slate-800">
                      {activeGadget.deviceCateg}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Manufacturer
                    </p>

                    <p className="font-medium text-slate-800">
                      {activeGadget.manuf}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Tech Brand
                    </p>

                    <p className="font-medium text-slate-800">
                      {activeGadget.brand}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Health Rating
                    </p>

                    <p className="font-semibold text-indigo-700">
                      {activeGadget.health}/100
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
                Select a gadget row to view its details.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;