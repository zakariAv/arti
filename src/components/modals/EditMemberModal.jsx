import { useEffect, useState } from 'react'
import Modal from '../UI/Modal'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import ErrorMsgModal from './ErrorMsgModal'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import InputContainer from '../UI/InputContainer'
import InputError from '../UI/InputError'
import Button from '../UI/Button'
import editMemberValidationSchema from '../../services/validation/editMemberValidationSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ROLE_TYPES from '../../utils/ROLE_TYPES'

const EditMemberModal = ({ userData, closeModal }) => {

    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const [errMsg, setErrMsg] = useState('')


    useEffect(() => {
        document.getElementById('modal').scrollTo({ top: 0, behavior: 'smooth' })
    }, [errMsg])

    const initialValues = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        active: userData.active,
    }

    const { mutate, isPending } = useMutation({
        mutationKey: ['editMemberInfo'],
        mutationFn: (values) => {
            return axiosPrivate.patch('/users', values)
        },
        onSuccess: (data) => {
            closeModal()
            toast.success(data.data.message)
            queryClient.invalidateQueries(['user', userData._id])
        },
        onError: (error) => {
            setErrMsg(error.response.data.message || error.message)
        }
    })

    return (
        <Modal title={`Edit ${userData.firstName}'s data`} closeModal={closeModal}>
            {errMsg && <ErrorMsgModal errMsg={errMsg} />}
            <Formik
                initialValues={initialValues}
                validationSchema={editMemberValidationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values) => mutate({ id: userData._id, ...values })}
            >
                <Form onChange={() => setErrMsg('')} className='space-y-2'>
                    <div className='flex flex-col gap-0.5'>
                        <InputContainer id='firstName' label='FirstName:' name='firstName' />
                        <ErrorMessage name='firstName' component={InputError} />
                    </div>
                    <div className='flex flex-col gap-0.5'>
                        <InputContainer id='lastName' label='LastName:' name='lastName' />
                        <ErrorMessage name='lastName' component={InputError} />
                    </div>
                    <div className='flex flex-col gap-0.5'>
                        <InputContainer id='username' label='Username:' name='username' />
                        <ErrorMessage name='username' component={InputError} />
                    </div>
                    <div className='flex flex-col gap-0.5'>
                        <InputContainer id='email' label='Email:' name='email' />
                        <ErrorMessage name='email' component={InputError} />
                    </div>
                    <div>
                        <label htmlFor="role" className='text-xs font-semibold md:text-sm'>Role:</label>
                        <Field as='select' name="role" id="role" className='w-full rounded-md border border-slate-500 px-1 dark:bg-transparent py-0.5  focus:outline-1 focus:outline-blue-500 sm:p-1 lg:p-1.5'>
                            <option value="" disabled className='text-black dark:text-white dark:bg-gray-800'>Role</option>
                            {Object.keys(ROLE_TYPES).map((role) => (
                                <option key={role} value={ROLE_TYPES[role]} className='text-black dark:text-white dark:bg-gray-800'>
                                    {role}
                                </option>
                            ))}
                        </Field>
                    </div>
                    <div className='flex items-center gap-1 border-2 border-slate-500 rounded-lg p-2'>
                        <Field type='checkbox' id='active' name='active' className='w-4 h-4' />
                        <label htmlFor="active" className={`${userData.active ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                            Active member
                        </label>
                    </div>
                    <div className='py-6 flex-center'>
                        <Button disabled={isPending} size='lg' type='submit' title='Edit member data'>
                            {isPending ? 'Editing member...' : 'Edit this member'}
                        </Button>
                    </div>
                </Form>
            </Formik>
        </Modal>
    )
}

export default EditMemberModal