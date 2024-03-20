import { useGeolocation } from "@uidotdev/usehooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
// import { MapWrapper } from "../mapWrapper";
import { useCallback, useEffect, useState } from "react";
import './home.scss'

export const Home = () => {
    console.log('render Home')
    const [position, setPosition] = useState<Array<number>>()
    console.log(position)

    const updatePosition = useCallback((value) => {
        console.log('callbaaaack')
        console.log(value)
        setPosition((prevState) => {
            if (prevState !== position) {
                return position
            }
        })
    }, [position])

    return (
        <>
            <Location onPositionLocated={updatePosition} />
            {/* {position && <MapWrapper position={position} />} */}
        </>
    )
}

//const Location = forwardRef((props, ref) => {
const Location = (({ onPositionLocated }) => {
    console.log('render Location')
    const location = useGeolocation();

    useEffect(() => {
        if (!location.loading && !location.error) {
            onPositionLocated([location.latitude, location.longitude])
        }
    }, [location, onPositionLocated])

    if (location.loading) {
        return <>
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Chargement...</AlertTitle>
                <AlertDescription>
                    Vous devez accepter la géolocalisation
                </AlertDescription>
            </Alert>
        </>
    }

    if (location.error) {
        return <>
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Chargement...</AlertTitle>
                <AlertDescription>
                    Activer les autorisations pour accéder à vos données de localisation
                </AlertDescription>
            </Alert>
        </>
    }
})
