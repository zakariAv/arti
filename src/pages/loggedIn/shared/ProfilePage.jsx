import useGetData from "../../../hooks/useGetData";
import Spinner from "../../../components/UI/Spinner";
import ErrorPage from "./ErrorPage";
import { motion } from "framer-motion";
import ImageUploadForm from "../../../components/user/ImageUploadForm";
import getRole from "../../../utils/getRole";
import { useState } from "react";
import ChangePwdModal from "../../../components/modals/ChangePwdModal";
import Button from "../../../components/UI/Button";
import { FaLock } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import EditInfoModal from "../../../components/modals/EditInfoModal";
import { ToastContainer } from "react-toastify";
import Detail from "../features/users/Detail";
import formatDate from "../../../utils/formatDate";
import OwnArticles from "../features/articles/OwnArticles";
import useAuth from "../../../hooks/useAuth";


const ProfilePage = () => {

  const { role } = useAuth().auth

  const [showChangePwdModal, setShowPwdModal] = useState(false);
  const [showEditDataModal, setShowEditDataModal] = useState(false)

  const {
    isLoading: isAuthDataLoading,
    isError: isAuthError,
    error: authError,
    data: authData,
  } = useGetData({ url: "/auth/getAuthUserData", key: ["authData"] });



  return (
    isAuthDataLoading ? <Spinner /> :
      isAuthError ? <ErrorPage message={authError.response.data.message || authError.message} /> :
        <>
          <ToastContainer />
          {showChangePwdModal && <ChangePwdModal closeModal={() => setShowPwdModal(!showChangePwdModal)} />}
          {showEditDataModal && <EditInfoModal authData={authData} closeModal={() => setShowEditDataModal(!showEditDataModal)} />}

          <section className="rounded-md bg-slate-200 dark:bg-gradientDark min-h-screen">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <div className="flex justify-between items-center p-2 text-sm md:text-base">
                <button
                  className='border-2 border-slate-500 bg-white dark:bg-transparent hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white hover:border-white transition-all rounded-full p-2 flex-center '
                  onClick={() => setShowPwdModal(!showChangePwdModal)}
                >
                  <FaLock className="text-xl sm:text-2xl" />
                </button>
                <button
                  className='border-2 border-slate-500 bg-white dark:bg-transparent hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white hover:border-white transition-all rounded-full p-2 flex-center '
                  onClick={() => setShowEditDataModal(!showEditDataModal)}>
                  <FaUserEdit className="text-xl sm:text-[28px]" />
                </button>

              </div>
              <div className="mx-auto md:my-4">
                <ImageUploadForm userImg={authData.profile} />
              </div>
              <div className="flex-center my-1 flex-col gap-2 sm:my-3">
                <h1 className="text-xl font-bold capitalize sm:text-2xl md:text-3xl">
                  {authData.firstName} {authData.lastName}
                </h1>
                {authData.bio && <p className="w-10/12 px-1 text-center text-xs italic sm:w-1/2 sm:text-base">
                  {authData.bio}
                </p>}
              </div>
              <div className='flex flex-col'>
                <h1 className='text-center font-medium text-base md:text-xl lg:text-2xl capitalize text-slate-500'>{authData.firstName}'s Information</h1>
                <div className='p-1 md:p-3 flex flex-wrap gap-1 '>
                  <Detail label='Email:' data={authData.email} />
                  <Detail label='Username:' data={authData.username} />
                  <Detail label='Role:' data={getRole(authData.role)} />
                  <Detail label='Joined at:' data={formatDate(authData.created_at)} />
                  {authData.job && <Detail label='Job:' data={authData.job} />}
                  {authData.mobile && <Detail label='Mobile:' data={authData.mobile} />}
                  {authData.gender && <Detail label='Gender:' data={authData.gender} />}
                  {(authData.address?.city || authData.address?.country) && <Detail label='Location:' data={`${authData.address?.city}-${authData.address?.country}`} />}
                  {(authData.birthDate?.day && authData.birthDate?.month && authData.birthDate?.year) && <Detail label='Birthdate:' data={`${authData.birthDate?.day}-${authData.birthDate?.month}-${authData.birthDate?.year}`} />}
                </div>
              </div>
            </motion.div>
            {role !== 2001 &&
              <div className='border border-t-4'>
                <h3 className='text-center font-medium text-xl mt-4 md:text-2xl lg:text-3xl capitalize text-slate-500'>Your articles</h3>
                <div className='p-0.5 sm:p-1 md:p-3 grid h-fit w-full max-w-[600px] grid-cols-1 gap-6 shadow-2xl sm:mx-auto sm:w-9/12'>
                  <OwnArticles id={authData._id} />
                </div>
              </div>
            }
          </section>
        </>
  );
}

export default ProfilePage;


