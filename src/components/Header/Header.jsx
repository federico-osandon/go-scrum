import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
    }

    return (
        <header>
            <img src='assets/image/go1.svg' />
            {/* <span>GoScrum</span> */}
            <div onClick={handleLogout} > X </div>
        </header>
    )
}

export default Header