import { TbEditCircle } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import formatDate from "../../../../utils/formatDate"
import Button from '../../../../components/UI/Button'
import { useState } from "react"
import EditCategoryModal from "../../../../components/modals/EditCategoryModal"
import CountUp from "react-countup"
import DeleteCategoryModal from "../../../../components/modals/DeleteCategoryModal"


const Category = ({ category }) => {
    const [showEditCategory, setShowEditCategory] = useState(false)
    const [showDeleteCategory, setShowDeleteCategory] = useState(false)

    return (
        <>
            {showEditCategory && <EditCategoryModal category={category} closeModal={() => setShowEditCategory(!showEditCategory)} />}
            {showDeleteCategory && <DeleteCategoryModal category={category} closeModal={() => setShowDeleteCategory(!showDeleteCategory)} />}
            <div className="grid grid-cols-3 sm:grid-cols-4 border text-xs sm:text-sm">
                <div className="flex-center border-e capitalize break-words">{category.name}</div>
                <div className=" border-e hidden sm:flex sm:justify-center sm:items-center ">{formatDate(category.created_at)}</div>
                <div className="flex-center border-e">{<CountUp start={0} end={category.num_articles} />}</div>
                <div className="text-center border-e  ">
                    <Button className='m-1' title='Edit category' onClick={() => setShowEditCategory(!showEditCategory)}><TbEditCircle className="md:text-lg" /></Button>
                    <Button variant='danger' title='Delete category' className='m-1' onClick={() => setShowDeleteCategory(!showDeleteCategory)}><MdDelete className="md:text-lg" /></Button>
                </div>
            </div>
        </>
    )
}

export default Category