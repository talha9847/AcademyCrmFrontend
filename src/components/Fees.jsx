import { useEffect, useState } from "react";
import AdminNavbar from "../adminComponents/AdminNavbar";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// Load Tailwind CSS script for utility classes
/* global tailwind */

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [collectAmount, setCollectAmount] = useState("");
  const [selectedStudent, setSelectedStudent] = useState();
  const [message, setMessage] = useState();
  const [isValid, setIsValid] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function fetchFees() {
    const result = await axios.get("http://localhost:5000/api/fees/fetchFees", {
      withCredentials: true,
    });
    if (result.status == 200) {
      setFees(result.data.data);
    }
  }

  useEffect(() => {
    fetchFees();
  }, []);

  const totalAmount = fees.reduce((sum, person) => {
    return sum + parseFloat(person.total_fees || "0");
  }, 0);
  const totalDueAmount = fees.reduce(
    (sum, fee) => sum + (fee.total_fees - fee.paid_amount),
    0
  );

  const totalPaidAmount = totalAmount - totalDueAmount;

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

  async function getDetails(user) {
    setSelectedStudent(user);
  }

  async function validationError(amount, due) {
    if (amount == "") {
      setMessage("Amount is required");
      setIsValid(false);
      return false;
    }
    if (isNaN(amount)) {
      setMessage("Amount must be a number");
      setIsValid(false);
      return false;
    } else if (amount < 100) {
      setMessage("Minimum amount is 100");
      setIsValid(false);
      return false;
    } else if (parseInt(amount) > due) {
      setMessage("Amount can't be greater than remaining amount");
      setIsValid(false);
      return false;
    } else {
      setMessage("");
      setIsValid(true);
      return true;
    }
  }

  const collectFee = async (data) => {
    const send = {
      studentId: selectedStudent.student_id,
      feeId: selectedStudent.id,
      amountPaid: data.collectAmount,
      method: data.method,
      status: "paid",
    };
    const result = await axios.post(
      "http://localhost:5000/api/fees/collectFees",
      send,
      { withCredentials: true }
    );
    if (result.status == 200) {
      fetchFees();
      setIsDialogOpen(false);
      reset();
      console.log("fees paid successfullyy");
    }
  };

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
                        {fee.paid_amount >= 0 && (
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
                        <button
                          onClick={() => {
                            getDetails(fee);
                            setIsDialogOpen(true);
                          }}
                          className="bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 text-xs font-medium transition duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Collect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal/Dialog for Fee Collection */}
        {isDialogOpen && (
          <div className="fixed inset-0  flex items-center justify-center p-4  bg-opacity-60 z-50 transition-opacity duration-300 ">
            <form
              onSubmit={handleSubmit(collectFee)}
              className="bg-white rounded-xl w-full max-w-sm p-6 sm:p-8 shadow-2xl transform scale-100 transition-transform duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Collect Payment
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Processing fee for **{selectedStudent.full_name}**
              </p>

              <div className="space-y-4 mb-6">
                {/* Fee Details */}
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase">
                      Paid Amount
                    </div>
                    <div className="font-semibold text-gray-700">
                      {formatCurrency(selectedStudent.paid_amount)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase">
                      Total Amount
                    </div>
                    <div className="font-semibold text-gray-700">
                      {formatCurrency(selectedStudent.total_fees)}
                    </div>
                  </div>
                </div>

                {/* Due Amount */}
                <div className="bg-blue-50 p-3 rounded-lg flex justify-between items-center">
                  <div className="text-sm font-medium text-blue-800">
                    Remaining Due
                  </div>
                  <div className="text-xl font-extrabold text-blue-800">
                    {formatCurrency(selectedStudent.due_amount)}
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
                    {...register("collectAmount", {
                      required: "Amount is required",
                      min: {
                        value: 100,
                        message: "Minimum amount is 100",
                      },
                      max: {
                        value: selectedStudent.due_amount,
                        message: `Amount can't be greater than ${selectedStudent.due_amount}`,
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numbers are allowed",
                      },
                    })}
                    id="collection-amount"
                    type="text"
                    placeholder="1000.00"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition duration-150"
                  />
                  <div className="text-red-500 text-xs">
                    {errors.collectAmount?.message}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="collection-amount"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Payment Method
                  </label>
                  <select
                    {...register("method", {
                      required: "Please select payment method",
                    })}
                    id="method"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition duration-150"
                  >
                    <option value="cash">Cash</option>
                    <option value="online">Online</option>
                  </select>
                  <div className="text-red-500 text-xs">
                    {errors.method?.message}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDialogOpen(false);
                    reset();
                  }}
                  className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-150 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-150 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Collection
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fees;
