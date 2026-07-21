import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";

import AuthLayout from "../components/auth/AuthLayout";
import TextInput from "../components/auth/TextInput";
import PasswordInput from "../components/auth/PasswordInput";
import GoogleButton from "../components/auth/GoogleButton";
import AuthDivider from "../components/auth/AuthDivider";

const LoginPage = () => {
  const { user, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [error, setError] = useState("");

  const getFirebaseError = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with this email.";

      case "auth/wrong-password":
        return "Incorrect password.";

      case "auth/invalid-email":
        return "Please enter a valid email.";

      case "auth/invalid-credential":
        return "Invalid email or password.";

      case "auth/too-many-requests":
        return "Too many failed attempts. Try again later.";

      default:
        return "Something went wrong.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      await login(email, password);

      navigate("/");
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");

    try {
      setGoogleLoading(true);

      await loginWithGoogle();

      navigate("/");
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setGoogleLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue planning your day."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          required
        />

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-slate-600 hover:text-black cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 py-3 text-white font-medium hover:bg-black disabled:opacity-70 cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <AuthDivider />

      <GoogleButton onClick={handleGoogleLogin} loading={googleLoading} />

      <p className="mt-8 text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
