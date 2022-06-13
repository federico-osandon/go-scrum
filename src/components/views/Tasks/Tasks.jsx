// import { useState, useEffect} from 'react'
import { useResize } from "../../../hooks/useResize"
import Card from "../../card/Card"
import Header from "../../Header/Header"
import TaskForm from "../../TaskForm/TaskForm"
import { cardsData } from "./data"

import './Task.style.css'


const Tasks = () => {
    
    const { isPhone } = useResize()
    
    const limitString = (str) => {
        if (str.length > 170) 
            return { string: str.slice(0, 167).concat('...'), addButton: true }
        
        return { string: str, addButton: false }        
    }

    const CardList = ({ cards }) => {
        return cards.map((card) => <Card key={card.id} card={card} limitString={ limitString } />)
    }

    return (
        <>
            <Header />
            <main id='tasks'>
                <TaskForm />
                <section className="wrapper_list">
                    <div className="list_header">
                        <h2>Mis Tareas</h2>
                    </div>
                    {
                        isPhone ? (
                            <div className="list phone">
                                <CardList cards={cardsData} />                                                                             
                            </div>
                        ) : (
                            <div className="group_list">
                                <div className="list">
                                    <h4>Nuevas</h4>
                                    <CardList cards={cardsData} />
                                </div>
                                <div className="list">
                                    <h4>En Proceso</h4>
                                    <CardList cards={cardsData} />                                    
                                </div>
                                <div className="list">
                                    <h4>Finalizadas</h4>
                                    <CardList cards={cardsData} />                                                              
                                </div>
                            </div>
                        )
                    }
                    
                    
                </section>
            </main>
        </>    
    )
}

export default Tasks
