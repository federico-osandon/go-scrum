import { 
    TASK_REQUEST,
    TASK_SUCCESS,
    TASK_FAILURE
} from '../type'

import { toast } from 'react-toastify'

const { VITE_REACT_APP_API_ENDPOINT: API_ENDPOINT } = import.meta.env

export const taskRequest = () => ({
    type: TASK_REQUEST
})
export const taskSuccess = (data) => ({
    type: TASK_SUCCESS,
    payload: data
})
export const taskFailure = (err) => ({
    type: TASK_FAILURE,
    payload: err
})

export const getTask = path => dispatch => {

    dispatch(taskRequest())
    // console.log(`${API_ENDPOINT}task${path}`)
    fetch(`${API_ENDPOINT}task${path}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        dispatch(taskSuccess(data.result))
    })
    .catch( err => taskFailure(err))
} 


export const deleteTask = id => dispatch => {

    // dispatch(taskRequest())

    fetch(`${API_ENDPOINT}task/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then( () => dispatch(getTask('')) )
    .catch( err => taskFailure(err))
} 

export const editTaskStatus = data => dispatch => {
    const arrayStatus = ['NEW', 'IN PROGRESS', 'FINISHED']
    const newStatusIndex = arrayStatus.indexOf(data.status) >1
                            ? 0
                            : arrayStatus.indexOf(data.status) + 1

    // dispatch(taskRequest())

    fetch(`${API_ENDPOINT}task/${data._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            task:{
                title: data.title,
                importance: data.importance,
                status: arrayStatus[newStatusIndex],
                description: data.description
            }
        })
    })
    .then(res => res.json())
    .then( () => dispatch(getTask('')) )
    .catch( err => taskFailure(err))
} 

export const createTask = values => dispatch => {
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

