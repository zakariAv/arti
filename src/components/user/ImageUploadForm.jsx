import { useEffect, useState, memo } from "react";
import { Formik, Field } from "formik";
import ProfilePicture from "./ProfilePicture";
import ImagePreview from "./ImagePreview";


const ImageUploadForm = ({ userImg }) => {
    const [imgFile, setImgFile] = useState(null);
    const [showImgPreview, setShowImgPreview] = useState(false)

    useEffect(() => {
        if (imgFile) {
            setShowImgPreview(true)
        }
    }, [imgFile])

    return (
        <>
            {showImgPreview && <ImagePreview file={imgFile} closeImgPreview={() => setShowImgPreview(!showImgPreview)} />}
            <Formik initialValues={{ image: "" }}>
                <form className="">
                    <label
                        htmlFor="profile"
                        className="inline-block cursor-pointer rounded-full transition-all hover:scale-110 bg-white shadow-smooth"
                    >
                        <ProfilePicture image={userImg} className="w-28 h-28 md:h-40 md:w-40 rounded-full object-cover hover:shadow-2xl" />
                    </label>
                    <Field
                        id="profile"
                        type="file"
                        name="image"
                        accept='image/*'
                        onChange={(e) => {
                            setImgFile(e.currentTarget.files[0]);
                        }}
                        className="hidden"
                    />

                </form>
            </Formik>
        </>
    );
};

export default memo(ImageUploadForm);
