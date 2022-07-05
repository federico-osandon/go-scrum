import { useState, useEffect} from 'react'
import { useResize } from "../../../hooks/useResize"
import Skeleton from 'react-loading-skeleton'
import debounce from 'lodash.debounce'

import Card from "../../card/Card"
import Header from "../../Header/Header"
import TaskForm from "../../TaskForm/TaskForm"

import 'react-loading-skeleton/dist/skeleton.css'
import './Task.style.css'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'

const { VITE_REACT_APP_API_ENDPOINT: API_ENDPOINT } = import.meta.env

const Tasks = () => {
    const [tasksList, setTasksList] = useState(null)
    const [renderListTask, setRenderListTask] = useState(null)
    const [taskFromWho, setTaskFromWho] = useState('ALL')
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { isPhone } = useResize()

    useEffect(() => {
        fetch(`${API_ENDPOINT}task${taskFromWho === 'ME' ? '/me' : '' }`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setTasksList(data?.result)            // toast('Tu tarea ha sido creada ')
            setRenderListTask(data?.result)
        })
        .catch( err => console.log(err) )
        .finally( () => setIsLoading(false) )
    }, [taskFromWho])

    useEffect(() => {
        fetch(`${API_ENDPOINT}task`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setTasksList(data?.result)            // toast('Tu tarea ha sido creada ')
            setRenderListTask(data?.result)
        })
        .catch( err => console.log(err) )        
    }, [search])
    
    const limitString = (str) => {
        if (str.length > 170) 
            return { string: str.slice(0, 167).concat('...'), addButton: true }        
        return { string: str, addButton: false }        
    }

    const CardList = ({ cards }) => {
        return cards?.map((card) => <Card key={card._id} card={card} limitString={ limitString } />)
    }    

    // para filtrar tareas creada por copilot
    const handleChangeImportace = (event) => {  
        if(event.currentTarget.value === 'ALL') setRenderListTask(tasksList) 
        else setRenderListTask(tasksList.filter(data => data.importance === event.currentTarget.value))        
    }

    // const handleSearch = debounce(event => {
    //     setSearch(event?.target?.value)
    // }, 1000) 
    const handleSearch = (event) => setSearch(event.currentTarget.value)
    

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
                                        isLoading ?
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
                                        (   isLoading ? 
                                                <>
                                                    <Skeleton height={100} width={200} /> 
                                                    <Skeleton height={100} width={200} /> 
                                                    <Skeleton height={100} width={200} /> 
                                                </>
                                            : 
                                                <>
                                                    <div className="list">
                                                        <h4>Nuevas</h4>
                                                        <CardList cards={ renderListTask?.filter(data => data.status === 'NEW')} />
                                                    </div>
                                                    <div className="list">
                                                        <h4>En Proceso</h4>
                                                        <CardList cards={ renderListTask?.filter(data => data.status === 'IN PROGRESS') } />                                    
                                                    </div>
                                                    <div className="list">
                                                        <h4>Finalizadas</h4>
                                                        <CardList cards={ renderListTask?.filter(data => data.status === 'FINISHED') } />                                                              
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
