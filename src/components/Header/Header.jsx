import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const navigate = useNavigate()

    const { tasks } = useSelector(state => state.taskReducer)

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        navigate('/login', { replace: true })
    }

    return (
        <header>
            <img src='assets/image/go1.svg' />
            <div className="wrapper_right_header">
                <div>
                    <button onClick={()=> navigate('/donate', { replace: true } )}>
                        Donar
                    </button>
                </div>
                <div className='black'>
                    Tareas Creadas: {!tasks ? 0 : tasks.length}
                </div>
                <div>{localStorage.getItem('userName')}</div>
                <div onClick={handleLogout} > X </div>
            </div>
        </header>
    )
}

export default Header