export const getFirebaseError = (code) => {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password.";

    case "auth/email-already-in-use":
      return "An account already exists with this email.";

    case "auth/invalid-email":
      return "Please enter a valid email.";

    case "auth/weak-password":
      return "Password must be at least 6 characters.";

    case "auth/too-many-requests":
      return "Too many failed attempts. Try again later.";

    default:
      return "Something went wrong.";
  }
};