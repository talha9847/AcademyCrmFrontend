import React, { useState, useMemo, useEffect } from "react";
import {
  DollarSign,
  Calendar,
  Tag,
  FileText,
  PlusCircle,
  Trash2,
  ArrowRight,
  Search,
} from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import AdminNavbar from "./AdminNavbar";
import { toast } from "react-toastify";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const Expense = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const getAllExpense = async () => {
    try {
      const result = await axios.get(
        "https://academycrmbackend.onrender.com/api/expense/getAllExpense",
        { withCredentials: true }
      );
      if (result.status == 200) {
        setExpenseHistory(result.data.data);
        console.log(result.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllExpense();
  }, []);
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const totalExpenses = useMemo(() => {
    return expenseHistory.reduce((sum, item) => {
      const amount = parseFloat(item.amount) || 0; // safely convert to number
      return sum + amount;
    }, 0);
  }, [expenseHistory]);

  const expenseCategories = [
    "Operations",
    "IT/Tech",
    "Payroll",
    "Events",
    "Maintenance",
    "Academic",
    "Utilities",
    "Others",
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const submitForm = async (data) => {
    try {
      const result = await axios.post(
        "https://academycrmbackend.onrender.com/api/expense/addExpense",
        data,
        { withCredentials: true }
      );
      if (result.status == 200) {
        console.log("good one is added");
        reset();
        getAllExpense();
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense record?"));
  };

  const filteredExpenses = useMemo(() => {
    if (!searchTerm) {
      return expenseHistory;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return expenseHistory.filter((expense) => {
      const nameMatch = expense.expense_name
        .toLowerCase()
        .includes(lowerCaseSearchTerm);
      const dateMatch = expense.date_of_expense.includes(lowerCaseSearchTerm);

      return nameMatch || dateMatch;
    });
  }, [expenseHistory, searchTerm]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminNavbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 pb-3 border-b-4 border-black">
          <DollarSign className="w-8 h-8 inline-block mr-2 text-black" />
          Administrative Expense Management
        </h1>

        {/* --- Summary Card --- */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-black mb-8 max-w-sm">
          <p className="text-sm font-semibold uppercase text-gray-500">
            Total Expenses Recorded (History)
          </p>
          <h3 className="text-4xl font-extrabold text-black mt-1">
            {formatCurrency(totalExpenses)}{" "}
          </h3>
          <p className="text-sm text-gray-400 mt-2">Current Fiscal Data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-5 border-b pb-3">
              <PlusCircle className="w-5 h-5 inline-block mr-2 text-black" />
              Record New Expense
            </h2>
            <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expense Name / Description
                </label>
                <input
                  {...register("name", {
                    required: "This feild is required",
                  })}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g., Q4 Software License"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount (INR)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("amount", {
                      required: "This feild is required",
                    })}
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="0.00"
                    className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Expense
                </label>
                <input
                  {...register("date", {
                    required: "This feild is required",
                  })}
                  type="date"
                  name="date"
                  id="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "This feild is required",
                  })}
                  name="category"
                  id="category"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white"
                >
                  {expenseCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description (Optional) */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Detailed Notes (Optional)
                </label>
                <textarea
                  {...register("notes", {
                    required: "This feild is required",
                  })}
                  name="notes"
                  id="notes"
                  rows="2"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Expense Record</span>
              </button>
            </form>
          </div>

          {/* 2. Expense History Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-5 border-b pb-3 flex justify-between items-center">
              <span>
                <FileText className="w-5 h-5 inline-block mr-2 text-red-600" />
                Recent Expense History
              </span>
            </h2>

            {/* --- Search Input Field --- */}
            <div className="mb-6">
              <label htmlFor="search" className="sr-only">
                Search Expenses
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by name or date (e.g., 'Server' or '2025-10-10')"
                  className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>
            </div>
            {/* --------------------------- */}

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expense Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {/* --- Map over filteredExpenses --- */}
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense, ind) => (
                    <tr key={ind + 1} className="hover:bg-red-50/50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                        {new Date(expense.date_of_expense).toLocaleDateString(
                          "en-US"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {expense.expense_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-red-700">
                        {formatCurrency(expense.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="text-gray-400 hover:text-red-600 transition"
                          title="Delete Expense"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500 text-lg"
                    >
                      {searchTerm
                        ? `No expenses found matching "${searchTerm}".`
                        : "No expenses recorded yet."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 flex justify-between items-center">
              <span>
                Displaying **{filteredExpenses.length}** of{" "}
                {expenseHistory.length} records.
              </span>
              <span className="flex items-center space-x-1 font-semibold text-red-600">
                Full Ledger View <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
