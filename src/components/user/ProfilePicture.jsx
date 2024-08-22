import { memo } from 'react'
import defaultProfileImage from '../../assets/default-profile-img.jpg'

const ProfilePicture = ({ image, className }) => {
    return (
        <img src={image ? `http://localhost:9000/${image}` : defaultProfileImage} alt="no image for this user" className={className} />
    )
}

export default memo(ProfilePicture)