
const Card = ({ limitString, card: { title, createdAt, user: {userName}, status, importance, description } }) => {    
    return (
        <div className="card">
            <div className="close"> X </div>
            <h3>{ title }</h3>
            <h6>{ createdAt }</h6>
            <h5>{ userName }</h5>
            <button>{ status.toLowerCase() }</button>
            <button>{ importance.toLowerCase() }</button>
            <p>Descripción: {limitString(description).string}</p>
        </div>  
    )
}

export default Card