import React from "react";
// Assuming SNavbar is defined in a separate file
import SNavbar from "./SNavbar"; 

// --- Static Data for Demonstration ---

const studentInfo = {
  name: "Alex Johnson",
  id: "S00101",
  course: "Web Development Fundamentals",
  totalFee: 15000, // Total fee for the course
};

const FEE_TRANSACTIONS = [
  {
    id: "TRX876543",
    date: "2024-09-01",
    description: "Initial Enrollment Deposit",
    amount: 5000,
    status: "Paid",
    method: "Bank Transfer",
    receiptAvailable: true, // Receipt flag for the new button
  },
  {
    id: "TRX876544",
    date: "2024-10-01",
    description: "First Installment Payment",
    amount: 5000,
    status: "Paid",
    method: "Credit Card",
    receiptAvailable: true,
  },
  {
    id: "TRX876545",
    date: "2024-11-01",
    description: "Second Installment Payment",
    amount: 5000,
    status: "Pending", // Example of a pending payment
    method: "Debit Card",
    receiptAvailable: false,
  },
  {
    id: "TRX876546",
    date: "2024-12-01",
    description: "Late Fine for October Installment",
    amount: 500,
    status: "Unpaid", // Example of an unpaid late fine
    method: "N/A",
    receiptAvailable: false,
  },
];

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

// Helper function to get status badge classes (Adjusted for Black & White)
const getStatusBadge = (status) => {
  switch (status) {
    case "Paid":
      return (
        <span className="px-3 py-1 text-xs font-semibold leading-5 text-green-900 bg-green-200 rounded-full">
          {status}
        </span>
      );
    case "Pending":
      return (
        <span className="px-3 py-1 text-xs font-semibold leading-5 text-yellow-900 bg-yellow-200 rounded-full">
          {status}
        </span>
      );
    case "Unpaid":
    case "Due":
      return (
        <span className="px-3 py-1 text-xs font-semibold leading-5 text-red-900 bg-red-200 rounded-full">
          {status}
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 text-xs font-semibold leading-5 text-gray-800 bg-gray-300 rounded-full">
          {status}
        </span>
      );
  }
};

const handleDownload = (id) => {
    // In a real application, this would trigger an API call to generate/fetch the PDF.
    alert(`Downloading receipt for Transaction ID: ${id}`);
};

// Main Component
const SFeePayment = () => {
  // Calculate summary stats
  const totalPaid = FEE_TRANSACTIONS.filter(t => t.status === "Paid").reduce(
    (sum, t) => sum + t.amount,
    0
  );
  
  const totalDue = studentInfo.totalFee - totalPaid + FEE_TRANSACTIONS.filter(t => t.status === "Unpaid").reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="bg-gray-100 min-h-screen"> {/* Light Gray Background */}
      <SNavbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-2">
          Fee Payment Status & History 💳
        </h1>

        {/* Student Information Header */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Student Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
            <p>
              <span className="font-medium text-gray-800">Name:</span>{" "}
              {studentInfo.name}
            </p>
            <p>
              <span className="font-medium text-gray-800">ID:</span>{" "}
              {studentInfo.id}
            </p>
            <p>
              <span className="font-medium text-gray-800">Course:</span>{" "}
              {studentInfo.course}
            </p>
          </div>
        </div>
        
        {/* --- Fee Summary Card --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Fee Card */}
            <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-gray-500">
                <p className="text-sm font-semibold uppercase text-gray-500">Total Course Fee</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {formatCurrency(studentInfo.totalFee)}
                </h3>
            </div>
            {/* Paid Card (Using subdued green for positive status) */}
            <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-green-600">
                <p className="text-sm font-semibold uppercase text-gray-500">Total Amount Paid</p>
                <h3 className="text-3xl font-bold text-green-700 mt-1">
                    {formatCurrency(totalPaid)}
                </h3>
            </div>
            {/* Due Card (Using subdued red for negative status) */}
            <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-red-600">
                <p className="text-sm font-semibold uppercase text-gray-500">Amount Due</p>
                <h3 className="text-3xl font-bold text-red-700 mt-1">
                    {formatCurrency(totalDue)}
                </h3>
                {totalDue > 0 && (
                    <button className="mt-3 w-full py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition duration-150">
                        Pay Now
                    </button>
                )}
            </div>
        </div>
        
        {/* --- Transaction History Table --- */}
        <div className="bg-white p-6 rounded-lg shadow-xl overflow-x-auto border border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Payment Transaction History
          </h2>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Transaction ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {FEE_TRANSACTIONS.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-800">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(transaction.status)}
                  </td>
                  {/* NEW RECEIPT COLUMN */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {transaction.receiptAvailable ? (
                      <button
                        onClick={() => handleDownload(transaction.id)}
                        className="flex items-center text-sm px-3 py-1 border border-gray-400 text-gray-800 rounded-md hover:bg-gray-200 transition duration-150"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Download
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {FEE_TRANSACTIONS.length === 0 && (
            <p className="py-8 text-center text-gray-500 text-lg">
                No fee payment transactions recorded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SFeePayment;