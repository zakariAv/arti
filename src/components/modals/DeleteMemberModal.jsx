import { useMutation, useQueryClient } from '@tanstack/react-query'
import Button from '../UI/Button'
import Modal from '../UI/Modal'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify'
import ErrorMsgModal from './ErrorMsgModal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DeleteMemberModal = ({ userData, closeModal }) => {

    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [errMsg, setErrMsg] = useState('');


    const { mutate, isPending } = useMutation({
        mutationKey: ['deleteMember', userData._id],
        mutationFn: () => {
            return axiosPrivate.delete(`/users/${userData._id}`)
        },
        onSuccess: (data) => {
            closeModal()
            toast.success(data.data.message)
            queryClient.invalidateQueries('usersData')
            navigate('/main/users')
        },
        onError: (error) => {
            setErrMsg(error.response.data.message || error.message)
        }
    })
    return (
        <Modal title={`Delete ${userData.firstName} permenantly`} closeModal={closeModal}>
            {errMsg && <ErrorMsgModal errMsg={errMsg} />}
            <p className='py-4 md:text-lg'>Are you sure to make  {userData.firstName}'s account deleted permenantly?</p>
            <div className='py-5 flex-center'>
                <Button variant='danger' size='lg' disabled={isPending} title='Delete member' onClick={() => mutate()} >
                    {isPending ? 'Deleting ...' : 'Delete this member'}
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteMemberModal