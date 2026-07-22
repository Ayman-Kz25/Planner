import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { getFirebaseError } from "../utils/firebaseErrors";

import AuthLayout from "../components/auth/AuthLayout";
import TextInput from "../components/auth/TextInput";
import PasswordInput from "../components/auth/PasswordInput";
import GoogleButton from "../components/auth/GoogleButton";
import AuthDivider from "../components/auth/AuthDivider";

const RegisterPage = () => {
  const { user, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await signup(
        name.trim(),
        email.trim(),
        password
      );

      navigate("/");
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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
      title="Create your account"
      subtitle="Start organizing your tasks in one place."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <TextInput
          label="Full Name"
          placeholder="Your Name"
          value={name}
          onChange={setName}
          autoComplete="name"
          required
        />

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
          placeholder="Create a password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          required
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          required
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 py-3 text-white font-medium hover:bg-black disabled:opacity-70 cursor-pointer"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <AuthDivider />

      <GoogleButton
        onClick={handleGoogleSignup}
        loading={googleLoading}
      />

      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold hover:underline"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;