import { Link, useParams } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { gql, useQuery } from "@apollo/client";

const GET_ORGANIZER = gql`
query OrganizerById($organizerByIdId: String) {
    organizerById(id: $organizerByIdId) {
      _id
      name
      email
      events {
        _id
        place
        event
        dateStart
        dateEnd
        organizers {
            _id
            name
        }
      }
    }
  }
`;

export const Organizer = () => {
    const params = useParams()
    const { data } = useQuery(GET_ORGANIZER, {
        variables: {
            organizerByIdId: params.organizer
        }
    });


    return (
        <>
            <h1>{data?.organizerById && data.organizerById.name}</h1>
            <div className="grid grid-cols-4 gap-4">
                {data?.organizerById.events && data.organizerById.events.map((event) => (
                    <Card key={event._id}>
                        <CardHeader>
                            <CardTitle>{event.place}</CardTitle>
                            <h2>{event.event}</h2>
                            <CardDescription>{event.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <p>Date de début : {new Date(event.dateStart * 1000).toLocaleDateString('fr-FR')}</p>
                            <p>Date de fin : {new Date(event.dateEnd * 1000).toLocaleDateString('fr-FR')}</p>
                        </CardContent>
                        <CardFooter>
                            <Link state={event} to={`/event/${event.organizers[0].name.replace(/\s+/g, '')}/${event.place.replace(/\s+/g, '')}`}>
                                <Button>Voir plus</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    )
}