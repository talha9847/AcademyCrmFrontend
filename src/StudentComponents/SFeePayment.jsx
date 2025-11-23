import React, { useEffect, useState } from "react";
// Assuming SNavbar is defined in a separate file
import SNavbar from "./SNavbar";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// NOTE: You must install and import icons from 'lucide-react' for the loaders and icons to display:
// import { Loader, Wallet, CheckCircle, TrendingDown, Tag, Download, X } from 'lucide-react';

// --- Helper Components & Functions ---

// Custom Loader component (Assumes Lucide-React Loader icon)
const CustomLoader = ({ className = "text-blue-500" }) => (
  <svg
    className={`animate-spin h-5 w-5 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
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
);

// Skeleton for data loading
const Skeleton = ({ className = "h-4 w-full" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const formatCurrency = (amount) => {
  // Handles cases where amount might be null, undefined, or empty string
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(0);
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(numericAmount);
};

const getStatusBadge = (status) => {
  switch (status) {
    case "Paid":
      return (
        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          {status}
        </span>
      );
    case "Pending":
      return (
        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
          {status}
        </span>
      );
    case "Unpaid":
    case "Due":
      return (
        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          {status}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
          {status}
        </span>
      );
  }
};

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

  return `${amountInWords} Rupees`;
}
const handleDownload = async (transaction, full_name) => {
  const receiptNumber = `${transaction.receipt_number}`;

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

  const inWords = await formatCurrencyInWords(transaction.amount_paid);

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
        <div id="student-name" class="detail-value">${full_name}</div>
      </div>

      <div class="detail-row">
        <div class="detail-label">Student ID:</div>
        <div id="student-id" class="detail-value">${transaction.roll_no}</div>
      </div>

      <div class="detail-row">
        <div class="detail-label">Course:</div>
        <div id="course" class="detail-value">N/A</div>
      </div>

      <div class="detail-row">
        <div class="detail-label">Address:</div>
        <div id="student-address" class="detail-value">${transaction.address}</div>
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

// --- Main Component ---
const SFeePayment = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  // Renaming to be more specific
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true); // Main data loader
  const [transactionLoading, setTransactionLoading] = useState(true); // Transaction history loader
  const [data, setData] = useState({
    total_fees: "",
    full_name: "",
    due_amount: "",
    email: "",
    roll_no: "",
    discount: "",
    paid_amount: "",
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [transaction, setTransaction] = useState([]);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        return resolve(true);
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (formData) => {
    const loaded = await loadRazorpay();

    if (!loaded) {
      toast.error("Failed to load Razorpay. Please refresh and try again.");
      return;
    }

    console.log("i am clicked");
    // 1️⃣ Create order in your backend
    const orderData = await axios.post(
      `${BASE_URL}/api/fees/createOrder`,
      {
        amount: formData.collectAmount,
      },
      { withCredentials: true }
    );
    console.log(orderData);

    const razorpayOrderId = orderData.data.razorpay_order_id;
    const dbOrderId = orderData.data.db_order_id;
    console.log(razorpayOrderId);

    // 2️⃣ Razorpay checkout options
    const options = {
      key: "rzp_test_RgiRbyDxaYiNWu",
      order_id: razorpayOrderId,
      amount: orderData.data.amount * 100,
      currency: "INR",

      handler: async function (response) {
        console.log(response);
        // Razorpay returns ALL THREE values
        const paymentId = response.razorpay_payment_id;
        const orderId = response.razorpay_order_id;
        const signature = response.razorpay_signature;
        console.log(paymentId, orderId, signature);
        setIsProcessingPayment(true);

        try {
          // 3️⃣ Verify payment on backend
          const result = await axios.post(
            `${BASE_URL}/api/fees/payFees`,
            {
              db_order_id: dbOrderId,
              razorpay_order_id: orderId,
              razorpay_payment_id: paymentId,
              razorpay_signature: signature,
              amount: formData.collectAmount,
            },
            { withCredentials: true }
          );

          if (result.status === 200) {
            toast.success("Payment successful!");
            setModal(false);
            reset();
            fetchFees(false);
            feesByStudent(false);
          }
        } catch (error) {
          toast.error(
            "Payment verified failed on server. Please check your transaction history."
          );
        } finally {
          setIsProcessingPayment(false);
        }
      },

      theme: { color: "#1D4ED8" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function () {
      toast.error("Payment failed. Please try again.");
    });

    rzp.open();
  };

  const fetchFees = async (setLoader = true) => {
    if (setLoader) setIsDataLoading(true);
    try {
      const result = await axios.get(
        `${BASE_URL}/api/fees/fetchFeesByStudent`,
        { withCredentials: true }
      );
      if (result.status == 256) {
        navigate("/login");
      }
      if (result.status == 200) {
        // Ensure data fields exist to prevent runtime errors
        setData(result.data.data || {});
        console.log(result.data.data);
      }
    } catch (error) {
      // Handle error: e.g. user not logged in or network issue
    } finally {
      if (setLoader) setIsDataLoading(false);
    }
  };

  const feesByStudent = async (setLoader = true) => {
    if (setLoader) setTransactionLoading(true);
    try {
      const result = await axios.get(`${BASE_URL}/api/fees/feesByStudent`, {
        withCredentials: true,
      });
      if (result.status == 256) {
        navigate("/login");
      }
      if (result.status == 200) {
        setTransaction(result.data.data || []);
      }
    } catch (error) {
      // Handle error
    } finally {
      if (setLoader) setTransactionLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
    feesByStudent();
  }, []);

  const discountAmount =
    (parseFloat(data.total_fees || 0) * parseFloat(data.discount || 0)) / 100;
  const netTotalFees = parseFloat(data.total_fees || 0) - discountAmount;

  return (
    <div className="bg-gray-50 min-h-screen">
      <SNavbar />
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-blue-500/50 pb-3">
          💰 Fee & Payment Dashboard
        </h1>

        {/* Student Details Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
            Student Profile
          </h2>
          {isDataLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-6 w-3/5" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <p>
                <span className="font-semibold text-gray-900 block">Name:</span>{" "}
                <span className="text-gray-600">{data.full_name || "N/A"}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-900 block">
                  Roll No:
                </span>{" "}
                <span className="text-gray-600">{data.roll_no || "N/A"}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-900 block">
                  Email:
                </span>{" "}
                <span className="text-gray-600">{data.email || "N/A"}</span>
              </p>
            </div>
          )}
        </div>

        {/* --- Fee Summary Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: "Total Course Fee (Net)",
              value: formatCurrency(netTotalFees),
              color: "bg-blue-600",
              icon: "Wallet",
              loading: isDataLoading,
            },
            {
              title: "Amount Paid",
              value: formatCurrency(data.paid_amount),
              color: "bg-green-600",
              icon: "CheckCircle",
              loading: isDataLoading,
            },
            {
              title: "Total Discount",
              value: formatCurrency(discountAmount),
              color: "bg-purple-600",
              icon: "Tag",
              loading: isDataLoading,
            },
            {
              title: "Amount Due",
              value: formatCurrency(data.due_amount),
              color: "bg-red-600",
              icon: "TrendingDown",
              loading: isDataLoading,
              button: true,
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition duration-300 border-t-8 ${
                card.color === "bg-blue-600"
                  ? "border-blue-600"
                  : card.color === "bg-green-600"
                  ? "border-green-600"
                  : card.color === "bg-purple-600"
                  ? "border-purple-600"
                  : "border-red-600"
              }`}
            >
              <p className="text-sm font-semibold uppercase text-gray-500 flex items-center justify-between">
                {card.title}
                {/* Placeholder for Lucide icon */}
                {/* <IconComponent name={card.icon} className={`w-5 h-5 ${card.color.replace('bg-', 'text-')}`} /> */}
              </p>
              {card.loading ? (
                <Skeleton className="h-9 w-3/4 mt-2 mb-1" />
              ) : (
                <h3
                  className={`text-3xl font-extrabold mt-1 ${card.color.replace(
                    "bg",
                    "text"
                  )}`}
                >
                  {card.value}
                </h3>
              )}

              {card.button && parseFloat(data.due_amount) > 0 && (
                <button
                  onClick={() => {
                    setModal(true);
                  }}
                  disabled={isProcessingPayment || isDataLoading}
                  className="mt-4 w-full py-2 flex items-center justify-center bg-red-600 text-white text-base font-medium rounded-lg hover:bg-red-700 transition duration-150 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessingPayment ? (
                    <>
                      <CustomLoader className="text-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* --- Transaction History Table --- */}
        <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Transaction History
          </h2>

          {transactionLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-1/6" />
                  <Skeleton className="h-6 w-1/6" />
                  <Skeleton className="h-6 w-1/12" />
                </div>
              ))}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Transaction ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Receipt No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {transaction.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-8 text-center text-gray-500 text-base"
                    >
                      No fee payment transactions recorded yet.
                    </td>
                  </tr>
                ) : (
                  transaction.map((t, ind) => (
                    <tr
                      key={ind + 1}
                      className="hover:bg-gray-50 transition duration-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                        {t.transaction_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {t.receipt_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(t.payment_date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-800">
                        {formatCurrency(t.amount_paid)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getStatusBadge(t.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDownload(t, data.full_name)}
                          className="flex items-center text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-150 border border-gray-300"
                        >
                          {/* <Download className="w-4 h-4 mr-1" /> */}
                          Download
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* --- Payment Modal --- */}
      {modal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmit(handlePayment)}
            className="bg-white rounded-xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              {/* <X className="w-6 h-6" /> */}
            </button>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Make a Fee Payment
            </h2>
            <p className="text-gray-500 text-sm mb-6 border-b pb-4">
              Processing fee for **{data.full_name || "Student"}** (
              {data.roll_no || "N/A"})
            </p>

            <div className="space-y-6 mb-8">
              {/* Fee Details Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs font-medium text-gray-500 uppercase">
                    Paid Amount
                  </div>
                  <div className="font-bold text-lg text-green-700">
                    {formatCurrency(data.paid_amount)}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs font-medium text-gray-500 uppercase">
                    Net Total Fee
                  </div>
                  <div className="font-bold text-lg text-gray-700">
                    {formatCurrency(netTotalFees)}
                  </div>
                </div>
              </div>

              {/* Due Amount */}
              <div className="p-4 rounded-lg flex justify-between items-center border border-red-400 bg-red-50 shadow-inner">
                <div className="text-sm font-semibold text-red-800">
                  Total Remaining Due
                </div>
                <div className="text-2xl font-extrabold text-red-800">
                  {formatCurrency(data.due_amount)}
                </div>
              </div>

              {/* Input Field */}
              <div>
                <label
                  htmlFor="collection-amount"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  Enter Payment Amount (₹)
                </label>
                <input
                  {...register("collectAmount", {
                    required: "Payment amount is required",
                    min: {
                      value: 100,
                      message: "Minimum amount is ₹100",
                    },
                    max: {
                      value: parseFloat(data.due_amount) || 0,
                      message: `Amount can't be greater than ${formatCurrency(
                        data.due_amount
                      )}`,
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Only whole numbers are allowed",
                    },
                  })}
                  id="collection-amount"
                  type="text"
                  placeholder="e.g., 5000"
                  className={`w-full border ${
                    errors.collectAmount ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-3 text-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition duration-150 font-mono`}
                />
                <div className="text-red-500 text-xs mt-1 h-3">
                  {errors.collectAmount?.message}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setModal(false)}
                disabled={isProcessingPayment}
                className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-150 font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessingPayment}
                className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-150 shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessingPayment ? (
                  <>
                    <CustomLoader className="text-white mr-2" />
                    Initiating...
                  </>
                ) : (
                  "Proceed to Razorpay"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SFeePayment;
