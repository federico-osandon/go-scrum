import { useState, useEffect} from 'react'
import { useResize } from "../../../hooks/useResize"
import Skeleton from 'react-loading-skeleton'
import debounce from 'lodash.debounce'
import { useSelector, useDispatch } from 'react-redux'

import Card from "../../card/Card"
import Header from "../../Header/Header"
import TaskForm from "../../TaskForm/TaskForm"
import { getTask, deleteTask } from '../../../store/actions/taskAction'

import 'react-loading-skeleton/dist/skeleton.css'
import './Task.style.css'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'


const Tasks = () => {
    const [tasksList, setTasksList] = useState(null)
    const [renderListTask, setRenderListTask] = useState(null)
    const [taskFromWho, setTaskFromWho] = useState('ALL')
    const [search, setSearch] = useState('')
    // const [isLoading, setIsLoading] = useState(true)
    const { isPhone } = useResize()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTask(taskFromWho === 'ME' ? '/me' : '' )) 
    }, [taskFromWho])

    const {error, tasks, loading} = useSelector(state => state.taskReducer)
    console.log(tasks)

    useEffect(() => {
        if (search) {
            setRenderListTask(tasksList.filter(data => data.title.startsWith(search)) )
        }else setRenderListTask(tasksList)
             
    }, [search])

    useEffect(() => {
        if (tasks?.length) {
            setTasksList(tasks)
            setRenderListTask(tasks)
        }
    }, [tasks])
    
    if (error) return <div>Hay un error: {error}</div>
    const renderColumCard = (text) => {
        return renderListTask?.filter(data => data.status === text)
    }

    const CardList = ({ cards }) => {
        return cards?.map((card) => <Card key={card._id} card={card} deleteCard={deleteCard} />)
    } 
    
    const deleteCard = id => dispatch(deleteTask(id))
    

    // para filtrar tareas creada por copilot
    const handleChangeImportace = (event) => {  
        if(event.currentTarget.value === 'ALL') setRenderListTask(tasksList) 
        else setRenderListTask(tasksList.filter(data => data.importance === event.currentTarget.value))        
    }

    const handleSearch = debounce(event => {
        setSearch(event?.target?.value)
    }, 1000) 

    

    // console.log(tasksList)

    return (
        <>
            <Header />
            <main id='tasks'>
                <TaskForm />
                <section className="wrapper_list">
                    <div className="list_header">
                        <h2>Mis Tareas</h2>
                    </div>
                    <div className="filters">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-aria-labelledby="demo-row-radio-button-group-label"
                                onChange={(event)=>setTaskFromWho(event.currentTarget.value)}  
                            >
                                <FormControlLabel
                                    value='ALL'
                                    control={<Radio />}
                                    label='Todas'
                                />
                                <FormControlLabel
                                    value='ME'
                                    control={<Radio />}
                                    label='Mis Tareas'
                                />
                            </RadioGroup>
                        </FormControl>
                        <div className='search'>
                            <input 
                                type="text" 
                                placeholder='Buscar por título...' 
                                // value={search}
                                onChange={handleSearch}
                            />
                        </div>
                        <select 
                            name='importance' 
                            onChange={handleChangeImportace}
                        >
                            <option value=''>Seleccionar una prioridad</option>                            
                            <option value='ALL'>Todas</option>
                            <option value='LOW'>Baja</option>
                            <option value='MEDIUM'>Media</option>
                            <option value='HIGH'>Alta</option>
                        </select>
                    </div>
                    {
                        isPhone ? (
                            <div className="list phone">
                                { renderListTask?.length > 0 ? 
                                        loading ?
                                                <>
                                                    <Skeleton height={90} /> 
                                                    <Skeleton height={90} /> 
                                                    <Skeleton height={90} /> 
                                                </> 
                                            : 
                                                <CardList cards={renderListTask} /> 
                                    : 
                                        <p>No Hay Tareas Creadas</p> 
                                }
                            </div>
                        ) : (
                            <div className="group_list">
                                { renderListTask?.length === 0 ? 
                                        <div className='list'>No Hay Tareas Creadas</div> 
                                    : 
                                        (   loading ? 
                                                <>
                                                    <Skeleton height={100} width={200} /> 
                                                    <Skeleton height={100} width={200} /> 
                                                    <Skeleton height={100} width={200} /> 
                                                </>
                                            : 
                                                <>
                                                    <div className="list">
                                                        <h4>Nuevas</h4>
                                                        <CardList cards={ renderColumCard('NEW') } />
                                                    </div>
                                                    <div className="list">
                                                        <h4>En Proceso</h4>
                                                        <CardList cards={ renderColumCard('IN PROGRESS') } />                                    
                                                    </div>
                                                    <div className="list">
                                                        <h4>Finalizadas</h4>
                                                        <CardList cards={ renderColumCard('FINISHED') } />                                                              
                                                    </div>
                                                </>
                                        )
                                }
                            </div>
                        )
                    }
                    
                    
                </section>
            </main>
        </>    
    )
}

export default Tasks
