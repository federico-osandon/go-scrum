import { useFormik } from 'formik'
import * as Yup from 'yup'
import './TaskForm.style.css'

const TaskForm = () => {

    const initialValues = {
        title: '',
        status: '',
        priority: '',
        description: '',
        // dueDate: ''
    }

    const onSubmit = (e) => {
        alert('Form submitted')
    }

    const required = '* Campo obligatorio'

    const validationSchema = Yup.object({
        title: Yup.string()
                    .min(6, '(6) Cantidad mínima de caracteres')
                    .required('* Campo obligatorio.'),
        status: Yup.string().required(required),
        priority: Yup.string().required(required)
    })

    const formik = useFormik({ 
        initialValues, 
        validationSchema,
        onSubmit 
    })  

    const { handleSubmit, handleChange, errors, touched, handleBlur } = formik

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
                        />
                        { errors.title && touched.title && <span className='error-message'>{ errors.title }</span> }
                    </div>
                    <div>
                        <select 
                            name='status' 
                            className={ errors.status && touched.status ? 'error' : '' }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        >
                            <option value="">Seleccionar un Estado</option>
                            <option value="new">Nueva</option>
                            <option value="inProcess">En proceso</option>
                            <option value="finished">Terminada</option>
                        </select>
                        { errors.status && touched.status && <span className='error-message'>{ errors.status }</span> }
                    </div>
                    <div>
                        <select 
                            name='priority' 
                            className={ errors.priority && touched.priority ? 'error' : '' }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                        >
                            <option value="">Seleccionar una Prioridad</option>
                            <option value="low">Baja</option>
                            <option value="medium">Media</option>
                            <option value="high">Alta</option>
                        </select>
                        { errors.priority && touched.priority && <span className='error-message'>{ errors.priority }</span> }
                    </div>
                    <div>
                        <textarea 
                            name='description' 
                            onChange={ handleChange } 
                            placeholder='Descripción'
                        />
                    </div>
                </div>
                <button type='submit' >Crear</button>
            </form>
        </section>
    )
}

export default TaskForm