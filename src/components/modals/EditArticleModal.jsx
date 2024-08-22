import React, { useState } from 'react'
import Modal from '../UI/Modal'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import InputContainer from '../UI/InputContainer'
import InputError from '../../components/UI/InputError'
import RenderCategoriesOptions from '../../pages/loggedIn/features/categories/RenderCategoriesOptions'
import Button from '../UI/Button'
import addArticleValidationSchema from '../../services/validation/addArticleValidationSchema'
import ErrorMsgModal from './ErrorMsgModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify'



const EditArticleModal = ({ closeModal, article }) => {

    const [errMsg, setErrMsg] = useState('')
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()


    const initialValues = {
        title: article.title,
        body: article.body,
        privacy: article.privacy,
        category: article.category._id
    }

    const { isPending, mutate, isError, error } = useMutation({
        mutationKey: ['edit-article', article._id],
        mutationFn: (values) => {
            return axiosPrivate.patch('/blogs/updateArticle', {
                id: article._id,
                ...values
            })
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['article', article._id])

            closeModal()
            toast.success(data.data.message)

        }
    })
    return (
        <Modal title='Edit this Article' closeModal={closeModal}>
            {errMsg && <ErrorMsgModal errMsg={errMsg} />}
            <Formik initialValues={initialValues} validationSchema={addArticleValidationSchema} onSubmit={(values) => mutate(values)}>
                <Form onChange={() => setErrMsg('')} className='space-y-2'>
                    <div>
                        <InputContainer id='title' label='Title' name='title' />
                        <ErrorMessage name='title' component={InputError} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label
                            htmlFor="category"
                            className="text-left text-xs font-semibold md:text-sm"
                        >
                            Select Category:
                        </label>
                        <Field
                            as="select"
                            name="category"
                            id="category"
                            className="rounded-md first-letter:capitalize border border-slate-500 px-1 py-0.5 text-base focus:border-blue-500 focus:outline-none dark:border-2 dark:bg-transparent sm:p-1 lg:p-1.5"
                        >
                            {RenderCategoriesOptions()}
                        </Field>
                        <ErrorMessage name="category" component={InputError} />
                    </div>
                    <div className="flex items-center gap-1 py-2">
                        <Field
                            type="checkbox"
                            name="privacy"
                            id="privacy"
                            className="h-4 w-4"
                        />
                        <label
                            htmlFor="privacy"
                            className="text-left text-xs font-semibold md:text-sm"
                        >
                            Private Article
                        </label>
                    </div>
                    <div >
                        <label htmlFor="body" className='text-xs font-semibold md:text-sm text-left'>Content:</label>
                        <Field as='textarea' id='body' name='body' className='w-full h-60 rounded-md border dark:border-2 text-base border-slate-500 px-1 dark:bg-transparent py-0.5 focus:border-blue-500 focus:outline-none sm:p-1 lg:p-1.5' />
                        <ErrorMessage name='body' component={InputError} />
                    </div>

                    <div className='h-14  flex-center'>
                        <Button title='Edit article' type='submit' disabled={isPending}>Edit Article</Button>
                    </div>
                </Form>
            </Formik>
        </Modal>
    )
}

export default EditArticleModal