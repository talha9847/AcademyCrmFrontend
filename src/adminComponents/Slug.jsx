import React, { useState, useEffect, useCallback } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { toast } from "react-toastify";

// --- STATIC STUDENT MOCK DATA ---
const mockStudents = [
  { id: 101, full_name: "Student X (ID 101)" },
  { id: 102, full_name: "Student Y (ID 102)" },
  { id: 103, full_name: "Student Z (ID 103)" },
];

const mockStudentSlugs = [
  { id: 1001, user_id: 101, name: "student-dashboard", is_enabled: true },
  { id: 1002, user_id: 101, name: "my-courses", is_enabled: true },
  { id: 1003, user_id: 102, name: "settings", is_enabled: false },
  { id: 1004, user_id: 103, name: "transcript", is_enabled: true },
];
// ----------------------------------

// Simple Toggle Switch
const ToggleSwitch = ({ enabled, onToggle, disabled }) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled} // Disable the button when loading
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-black" : "bg-gray-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

// Simple Loader
const Loader = () => {
  return (
    <div className="flex justify-center py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
    </div>
  );
};

// Small Loader for Toggle
const SmallLoader = () => {
  return (
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black inline-block ml-2"></div>
  );
};

const Slug = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  // --- Tab State ---
  const [activeTab, setActiveTab] = useState("teacher"); // 'teacher' or 'student'

  // --- Teacher API States ---
  const [users, setUsers] = useState([]); // Teachers
  const [students, setStudents] = useState([]); // Teachers
  const [loading, setLoading] = useState(false);

  // --- Shared States ---
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userSlugs, setUserSlugs] = useState([]);
  const [slugsLoading, setSlugsLoading] = useState(false);
  const [togglingSlugId, setTogglingSlugId] = useState(null);

  // --- Handlers ---

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedUserId(null); // Reset selection when changing tabs
    setUserSlugs([]); // Clear slugs
  };

  // --- TEACHER LOGIC (API) ---

  const fetchSlugsForUser = useCallback(
    async (userId) => {
      setSlugsLoading(true);
      try {
        if (activeTab === "teacher") {
          // Existing Teacher API Logic
          const slugs = await axios.post(
            `${BASE_URL}/api/extras/getSlugByUserId`,
            { id: userId },
            { withCredentials: true }
          );
          if (slugs.status === 200) {
            setUserSlugs(slugs.data.data);
          }
        } else if (activeTab === "student") {
          const slugs = await axios.post(
            `${BASE_URL}/api/extras/getSlugByUserId`,
            { id: userId },
            { withCredentials: true }
          );
          if (slugs.status === 200) {
            setUserSlugs(slugs.data.data);
          }
        }
      } catch (error) {
        toast.error(`Failed to fetch slugs for ${activeTab}.`);
        setUserSlugs([]);
      }
      setSlugsLoading(false);
    },
    [BASE_URL, activeTab]
  );

  const getUser = async () => {
    setLoading(true);
    try {
      // Fetch Teachers
      const result = await axios.get(`${BASE_URL}/api/extras/getTeachers`, {
        withCredentials: true,
      });
      if (result.status === 200) {
        setUsers(result.data.data);
      }
    } catch (error) {
      // Error handling is intentionally minimal as per original code, but could be improved
    }
    setLoading(false);
  };
  const getStudents = async () => {
    setLoading(true);
    try {
      // Fetch Teachers
      const result = await axios.get(`${BASE_URL}/api/extras/getStudents`, {
        withCredentials: true,
      });
      if (result.status === 200) {
        setStudents(result.data.data);
      }
    } catch (error) {
      // Error handling is intentionally minimal as per original code, but could be improved
    }
    setLoading(false);
  };

  // --- Effects ---

  useEffect(() => {
    // Only fetch teachers if the active tab is 'teacher'
    if (activeTab === "teacher") {
      getUser();
    } else {
      getStudents();
    }
  }, [BASE_URL, activeTab]);

  useEffect(() => {
    if (selectedUserId !== null) {
      fetchSlugsForUser(selectedUserId);
    } else {
      setUserSlugs([]);
    }
  }, [selectedUserId, fetchSlugsForUser]);

  // --- Shared Handlers ---

  const handleUserSelect = (event) => {
    const userId = parseInt(event.target.value, 10);
    console.log("im called");
    console.log(userId);
    setSelectedUserId(userId || null);
  };

  const handleToggle = async (slug) => {
    setTogglingSlugId(slug.id);

    try {
      let result;

      if (activeTab === "teacher") {
        // Teacher API Toggle Logic
        result = await axios.put(
          `${BASE_URL}/api/extras/toggleSlug`,
          {
            id: slug.id,
            value: !slug.is_enabled,
          },
          { withCredentials: true }
        );

        if (result.status === 200) {
          toast.success("Updated successfully");
          fetchSlugsForUser(selectedUserId); // Re-fetch data
        } else {
          toast.error("Update failed with status: " + result.status);
        }
      } else if (activeTab === "student") {
        result = await axios.put(
          `${BASE_URL}/api/extras/toggleSlug`,
          {
            id: slug.id,
            value: !slug.is_enabled,
          },
          { withCredentials: true }
        );

        if (result.status === 200) {
          toast.success("Updated successfully");
          fetchSlugsForUser(selectedUserId); // Re-fetch data
        } else {
          toast.error("Update failed with status: " + result.status);
        }
        fetchSlugsForUser(selectedUserId);
        toast.success("Static Student status updated successfully (Mock)");
      }
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
    } finally {
      setTogglingSlugId(null);
    }
  };

  // Determine which list of users/entities to display
  const currentUsers = activeTab === "teacher" ? users : students;
  const currentLoading = activeTab === "teacher" ? loading : loading; // Student list is static, so no loading

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="container mx-auto p-6 lg:p-10 max-w-6xl">
        <h1 className="text-3xl font-bold text-black mb-8">
          User Page Access Management
        </h1>

        {/* --- TABS --- */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            onClick={() => handleTabChange("teacher")}
            className={`py-2 px-4 text-lg font-medium transition-colors ${
              activeTab === "teacher"
                ? "border-b-4 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            🧑‍🏫 Teacher Management
          </button>
          <button
            onClick={() => handleTabChange("student")}
            className={`py-2 px-4 text-lg font-medium transition-colors ${
              activeTab === "student"
                ? "border-b-4 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            🎓 Student Management
          </button>
        </div>
        {/* ------------- */}

        {/* === USER SELECTION START === */}
        <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200">
          <label
            htmlFor="user-select"
            className="block text-lg font-semibold text-black mb-3"
          >
            Select {activeTab === "teacher" ? "Teacher" : "Student"}
          </label>

          {currentLoading ? (
            <Loader />
          ) : (
            <select
              id="user-select"
              onChange={handleUserSelect}
              value={selectedUserId || ""}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:border-black"
            >
              <option value="">
                -- Select {activeTab === "teacher" ? "Teacher" : "Student"} --
              </option>
              {currentUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.full_name || user.name}{" "}
                </option>
              ))}
            </select>
          )}
        </div>
        {/* === USER SELECTION END === */}

        {/* === SLUG STATUS DISPLAY START === */}
        {selectedUserId && slugsLoading && (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <Loader />
          </div>
        )}

        {selectedUserId && !slugsLoading && userSlugs.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-black">
                Page Access Settings for{" "}
                {activeTab === "teacher" ? "Teacher" : "Student"}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                      Page
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                      Toggle
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {userSlugs.map((slug, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-black">
                        /{slug.name || slug.pages}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                            slug.is_enabled
                              ? "bg-black text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {slug.is_enabled ? "Enabled" : "Disabled"}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center">
                        <ToggleSwitch
                          enabled={slug.is_enabled}
                          onToggle={() => handleToggle(slug)}
                          disabled={togglingSlugId === slug.id}
                        />
                        {togglingSlugId === slug.id && <SmallLoader />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Conditional Messages */}
        {!slugsLoading &&
          (!selectedUserId || (selectedUserId && userSlugs.length === 0)) && (
            <div className="bg-white border-l-4 border-black p-6 rounded">
              <p className="text-sm text-gray-700">
                {selectedUserId
                  ? `No page access configurations found for this selected ${activeTab}.`
                  : `Please use the dropdown above to select a ${activeTab} and manage their page access privileges.`}
              </p>
            </div>
          )}
        {/* === SLUG STATUS DISPLAY END === */}
      </div>
    </div>
  );
};

export default Slug;
