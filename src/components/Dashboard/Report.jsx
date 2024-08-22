import React from "react";
import { Link, useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

const Report = ({ report }) => {

    if (!report.user.active) return;

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['delete-report', report._id],
        mutationFn: () => {
            return axiosPrivate.delete(`/reports/${report._id}`)
        },
        onError: (error) => {
            toast.error(error.response.data.message || error.message)
        },
        onSuccess: (data) => {
            toast.success(data.data.message)
            queryClient.invalidateQueries('reports')
        }
    })



    return (
        <div className="space-y-2 h-fit rounded-md border bg-gray-300 p-1 shadow-smooth dark:bg-gray-800 md:p-2">
            <h1 className="text-xs font-semibold md:text-sm lg:text-base">
                Report by&nbsp;
                <Link
                    to={`/main/member/${report.user._id}`}
                    className="capitalize text-blue-500"
                >
                    {report.user.firstName} {report.user.lastName}
                </Link>
            </h1>
            <p className="bg-gray-200 p-1 text-[10px] first-letter:uppercase dark:bg-gray-700 sm:text-xs md:text-sm">
                {report.reason}
            </p>

            <div className="flex justify-between items-center">
                <button onClick={mutate} disabled={isPending} title='Delete this report ' className="p-1 border-2 border-black rounded-full hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                    <FaTrashAlt className="font-semibold" />
                </button>
                <p className="text-right text-xs">{formatDate(report.created_at)}</p>
            </div>
            <button
                title="Go to reported article"
                className="w-full rounded-3xl bg-blue-600 p-1 font-semibold text-white transition-all hover:bg-blue-950 dark:hover:bg-blue-700"
                onClick={() => navigate(`/main/articles/${report.blog._id}`)}
            >
                Show reported Article
            </button>
        </div>
    );
};

export default Report;
