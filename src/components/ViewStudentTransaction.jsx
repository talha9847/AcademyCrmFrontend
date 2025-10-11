import React, { useEffect, useState } from "react";
import AdminNavbar from "../adminComponents/AdminNavbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const printReceipt = (transaction, studentInfo, totalFees) => {
  const receiptNumber = `REC-${transaction.id}-${new Date().getTime().toString().slice(-6)}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const transactionDate = new Date(transaction.payment_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(transaction.amount_paid);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(totalFees);

  const receiptHTML = `
    <style>
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        
        body * {
          visibility: hidden;
        }
        
        .receipt-print-wrapper {
          visibility: visible;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        
        .receipt-print-wrapper * {
          visibility: visible;
        }
      }

      .receipt-print-wrapper {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: block;
        width: 100%;
      }

      .receipt-container {
        max-width: 800px;
        margin: 0 auto;
        background-color: white;
        padding: 20px;
      }

      .receipt-header {
        background: linear-gradient(135deg, #1967D2 0%, #1546a0 100%);
        color: white;
        padding: 40px 30px;
        text-align: center;
        border-bottom: 4px solid #ffd700;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .academy-name {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 5px;
        letter-spacing: 0.5px;
      }

      .receipt-title {
        font-size: 16px;
        font-weight: 300;
        opacity: 0.95;
      }

      .receipt-content {
        padding: 40px 0;
      }

      .section {
        margin-bottom: 30px;
      }

      .section-title {
        font-size: 13px;
        font-weight: bold;
        color: #1967D2;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom: 2px solid #1967D2;
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        font-size: 14px;
        color: #333;
        border-bottom: 1px solid #f0f0f0;
      }

      .info-label {
        font-weight: 600;
        color: #555;
      }

      .info-value {
        color: #333;
        text-align: right;
      }

      .student-box {
        background-color: #f9f9f9;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        padding: 20px;
        margin-bottom: 20px;
      }

      .student-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 14px;
      }

      .student-row:last-child {
        margin-bottom: 0;
      }

      .student-label {
        font-weight: bold;
        color: #555;
        width: 35%;
      }

      .student-value {
        color: #333;
        flex: 1;
      }

      .payment-details-box {
        background-color: #f0f7ff;
        border-left: 4px solid #1967D2;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .payment-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        font-size: 14px;
      }

      .payment-row:last-child {
        margin-bottom: 0;
      }

      .payment-label {
        font-weight: 600;
        color: #555;
      }

      .payment-value {
        color: #333;
      }

      .amount-paid {
        font-size: 18px;
        font-weight: bold;
        color: #228B22;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .status-badge {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .status-paid {
        background-color: #d4edda;
        color: #155724;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .status-pending {
        background-color: #fff3cd;
        color: #856404;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .receipt-footer {
        background-color: #f5f5f5;
        padding: 25px 30px;
        border-top: 1px solid #e0e0e0;
        text-align: center;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .footer-text {
        font-size: 12px;
        color: #888;
        margin-bottom: 8px;
      }

      .footer-thanks {
        font-size: 13px;
        font-weight: 600;
        color: #1967D2;
      }

      .divider {
        height: 1px;
        background-color: #e0e0e0;
        margin: 20px 0;
      }
    </style>

    <div class="receipt-print-wrapper">
      <div class="receipt-container">
        <div class="receipt-header">
          <div class="academy-name">Mehtab Computer Academy</div>
          <div class="receipt-title">Professional Fee Receipt</div>
        </div>

        <div class="receipt-content">
          <div class="section">
            <div class="section-title">Receipt Details</div>
            <div class="info-row">
              <span class="info-label">Receipt Number:</span>
              <span class="info-value">${receiptNumber}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Receipt Date:</span>
              <span class="info-value">${currentDate}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Payment Date:</span>
              <span class="info-value">${transactionDate}</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="section">
            <div class="section-title">Student Information</div>
            <div class="student-box">
              <div class="student-row">
                <span class="student-label">Name:</span>
                <span class="student-value">${studentInfo.name}</span>
              </div>
              <div class="student-row">
                <span class="student-label">Student ID:</span>
                <span class="student-value">${studentInfo.studentId}</span>
              </div>
              <div class="student-row">
                <span class="student-label">Total Fees:</span>
                <span class="student-value">${formattedTotal}</span>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Payment Information</div>
            <div class="payment-details-box">
              <div class="payment-row">
                <span class="payment-label">Description:</span>
                <span class="payment-value">Monthly Fee Payment</span>
              </div>
              <div class="payment-row">
                <span class="payment-label">Payment Method:</span>
                <span class="payment-value">${transaction.payment_method || 'Online'}</span>
              </div>
              <div class="payment-row">
                <span class="payment-label">Amount Paid:</span>
                <span class="amount-paid">${formattedAmount}</span>
              </div>
              <div class="payment-row">
                <span class="payment-label">Status:</span>
                <span class="status-badge ${transaction.status === 'paid' ? 'status-paid' : 'status-pending'}">
                  ${transaction.status === 'paid' ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="receipt-footer">
          <div class="footer-text">This is a computer-generated receipt. No signature required.</div>
          <div class="footer-thanks">Thank you for your payment!</div>
          <div class="footer-text" style="margin-top: 15px; font-size: 11px;">
            Mehtab Computer Academy | Contact: +91-XXXXXXXXXX | Email: info@mehtab.com
          </div>
        </div>
      </div>
    </div>
  `;

  // Create a temporary div and inject the receipt
  const printDiv = document.createElement('div');
  printDiv.id = 'receipt-print-container';
  printDiv.innerHTML = receiptHTML;
  document.body.appendChild(printDiv);

  // Trigger print after content is rendered
  setTimeout(() => {
    window.print();
    
    // Remove after print dialog closes
    setTimeout(() => {
      const element = document.getElementById('receipt-print-container');
      if (element) {
        element.remove();
      }
    }, 500);
  }, 200);
};

// Main Component
export default function ViewStudentTransaction() {
  const location = useLocation();
  const { studentId, name, total } = location.state || {};
  const [payments, setPayments] = useState([]);
  const [downloadingId, setDownloadingId] = useState(null);

  const getPayemnts = async (studentId) => {
    const result = await axios.post(
      "http://localhost:5000/api/fees/getFeesPaymentById",
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