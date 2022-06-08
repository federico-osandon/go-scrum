
const Card = ({ limitString, card: { title, dateTime, creator, type, priority, description } }) => {    
    return (
        <div className="card">
            <div className="close"> X </div>
            <h3>{ title }</h3>
            <h6>{ dateTime }</h6>
            <h5>{ creator }</h5>
            <button>{ type }</button>
            <button>{ priority }</button>
            <p>Descripción: {limitString(description).string}</p>
        </div>  
    )
}

export default Card