import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({ fullname, username, password, confirmpassword }) => {
    if (!handleInputErrors({ fullname, username, password, confirmpassword })) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, password, confirmpassword })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      console.log(data);
      toast.success("Signup successful!");
      // You might want to do something with the successful signup here,
      // like redirecting the user or updating the app state
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullname, username, password, confirmpassword }) {
  if (!fullname || !username || !password || !confirmpassword) {
    toast.error('Please fill all the fields');
    return false;
  }
  if (password !== confirmpassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}