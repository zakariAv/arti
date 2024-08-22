import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import registerValidationSchema from "../../services/validation/registerValidationSchema";
import { motion } from "framer-motion";
import axios from "../../services/api/axios";
import { useMutation } from "@tanstack/react-query";
import ErrorMsg from "../../components/UI/ErrorMsg";
import InputContainer from "../../components/UI/InputContainer";
import InputError from "../../components/UI/InputError";
import Button from "../../components/UI/Button";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const register = async (userData) => {
  const { firstName, lastName, username, email, password } = userData;
  return await axios.post("/auth/register", {
    firstName,
    lastName,
    email,
    username,
    password,
  });
};

const Register = () => {
  const [errorMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (errorMsg) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [errorMsg]);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    repeatedPassword: "",
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      toast.success(data?.data?.message || "User registered successfully");

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
    <>
      <section className="flex-center min-h-screen">
        <ToastContainer autoClose={2000} />
        {isSuccess ? (
          <motion.p
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-semibold"
          >
            Success! you can
            <Link className="px-1 font-bold text-blue-500" to="/login">
              Login
            </Link>
            now!
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mx-3 my-[4rem] w-full max-w-[600px] rounded-md bg-white p-3 shadow-medium sm:mx-auto sm:w-2/3"
          >
            <ErrorMsg errMsg={errorMsg} />
            <h1 className="py-2 text-center text-2xl font-semibold tracking-tighter md:mb-4 lg:text-3xl">
              Join our community
            </h1>

            <Formik
              initialValues={initialValues}
              onSubmit={(values) => mutate(values)}
              validationSchema={registerValidationSchema}
              validateOnBlur={false}
              validateOnChange={false}
            >
              <Form
                onChange={() => errorMsg && setErrMsg("")}
                className="grid w-full grid-cols-1 gap-2"
              >
                <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2">
                  <div>
                    <InputContainer
                      id="firstName"
                      label="First Name:"
                      name="firstName"
                    />
                    <ErrorMessage component={InputError} name="firstName" />
                  </div>
                  <div>
                    <InputContainer
                      id="lastName"
                      label="Last Name:"
                      name="lastName"
                    />
                    <ErrorMessage component={InputError} name="lastName" />
                  </div>
                </div>
                <InputContainer
                  id="username"
                  label="Username:"
                  name="username"
                />
                <ErrorMessage component={InputError} name="username" />

                <InputContainer
                  id="email"
                  type="email"
                  label="Email:"
                  name="email"
                />
                <ErrorMessage component={InputError} name="email" />

                <InputContainer
                  id="password"
                  type="password"
                  label="Password:"
                  name="password"
                />
                <ErrorMessage component={InputError} name="password" />

                <InputContainer
                  id="repeatedPassword"
                  type="password"
                  label="Repeat Password:"
                  name="repeatedPassword"
                />

                <ErrorMessage component={InputError} name="repeatedPassword" />

                <div className="flex-center py-3">
                  <Button type="submit" disabled={isPending} size="lg" title="Register" className='text-base lg:text-lg'>
                    {isPending ? "Registering ..." : "Register"}
                  </Button>
                </div>
                <p className="text-center font-medium">
                  Already have an account?&nbsp;
                  <Link
                    to="/login"
                    className="italic text-blue-500 transition-all hover:text-blue-950"
                  >
                    Login
                  </Link>
                </p>
              </Form>
            </Formik>
          </motion.div>
        )}
      </section>
    </>
  );
};

export default Register;
