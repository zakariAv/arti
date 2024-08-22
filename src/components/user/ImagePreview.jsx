import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TfiClose } from "react-icons/tfi";
import Button from "../UI/Button";

import useRefreshToken from "../../hooks/useRefreshToken";

const ImagePreview = ({ file, closeImgPreview }) => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();
    const refresh = useRefreshToken();

    const changeImgMutation = async (image) => {
        const formData = new FormData();
        formData.append("image", image);
        return axiosPrivate.post("/auth/update-profile-picture", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    };

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ["changePicture"],
        mutationFn: changeImgMutation,
        onSuccess: async (data) => {
            closeImgPreview();
            queryClient.invalidateQueries("authData");
            await refresh();
        },
    });

    return (
        <>
            <div className="flex-center fixed left-0 top-0 z-50 h-screen w-screen bg-transparent backdrop-blur">
                <div className="mx-4 w-full max-w-[560px] rounded-lg bg-white shadow-smooth dark:border dark:border-white dark:bg-gradientDark sm:mx-auto sm:w-2/3">
                    <div className="flex items-center justify-between p-4 text-lg font-semibold sm:text-xl md:text-2xl">
                        <h3>Change picture</h3>
                        <button onClick={closeImgPreview}>
                            <TfiClose className="transition-all duration-300 hover:rotate-180 hover:scale-110 hover:text-red-500" />
                        </button>
                    </div>
                    <div className="flex-center mx-auto h-40 w-40 rounded-full bg-white">
                        {isError && <p>{error.message}</p>}
                        {file ? (
                            <img
                                src={URL.createObjectURL(file)}
                                alt="no file selected"
                                className="mx-auto my-4 h-40 w-40 rounded-full border-2 border-black object-cover p-1"
                            />
                        ) : (
                            <p className="text-2xl font-bold italic text-red-500 underline">
                                No file selected
                            </p>

                        )}
                    </div>
                    <div className="flex-center my-8">
                        <Button
                            size="md"
                            className="dark:bg-blue-800"
                            onClick={() => mutate(file)}
                        >
                            {isPending ? "Uploading.." : "Change"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImagePreview;
