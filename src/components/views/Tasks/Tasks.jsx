// import { useState, useEffect} from 'react'
import { useResize } from "../../../hooks/useResize"
import Card from "../../card/Card"
import Header from "../../Header/Header"
import { cardsData } from "./data"

import './Task.css'


const Tasks = () => {
    
    const { isPhone } = useResize()
    
    const limitString = (str) => {
        if (str.length > 170) 
            return { string: str.slice(0, 167).concat('...'), addButton: true }
        
        return { string: str, addButton: false }        
    }

    const CardList = (cards) => {
        return cards.map((card) => <Card key={card.id} card={card} limitString={ limitString } />)
    }

    return (
        <>
            <Header />
            <main id='task'>
                <section className="wraper_list">
                    <div className="list_header">
                        <h2>Mis Tareas</h2>
                    </div>
                    {
                        isPhone ? (
                            <div className="list phone">
                                { CardList(cardsData)}                                                                              
                            </div>
                        ) : (
                            <div className="group_list">
                                <div className="list">
                                    <h4>Nuevas</h4>
                                    <Card limitString={ limitString } />
                                </div>
                                <div className="list">
                                    <h4>En Proceso</h4>
                                    <Card limitString={ limitString } />
                                    <Card limitString={ limitString } />
                                </div>
                                <div className="list">
                                    <h4>Finalizadas</h4>
                                    <Card limitString={ limitString } />                           
                                    <Card limitString={ limitString } />                           
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
