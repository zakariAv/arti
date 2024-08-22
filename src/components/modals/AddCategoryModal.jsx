import { useState } from 'react'
import Modal from '../UI/Modal'
import ErrorMsgModal from '../modals/ErrorMsgModal'
import { ErrorMessage, Form, Formik } from 'formik'
import InputContainer from '../UI/InputContainer'
import Button from '../UI/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import categoryNameSchema from '../../services/validation/categoryNameSchema'
import InputError from '../UI/InputError'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify'

const AddCategoryModal = ({ closeModal }) => {

    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient()

    const [errMsg, setErrMsg] = useState('')

    const { mutate, isPending } = useMutation({
        mutationKey: ['addCategory'],
        mutationFn: (values) => {
            return axiosPrivate.post('/categories', values)
        },
        onSuccess: (data) => {
            closeModal();
            toast.success(data.data.message)
            queryClient.invalidateQueries('categories')
        },
        onError: (error) => {
            setErrMsg(error.response.data.message || error.message)
        }
    })
    return (
        <Modal title='Add Category' closeModal={closeModal}>
            {errMsg && <ErrorMsgModal errMsg={errMsg} />}
            <Formik
                initialValues={{ name: '' }}
                validationSchema={categoryNameSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={values => mutate(values)}
            >
                <Form onChange={() => setErrMsg('')}>
                    <InputContainer id='category' name='name' label='Enter category name:' />
                    <ErrorMessage name='name' component={InputError} />
                    <div className='h-20 flex-center'>
                        <Button size='lg' type='submit' title='add category' disabled={isPending} >
                            {isPending ? 'Adding Category' : 'Add Category'}
                        </Button>
                    </div>
                </Form>
            </Formik>
        </Modal>
    )
}

export default AddCategoryModal