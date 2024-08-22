import Spinner from "../../../../components/UI/Spinner"
import useGetData from "../../../../hooks/useGetData"
import ErrorPage from "../../shared/ErrorPage"
import CategoriesList from "./CategoriesList"
import SearchCategories from "./SearchCategories"
import Button from '../../../../components/UI/Button'
import { FaCirclePlus } from "react-icons/fa6";
import { useState } from "react"
import AddCategoryModal from "../../../../components/modals/AddCategoryModal"
import { ToastContainer } from "react-toastify"

const CategoriesPage = () => {

    const [showAddCategory, setShowAddCategory] = useState(false);

    const { isLoading, data: categories, isError, error } = useGetData({ key: ['categories'], url: '/categories' })

    if (isLoading) return <Spinner />
    if (isError) return <ErrorPage message={error.response.data.message || error.message} />

    return (
        <>
            <ToastContainer />
            {showAddCategory && <AddCategoryModal closeModal={() => setShowAddCategory(!showAddCategory)} />}
            <>
                <div className="bg-silver dark:bg-gray-800  lg:sticky lg:top-0 lg:left-0 shadow-smooth flex justify-between flex-wrap items-center p-1 md:p-2">
                    <SearchCategories categories={categories} />
                    <div className="mx-2">
                        <Button
                            className=' flex items-center gap-1'
                            title='Add category'
                            onClick={() => setShowAddCategory(!showAddCategory)}
                        >
                            <FaCirclePlus />
                            <span className="hidden sm:inline-block text-sm lg:text-base">Add Category</span>
                        </Button>
                    </div>
                </div>
                <CategoriesList categories={categories} />
            </>
        </>
    )
}

export default CategoriesPage