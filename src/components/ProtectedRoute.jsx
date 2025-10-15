// src/components/ProtectedRoute.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner"; // import toast

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token"); // your cookie name
    if (!token) {
      toast.error("You are no longer authenticated. Please log in again."); // show toast
      navigate("/"); // redirect to landing page
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
