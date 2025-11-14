import axios from "axios";
import React, { useEffect, useState } from "react";

const TestingResult = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const endPoint = [
    "041",
    "042",
    "043",
    "044",
    "045",
    "046",
    "047",
    "048",
    "049",
    "0410",
    "0411",
    "0412",
    "0413",
  ];

  const [number, setNumber] = useState(5000);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(null);

  const data = {
    status: "success",
    total: 8,
    timestamp: "2025-11-14T06:56:40.403Z",
    contests: [
      {
        constituency: "BAJPATTI",
        constNo: "27",
        leadingCandidate: "RAMESHWAR KUMAR MEHTO",
        leadingParty: "Rashtriya Lok Morcha",
        trailingCandidate: "MUKESH KUMAR YADAV",
        trailingParty: "Rashtriya Janata Dal",
        margin: 1862,
        round: "5/29",
        status: "Result in Progress",
      },
      {
        constituency: "BAJPATTI",
        constNo: "27",
        leadingCandidate: "RAMESHWAR KUMAR MEHTO",
        leadingParty: "Rashtriya Lok Morcha",
        trailingCandidate: "MUKESH KUMAR YADAV",
        trailingParty: "Rashtriya Janata Dal",
        margin: 1862,
        round: "5/29",
        status: "Result in Progress",
      },
    ],
  };

  // ⭐ State
  const [contests, setContests] = React.useState(data.contests);
  const [activeEndPoint, setActiveEndPoint] = React.useState(null);

  const partyColors = {
    "Rashtriya Lok Morcha": "bg-indigo-500",
    "Rashtriya Janata Dal": "bg-red-500",
  };

  const getStatusInfo = (status) => {
    if (status.includes("Progress"))
      return { text: status, color: "text-yellow-600 bg-yellow-50" };
    if (status.includes("Declared"))
      return { text: status, color: "text-green-600 bg-green-50" };
    return { text: status, color: "text-gray-500 bg-gray-50" };
  };

  const headers = [
    { key: "constituency", label: "Constituency" },
    { key: "leading", label: "Leading Candidate (Party)" },
    { key: "trailing", label: "Trailing Candidate (Party)" },
    { key: "margin", label: "Margin" },
    { key: "round", label: "Round" },
    { key: "status", label: "Status" },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${BASE_URL}/api/auth/fetchalldata`, {
        number,
      });
      if (result.data.contests) {
        setContests(result.data.contests);
        setActiveEndPoint(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-200 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h2 className="text-3xl font-extrabold text-white text-center flex items-center justify-center gap-3">
              <span className="text-4xl">🗳️</span>
              <span>Constituency Election Results</span>
            </h2>
            <p className="text-center text-indigo-100 mt-2 text-sm">
              Live tracking of election results and vote counting
            </p>
          </div>

          {/* Search Section */}
          <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <div className="flex-1 max-w-md">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search by Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none shadow-sm"
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                  placeholder="Enter number..."
                />
              </div>
              <button
                onClick={() => {
                  fetchData();
                }}
                disabled={loading}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    Get Data
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="px-8 py-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-600">
                Showing{" "}
                <span className="text-lg font-bold text-indigo-600">
                  {contests.length}
                </span>{" "}
                contest
                {contests.length !== 1 ? "s" : ""}
              </div>
              <div className="text-xs text-gray-500">
                Last Updated:{" "}
                <strong className="text-gray-700">{data.timestamp}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <svg
                  className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="text-gray-600 font-medium">Loading results...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    {headers.map((header) => (
                      <th
                        key={header.key}
                        className="py-4 px-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {contests.map((contest, index) => {
                    const statusInfo = getStatusInfo(contest.status);

                    return (
                      <tr
                        key={index}
                        className="hover:bg-indigo-50 transition-colors duration-150 ease-in-out"
                      >
                        {/* Constituency */}
                        <td className="whitespace-nowrap py-4 px-6 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              {contest.constNo}
                            </div>
                            <div>
                              <span className="text-indigo-700 font-bold block">
                                {contest.constituency}
                              </span>
                              <span className="text-xs text-gray-500">
                                Const. No. {contest.constNo}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Leading */}
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {contest.leadingCandidate}
                              </p>
                              <span
                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white ${
                                  partyColors[contest.leadingParty] ||
                                  "bg-gray-500"
                                } mt-1 shadow-sm`}
                              >
                                {contest.leadingParty}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Trailing */}
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-gray-700">
                                {contest.trailingCandidate}
                              </p>
                              <span
                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white ${
                                  partyColors[contest.trailingParty] ||
                                  "bg-gray-400"
                                } mt-1 shadow-sm`}
                              >
                                {contest.trailingParty}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Margin */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">📊</span>
                            <span className="font-bold text-green-600 text-base">
                              {contest.margin.toLocaleString()}
                            </span>
                          </div>
                        </td>

                        {/* Round */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                            {contest.round}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold shadow-sm ${statusInfo.color}`}
                          >
                            {statusInfo.text}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* API Buttons Section */}
        <div className="mt-6 bg-white shadow-xl rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">🔄</span>
            Quick Access Endpoints
          </h3>
          <div className="flex flex-wrap gap-3">
            {endPoint.map((val, ind) => (
              <button
                key={ind}
                onClick={async () => {
                  setButtonLoading(val);
                  try {
                    const result = await axios.post(
                      `${BASE_URL}/api/auth/fetchData/${val}`,{number}
                    );

                    if (result.data.contests) {
                      setContests(result.data.contests);
                      setActiveEndPoint(val);
                    }

                    console.log("API Result:", result.data);
                  } catch (error) {
                    console.error("Error fetching:", error);
                  } finally {
                    setButtonLoading(null);
                  }
                }}
                disabled={buttonLoading === val}
                className={`px-5 py-3 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeEndPoint === val
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white ring-2 ring-green-300"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                }`}
              >
                {buttonLoading === val ? (
                  <svg
                    className="animate-spin h-4 w-4 mx-auto"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  `page ${ind + 1}`
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingResult;