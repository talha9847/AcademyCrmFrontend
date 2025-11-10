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
  AlertTriangle,
  Download, // New Icon for download button
  Printer, // New Icon for PDF/Print
} from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import AdminNavbar from "./AdminNavbar";
import { toast } from "react-toastify";

// --- Utility Function ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

// --- Main Component ---
const Expense = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // --- State Initialization ---
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");

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

  // --- Handlers ---
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const getAllExpense = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${BASE_URL}/api/expense/getAllExpense`, {
        withCredentials: true,
      });
      if (result.status === 200) {
        const sortedData = result.data.data.sort(
          (a, b) => new Date(b.date_of_expense) - new Date(a.date_of_expense)
        );
        setExpenseHistory(sortedData);
      } else {
        toast.error("Failed to load expenses.");
      }
    } catch (error) {
      toast.error("Error connecting to server for expenses.");
    } finally {
      setLoading(false);
    }
  };

  const submitForm = async (data) => {
    try {
      const result = await axios.post(
        `${BASE_URL}/api/expense/addExpense`,
        {
          expense_name: data.name,
          amount: parseFloat(data.amount),
          date_of_expense: data.date,
          category: data.category,
          notes: data.notes,
        },
        { withCredentials: true }
      );
      if (result.status === 200) {
        toast.success("Expense added successfully!");
        reset();
        getAllExpense();
      } else {
        toast.error("Failed to add expense.");
      }
    } catch (error) {
      toast.error("Error adding expense. Please check your data.");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this expense record? This action cannot be undone."
      )
    ) {
      try {
        const result = await axios.delete(
          `${BASE_URL}/api/expense/deleteExpense/${id}`,
          { withCredentials: true }
        );
        if (result.status === 200) {
          toast.success("Expense deleted successfully.");
          getAllExpense();
        } else {
          toast.error("Failed to delete expense.");
        }
      } catch (error) {
        toast.error("Error deleting expense.");
      }
    }
  };

  // --- Effects ---
  useEffect(() => {
    getAllExpense();
  }, []);

  // --- Memoized Values (Correct Order for Dependency) ---

  // 1. Define filteredExpenses FIRST
  const filteredExpenses = useMemo(() => {
    let filtered = expenseHistory;

    // Apply Month Filter
    if (selectedMonth) {
      filtered = filtered.filter((expense) =>
        expense.date_of_expense.startsWith(selectedMonth)
      );
    }

    // Apply Text Search Filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((expense) => {
        const nameMatch = expense.expense_name
          .toLowerCase()
          .includes(lowerCaseSearchTerm);
        const categoryMatch = expense.category
          .toLowerCase()
          .includes(lowerCaseSearchTerm);
        const dateMatch = expense.date_of_expense.includes(lowerCaseSearchTerm);

        return nameMatch || dateMatch || categoryMatch;
      });
    }

    return filtered;
  }, [expenseHistory, searchTerm, selectedMonth]);

  // 2. Define totalExpenses SECOND
  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((sum, item) => {
      const amount = parseFloat(item.amount) || 0;
      return sum + amount;
    }, 0);
  }, [filteredExpenses]);

  // --- New Download Handlers ---

  const handleDownloadCSV = () => {
    if (filteredExpenses.length === 0) {
      toast.info("No expenses to export.");
      return;
    }

    // 1. Define CSV headers
    const headers = ["Date", "Name", "Category", "Amount (INR)", "Notes"];

    // 2. Map filtered data to CSV rows
    const csvRows = filteredExpenses.map((expense) =>
      [
        new Date(expense.date_of_expense).toLocaleDateString("en-GB"),
        `"${expense.expense_name.replace(/"/g, '""')}"`, // Handle quotes in name
        expense.category,
        parseFloat(expense.amount).toFixed(2),
        `"${expense.notes ? expense.notes.replace(/"/g, '""') : ""}"`, // Handle notes
      ].join(",")
    );

    // 3. Combine headers and rows
    const csvContent = [headers.join(","), ...csvRows].join("\n");

    // 4. Create a Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);

    let filename = `Expense_Report_${selectedMonth || "All"}.csv`;
    if (searchTerm) {
      filename = `Expense_Search_Report.csv`;
    }

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Data exported to CSV successfully!");
  };

  const handleDownloadPDF = () => {
    if (filteredExpenses.length === 0) {
      toast.info("No expenses to print.");
      return;
    }

    // 1. Generate Table Rows
    const tableRows = filteredExpenses
      .map(
        (expense) => `
        <tr>
            <td style="padding: 8px; border: 1px solid #ccc; text-align: left; font-size: 10pt;">
                ${new Date(expense.date_of_expense).toLocaleDateString("en-GB")}
            </td>
            <td style="padding: 8px; border: 1px solid #ccc; text-align: left; font-size: 10pt;">
                ${expense.expense_name}
                <br><span style="font-size: 8pt; color: #555;">${
                  expense.notes || ""
                }</span>
            </td>
            <td style="padding: 8px; border: 1px solid #ccc; text-align: left; font-size: 10pt;">
                ${expense.category}
            </td>
            <td style="padding: 8px; border: 1px solid #ccc; text-align: right; font-size: 11pt; font-weight: bold; color: #cc0000;">
                ${formatCurrency(expense.amount)}
            </td>
        </tr>
    `
      )
      .join("");

    // 2. Construct Full Raw HTML Document
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Expense Report - ${selectedMonth || "All"}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { font-size: 20pt; text-align: center; margin-bottom: 5px; }
                p { font-size: 10pt; text-align: center; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th { background-color: #f0f0f0; padding: 10px; border: 1px solid #ccc; text-align: left; font-size: 10pt; }
                .total { background-color: #e0e0e0; font-size: 12pt; font-weight: bold; text-align: right; }
                @page { size: A4 portrait; margin: 1cm; }
            </style>
        </head>
        <body>
            <h1>Financial Expense Report</h1>
            <p>
                Filtered Period: <strong>${
                  selectedMonth || "All Time"
                }</strong> | 
                Generated: ${new Date().toLocaleDateString()}
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name/Description</th>
                        <th>Category</th>
                        <th style="text-align: right;">Amount (INR)</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="total" style="padding: 10px; border: 1px solid #ccc; text-align: right;">
                            GRAND TOTAL:
                        </td>
                        <td class="total" style="padding: 10px; border: 1px solid #ccc; color: #cc0000;">
                            ${formatCurrency(totalExpenses)}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </body>
        </html>
    `;

    // 3. Open New Window, Write Content, and Print
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close(); // Important for loading the HTML content
      printWindow.print();
      // Delay closing to allow print dialog to open
      // printWindow.close(); // Generally best practice is to let the user close it
      toast.info(
        "Opening print dialog for raw HTML report. Select 'Save as PDF'."
      );
    } else {
      toast.error(
        "Could not open print window. Check browser pop-up settings."
      );
    }
  };

  // --- Category Tag Styling Utility ---
  const getCategoryColor = (category) => {
    switch (category) {
      case "Payroll":
        return "bg-gray-200 text-gray-800 border-gray-400";
      case "IT/Tech":
        return "bg-blue-100 text-blue-800 border-blue-400";
      case "Operations":
        return "bg-red-100 text-red-800 border-red-400";
      case "Utilities":
        return "bg-green-100 text-green-800 border-green-400";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  // --- Component JSX ---
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <AdminNavbar />
      <div className="p-4 sm:p-6 md:p-8 max-w-8xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 border-b-2 pb-3 border-gray-200 flex items-center">
          <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 inline-block mr-2 sm:mr-3 text-black" />
          <span className="tracking-tight">Financial Ledger: Expenses</span>
        </h1>

        {/* --- Summary Card --- */}
        <div className="flex justify-end mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl border-l-4 border-black max-w-full sm:max-w-xs w-full">
            <p className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
              Total Expenses (Displayed)
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-red-700 mt-1">
              {formatCurrency(totalExpenses)}{" "}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Based on **{filteredExpenses.length}** filtered records.
            </p>
          </div>
        </div>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* 1. New Expense Form */}
          <div className="lg:col-span-1 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 h-fit order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 border-b pb-3 flex items-center">
              <PlusCircle className="w-5 h-5 inline-block mr-2 text-red-600" />
              Log New Transaction
            </h2>
            <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
              {/* Form fields... (omitted for brevity, assume they are the same) */}
              {/* Expense Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Expense Name / Description
                </label>
                <input
                  {...register("name", {
                    required: "Expense name is required.",
                  })}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g., Server Hosting Renewal"
                  className={`mt-1 block w-full px-4 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:ring-black focus:border-black transition duration-150`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Amount (INR)
                </label>
                <div className="mt-1 relative rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("amount", {
                      required: "Amount is required.",
                      min: { value: 1, message: "Amount must be positive." },
                      valueAsNumber: true,
                    })}
                    type="number"
                    step="0.01"
                    name="amount"
                    id="amount"
                    placeholder="0.00"
                    className={`block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 ${
                      errors.amount ? "border-red-500" : "border-gray-300"
                    } focus:ring-black focus:border-black sm:text-sm transition duration-150`}
                  />
                </div>
                {errors.amount && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Date of Expense
                </label>
                <input
                  {...register("date", { required: "Date is required." })}
                  type="date"
                  name="date"
                  id="date"
                  className={`mt-1 block w-full px-4 py-2 border ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:ring-black focus:border-black transition duration-150`}
                />
                {errors.date && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is required.",
                  })}
                  name="category"
                  id="category"
                  defaultValue=""
                  className={`mt-1 block w-full px-4 py-2 border ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:ring-black focus:border-black bg-white appearance-none transition duration-150`}
                >
                  <option value="" disabled>
                    Select an expense category...
                  </option>
                  {expenseCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Description (Optional) */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Detailed Notes (Optional)
                </label>
                <textarea
                  {...register("notes")}
                  name="notes"
                  id="notes"
                  rows="3"
                  placeholder="Additional context or vendor information..."
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black transition duration-150"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition duration-200 shadow-md text-base sm:text-lg"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Record Expense</span>
              </button>
            </form>
          </div>

          {/* 2. Expense History Table */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 order-1 lg:order-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 border-b pb-3 flex items-center">
              <FileText className="w-5 h-5 inline-block mr-2 text-black" />
              Recent Transaction History
            </h2>

            {/* --- FILTER & SEARCH CONTROLS (Responsive) --- */}
            <div className="mb-5 flex flex-col sm:flex-row gap-4">
              {/* Month Filter */}
              <div className="w-full sm:w-1/3 relative">
                <label htmlFor="month-filter" className="sr-only">
                  Filter by Month
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="month"
                  id="month-filter"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 focus:ring-black focus:border-black text-sm shadow-sm bg-white"
                />
              </div>

              {/* Text Search */}
              <div className="w-full sm:w-2/3 relative">
                <label htmlFor="search" className="sr-only">
                  Search Expenses
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by name, category, or date..."
                  className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 focus:ring-black focus:border-black text-sm shadow-sm"
                />
              </div>
            </div>

            {/* --- Download Buttons --- */}
            <div className="flex justify-start space-x-3 mb-5 mt-2">
              <button
                onClick={handleDownloadCSV}
                className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition duration-150 shadow-md disabled:opacity-50"
                disabled={filteredExpenses.length === 0}
              >
                <Download className="w-4 h-4" />
                <span>Excel (CSV)</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition duration-150 shadow-md disabled:opacity-50 print:hidden"
                disabled={filteredExpenses.length === 0}
              >
                <Printer className="w-4 h-4" />
                <span>Print/PDF</span>
              </button>
            </div>

            {/* --- Table Display --- */}
            {loading ? (
              <div className="text-center py-10 text-gray-500">
                <svg
                  className="animate-spin h-5 w-5 mr-3 inline text-black"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading expense records...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table
                  className="min-w-full divide-y divide-gray-200"
                  id="expense-table"
                >
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[70px]">
                        Date
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[150px]">
                        Name
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[100px] hidden sm:table-cell">
                        Category
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[100px]">
                        Amount
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider w-[50px] print:hidden">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredExpenses.length > 0 ? (
                      filteredExpenses.map((expense) => (
                        <tr
                          key={
                            expense.id ||
                            expense.date_of_expense + expense.expense_name
                          }
                          className="hover:bg-gray-50/50 transition"
                        >
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800">
                            {new Date(
                              expense.date_of_expense
                            ).toLocaleDateString("en-GB")}
                          </td>
                          <td className="px-4 sm:px-6 py-4 max-w-[150px] overflow-hidden text-ellipsis text-sm text-gray-900">
                            <p className="font-semibold truncate">
                              {expense.expense_name}
                            </p>
                            <p className="text-xs text-gray-500 truncate hidden md:block">
                              {expense.notes}
                            </p>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                            <span
                              className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(
                                expense.category
                              )}`}
                            >
                              {expense.category}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-right font-extrabold text-red-700">
                            {formatCurrency(expense.amount)}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium print:hidden">
                            {" "}
                            {/* Hide Delete button on print */}
                            <button
                              onClick={() => handleDelete(expense.id)}
                              className="text-gray-400 hover:text-black transition p-1 rounded-full hover:bg-gray-100"
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
                          className="px-6 py-12 text-center text-gray-500 text-base italic"
                        >
                          {searchTerm || selectedMonth
                            ? `No records found matching the current filters.`
                            : "No expense records found. Start by adding a new transaction."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100 p-2 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-600 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 print:hidden">
              <span>
                Showing **{filteredExpenses.length}** records. Total:{" "}
                {expenseHistory.length}.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
