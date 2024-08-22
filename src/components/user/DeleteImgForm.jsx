
import { Form, Formik } from 'formik'
import ProfilePicture from '../user/ProfilePicture'
import Button from '../UI/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify'
import { useState } from 'react'
import useRefreshToken from '../../hooks/useRefreshToken'

const DeleteImgForm = ({ profile }) => {

    const queryClient = useQueryClient('')

    const refresh = useRefreshToken()

    const [profilePic, setProfilePic] = useState(profile)

    const axiosPrivate = useAxiosPrivate();

    const { mutate, isError, error } = useMutation({
        mutationKey: ['deletePicture'],
        mutationFn: () => {
            return axiosPrivate.delete('/auth/delete-profile-picture')
        },
        onSuccess: async (data) => {
            setProfilePic('')
            queryClient.invalidateQueries('authData')
            await refresh()
            toast.success(data.data.message)

        }
    })

    return (
        <>
            <div className='py-2'>
                {isError && <p className='bg-red-500 text-white p-0.5 rounded-lg text-center'>{error.message}</p>}
                <Formik initialValues={{}} onSubmit={() => mutate({})}>
                    <Form className='flex flex-col sm:flex-row place-content-center'>
                        <ProfilePicture image={profilePic} className='w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-slate-600 mx-auto sm:mx-0' />
                        <div className='flex-center m-3'>
                            {profilePic &&
                                <Button type='submit' variant='danger' className='text-xs sm:text-sm md:text-base' >Delete Picture</Button>}
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default DeleteImgForm