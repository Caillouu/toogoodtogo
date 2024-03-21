import './home.scss'
import { Map } from '../../components/Map';
import { LocationContextProvider } from '../../context/locationContext';

export const Home = () => {
    console.log('render Home')

    return (
        <>
            <LocationContextProvider>
                <Map />
            </LocationContextProvider>
        </>
    )
}


