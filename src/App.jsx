import { lazy, Suspense } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'


import Login from './components/views/Auth/Login'
import Register from './components/views/Auth/Register'
import Tasks from './components/views/Tasks/Tasks'
// import Error404 from './components/views/Error404/Error404'

import './App.css'  

const Error404 = lazy(() => import('./components/views/Error404/Error404'))


const RequiereAuth = ({ children }) => {
    const logged = localStorage.getItem('logged')
    if (!logged) {
        return <Navigate to='/login' replace />
    }
    return children
}

const pageTransition = {
    in: {
        opacity: 1
    },
    out: {
        opacity: 0
    }
}

const App = () => {
    const location = useLocation()
    return (     
        <>
            <AnimatePresence>
                <Routes location={location} key={location.pathname} >
                    <Route path='/' 
                        element={
                            <RequiereAuth>
                                <motion.div
                                    className='page'                                initial='out'
                                    animate='in'
                                    exit='out'
                                    variants={pageTransition}
                                >
                                    <Tasks />
                                </motion.div>
                            </RequiereAuth>
                        }
                    />
                    <Route 
                        path='/register' 
                        element={
                            <motion.div
                                className='page'                                initial='out'
                                animate='in'
                                exit='out'
                                variants={pageTransition}
                            >
                                <Register />
                            </motion.div>
                        } 
                    />
                    <Route 
                        path='/login'   
                        element={
                            <motion.div
                                className='page'
                                initial='out'
                                animate='in'
                                exit='out'
                                variants={pageTransition}
                            >
                                <Login />
                            </motion.div>
                        } 
                    />
                    <Route 
                        path='*' 
                        element={
                            <motion.div
                                className='page'                                
                                initial='out'
                                animate='in'
                                exit='out'
                                variants={pageTransition}
                            >
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Error404 />
                                </Suspense>
                            </motion.div>                            
                        } 
                    />
                </Routes>
            </AnimatePresence>
        </>     
    )
}

export default App    
    

