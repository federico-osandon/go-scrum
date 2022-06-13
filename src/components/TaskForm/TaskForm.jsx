import './TaskForm.style.css'

const TaskForm = () => {
  return (
        <section className="task-form">
            <h2>Crear Tarea</h2>
            <p>Crea tus tareas</p>
            <form>
                <div>
                    <div>
                        <input type="text" />
                    </div>
                    <div>
                        <select type="text" />
                    </div>
                    <div>
                        <select type="text" />
                    </div>
                </div>
                <div></div>
            </form>
        </section>
  )
}

export default TaskForm