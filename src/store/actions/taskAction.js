import { 
    TASK_REQUEST,
    TASK_SUCCESS,
    TASK_FAILURE
} from '../type'

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

    fetch(`${API_ENDPOINT}task/${path}`, {
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

    dispatch(taskRequest())

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