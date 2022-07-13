import { 
    TASK_REQUEST,
    TASK_SUCCESS,
    TASK_FAILURE
} from '../type'

const initialState = {
    tasks: [],
    loading: false,
    error: ''
}

export const taskReducer = (state = initialState, action) =>  {
    switch (action.type) {
        case TASK_REQUEST:
            return {                    
                ...state,
                loading: true
            }
        case TASK_SUCCESS:
            return {
                error: '',
                tasks: action.payload,
                loading: false
            }
        case TASK_FAILURE:
            return {
                error: action.payload,
                loading: false,
                tasks: []
            }
        default:  
            return state
    }
}