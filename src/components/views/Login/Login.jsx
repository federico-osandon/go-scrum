import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

import './Login.css'

const Login = () => {

    const navigate = useNavigate()

    /* Setting the initial values of the form. */
    const initialValues = {
        email:'',
        password:''
    }

    /**
     * If the values object has no email property, add an email property to the errors object and give
     * it a value of 'El email es requerido'
     * @returns An object with the errors.
     */
    const validate = values => {
        const errors = {}
        
        if (!values.email) {
            errors.email = 'El email es requerido'
        }
        
        if (!values.password) {
            errors.password = 'El password es requerido'
        }

        return errors
    }
    
    /**
     * It sets the localStorage item 'logged' to 'yes'
     */
    const onSubmit = () => {        
        //window.location = 'https://cybermap.kaspersky.com'        
        localStorage.setItem('logged', 'yes')
        navigate('/', { replace: true })
    }

    const formik = useFormik({initialValues, validate,  onSubmit})

    const { handleSubmit, handleChange, errors, values } = formik

    return (
        <div className='auth'>
            <form onSubmit={handleSubmit} >
                <h1>Iniciar Sesión</h1>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={values.email}
                        onChange={handleChange}
                    />
                    { errors.email && <div>{errors.email}</div>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input 
                        type="password" 
                        name='password' 
                        value={values.password}
                        onChange={handleChange}
                        // onChange={event => setPassword(event.target.value)}
                    />
                    { errors.password && <div>{errors.password}</div>}
                </div>
                <div>                    
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default Login


