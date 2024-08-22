import useGetData from "../../../../hooks/useGetData"

const RenderCategoriesOptions = () => {
    const { data: categories, isLoading, isError, error } = useGetData({ key: ['categories'], url: '/categories' })
    if (isLoading) return <option value="" disabled>rendering categories ...</option>
    if (isError) return <ErrorPage error={error.message} />
    return categories.map(category => (<option key={category._id} value={category._id} className='dark:bg-gray-800 ' >
        {category.name}
    </option>))

}

export default RenderCategoriesOptions