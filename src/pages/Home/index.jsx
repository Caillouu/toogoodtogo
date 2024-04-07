import './home.scss'
import { Map } from '../../components/Map';
import { LocationContextProvider } from '../../context/locationContext';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FilterMap } from '../../components/FilterMap';

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
            description
            coordinates
            status
            createdAt
            category {
                _id
                icon
                name
                description
            }
        }
    }
`;

export const Home = () => {
    const { loading, data: { events } = {} } = useQuery(GET_EVENTS);
    console.log('HOME')
    const [filteredEvents, setFilteredEvents] = useState([])

    useEffect(() => {
        if (loading === false) {
            console.log('loading')
            setFilteredEvents(events)
        }
    }, [events])

    const refreshFilterMap = (dataFilter) => {
        if (dataFilter.categories.length === 0) { // no filter
            setFilteredEvents(events)
        } else {
            const filtEvents = events.filter(event => {
                if (dataFilter.categories.includes(event.category._id) && (event.dateStart >= new Date(dataFilter.dob.from).getTime() / 1000 && event.dateStart <= new Date(dataFilter.dob.to).getTime() / 1000)) {
                    return event
                }
                return false
            })
            setFilteredEvents(filtEvents)
        }
    }

    return (
        <>
            <LocationContextProvider>
                <FilterMap events={filteredEvents} submitValues={refreshFilterMap} />
                <Map events={filteredEvents} />
            </LocationContextProvider>
        </>
    )
}


