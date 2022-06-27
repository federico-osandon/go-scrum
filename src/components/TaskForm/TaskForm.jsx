import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './TaskForm.style.css'

const { VITE_REACT_APP_API_ENDPOINT: API_ENDPOINT } = import.meta.env

const TaskForm = () => {

    const initialValues = {
        title: '',
        status: '',
        importance: '',
        description: '',
        // dueDate: ''
    }

    

    const required = '* Campo obligatorio'

    const validationSchema = Yup.object({
        title: Yup.string()
                    .min(6, '(6) Cantidad mínima de caracteres')
                    .required('* Campo obligatorio.'),
        status: Yup.string().required(required),
        description: Yup.string().required(required),
        importance: Yup.string().required(required)
    })


    const onSubmit = () => {// e.preventDefault()
        fetch(`${API_ENDPOINT}task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                task: values
            })
        })
        .then(res => res.json())
        .then(data => {
            toast('Tu tarea ha sido creada ')
        })
        .catch( err => console.log(err) )
        .finally( () => resetForm() )
        
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema,
        onSubmit 
    })  

    const { handleSubmit, handleChange, errors, touched, handleBlur, values, resetForm } = formik



    return (
        <section className="task-form">
            <h2>Crear Tarea</h2>
            <p>Crea tus tareas</p>
            <form onSubmit={ handleSubmit } >
                <div>
                    <div>
                        <input 
                            type="text" 
                            className={ errors.title && touched.title ? 'error' : '' }
                            name='title' 
                            onChange={ handleChange } 
                            onBlur={ handleBlur }
                            placeholder='Título'
                            value={ values.title }
                        />
                        { errors.title && touched.title && <span className='error-message'>{ errors.title }</span> }
                    </div>
                    <div>
                        <select 
                            name='status' 
                            className={ errors.status && touched.status ? 'error' : '' }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            value={ values.status }
                        >
                            <option value="">Seleccionar un Estado</option>
                            <option value="NEW">Nueva</option>
                            <option value="IN PROGRESS">En proceso</option>
                            <option value="FINISHED">Terminada</option>
                        </select>
                        { errors.status && touched.status && <span className='error-message'>{ errors.status }</span> }
                    </div>
                    <div>
                        <select 
                            name='importance' 
                            className={ errors.importance && touched.importance ? 'error' : '' }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            value={ values.importance }
                        >
                            <option value="">Seleccionar una Prioridad</option>
                            <option value="LOW">Baja</option>
                            <option value="MEDIUM">Media</option>
                            <option value="HIGH">Alta</option>
                        </select>
                        { errors.importance && touched.importance && <span className='error-message'>{ errors.importance }</span> }
                    </div>
                    <div>
                        <textarea 
                            name='description' 
                            onChange={ handleChange } 
                            onBlur={ handleBlur }
                            placeholder='Descripción'
                            className={ errors.description && touched.description ? 'error' : '' }
                            value={ values.description }
                        />
                    </div>
                </div>
                <button type='submit' >Crear</button>
            </form>
            <ToastContainer />
        </section>
    )
}

export default TaskForm