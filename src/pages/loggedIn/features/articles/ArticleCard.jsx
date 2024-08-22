import { memo } from 'react'
import ArticlePicture from '../../../../components/user/ArticlePicture'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheck } from "react-icons/fa";
import Owner from './Owner';
import CommentsList from './CommentsList';
import getAuthUserId from '../../../../utils/getAuthUserId';
import { BiSolidLike, BiSolidDislike, BiLike, BiDislike } from "react-icons/bi";




const ArticleCard = ({ article, innerRef = null }) => {

    if (!article.user.active) return;

    const navigate = useNavigate()

    const userId = getAuthUserId()

    const likeExisted = article.likes.some(like => like._id === userId)
    const dislikeExisted = article.dislikes.some(dislike => dislike._id === userId)

    return (
        <motion.article
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            ref={innerRef}
            className="h-fit border-2 m-1 border-slate-300 bg-white dark:bg-transparent"
        >
            {article.picture && (
                <div className="h-auto w-full border border-slate-400 bg-white shadow-smooth dark:bg-gray-800">
                    <ArticlePicture path={article.picture} />
                </div>
            )}
            <div className="p-1 md:p-2">
                <h1 className="font-semibold first-letter:capitalize text-xs sm:text-base md:text-lg">
                    <Link
                        to={`/main/articles/${article._id}`}
                        className="inline break-words transition-colors hover:text-blue-700 dark:hover:text-blue-500"
                    >
                        {article.title}
                    </Link>
                </h1>
                <div className="flex items-center justify-between text-[10px] mt-1 sm:text-xs md:text-sm">
                    <span className="capitalize text-slate-500 md:text-sm">
                        {article.category.name}
                    </span>
                    <span className="rounded-2xl border border-slate-500 px-1 py-0.5 text-[8px] sm:text-[10px] md:text-xs font-semibold ">
                        {article.privacy ? "Private" : "Public"}
                    </span>
                </div>
            </div>
            <div className="px-1 md:px-2">
                <div className="break-words bg-white text-[10px] sm:text-[10px] md:text-sm text-[#2c2c2c] first-letter:capitalize dark:bg-transparent dark:text-light">
                    <p className="inline">{article.body.substring(0, 300)}</p>
                    {article.body.length > 300 && (
                        <Link
                            to={`/main/articles/${article._id}`}
                            className="inline text-[10px] sm:text-[10px] md:text-sm text-blue-500 transition-colors hover:text-blue-800"
                        >
                            ...Continue reading
                        </Link>
                    )}
                </div>
                <div className="flex items-center justify-between py-1 text-base md:text-lg">
                    <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
                        <div
                            onClick={() => navigate(`/main/articles/${article._id}`)}
                            className="flex items-center gap-0.5 text-sm md:text-base"
                        >
                            <span>{article.likes.length}</span>
                            {likeExisted ? (
                                <BiSolidLike className="text-blue-500" />
                            ) : (
                                <BiLike />
                            )}
                        </div>
                        <div
                            onClick={() => navigate(`/main/articles/${article._id}`)}
                            className="flex items-center gap-0.5 text-sm md:text-base"
                        >
                            <span>{article.dislikes.length}</span>
                            {dislikeExisted ? (
                                <BiSolidDislike className="text-blue-500" />
                            ) : (
                                <BiDislike />
                            )}
                        </div>
                    </div>
                    {article.isSaved && (
                        <p className="flex items-center gap-0.5 border border-slate-500 px-0.5 sm:px-1 sm:py-0.5 text-[8px] sm:text-[10px] md:text-xs text-green-500">
                            <FaCheck />
                            <span className="font-semibold">Saved</span>
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <Owner user={article.user} />
                    <div className="text-[10px] italic sm:text-sm">
                        {article.comments.length} comments
                    </div>
                </div>

                <CommentsList comments={article.comments} articleId={article._id} />
            </div>
        </motion.article>
    );
}

export default memo(ArticleCard)