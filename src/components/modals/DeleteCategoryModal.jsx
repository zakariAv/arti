
import { useState } from 'react'
import Button from '../UI/Button'
import Modal from '../UI/Modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import ErrorMsgModal from './ErrorMsgModal'
import { toast } from 'react-toastify'


const DeleteCategoryModal = ({ category, closeModal }) => {

    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const [errMsg, setErrMsg] = useState('')

    const { mutate, isPending } = useMutation({
        mutationKey: ['deleteCategory'],
        mutationFn: () => {
            return axiosPrivate.delete(`/categories/${category._id}`)
        },
        onSuccess: (data) => {
            closeModal()
            toast.success(data.data.message)
            queryClient.invalidateQueries('categories')
        },
        onError: (error) => {
            setErrMsg(error.response.data.message || error.message)
        }
    })
    return (
        <Modal title='Delete category' closeModal={closeModal}>
            {errMsg && <ErrorMsgModal errMsg={errMsg} />}
            <div className='p-2 text-center text-base md:text-xl '>
                <p>Are you really want to delete {category.name} category?</p>
                <p className='text-red-700'>All articles reltated to this category will be deleted!</p>
            </div>
            <div className='h-20 flex-center'>
                <Button disabled={isPending} onClick={mutate} variant='danger' size='lg' title='Delete category'>Delete</Button>
            </div>
        </Modal>
    )
}

export default DeleteCategoryModal