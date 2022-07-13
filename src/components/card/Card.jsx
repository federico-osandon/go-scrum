import { useEffect, useState } from "react"

const Card = ({      
    card: { 
        _id,
        title, 
        createdAt, 
        user: {
            userName
        }, 
        status, 
        importance, 
        description 
    }, 
    deleteCard
}) => {   
    const [ showMore, setShowMore ] = useState(false)
    const date = new Date(createdAt).toLocaleString() + ' hs.'

    const limitString = (str) => {
        if (str.length > 170) 
            return { string: str.slice(0, 167).concat('...'), addButton: true }        
        return { string: str, addButton: false }        
    }

    return (
        <div className="card">
            <div className="close" onClick={()=> deleteCard(_id)}> X </div>
            <h3>{ title }</h3>
            <h6>{ date }</h6>
            <h5>{ userName }</h5>
            <button type="button" className={ status.toLowerCase() }>
                { status.toLowerCase() }
            </button>
            <button type="button" className={ importance.toLowerCase() }>
                { importance.toLowerCase() }
            </button>
            { !showMore && <p>Descripción: {limitString(description).string}</p>}
            { showMore && <>
                    <p>{description}</p>
                    <button 
                        type="button" 
                        onClick={() => setShowMore(false)}
                    >
                        Ver Menos
                    </button>
                </> 
            }
            { !showMore && limitString(description).addButton && <button 
                                                        type="button"
                                                        onClick={()=>setShowMore(true)}
                                                    >
                                                        Ver Mas
                                                    </button>}
        </div>  
    )
}

export default Card