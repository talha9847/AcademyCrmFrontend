import axios from "axios";
import React from "react";

const TestingResult = () => {
  const endPoint = [
    "041", "042", "043", "044", "045",
    "046", "047", "048", "049", "0410",
    "0411", "0412", "0413",
  ];

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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-xl border border-gray-100">
      <h2 className="text-2xl font-extrabold text-gray-900 text-center border-b pb-3 mb-4">
        🗳️ Constituency Results
      </h2>

      {/* Row count */}
      <div className="mb-2 text-sm text-gray-600 font-medium">
        Showing <strong>{contests.length}</strong> contest
        {contests.length > 1 ? "s" : ""}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="py-2 pl-3 pr-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {contests.map((contest, index) => {
              const statusInfo = getStatusInfo(contest.status);

              return (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition duration-150 ease-in-out"
                >
                  {/* Constituency */}
                  <td className="whitespace-nowrap py-3 pl-3 pr-3 text-sm font-medium">
                    <span className="text-indigo-600 font-bold">
                      {contest.constituency}
                    </span>
                    <span className="block text-xs text-gray-500">
                      No. {contest.constNo}
                    </span>
                  </td>

                  {/* Leading */}
                  <td className="whitespace-nowrap px-3 py-3 text-sm">
                    <p className="font-semibold">{contest.leadingCandidate}</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs text-white ${
                        partyColors[contest.leadingParty] || "bg-gray-500"
                      } mt-1`}
                    >
                      {contest.leadingParty}
                    </span>
                  </td>

                  {/* Trailing */}
                  <td className="whitespace-nowrap px-3 py-3 text-sm">
                    <p>{contest.trailingCandidate}</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs text-white ${
                        partyColors[contest.trailingParty] || "bg-gray-400"
                      } mt-1`}
                    >
                      {contest.trailingParty}
                    </span>
                  </td>

                  {/* Margin */}
                  <td className="whitespace-nowrap px-3 py-3 text-sm font-bold text-green-600">
                    {contest.margin.toLocaleString()}
                  </td>

                  {/* Round */}
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                    {contest.round}
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-3 py-3 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.color}`}
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

      <div className="mt-4 text-sm text-center text-gray-500">
        <p>
          Last Updated: <strong>{data.timestamp}</strong>
        </p>
      </div>

      {/* API Buttons */}
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        {endPoint.map((val, ind) => (
          <button
            key={ind}
            onClick={async () => {
              try {
                const result = await axios.get(
                  `http://localhost:5000/api/auth/fetchData/${val}`
                );

                if (result.data.contests) {
                  setContests(result.data.contests);
                  setActiveEndPoint(val); // ⭐ Set active button
                }

                console.log("API Result:", result.data);
              } catch (error) {
                console.error("Error fetching:", error);
              }
            }}
            className={`px-3 py-1 rounded text-white ${
              activeEndPoint === val
                ? "bg-green-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestingResult;
