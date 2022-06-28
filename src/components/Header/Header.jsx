import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        navigate('/login', { replace: true })
    }

    return (
        <header>
            <img src='assets/image/go1.svg' />
            <div className="wrapper_right_header">
                <div>{localStorage.getItem('userName')}</div>
                <div onClick={handleLogout} > X </div>
            </div>
        </header>
    )
}

export default Header