import { useState } from "react";
import { ShieldX, ArrowLeft, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Redirecting to login page...");
    }, 1000);
  };

  const handleGoBack = () => {
    // Go back to previous page
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to home page if no history
      console.log("Redirecting to home page...");
      // Example: navigate('/') or window.location.href = '/'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center">
        {/* Icon */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldX className="w-10 h-10 text-red-600" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>

        {/* Error Code */}
        <div className="text-6xl font-bold text-red-600 mb-4">401</div>

        {/* Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          You don't have permission to access this page. Please log in with
          appropriate credentials or go back to the previous page.
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          {/* Login Button */}
          <Link
            to="/"
            className="w-full bg-black   text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Login
          </Link>

          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
