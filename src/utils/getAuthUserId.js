import useAuth from "../hooks/useAuth";

const getAuthUserId = () => {
  const { userId } = useAuth().auth;
  return userId;
};

export default getAuthUserId;
