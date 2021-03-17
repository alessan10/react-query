import React, { useState } from 'react';
import { QueryClientProvider, QueryClient, useQuery } from 'react-query'
import Person from '../models/Person'

const queryClient = new QueryClient();

const People = () => {

    const [page, setPage] = useState(1);
    const fetchPeople = async (key) => await (await fetch(`http://swapi.dev/api/people/?page=${page}`)).json();
    const {data, status} = useQuery(['people', page], fetchPeople);
    
    return (
        <div>
            <h2>People</h2>

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
                    {data.results.map(person => <Person key = {person.name} person={person} />)}
                </div>
            )}            
        </div>
    );
}

//high order function
export default function Wrapped(){
    return (<QueryClientProvider client = {queryClient}>
        <People />
        </QueryClientProvider>
    );
}