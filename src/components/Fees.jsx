import { useEffect, useState } from "react";
import AdminNavbar from "../adminComponents/AdminNavbar";
import axios from "axios";
// Load Tailwind CSS script for utility classes
/* global tailwind */

const Fees = () => {
  const [fees, setFees] = useState([]);
  async function fetchFees() {
    const result = await axios.get("http://localhost:5000/api/fees/fetchFees", {
      withCredentials: true,
    });
    if (result.status == 200) {
      setFees(result.data.data);
      console.log(result.data.data);
    }
  }

  useEffect(() => {
    fetchFees();
  },[]);
  const [selectedFee, setSelectedFee] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [collectAmount, setCollectAmount] = useState("");
  const [modalMessage, setModalMessage] = useState({ text: "", type: "" }); // For custom alert/message box

  const openCollectDialog = (fee) => {
    setSelectedFee(fee);
    setCollectAmount("");
    setModalMessage({ text: "", type: "" });
    setIsDialogOpen(true);
  };

  const showMessage = (text, type = "error") => {
    setModalMessage({ text, type });
    // Hide after 3 seconds
    setTimeout(() => setModalMessage({ text: "", type: "" }), 3000);
  };

  const handleCollectFee = () => {
    const amount = parseFloat(collectAmount);

    if (!collectAmount || isNaN(amount) || amount <= 0) {
      showMessage("Please enter a valid amount greater than zero.");
      return;
    }

    const remainingAmount = selectedFee.amount - selectedFee.paidAmount;

    if (amount > remainingAmount) {
      showMessage(
        `Amount cannot exceed the remaining due amount of ${formatCurrency(
          remainingAmount
        )}.`,
        "error"
      );
      return;
    }

    setFees((prevFees) =>
      prevFees.map((fee) =>
        fee.id === selectedFee.id
          ? {
              ...fee,
              paidAmount: fee.paidAmount + amount,
              status: fee.paidAmount + amount >= fee.amount ? "paid" : "unpaid",
            }
          : fee
      )
    );

    showMessage(
      `${formatCurrency(amount)} collected successfully for ${
        selectedFee.studentName
      }.`,
      "success"
    );

    // Close the dialog after a brief delay so the user sees the success message
    setTimeout(() => {
      setIsDialogOpen(false);
      setSelectedFee(null);
      setCollectAmount("");
    }, 500);
  };

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

  const totalAmount = fees.reduce((sum, fee) => sum + fee.total_fees, 0);
  const totalDueAmount = fees.reduce(
    (sum, fee) => sum + (fee.total_fees - fee.paid_amount),
    0
  );


  const totalPaidAmount = totalAmount - totalDueAmount;

  return (
    <div className="min-h-screen bg-gray-50  font-sans">
      <AdminNavbar />

      <style>{`
        .table-container::-webkit-scrollbar {
            height: 8px;
        }
        .table-container::-webkit-scrollbar-thumb {
            background: #d1d5db; /* gray-300 */
            border-radius: 4px;
        }
        .table-container::-webkit-scrollbar-thumb:hover {
            background: #9ca3af; /* gray-400 */
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">
            Fee Collection Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Track and manage student payments in real-time.
          </p>
        </div>

        {/* Summary Cards: Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Card 1: Total Amount */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-lg transform hover:scale-[1.01] transition duration-300">
            <div className="text-sm font-medium text-blue-600">
              Total Amount
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-1">
              {formatCurrency(totalAmount)}
            </div>
            <p className="text-xs text-gray-400 mt-2">All fees registered</p>
          </div>

          {/* Card 2: Total Paid */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-lg transform hover:scale-[1.01] transition duration-300">
            <div className="text-sm font-medium text-green-600">
              Total Collected
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-1">
              {formatCurrency(totalPaidAmount)}
            </div>
            <p className="text-xs text-gray-400 mt-2">Successfully processed</p>
          </div>

          {/* Card 3: Total Due */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-lg transform hover:scale-[1.01] transition duration-300">
            <div className="text-sm font-medium text-red-600">
              Outstanding Due
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-1">
              {formatCurrency(totalDueAmount)}
            </div>
            <p className="text-xs text-gray-400 mt-2">Awaiting payment</p>
          </div>
        </div>

        {/* Fee Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto table-container">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount / Due
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 sm:px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fees.map((fee) => {
                  const dueAmount = fee.total_fees - fee.paid_amount;
                  const isPaid = fee.status === "paid";
                  return (
                    <tr
                      key={fee.id}
                      className="hover:bg-blue-50/50 transition duration-150"
                    >
                      <td className="px-4 py-3 sm:px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                        {fee.full_name}
                      </td>
                      <td className="px-4 py-3 sm:px-6 whitespace-nowrap text-sm text-gray-600">
                        {fee.email}
                      </td>
                      <td className="px-4 py-3 sm:px-6 whitespace-nowrap">
                        <div className="font-bold text-gray-900 text-sm">
                          {formatCurrency(fee.total_fees)}
                        </div>
                        {fee.paid_amount > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            Paid: {formatCurrency(fee.paid_amount)} | Due:{" "}
                            <span
                              className={
                                dueAmount > 0
                                  ? "text-red-500 font-medium"
                                  : "text-green-600"
                              }
                            >
                              {formatCurrency(dueAmount)}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 sm:px-6 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(fee.due_date)}
                      </td>
                      <td className="px-4 py-3 sm:px-6 whitespace-nowrap text-center">
                        <span
                          className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full shadow-sm ${
                            isPaid
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {isPaid ? "PAID" : "DUE"}
                        </span>
                      </td>
                      <td className="px-4 py-3 sm:px-6 whitespace-nowrap text-center">
                        {!isPaid && (
                          <button
                            onClick={() => openCollectDialog(fee)}
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 text-xs font-medium transition duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Collect
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom Message Box (Replaces alert) */}
        {modalMessage.text && (
          <div
            className="fixed bottom-4 right-4 z-[60] p-4 rounded-lg shadow-xl text-white max-w-sm w-full transition-opacity duration-300"
            style={{
              backgroundColor:
                modalMessage.type === "error" ? "#EF4444" : "#10B981",
            }}
          >
            <p className="font-semibold">
              {modalMessage.type === "error" ? "Error" : "Success"}
            </p>
            <p className="text-sm mt-1">{modalMessage.text}</p>
          </div>
        )}

        {/* Modal/Dialog for Fee Collection */}
        {isDialogOpen && selectedFee && (
          <div className="fixed inset-0 flex items-center justify-center p-4  bg-opacity-60 z-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl w-full max-w-sm p-6 sm:p-8 shadow-2xl transform scale-100 transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Collect Payment
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Processing fee for **{selectedFee.studentName}**.
              </p>

              <div className="space-y-4 mb-6">
                {/* Fee Details */}
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase">
                      Fee Type
                    </div>
                    <div className="font-semibold text-gray-700">
                      {selectedFee.feeType}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase">
                      Total Amount
                    </div>
                    <div className="font-semibold text-gray-700">
                      {formatCurrency(selectedFee.amount)}
                    </div>
                  </div>
                </div>

                {/* Due Amount */}
                <div className="bg-blue-50 p-3 rounded-lg flex justify-between items-center">
                  <div className="text-sm font-medium text-blue-800">
                    Remaining Due
                  </div>
                  <div className="text-xl font-extrabold text-blue-800">
                    {formatCurrency(
                      selectedFee.amount - selectedFee.paidAmount
                    )}
                  </div>
                </div>

                {/* Input Field */}
                <div>
                  <label
                    htmlFor="collection-amount"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Enter Collection Amount
                  </label>
                  <input
                    id="collection-amount"
                    type="number"
                    placeholder="e.g., 500.00"
                    value={collectAmount}
                    onChange={(e) => setCollectAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition duration-150"
                    min="0.01"
                    step="0.01"
                    max={selectedFee.amount - selectedFee.paidAmount}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-150 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCollectFee}
                  disabled={!collectAmount || parseFloat(collectAmount) <= 0}
                  className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-150 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Collection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fees;
