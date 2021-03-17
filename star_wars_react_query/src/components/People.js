import React from 'react';
import { QueryClientProvider, QueryClient, useQuery } from 'react-query'
import Person from '../models/Person'

const queryClient = new QueryClient();

const fetchPeople = async () => {
    const res = await fetch('http://swapi.dev/api/people/');
    return res.json();
}

const People = () => {
    const {data, status} = useQuery('people', fetchPeople);
    console.log(data);
    return (
        <div>
            <h2>People</h2>

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