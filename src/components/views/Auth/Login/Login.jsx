import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { swalAlert } from '../../../../utils/Alert'
import { ToastContainer ,toast } from 'react-toastify'


import '../Auth.css'

const { 
    VITE_REACT_APP_API_ENDPOINT: API_URL ,
    VITE_REACT_APP_URL_LOCAL: URL_LOCAL
} = import.meta.env


const Login = () => {

    const navigate = useNavigate()

    /* Setting the initial values of the form. */
    const initialValues = {
        userName:'',
        password:''
    }


    const require = "* Campo requerido"

    const validationSchema = Yup.object().shape({
        userName: Yup.string().min(4, '(4) Cantidad mínima de carácteres.').required(require),
        password: Yup.string().required(require)
    })

    
    /**
     * It sets the localStorage item 'token' to 'yes'
     */
    const onSubmit = () => {    
        
        const { userName, password } = values
        
        //window.location = 'https://cybermap.kaspersky.com'  
        fetch(`${API_URL}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    userName,
                    password
                })
        })
        .then(res => res.json())
        .then(data => {  
            if ( data.status_code === 200 ) {
                localStorage.setItem('token', data?.result?.token) 
                localStorage.setItem('userName', data?.result?.user?.userName) 
                navigate('/', { replace: true })                  
            } else {
                swalAlert()
            }      
        })
        // .then(data => console.log(data?.result?.user?.teamID))
        .catch( err => console.log(err) )      
    }

    const formik = useFormik({initialValues, validationSchema,  onSubmit})

    const { handleSubmit, handleChange, errors, values, touched, handleBlur } = formik

    return (
        <div className='auth'>
            <form onSubmit={handleSubmit} >
                <h1>Iniciar Sesión</h1>
                <div>
                    <label>Nombre de Usuario</label>
                    <input 
                        type="text" 
                        name="userName" 
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.userName && touched.userName ? 'error' : ''}
                    />
                    { errors.userName && touched.userName && <div>{errors.userName}</div>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input 
                        type="password" 
                        name='password' 
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onChange={event => setPassword(event.target.value)}
                        className={errors.password && touched.password ? 'error' : ''}
                    />
                    { errors.password && touched.password && <div>{errors.password}</div>}
                </div>
                <div>                    
                    <button type="submit">Enviar</button>
                </div>
                <div>
                    <Link to='/register' >Registrarme</Link>
                </div>
            </form>
        </div>
    )
}

export default Login


