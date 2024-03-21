import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Leaflet from 'leaflet'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { useContext } from 'react'
import { LocationContext } from '../../context/locationContext'
import { useQuery, gql } from '@apollo/client';
import './map.scss'

const GET_EVENTS = gql`
    query Events {
        events {
        _id
        place
        event
        organizers {
            _id
            name
            email
        }
        dateStart
        dateEnd
        category
        description
        coordinates
        status
        }
    }
`;


export const Map = () => {
    const { location } = useContext(LocationContext)
    const data = useQuery(GET_EVENTS);
    const events = data.data && data.data.events
    const optionsIcon = Leaflet.Icon.extend({
        options: {
            iconSize: [32, 32]
        }
    });
    console.log(location);
    return (
        <>
            <div id="map-container">
                <MapContainer center={[location.latitude, location.longitude]} zoom={14} scrollWheelZoom={false}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png" />
                    <MarkerClusterGroup chunkedLoading removeOutsideVisibleBounds disableClusteringAtZoom={14}>
                        {
                            events && events.map((event) => (
                                <Marker
                                    key={event._id}
                                    position={event.coordinates}
                                    icon={new optionsIcon({ iconUrl: `/src/assets/images/icons/${event.category}.svg` })} >
                                    <Popup>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>{event.place}</CardTitle>
                                                <CardDescription>{event.event} organisé par {event.organizers.map((organizer) => (<span key={organizer._id}>{organizer.name}</span>))}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{event.description}</p>
                                                <p>Date de début : {new Date(event.dateStart * 1000).toLocaleDateString('fr-FR')}</p>
                                                <p>Date de fin : {new Date(event.dateEnd * 1000).toLocaleDateString('fr-FR')}</p>
                                            </CardContent>
                                            <CardFooter>
                                                <Link state={event} to={`/event/${event.category}/${event.place.replace(/\s+/g, '')}`}>
                                                    <Button>Voir plus</Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    </Popup>
                                </Marker>
                            ))
                        }
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
        </>
    )
}
