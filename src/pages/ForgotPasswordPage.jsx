import { Link } from "react-router-dom";
import { useState } from "react";

import AuthLayout from "../components/auth/AuthLayout";
import TextInput from "../components/auth/TextInput";
import { useAuth } from "../context/AuthContext";

const ForgotPasswordPage = () => {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const getFirebaseError = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with this email.";

      case "auth/invalid-email":
        return "Please enter a valid email.";

      default:
        return "Unable to send reset email.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      await resetPassword(email);

      setSuccess(
        "Password reset link sent. Please check your inbox."
      );
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter your email and we'll send you a reset link."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          required
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        {success && (
          <p className="text-sm text-green-600">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 py-3 text-white font-medium hover:bg-black disabled:opacity-70 cursor-pointer"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        Remember your password?{" "}
        <Link
          to="/login"
          className="font-semibold hover:underline"
        >
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;