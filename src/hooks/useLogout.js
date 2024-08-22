import { useQueryClient } from "@tanstack/react-query";
import axios from "../services/api/axios";
import useAuth from "./useAuth";

const useLogout = () => {

  const { setAuth } = useAuth();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      setAuth({});
      await axios.post("/auth/logout", {}, { withCredentials: true });
      queryClient.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
