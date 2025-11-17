import React, { useEffect, useState } from "react";
// Assuming SNavbar is defined in a separate file
import SNavbar from "./SNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const handleDownload = (id) => {
  alert(`Downloading receipt for Transaction ID: ${id}`);
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

    const options = {
      key: "rzp_test_RgiRbyDxaYiNWu",
      amount: formData.collectAmount * 100, 
      currency: "INR",
      name: "Mehtab Academy",
      description: `Fee Payment for ${data.full_name || "Student"}`,
      handler: async function (response) {
        setIsProcessingPayment(true); 
        try {
          const result = await axios.post(
            `${BASE_URL}/api/fees/payFees`,
            {
              fees: formData.collectAmount,
              razorPayId: response.razorpay_payment_id,
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
            "Payment successful, but verification failed on server. Please check your transaction history."
          );
        } finally {
          setIsProcessingPayment(false);
        }
      },
      theme: { color: "#1D4ED8" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
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
                          onClick={() => handleDownload(t.receipt_number)}
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
