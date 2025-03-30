import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useEffect } from "react";

const useRoleRedirect = () => {
  const navigate = useNavigate();

  const { token } = useSelector((state: RootState) => state.authentication);

  const { loggedUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (token && loggedUser?.role) {
      if (loggedUser.role === "admin") navigate("/admin-dashboard");
      else if (loggedUser.role === "user") navigate("/");
    }
  }, [token, loggedUser, navigate]);
};

export default useRoleRedirect;
