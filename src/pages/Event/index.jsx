import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"

export const Event = () => {
    const { state } = useLocation();

    return (
        <>
            {state && (
                <>
                    {state.organizers.map(organizer =>
                        <Link key={organizer._id} state={state._id} to={`/organizer/${organizer._id}`}>
                            <Button>Voir tous les événèments de l'organisateur&nbsp;<span key={organizer._id}>{organizer.name}</span></Button>
                        </Link>
                    )
                    }
                    <h1>{state.place}</h1>
                    <h2>{state.event}</h2>
                    <p>{state.description}</p>
                    <p>Date de début : {new Date(state.dateStart * 1000).toLocaleDateString('fr-FR')}</p>
                    <p>Date de fin : {new Date(state.dateEnd * 1000).toLocaleDateString('fr-FR')}</p>
                </>
            )}
        </>
    )
}