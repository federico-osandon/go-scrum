import { useParams } from "react-router-dom"

const Registered = () => {
    const { teamID } = useParams()

    return (
        <div className="container">
            El teamId es: {teamID}
        </div>
    )
}

export default Registered