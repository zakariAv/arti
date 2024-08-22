import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteImgForm from "../user/DeleteImgForm";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import InputContainer from "../UI/InputContainer";
import { days, months, years } from "../../utils/date";
import Button from "../UI/Button";
import editAuthInfoSchema from "../../services/validation/EditProfileValidation";
import InputError from "../UI/InputError";
import { toast } from "react-toastify";
import ErrorMsgModal from "./ErrorMsgModal";




const EditInfoModal = ({ authData, closeModal }) => {

    const [errMsg, setErrMsg] = useState("");

    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();


    useEffect(() => {
        if (errMsg) {
            document.getElementById('modal').scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [errMsg])

    const initialValues = {
        firstName: authData.firstName,
        lastName: authData.lastName,
        email: authData.email,
        username: authData.username,
        gender: authData.gender || "",
        mobile: authData.mobile || "",
        job: authData.job || "",
        bio: authData.bio || "",
        address: {
            city: authData.address?.city || "",
            country: authData.address?.country || "",
        },
        birthDate: {
            day: authData.birthDate?.day || "",
            month: authData.birthDate?.month || "",
            year: authData.birthDate?.year || "",
        },
    };


    const { mutate, isPending } = useMutation({
        mutationKey: ["updateYourInfo"],
        mutationFn: (values) => {
            return axiosPrivate.post("/auth/update-your-info", values);
        },
        onSuccess: (data) => {
            closeModal();
            toast.success(data.data.message || 'success');
            queryClient.invalidateQueries('authData');
        },
        onError: (error) => {
            setErrMsg(error.response.data.message || error.message)
        }
    });



    const inputClass =
        "rounded-md w-full border-2 border-slate-500 dark:bg-transparent px-1 text-[10px] sm:text-xs md:text-base py-0.5 focus:border-blue-500 focus:outline-none sm:p-1 lg:p-1.5";
    const labelClass = 'text-xs font-semibold md:text-sm'
    return (
        <Modal title="Edit your data" closeModal={closeModal} >
            {errMsg && <ErrorMsgModal errMsg={errMsg} />}
            <DeleteImgForm profile={authData.profile} />
            <Formik initialValues={initialValues} validationSchema={editAuthInfoSchema} onSubmit={(values) => mutate(values)}>
                <Form className="space-y-2" onChange={() => setErrMsg('')}>
                    <InputContainer id="firstName" name="firstName" label="First name:" />
                    <ErrorMessage name="firstName" component={InputError} />
                    <InputContainer id="lastName" name="lastName" label="Last name:" />
                    <ErrorMessage name="lastName" component={InputError} />
                    <p className="text-green-600 border font-bold px-0.5 border-green-500">Note:<span className="text-sm font-normal dark:text-white text-black"> You have to login agian if you change your username</span></p>
                    <InputContainer id="username" name="username" label="Username:" />
                    <ErrorMessage name="username" component={InputError} />
                    <InputContainer id="email" name="email" label="Email:" type="email" />
                    <ErrorMessage name="email" component={InputError} />

                    <InputContainer id="bio" name="bio" label="Bio:" />
                    <ErrorMessage name="bio" component={InputError} />

                    <InputContainer id="job" name="job" label="Job:" />
                    <ErrorMessage name="job" component={InputError} />

                    <InputContainer id="mobile" name="mobile" label="Mobile:" />
                    <ErrorMessage name="mobile" component={InputError} />

                    <div className="flex w-full flex-col gap-1">
                        <label
                            htmlFor="gender"
                            className={labelClass}
                        >
                            Gender:
                        </label>
                        <Field as="select" name="gender" id="gender" className={inputClass}>
                            <option value="" disabled className="dark:bg-gray-800">
                                Select your gender
                            </option>
                            <option value="male" className="dark:bg-gray-800">male</option>
                            <option value="female" className="dark:bg-gray-800">Female</option>
                        </Field>
                    </div>
                    {/* address  */}
                    <div className="flex w-full flex-col gap-1">

                        <span className={labelClass}>Location:</span>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="flex-1">
                                <Field name={`address.city`} id='city' className={inputClass} autoComplete='on' />
                                <ErrorMessage name={`address.city`} component={InputError} />
                            </div>

                            <div className="flex-1">
                                <Field name={`address.country`} id='country' className={inputClass} autoComplete='on' />
                                <ErrorMessage name={`address.country`} component={InputError} />
                            </div>

                        </div>
                    </div>

                    {/* birthdate */}
                    <div className="flex w-full flex-col gap-1">
                        <span className={labelClass}>Birthdate:</span>
                        <div className="flex gap-2">
                            <Field
                                as="select"
                                name={`birthDate.day`}
                                id="day"
                                className={inputClass}
                            >
                                <option value="" disabled className="dark:bg-gray-800">
                                    Day
                                </option>
                                {days().map((day) => (
                                    <option key={day} className="dark:bg-gray-800">{day}</option>
                                ))}
                            </Field>
                            <Field
                                as="select"
                                id="month"
                                name={`birthDate.month`}
                                className={inputClass}
                            >
                                <option value="" disabled className="dark:bg-gray-800">
                                    Month
                                </option>
                                {months().map((month) => (
                                    <option key={month} className="dark:bg-gray-800">{month}</option>
                                ))}
                            </Field>
                            <Field
                                as="select"
                                name={`birthDate.year`}
                                id="year"
                                className={inputClass}
                            >
                                <option value="" disabled className="dark:bg-gray-800">
                                    Year
                                </option>
                                {years().map((year) => (
                                    <option key={year} className="dark:bg-gray-800">{year}</option>
                                ))}
                            </Field>
                        </div>
                    </div>

                    <div className="flex-center py-4">
                        <Button size="lg" type="submit" disabled={isPending} title='Edit your data' className='text-xs px-2 sm:text-sm md:text-base'>
                            {isPending ? 'Editing..' : 'Edit Your data'}
                        </Button>
                    </div>
                </Form>
            </Formik>
        </Modal>
    );
};

export default EditInfoModal;
