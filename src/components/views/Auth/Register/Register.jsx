import { useState, useEffect, useId } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup  from 'yup'
import { v4 as uuidv4 } from 'uuid'
import { Switch, FormControlLabel } from '@mui/material'

const Register = () => {
    const [data, setData] = useState({})
    const id = useId()
    console.log(`id: ${id}`)

    useEffect(() => {
        fetch('http://localhost:3000/assets/data/data.json')
        .then(res => res.json())
        .then(data => setData(data.results))
        .catch( err => console.log(err) )
    }, [])

    console.log(data)
    const initialValues = {
        userName:'',
        password:'',
        email:'',
        teamID:'',
        role:'',
        continent:'',
        region:'',
        switch: false,
    }

    const required = "* Campo obligatorio"

    const validationSchema = Yup.object().shape({
        userName: Yup.string()
                    .min(4, '(4) Cantidad mínima de caracteres')
                    .required(required),
        password: Yup.string().required(required),
        email: Yup.string().email('Ingrese Email válido').required(required),
        // teamID: Yup.string().required(required),
        role: Yup.string().required(required),
        continent: Yup.string().required(required),
        region: Yup.string().required(required)
    })

    const handleChangeContinent = (value) => {
        setFieldValue('continent', value)
        if(value === 'América'){
            setFieldValue('region', 'otro')
        }
        // console.log(event)
    }

    const onSubmit = () => {        
        //window.location = 'https://cybermap.kaspersky.com'        
        alert('Registrado')
    }

    const formik = useFormik({initialValues, validationSchema, onSubmit})

    const { handleSubmit, handleChange, errors, values, touched, handleBlur, setFieldValue } = formik

    return (
        <div className='auth'>
            <form onSubmit={handleSubmit} >
                <h1>Registro</h1>
                <div>
                    <label>Nombre de Usuario</label>
                    <input 
                        type="text" 
                        className={ errors.userName && touched.userName ? 'error' : '' }
                        name="userName" 
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    { errors.userName && touched.userName && <div>{errors.userName}</div>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input 
                        type="password" 
                        name='password' 
                        className={ errors.password && touched.password ? 'error' : '' }
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onChange={event => setPassword(event.target.value)}
                    />
                    { errors.password && touched.password && <div>{errors.password}</div>}
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        className={ errors.email && touched.email ? 'error' : '' }
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    { errors.email && touched.email && <div>{errors.email}</div>}
                </div>
                <FormControlLabel
                    control={
                            <Switch 
                                value={values.switch}
                                onChange={() => formik.setFieldValue('switch', !formik.values.switch)}
                                name="switch"
                                color="secondary"
                            />
                        }
                    label="¿Pertenecés a un equipo ya creado?"
                />
                { values.switch &&
                    <div>
                        <label>Ingrese Identificador de Equipo</label>
                        <input 
                            type="text" 
                            name="teamID" 
                            value={values.teamID}
                            onChange={handleChange}
                        />
                    </div>                
                }
                <div>
                    <label>Rol</label>
                    <select                       
                        name='role' 
                        className={ errors.role && touched.role ? 'error' : '' }
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >     
                        <option value="">Seleccionar Rol...</option>               
                        { 
                            data?.Role?.map(option =>  <option key={option} value={option}>{option}</option>) 
                        }
                    </select>
                    { errors.role && touched.role && <div>{errors.role}</div>}
                </div>               
                <div>
                    <label>Continente</label>
                    <select                       
                        name='continent' 
                        className={ errors.continent && touched.continent ? 'error' : '' }
                        value={values.continent}
                        onChange={event => handleChangeContinent(event.currentTarget.value)}
                        onBlur={handleBlur}
                    >         
                        <option value="">Eligir un Continente...</option>  
                        { 
                            data?.continent?.map(option =>  <option key={option} value={option}>{option}</option>) 
                        }
                    </select>
                    { errors.continent && touched.continent && <div>{errors.continent}</div>}
                </div>               
                <div>
                    
                    { values.continent === 'América' && 
                        <>
                            <label>Región</label>
                            <select                       
                                name='region' 
                                className={ errors.region && touched.region ? 'error' : '' }
                                value={values.region}
                                onChange={handleChange}                               onBlur={handleBlur}
                            >         
                                <option value="">Elegir una Región...</option>  
                                { 
                                    data?.region?.map(option =>  <option key={option} value={option}>{option}</option>) 
                                }                               
                            </select>                    
                        </>
                    }
                    { errors.region && touched.region && <div>{errors.region}</div>}
                </div>               
                <div>                    
                    <button type="submit">Enviar</button>
                </div>
                <div>
                    <Link to='/login' >Ir a Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register


