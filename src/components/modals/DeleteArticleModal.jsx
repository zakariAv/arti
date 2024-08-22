import React from 'react'
import Modal from '../UI/Modal'
import Button from '../UI/Button'
import { useMutation } from '@tanstack/react-query'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const DeleteArticleModal = ({ title, closeModal, id }) => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate()

    const { isPending, mutate } = useMutation({
        mutationKey: ['delete-article', id],
        mutationFn: () => {
            return axiosPrivate.delete(`/blogs/deleteArticle/${id}`)
        },
        onSuccess: (data) => {
            closeModal();
            navigate('/main/articles')
        },
        onError: (error) => {
            toast.error(error.response.data.message || error.message)
        }
    })
    return (
        <Modal title='Delete this Article' closeModal={closeModal}>

            <p className='py-3 text-center text-base md:text-lg'>Are you sure to delete this article?</p>
            <div className='flex-center mt-5'>
                <Button disabled={isPending} onClick={mutate} variant='danger' title='Delete article'>Delete</Button>
            </div>

        </Modal>
    )
}

export default DeleteArticleModal