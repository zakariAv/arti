import { useState } from "react";
import Modal from "../UI/Modal";
import ErrorMsgModal from "./ErrorMsgModal";
import { ErrorMessage, Form, Formik } from "formik";
import categoryNameSchema from "../../services/validation/categoryNameSchema";
import InputContainer from "../UI/InputContainer";
import InputError from "../UI/InputError";
import Button from "../UI/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";


const EditCategoryModal = ({ category, closeModal }) => {

    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()



    const [errMsg, setErrMsg] = useState('');

    const { mutate, isPending } = useMutation({
        mutationKey: ['updateCategory'],
        mutationFn: (values) => {
            return axiosPrivate.patch('/categories', { id: category._id, ...values })
        },
        onError: (error) => {
            setErrMsg(error.response.data.message || error.message)
        },
        onSuccess: (data) => {
            closeModal()
            toast.success(data.data.message)
            queryClient.invalidateQueries('categories')
        }
    })

    return (
        <Modal title='Edit category' closeModal={closeModal}>
            {errMsg && <ErrorMsgModal errMsg={errMsg} />}
            <Formik
                initialValues={{ name: category.name }}
                validationSchema={categoryNameSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={values => mutate(values)}
            >
                <Form onChange={() => setErrMsg('')} className="gird grid-cols-1">
                    <div className='flex flex-col gap-0.5'>
                        <InputContainer id='name' label='Category name:' name='name' />
                        <ErrorMessage name='name' component={InputError} />
                        <div className="h-20 flex-center">
                            <Button size='lg' type='submit' disabled={isPending} title='Edit category'>
                                {isPending ? 'Editing category' : 'Edit category'}
                            </Button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </Modal>


    )
}

export default EditCategoryModal