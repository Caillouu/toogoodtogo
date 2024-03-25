import { Suspense, useEffect, useState } from "react";
import { CardXS } from "../cardxs";
import { Input } from "@/components/ui/input"

export const Search = ({ data }) => {
    const [search, setSearch] = useState('');
    const [resultSearch, setResultSearch] = useState([]);

    const filterUsers = () => {
        const foundUsers = data.filter(user => {
            return Object.values(user)
                .join(' ')
                .toLowerCase()
                .includes(search.toLowerCase())
        })

        setResultSearch(foundUsers);
    }


    useEffect(() => {
        if (search !== '') {
            // Filter
            filterUsers();
        } else {
            setResultSearch([])
        }
    }, [search]);

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const msgDisplay = (msg, color) => {
        return (
            <p style={{ textAlign: 'center', color: color }}>
                {msg}
            </p>
        )
    }

    console.log(data)
    console.log(resultSearch)

    return (
        <>
            {data.map(({ id, name }) => {
                <CardXS key={id} name={name} />
            })}
            <Input
                id="search"
                type="text"
                placeholder="Chercher.."
                value={search}
                onChange={handleChange}
            />
            {
                resultSearch.length === 0 && search !== '' ? msgDisplay('Pas de résultat!', 'red')
                    :
                    search === '' ?
                        <Suspense fallback={msgDisplay('Veuillez patienter!', 'red')}>
                            <div className="grid grid-cols-3 gap-3">
                                {data.map(({ id, name }) => {
                                    return (<CardXS key={id} name={name} noBtn />)
                                })}
                            </div>
                        </Suspense>
                        :
                        <Suspense fallback={msgDisplay('Veuillez patienter!', 'red')}>
                            <div className="grid grid-cols-3 gap-3">
                                {resultSearch.map(({ id, name }) => {
                                    return (
                                        <CardXS key={id} name={name} noBtn />
                                    )
                                })}
                            </div>
                        </Suspense>
            }
        </>
    )
}