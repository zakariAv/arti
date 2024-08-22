import { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import AddImageArticle from '../../../../components/user/AddImageArticle'
import InputContainer from '../../../../components/UI/InputContainer'
import Button from '../../../../components/UI/Button'
import InputError from '../../../../components/UI/InputError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import ErrorMsgModal from '../../../../components/modals/ErrorMsgModal'
import { toast } from 'react-toastify'
import addArticleValidationSchema from '../../../../services/validation/addArticleValidationSchema'
import { useNavigate } from 'react-router-dom'
import RenderCategoriesOptions from '../categories/RenderCategoriesOptions'

const AddArticle = () => {

    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [file, setFile] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        if (errMsg) {
            document.getElementById('main').scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [errMsg]);

    const initilValues = {
        title: '',
        body: '',
        category: '',
        privacy: true,

    }

    const { mutate, isPending } = useMutation({
        mutationKey: ['addArticle'],
        mutationFn: (values) => {
            return axiosPrivate.post('/blogs', values, {
                headers: {
                    "Content-Type": "multipart/form-data", // Required for file uploads
                },
            })
        },
        onError: (error) => {
            setErrMsg(error.response.data.message || error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('articles')
            navigate('/main/articles')
            toast.success('The Article is posted successfully')
        }
    })


    const handleSubmit = (values) => {
        const formData = new FormData()
        if (file) {
            formData.append('image', file)
        }
        formData.append('title', values.title)
        formData.append('body', values.body)
        formData.append('category', values.category)
        formData.append('privacy', values.privacy)

        mutate(formData)
    }

    return (
        <section className="min-h-screen py-3 sm:py-7 bg-silver dark:bg-gradientDark">
            <div className=" w-[98%] mx-auto max-w-[600px] border bg-white shadow-smooth dark:bg-blue-950 sm:mx-auto sm:w-11/12 md:w-9/12 rounded-md">
                <h1 className="py-2 text-center text-base sm:text-xl font-semibold md:py-3 md:text-2xl lg:text-3xl">
                    Post article
                </h1>
                {errMsg && <ErrorMsgModal errMsg={errMsg} />}
                <Formik
                    initialValues={initilValues}
                    onSubmit={handleSubmit}
                    validationSchema={addArticleValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    <Form
                        className="space-y-2 p-1 sm:p-2 md:p-3"
                        onChange={() => setErrMsg("")}
                    >
                        <AddImageArticle file={file} setFile={setFile} />
                        <div>
                            <InputContainer id="title" name="title" label="Title:" />
                            <ErrorMessage name="title" component={InputError} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="category"
                                className="text-left text-[10px] sm:text-xs md:text-sm font-semibold"
                            >
                                Select Category:
                            </label>
                            <Field
                                as="select"
                                name="category"
                                id="category"
                                className="rounded-md border border-slate-500 px-1 py-0.5 text-[10px] sm:text-xs md:text-base focus:border-blue-500 focus:outline-none dark:border-2 dark:bg-transparent sm:p-1 lg:p-1.5"
                            >
                                <option
                                    value=""
                                    disabled
                                    className="dark:bg-gray-800"
                                ></option>
                                {RenderCategoriesOptions()}
                            </Field>
                            <ErrorMessage name="category" component={InputError} />
                        </div>
                        <div className="flex items-center gap-1">
                            <Field
                                type="checkbox"
                                name="privacy"
                                id="privacy"
                                className="h-3 w-3 sm:h-4 sm:w-4"
                            />
                            <label
                                htmlFor="privacy"
                                className="text-left text-[10px] sm:text-xs md:text-sm font-semibold "
                            >
                                Private Article
                            </label>
                        </div>
                        <div className="h-52 sm:h-60 md:h-72 w-full">
                            <Field
                                as="textarea"
                                name="body"
                                id="body"
                                className="h-full w-full resize-none rounded-md border border-slate-500 px-1 py-0.5 text-[10px] sm:text-xs md:text-base focus:border-blue-500 focus:outline-none dark:border-2 dark:bg-transparent sm:p-1 lg:p-1.5"
                            />
                            <ErrorMessage name="body" component={InputError} />
                        </div>
                        <div className="flex-center h-20">
                            <Button
                                size="lg"
                                className="px-4 py-2 text-[10px] sm:text-xs md:text-sm lg:text-base"
                                type="submit"
                                title='Post article'
                                disabled={isPending}
                            >
                                {isPending ? "Posting..." : "Post"}
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </section>
    );
}

export default AddArticle