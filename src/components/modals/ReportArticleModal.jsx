import { Field, Form, Formik, ErrorMessage } from "formik"
import InputError from '../UI/InputError'
import Modal from "../UI/Modal"
import ErrorMsgModal from '../modals/ErrorMsgModal'
import Button from '../UI/Button'
import reportValidationSchema from "../../services/validation/reportValidationSchema"
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

const ReportArticleModal = ({ closeModal, articleId }) => {

  const axiosPrivate = useAxiosPrivate()

  const [errMsg, setErrMsg] = useState('')

  const { isPending, mutate } = useMutation({
    mutationKey: ['reportArticle', articleId],
    mutationFn: (values) => {
      return axiosPrivate.post('/reports', {
        blog: articleId,
        reason: values.reason
      })
    },
    onError: (error) => {
      console.log(error)
      setErrMsg(error.response.data.message || error.message)
    },
    onSuccess: (data) => {
      closeModal()
      toast.success(data.data.message)
    }
  })

  return (
    <Modal closeModal={closeModal} title="Report Article">
      {errMsg && <ErrorMsgModal errMsg={errMsg} />}
      <Formik initialValues={{ reason: '' }} validationSchema={reportValidationSchema} validateOnBlur={false} validateOnChange={false} onSubmit={(values) => mutate(values)}>
        <Form className="space-y-2 pt-2" onChange={() => setErrMsg('')}>
          <h2 className="font-semibold text-center">Please, tell us about report reason , Admins will delete the article if it's againts our standards</h2>
          <Field as='textarea' name="reason" className="w-full p-1 resize-none min-h-36 rounded-md border-2 bg-transparent border-slate-500 focus:outline-none focus:border-blue-600" />
          <ErrorMessage name='reason' component={InputError} />
          <div className="flex-center pt-5">
            <Button type='submit' disabled={isPending}>Send report</Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}

export default ReportArticleModal