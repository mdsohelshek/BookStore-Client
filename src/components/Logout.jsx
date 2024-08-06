import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import Cookie from "js-cookie"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Backend_URL } from "../../url";
function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post(`${Backend_URL}/user/logout`, {}, { withCredentials: true });
      console.log(res.data);
      if (res.data.message === 'Logged out successfully') {
        toast.success("Logged out successfully");
        localStorage.removeItem("user");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Logout failed', error);
      toast.error('Logout failed');
    }
  };
  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
