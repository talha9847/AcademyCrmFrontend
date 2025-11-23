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
  console.log(amountInWords);
  console.log(amount_paid);

  return `${amountInWords} Rupees`;
}

const printReceipt = async (transaction, studentInfo, totalFees) => {
  const receiptNumber = `${transaction.receipt_number}`;
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const inWords = await formatCurrencyInWords(transaction.amount_paid);
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
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fee Receipt - Mehtab Computer Academy</title>

    <style>
      :root {
        --primary: #6a1b9a;
        --accent: #ffd700;
        --text-dark: #1a1a1a;
        --text-light: #555;
        --border: #d8d8d8;
        --bg-light: #f8f9ff;
        --font: "Inter", Arial, sans-serif;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: var(--font);
        background: #eef2f9;
      }

      .page-wrapper {
        max-width: 900px;
        background: white;
        margin: 20px auto;
        padding: 30px 40px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
      }

      .header img {
        width: 80px;
        height: 80px;
        object-fit: contain;
      }

      .heading-text {
        text-align: right;
        max-width: 75%;
      }

      .heading-text h1 {
        margin: 0;
        font-size: 23px;
        font-weight: 900;
        color: var(--primary);
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      .heading-text p {
        margin: 5px 0 0;
        font-size: 0.95rem;
        color: var(--text-light);
        line-height: 1.4;
      }

      .header-divider {
        height: 5px;
        width: 100%;
        background: linear-gradient(to right, var(--primary), var(--accent));
        margin: 25px 0;
        border-radius: 5px;
      }

      .meta-box {
        display: flex;
        justify-content: space-between;
        gap: 25px;
        background: var(--bg-light);
        padding: 20px 25px;
        border: 1px solid var(--primary);
        border-radius: 8px;
        margin-bottom: 30px;
      }

      .meta-item {
        flex: 1;
      }

      .meta-label {
        font-weight: 700;
        color: var(--primary);
        display: block;
        margin-bottom: 5px;
        text-transform: uppercase;
        font-size: 0.9rem;
      }

      .meta-value {
        border-bottom: 2px solid var(--border);
        padding-bottom: 5px;
        color: var(--text-dark);
        font-weight: 600;
        font-size: 1.05rem;
      }

      .section-title {
        font-weight: 800;
        color: var(--primary);
        font-size: 1.25rem;
        margin-top: 20px;
        margin-bottom: 15px;
        border-bottom: 3px solid var(--primary);
        padding-bottom: 6px;
      }

      .detail-row {
        display: flex;
        margin-bottom: 16px;
        align-items: flex-end;
      }

      .detail-label {
        min-width: 200px;
        font-weight: 600;
        color: var(--text-light);
        padding-bottom: 3px;
      }

      .detail-value {
        flex: 1;
        border-bottom: 1px dashed var(--border);
        padding-bottom: 3px;
        font-weight: 500;
        color: var(--text-dark);
      }

      .payment-card {
        background: #fff;
        border: 1px solid var(--border);
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        margin-top: 0px;
        margin-bottom: 30px;
      }

      .summary-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
      }

      .summary-label {
        color: var(--text-light);
        font-size: 0.9rem;
        font-weight: 600;
        display: block;
        margin-bottom: 5px;
      }

      .summary-value {
        font-weight: 800;
        font-size: 1.1rem;
        border-bottom: 2px solid var(--border);
        padding-bottom: 5px;
        margin-top: 3px;
        color: var(--text-dark);
      }

      .status-paid {
        color: #28a745;
      }

      .status-pending {
        color: #dc3545;
      }

      .amount-section {
        margin-top: 30px;
        margin-bottom: 30px;
        border-left: 5px solid var(--primary);
        padding-left: 20px;
      }

      .amount-label {
        font-weight: 700;
        color: var(--primary);
        font-size: 1.1rem;
      }

      .amount-field {
        font-size: 2.5rem;
        font-weight: 900;
        padding-bottom: 8px;
        border-bottom: 4px double var(--primary);
        width: fit-content;
        color: var(--primary);
        margin-top: 8px;
      }

      .amount-words {
        margin-top: 15px;
        font-weight: 700;
        font-size: 1.3rem;
        color: var(--text-dark);
        background: var(--bg-light);
        padding: 8px 12px;
        border-radius: 4px;
        width: fit-content;
      }

      .signature-area {
        display: flex;
        justify-content: space-around;
        margin-top: 50px;
      }

      .sign-box {
        width: 40%;
        text-align: center;
        padding-top: 15px;
        border-top: 2px solid var(--text-light);
        font-weight: 600;
        color: var(--text-light);
      }

      .note {
        margin-top: 40px;
        padding: 15px;
        text-align: center;
        border: 1px solid #d40000;
        border-radius: 8px;
        background: #fff0f0;
        color: #a00000;
        font-size: 0.9rem;
        font-weight: 700;
      }

     

      @page {
        size: A4;
        margin: 10mm;
      }


      
    </style>
  </head>

  <body>
    <div class="page-wrapper">
      <div class="header">
        <img src="/logo.png" onerror="this.style.display='none'" />

        <div class="heading-text">
          <h1>Mehtab Computer Academy</h1>
          <p>
            AN ISO 9001-2015 CERTIFIED INSTITUTE | UAN No.: G4ZZ...<br />
            25-28, Signature Mall, Kosamba - 394120
          </p>
        </div>
      </div>

      <div class="header-divider"></div>

      <div class="meta-box">
        <div class="meta-item">
          <span class="meta-label">Receipt No.</span>
          <span id="receipt-no" class="meta-value">${receiptNumber}</span>
        </div>

        <div class="meta-item">
          <span class="meta-label">Date</span>
        <span id="transaction-date" class="meta-value">${transactionDate}</span>
        </div>
      </div>

      <div class="section-title">Student Details</div>

      <div class="detail-row">
        <div class="detail-label">Student Name:</div>
        <div id="student-name" class="detail-value">${studentInfo.name}</div>
      </div>

      <div class="detail-row">
        <div class="detail-label">Student ID:</div>
        <div id="student-id" class="detail-value">${studentInfo.rollNo}</div>
      </div>

      <div class="detail-row">
        <div class="detail-label">Address:</div>
        <div id="course" class="detail-value">${studentInfo.address}</div>
      </div>

      <div class="detail-row">
        <div class="detail-label">Email:</div>
        <div id="student-address" class="detail-value">${studentInfo.email}</div>
      </div>

      <div class="payment-card">
        <div class="section-title" style="border: none">Payment Summary</div>

        <div class="summary-grid">
          <div>
            <div class="summary-label">Payment Method:</div>
            <div id="payment-method" class="summary-value">${transaction.payment_method}</div>
          </div>

          <div>
            <div class="summary-label">Status:</div>
            <div id="status" class="summary-value">${transaction.status}</div>
          </div>
        </div>
      </div>

      <div class="amount-section">
        <div class="amount-label">Amount Paid</div>
        <div id="amount-paid" class="amount-field">${formattedAmount}</div>

        <div class="amount-words">
          <span id="amount-in-words">${inWords}</span> only
        </div>
      </div>

      <div class="signature-area">
        <div class="sign-box">Student's Signature</div>
        <div class="sign-box">Authorized Signature & Stamp</div>
      </div>

      <div class="note">
        * Once paid, fees are not refundable under any circumstances.
      </div>
    </div>
  </body>
</html>
  `;

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(receiptHTML);
  doc.close();

  // Wait for images to load
  const images = doc.images;
  let loadedCount = 0;
  const totalImages = images.length;

  if (totalImages === 0) {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  } else {
    for (let img of images) {
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        }
      };
    }
  }

  // Remove iframe after printing
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 2000);
};

// Main Component
export default function ViewStudentTransaction() {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const location = useLocation();
  const { studentId, name, total, rollNo, address, email } =
    location.state || {};
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
    console.log(transaction);
    setTimeout(() => {
      printReceipt(
        transaction,
        { studentId, name, rollNo, address, email },
        total
      );
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
                            transaction.status === "PAID"
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
