
import { useLocation } from 'react-router-dom'

const Title = () => {
    const pathname = useLocation().pathname
    const getCurrentPageTitle = () => {
        if (pathname === '/main') {
            return 'Dashboard'
        } else if (pathname === '/main/users') {
            return 'Users'
        } else if (pathname === '/main/categories') {
            return 'Categories'
        } else if (pathname === '/main/articles/add-article') {
            return 'Add Articles'
        }
        else if (pathname.includes('/main/articles/reports')) {
            return 'Reports'
        }
        else if (pathname.includes('/main/articles')) {
            return 'Articles'
        } else if (pathname === '/main/articles/saved-articles') {
            return 'Saved Articles'
        } else if (pathname === '/main/profile') {
            return 'Your profile'
        } else if (pathname.includes('/main/member')) {
            return 'Member Page'
        }
    }
    return <h1 className="text-sm font-bold md:text-lg">{getCurrentPageTitle()}</h1>

}

export default Title