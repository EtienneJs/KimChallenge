import './App.css';
import Picker from 'emoji-picker-react';
import {
  ApolloClient,
  InMemoryCache,
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
    native 
    capital
    emoji
    currency
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
  const [countryName, setCountryName] = useState('');
  const [groupBy, setGroupBy] = useState('continent')
  const [filterDataName, setFilterDataName] = useState('')
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});


  if (loading || error) {
    return <p>{error ? error.message : 'Loading...'}</p>;
  }
  const handleOnchange =(e) =>{
    e.preventDefault()
    setCountryName(e.target.value)
    setFilterDataName(filter(countryName))
  }

  const handleGroup = (e) =>{
    e.preventDefault()
    setGroupBy(e.target.value)
  }
  const filter =( name )=>{
    if(name === ''){
      return []
  }
    name = countryName.toLowerCase()
    return data.countries.filter(data => data.name.toLowerCase().includes(name))
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
    <button onClick={handleGroup} value='continent'>Continent</button>
    <button onClick={handleGroup} value='languages'>Languages</button>
    {filterDataName &&
      filterDataName.map(data => 
        <div key={data.code}>
          <h1>{(groupBy === 'continent') ? data.continent.name :data.languages[0].name}</h1>
            <div className='card'>
              <div className='card-title'>
              <span >{(data.emoji)}</span> <p>{data.name}</p>
              </div>
              <div className='card-body'>
                <p>{data.native}</p>
                <p>{data.capital}</p>
                <p>{data.currency}</p>
              </div>

            </div>
        </div>
        
        )
    }
    </div>
  );
}

export default App;
