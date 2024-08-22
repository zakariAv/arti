import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "../../services/api/axios";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import ErrorMsg from "../../components/UI/ErrorMsg";
import loginValidationSchema from "../../services/validation/loginValidationSchema";
import Logo from "../../components/Logo";
import InputContainer from "../../components/UI/InputContainer";
import InputError from "../../components/UI/InputError";
import Button from "../../components/UI/Button";
import { BiSolidLogInCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const login = async (credentials) => {
  const { username, password } = credentials;
  return await axios.post(
    "/auth",
    { username, password },
    { withCredentials: true },
  );
};

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (errMsg) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [errMsg]);

  const initialValues = {
    username: "",
    password: "",
  };

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const responseData = data?.data;
      toast.success(responseData.message || "User Logged in successfully");
      const accessToken = responseData.accessToken;
      const { userId, username, firstName, lastName, role, profile } =
        jwtDecode(accessToken).UserInfo;
      setAuth({ userId, username, firstName, lastName, role, profile });
      if (role === 6000 || role === 5150) {
        navigate('/main')
      }
      else if (role === 1984) {
        navigate('/main/categories')
      } else if (role === 2001) {
        navigate('/main/articles')
      }
    },
    onError: (error) => {
      if (error?.response?.status === 500) {
        setErrMsg("Internal Server Error");
        return;
      }
      setErrMsg(error?.response?.data?.message);
    },
  });

  return (
    <section className="flex-center min-h-screen">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative mx-3 w-full max-w-[400px] rounded-md bg-white p-3 shadow-medium sm:mx-0"
      >
        <ErrorMsg errMsg={errMsg} />
        <h1 className="py-2 text-center text-2xl font-bold tracking-tighter sm:text-3xl md:py-5 md:text-4xl">
          Login to <Logo />
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values) => mutate(values)}
        >
          <Form onChange={() => errMsg && setErrMsg("")}>
            <div className="space-y-2">
              <InputContainer id="username" name="username" label="Username" />
              <ErrorMessage name="username" component={InputError} />
              <InputContainer
                id="password"
                type="password"
                name="password"
                label="Password"
              />
              <ErrorMessage name="password" component={InputError} />
            </div>
            <div className="mt-10 grid grid-cols-1">
              <Button
                type="submit"
                title="Login"
                size="lg"
                disabled={isPending}
                className="flex-center w-fit mx-auto group gap-1 text-base  rounded-lg lg:text-lg hover:shadow-xl"
              >
                <span>{isPending ? "Loggin in" : "Login"}</span>
                <span className="text-2xl transition-all delay-150 group-hover:rotate-180">
                  <BiSolidLogInCircle />
                </span>
              </Button>
              <div className="mt-2 py-2 text-center font-medium">
                Do not have an account ?{" "}
                <Link
                  to="/register"
                  className="italic tracking-tighter text-blue-500 transition-all hover:text-blue-950"
                >
                  Register
                </Link>
              </div>
            </div>
          </Form>
        </Formik>
      </motion.div>
    </section>
  );
};

export default Login;
