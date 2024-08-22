import React, { useState } from "react";
import Modal from "../UI/Modal";
import { Formik, Form, ErrorMessage } from "formik";
import changePasswordSchema from "../../services/validation/changePasswordSchema";
import InputContainer from "../UI/InputContainer";
import Button from "../UI/Button";
import InputError from "../UI/InputError";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import ErrorMsgModal from "./ErrorMsgModal";

const ChangePwdModal = ({ closeModal }) => {

  const [errMsg, setErrMsg] = useState('')

  const axiosPrivate = useAxiosPrivate();

  const { mutate, isPending } = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: (values) => {
      return axiosPrivate.patch('/auth/change-password', {
        oldPass: values.password,
        newPass: values.newPassword,
        newPassR: values.repeatPassword
      })
    },
    onSuccess: (data) => {
      closeModal()
      toast.success(data.data.message)

    },
    onError: (data) => {
      setErrMsg(data.response.data.message || 'Wrong data provided')

    }
  })


  return (
    <>

      <Modal title='Change password' closeModal={closeModal}>
        {errMsg && <ErrorMsgModal errMsg={errMsg} />}
        <Formik
          initialValues={{ password: "", newPassword: "", repeatPassword: "" }}
          validationSchema={changePasswordSchema}
          validateOnChange={true}
          validateOnBlur={false}
          onSubmit={(values) => mutate(values)}
        >

          <Form onChange={() => errMsg && setErrMsg("")}>
            <InputContainer
              id="password"
              type="password"
              label="Current password"
              name="password"
            />
            <ErrorMessage component={InputError} name="password" />
            <InputContainer
              id="newPassword"
              type="password"
              label="New password"
              name="newPassword"
            />
            <ErrorMessage component={InputError} name="newPassword" />

            <InputContainer
              id="RepeatPassword"
              type="password"
              label="Repeat new password"
              name="repeatPassword"
            />
            <ErrorMessage component={InputError} name="repeatPassword" />

            <div className="flex-center mt-6">
              <Button disabled={isPending} type="submit" title='change password' className='dark:bg-blue-700 text-xs sm:text-sm md:text-base'>
                {isPending ? 'Changing ...' : 'Change password'}
              </Button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default ChangePwdModal;
