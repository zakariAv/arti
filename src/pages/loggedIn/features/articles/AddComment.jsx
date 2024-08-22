import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { memo } from 'react'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify'
import { FaComment } from "react-icons/fa";
import commentSchema from '../../../../services/validation/commentSchema'
import InputError from '../../../../components/UI/InputError'

const AddComment = ({ articleId }) => {

  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  const { isPending, mutate, isError, error } = useMutation({
    mutationKey: ['addComment', articleId],
    mutationFn: (text) => {
      return axiosPrivate.post('/blogs/addComment', {
        blogId: articleId,
        text: text
      })
    },
    onSuccess: (data) => {
      toast.success('your comment added successfully')
      queryClient.invalidateQueries(['article', articleId])
      document.getElementById('comments').scrollTo({ top: 0 })

    },
    onError: (error) => {
      toast.error(error.response.data.message || error.message)
    }
  })

  const handleSubmit = (values, { resetForm }) => {
    mutate(values.text)
    resetForm()
  }

  return (
    <div className='my-1'>
      <Formik initialValues={{ text: '' }} validationSchema={commentSchema} onSubmit={handleSubmit} >
        <Form className=''>
          <div className='flex items-center gap-1 pb-1'>
            <Field as='textarea' name='text' className='flex-1 border-2 dark:bg-transparent dark:border-light sm:text-xs md:text-base border-black focus:outline-none dark:focus:border-blue-500 focus:border-blue-500 rounded-md resize-none h-[27px] sm:h-8 px-0.5' />
            <button disabled={isPending} type='submit' title='add comment' className='flex-center gap-0.5 text-[10px] text-lime-50 transition-all sm:text-sm bg-blue-500 hover:bg-blue-700 p-2.5 md:p-1.5 rounded-md'>
              <FaComment />
              <span className='hidden md:inline-flex'>Comment</span>
            </button>
          </div>
          <ErrorMessage name='text' component={InputError} />
        </Form>
      </Formik>
    </div>
  )
}

export default memo(AddComment)