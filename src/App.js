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
  const [country, setCountry] = useState('US');
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});


  if (loading || error) {
    return <p>{error ? error.message : 'Loading...'}</p>;
  }

  return (
    <div className="App">
      <select value={country} onChange={event => setCountry(event.target.value)}>
      {data.countries.map(country => (
        <option key={country.code} value={country.code}>
          { console.log(country.languages[0].name) }
          {(loading || error) && error ? error.message : 'loading...' }
          {country.name}
        </option>
      ))}
    </select>
    </div>
  );
}

export default App;
