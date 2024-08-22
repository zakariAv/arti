import { jwtDecode } from "jwt-decode";
import axios from "../services/api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    const {
      userId,
      firstName,
      lastName,
      username,
      role,
      profile,
    } = jwtDecode(response.data.accessToken).UserInfo;

    setAuth({userId , firstName , lastName , username , role , profile , accessToken:response.data.accessToken})

    return response.data.accessToken
  };

  return refresh;
};

export default useRefreshToken;
