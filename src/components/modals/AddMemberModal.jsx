import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import Modal from '../UI/Modal'
import registerValidationSchema from '../../services/validation/registerValidationSchema'
import InputContainer from '../UI/InputContainer'
import InputError from '../UI/InputError'
import ROLE_TYPES from '../../utils/ROLE_TYPES'
import Button from '../UI/Button'
import ErrorMsgModal from './ErrorMsgModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'



const AddMemberModal = ({ closeModal }) => {

    const queryClient = useQueryClient()
    const axiosPrivate = useAxiosPrivate()


    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        document.getElementById('modal').scrollTo({ top: 0, behavior: 'smooth' })
    }, [errMsg])

    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        role: '2001',
        password: '',
        repeatedPassword: ''
    }


    const { mutate, isPending } = useMutation({
        mutationKey: ['addMember'],
        mutationFn: (values) => {
            return axiosPrivate.post('/users', values)
        },
        onError: (error) => {
            setErrMsg(error.response.data.message || error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('usersData')
            closeModal()
            toast.success(data.data.message)
        }
    })


    return (
        <Modal closeModal={closeModal} title='Add a member'>
            {errMsg && <ErrorMsgModal errMsg={errMsg} />}
            <Formik
                initialValues={initialValues}
                validationSchema={registerValidationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={values => mutate(values)}
            >
                <Form onChange={() => setErrMsg('')} className='space-y-1'>
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
                        <Field as='select' name="role" id="role" className='w-full rounded-md border border-slate-500 px-1 dark:bg-transparent py-0.5 focus:outline-1 focus:outline-blue-500 sm:p-1 lg:p-1.5'>
                            <option value="" disabled className='text-black dark:text-white dark:bg-gray-800'>Role</option>
                            {Object.keys(ROLE_TYPES).map((role) => (

                                <option key={role} value={ROLE_TYPES[role]} className='text-black dark:text-white dark:bg-gray-800'>
                                    {role}
                                </option>
                            ))}

                        </Field>
                    </div>
                    <div className='flex flex-col gap-0.5'>
                        <InputContainer id='password' type='password' label='password' name='password' />
                        <ErrorMessage name='password' component={InputError} />
                    </div>
                    <div className='flex flex-col gap-0.5'>
                        <InputContainer id='passR' type='password' label='Repeat your password' name='repeatedPassword' />
                        <ErrorMessage name='repeatedPassword' component={InputError} />
                    </div>
                    <div className='py-6 flex-center'>
                        <Button disabled={isPending} size='lg' type='submit' title='Add member'>
                            {isPending ? 'Adding member...' : 'Add this member'}
                        </Button>
                    </div>
                </Form>
            </Formik>
        </Modal>
    )
}

export default AddMemberModal