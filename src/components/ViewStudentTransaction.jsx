import React, { useEffect, useState } from "react";
import AdminNavbar from "../adminComponents/AdminNavbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
function convertToWords(num) {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

  if (num === 0) return "Zero";

  function toWords(num) {
    if (num === 0) return "";
    if (num < 20) return ones[num];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "")
      );
    if (num < 1000)
      return (
        ones[Math.floor(num / 100)] +
        " Hundred" +
        (num % 100 ? " " + toWords(num % 100) : "")
      );

    let idx = 0;
    let result = "";
    while (num > 0) {
      if (num % 1000 !== 0) {
        result =
          toWords(num % 1000) +
          " " +
          thousands[idx] +
          (result ? " " + result : "");
      }
      num = Math.floor(num / 1000);
      idx++;
    }
    return result;
  }

  return toWords(num).trim();
}

async function formatCurrencyInWords(amount_paid) {
  const amountInWords = convertToWords(amount_paid);

  return amountInWords + " Rupees";
}

const printReceipt = async (transaction, studentInfo, totalFees) => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const receiptNumber = `${transaction.receipt_number}-${new Date()
    .getTime()
    .toString()
    .slice(-6)}`;
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const transactionDate = new Date(transaction.payment_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(transaction.amount_paid);

  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(totalFees);

  const receiptHTML = `
   <!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fee Receipt - Mehtab Computer Academy</title>
    <style>
        /* --- Print Styles: Ensures clean, black & white printing --- */
        @media print {
            body { margin: 0; padding: 0; }
            body * { visibility: hidden; }
            .receipt-print-wrapper {
                visibility: visible;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                box-shadow: none;
                border: none;
            }
            .receipt-print-wrapper * { visibility: visible; }
            .receipt-container { border: 2px solid black !important; }
        }

        /* --- Traditional Web Styles --- */
        .receipt-print-wrapper {
            font-family: 'Times New Roman', serif; /* Traditional, paper-like font */
            display: flex;
            justify-content: center;
            padding: 20px;
            background-color: #f0f0f0; /* Light background for paper contrast */
        }

        .receipt-container {
            width: 100%;
            max-width: 650px;
            background-color: white;
            padding: 30px;
            border: 2px solid black; /* Strong border to mimic a paper form */
            box-shadow: 4px 4px 0 0 rgba(0, 0, 0, 0.1);
        }

        /* Header - Mimicking the letterhead and institution details */
        .receipt-header {
            text-align: center;
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 3px double black; /* Double line separator for header */
        }

        .academy-name {
            font-size: 30px;
            font-weight: 900;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .institute-details {
            font-size: 12px;
            margin-top: 5px;
            line-height: 1.4;
        }

        /* Content Fields: Uses dashed lines for writing space */
        .receipt-content {
            padding: 0;
        }

        .info-row-container {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }
        
        .info-field {
            display: flex;
            align-items: flex-end;
            padding: 10px 0;
            font-size: 14px;
            color: #111;
            border-bottom: 1px dashed #777; /* Dashed line for writing space */
            flex-grow: 1;
        }

        .info-label {
            font-weight: normal;
            color: #333;
            white-space: nowrap;
            padding-right: 8px;
            flex-shrink: 0;
        }

        .info-value {
            font-weight: bold; /* Bold value to mimic handwritten entry */
            color: black;
            flex-grow: 1;
            text-align: left;
            padding-left: 5px;
            min-width: 50px;
            text-decoration: underline; /* Emphasizes the filled-in value */
        }

        /* Layout specific adjustments for top fields */
        .receipt-no-date .info-field { width: 50%; }
        .receipt-no-date .info-field:nth-child(2) { padding-left: 20px; }
        @media (max-width: 400px) {
            .receipt-no-date .info-field { width: 100%; padding-left: 0 !important; }
        }

        .fees-in-words-row {
            padding: 20px 0;
        }

        /* Amount Paid Box: Large and bordered */
        .amount-box {
            display: flex;
            align-items: center;
            border: 2px solid black;
            padding: 10px;
            margin-top: 20px;
            width: 50%;
        }
        .amount-box .info-label { font-size: 16px; font-weight: bold; }
        .amount-box .info-value { 
            font-size: 20px; 
            font-weight: 900; 
            text-decoration: none; 
            padding-left: 20px;
        }

        /* Footer - Signatures and notes */
        .receipt-footer {
            margin-top: 30px;
            padding-top: 15px;
        }

        .signature-area {
            display: flex;
            justify-content: space-between;
            text-align: center;
            align-items:center;
            margin-top: 20px;
        }

        .signature-col {
            width: 45%;
        }

        .signature-line {
            border-top: 1px solid black;
            padding-top: 5px;
            font-size: 12px;
            font-weight: bold;
        }

        .note {
            margin-top: 30px;
            font-size: 11px;
            text-align: left;
            border: 1px solid black;
            padding: 5px 10px;
            background-color: #f7f7f7;
        }
    </style>
</head>
<body>
    <div class="receipt-print-wrapper">
        <div class="receipt-container">
            <div class="receipt-header">
                <div class="institute-details">
                    AN ISO 9001-2015 CERTIFIED INSTITUTE | UAN No.: G4ZZ... | UDIAM-GJ-06...<br>
                    25-28, Signature Mall, 1st Floor Near Mota Mandi Road, Kosamba - 394120
                </div>
                <div class="academy-name">Mehtab Computer Academy</div>
            </div>

            <div class="receipt-content">
                <!-- Receipt Number and Date -->
                <div class="info-row-container receipt-no-date">
                    <div class="info-field">
                        <span class="info-label">Receipt No.:</span>
                        <span class="info-value">${receiptNumber}</span>
                    </div>
                    <div class="info-field">
                        <!-- Using transactionDate as the main payment date -->
                        <span class="info-label">Date:</span>
                        <span class="info-value">${transactionDate}</span>
                    </div>
                </div>

                <!-- Student Information -->
                <div class="info-row-container">
                    <div class="info-field" style="width: 100%;">
                        <span class="info-label">Student Name:</span>
                        <span class="info-value">${studentInfo.name}</span>
                    </div>
                </div>
                
                <div class="info-row-container">
                    <div class="info-field" style="width: 100%;">
                        <span class="info-label">Student ID:</span>
                        <span class="info-value">${studentInfo.studentId}</span>
                    </div>
                </div>
                
                <div class="info-row-container">
                    <div class="info-field" style="width: 100%;">
                        <span class="info-label">Address:</span>
                        <span class="info-value">${
                          studentInfo.address || "N/A"
                        }</span>
                    </div>
                </div>

                <!-- Course/Fee Information -->
                <div class="info-row-container" style="margin-top: 20px;">
                    <div class="info-field" style="width: 50%;">
                        <span class="info-label">Course:</span>
                        <span class="info-value">${
                          studentInfo.course || "N/A"
                        }</span>
                    </div>
                    <div class="info-field" style="width: 50%;">
                        <span class="info-label">Total Fees:</span>
                        <span class="info-value">${formattedTotal}</span>
                    </div>
                </div>
                
                <div class="info-row-container">
                    <div class="info-field" style="width: 50%;">
                        <span class="info-label">Payment Method:</span>
                        <span class="info-value">${
                          transaction.payment_method || "Cash"
                        }</span>
                    </div>
                    <div class="info-field" style="width: 50%;">
                        <span class="info-label">Status:</span>
                        <span class="info-value" style="text-decoration: none; font-weight: 700;">
                            ${
                              transaction.status === "paid" ? "PAID" : "PENDING"
                            }
                        </span>
                    </div>
                </div>

                <!-- Amount in Words -->
                <div class="info-row-container fees-in-words-row">
                    <span class="info-label">Rupees in Words:</span>
                    <span class="info-value" style="text-decoration: none; font-style: italic; font-weight: bold; flex-grow: 0;">
                        ${await formatCurrencyInWords(
                          transaction.amount_paid
                        )} only
                    </span>
                </div>

                <!-- Amount Paid Box -->
                <div class="amount-box">
                    <span class="info-label">RS.</span>
                    <span class="info-value">${formattedAmount} /-</span>
                </div>
            </div>

            <div class="receipt-footer">
                <div class="signature-area">
                    <div class="signature-col">
                        <div class="signature-line">Student Sign.</div>
                    </div>
                    <div  class="signature-col">
                        <div class="signature-line">Authorised Signature</div>
                    </div>
                </div>
                
                <div class="note">
                    * Once Paid Fees Not Refundable.
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `;

  // Create a temporary div and inject the receipt
  const printDiv = document.createElement("div");
  printDiv.id = "receipt-print-container";
  printDiv.innerHTML = receiptHTML;
  document.body.appendChild(printDiv);
  document.title = `Fee Receipt - ${studentInfo.name} - ${receiptNumber}`;

  // Trigger print after content is rendered
  setTimeout(() => {
    window.print();

    // Remove after print dialog closes
    setTimeout(() => {
      const element = document.getElementById("receipt-print-container");
      if (element) {
        element.remove();
      }
    }, 500);
  }, 200);
};

// Main Component
export default function ViewStudentTransaction() {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const location = useLocation();
  const { studentId, name, total } = location.state || {};
  const [payments, setPayments] = useState([]);
  const [downloadingId, setDownloadingId] = useState(null);

  const getPayemnts = async (studentId) => {
    const result = await axios.post(
      `${BASE_URL}/api/fees/getFeesPaymentById`,
      { studentId },
      { withCredentials: true }
    );
    if (result.status == 200) {
      setPayments(result.data.data);
      console.log(result.data.data);
    }
  };

  useEffect(() => {
    getPayemnts(studentId);
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getMethodIcon = (method) => {
    return method === "Online" ? "🌐" : "💵";
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleDownloadReceipt = (transaction) => {
    setDownloadingId(transaction.id);
    setTimeout(() => {
      printReceipt(transaction, { studentId, name }, total);
      setDownloadingId(null);
    }, 300);
  };

  const paidAmount = payments.reduce(
    (amount, pay) => amount + parseFloat(pay.amount_paid),
    0
  );

  return (
    <div className="min-h-screen bg-white">
      <AdminNavbar />
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-black">
                Transaction History
              </h1>
              <p className="text-gray-600 mt-1 text-sm">{name}</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-gray-600 text-sm font-medium">
                Total Transactions
              </div>
              <div className="text-2xl font-bold text-black mt-2">
                {payments.length}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-green-600 text-sm font-bold">
                Total Amount Paid
              </div>
              <div className="text-2xl font-bold text-black mt-2">
                {formatCurrency(paidAmount)}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-red-500 font-bold text-sm">Due Amount</div>
              <div className="text-2xl font-bold text-black mt-2">
                {formatCurrency(total - paidAmount)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Transactions Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      NO.
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Method
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((transaction, ind) => (
                    <tr
                      key={ind + 1}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-4 text-sm font-mono text-gray-900">
                        {ind + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatDate(transaction.payment_date)}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {formatCurrency(transaction.amount_paid)}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="text-lg">
                          {getMethodIcon(transaction.payment_method)}
                        </span>
                        <div className="text-xs text-gray-600 mt-1">
                          {transaction.payment_method}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            transaction.status === "paid"
                              ? "bg-gray-900 text-white"
                              : "bg-gray-300 text-gray-900"
                          }`}
                        >
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDownloadReceipt(transaction)}
                          disabled={downloadingId === transaction.id}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition duration-200 flex items-center gap-2 justify-center whitespace-nowrap"
                        >
                          {downloadingId === transaction.id ? (
                            <>
                              <span className="animate-spin">⟳</span>
                              Opening...
                            </>
                          ) : (
                            <>
                              <span>📥</span>
                              Download
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-gray-600 text-lg">No transactions found</div>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
