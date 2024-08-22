import React from 'react'

const ArticlePicture = ({ path }) => {

    return (
        <img src={`http://localhost:9000/${path}`} alt='No picture for this article' className='h-full w-full max-h-[500px] bg-light shadow-smooth mx-auto object-fill' />
    )
}

export default React.memo(ArticlePicture)