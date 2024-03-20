import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import { ReactNode } from 'react'

// Permet de savoir si l'utilisateur est connecté à chaque changement de page
export const UserContext = createContext({})

interface Props {
    children?: ReactNode
}

interface User {
    _id : string
    name : string
    email : string
}

export function UserContextProvider({children}: Props) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if(!user) {
            axios.get('/profile').then(res => {
                setUser(res.data)
            })
        }
    }, [])
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}