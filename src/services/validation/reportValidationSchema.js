import * as Yup from "yup";


const reportValidationSchema = Yup.object({
    reason:Yup.string().required('please give us the report reason!').min(5 , 'reason should be at least 5 characters').max(100 , 'reason should not be more than 100 characters')
})

export default reportValidationSchema