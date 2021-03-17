import React, { useState } from 'react';
import { QueryClientProvider, QueryClient, useQuery } from 'react-query'
import Planet from '../models/Planet'

const queryClient = new QueryClient();

const Planets = () => {
    
    //invece di passare manualmente il numero della pagina usiamo lo useState
    const [page, setPage] = useState(1);
    const fetchPlanets = async (key) => await (await fetch(`http://swapi.dev/api/planets/?page=${page}`)).json();
    const {data, status} = useQuery(['planets', page], fetchPlanets);

    return (
        <div>
            <h2>Planets</h2>
            
            <button onClick={() => setPage(1)}>page 1</button>
            <button onClick={() => setPage(2)}>page 2</button>
            <button onClick={() => setPage(3)}>page 3</button>
            

            {status === 'loading' && (
                <div>Loading data</div>
            )}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {status === 'success' && (
                <div>
                    {data.results?.map(planet => <Planet key = {planet.name} planet={planet} />)}
                </div>
            )}            
        </div>
    );
}

//high order function
export default function Wrapped(){
    return (<QueryClientProvider client = {queryClient}>
        <Planets />
        </QueryClientProvider>
    );
}