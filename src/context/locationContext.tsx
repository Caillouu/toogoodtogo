import { useGeolocation } from '@uidotdev/usehooks'
import React, { ReactNode, createContext } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Permet d'avoir la localisation de l'utilisateur
interface Props {
    children?: ReactNode
}

export const LocationContext = createContext({})

export const LocationContextProvider = React.memo(({ children }: Props) => {
    const location = useGeolocation();
    console.log('LocationContext')


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

    return (
        <LocationContext.Provider value={{ location }}>
            {children}
        </LocationContext.Provider>
    )
})