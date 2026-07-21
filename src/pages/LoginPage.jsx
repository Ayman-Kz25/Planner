import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const LoginPage = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFirebaseError = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found.";

      case "auth/wrong-password":
        return "Incorrect password.";

      case "auth/email-already-in-use":
        return "Email already registered.";

      case "auth/invalid-email":
        return "Invalid email address.";

      case "auth/weak-password":
        return "Password should be at least 6 characters.";

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
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(getFirebaseError(err.code));
    }
  };

  return <></>;
};
export default LoginPage;
