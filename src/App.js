import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { useState } from 'react';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache()
});
const LIST_COUNTRIES = gql`
{
  countries {
    name
    code
    languages {
      code
      name
    }
    continent {
      code 
      name
    }
  }
}
`;


function App() {
  const [countryName, setCountryName] = useState('US');
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});

  const handleOnchange =(e) =>{
    e.preventDefault()
    console.log(e.target.value)
  }


  if (loading || error) {
    return <p>{error ? error.message : 'Loading...'}</p>;
  }

  return (
    <div className="App">
      {/* <select value={country} onChange={event => setCountry(event.target.value)}>
      {data.countries.map(country => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select> */}
    <input onChange={handleOnchange} type='text' />
    </div>
  );
}

export default App;
