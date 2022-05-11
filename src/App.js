import './App.css';
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
  const [active, setActive] = useState()
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
    active ? setActive(false) : setActive(true)
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
     <div className='title'>
     <h1>Country Search</h1>
     </div>
   <div className='inputs-container'>
   <i className="fa-solid fa-magnifying-glass"></i><input placeholder='Some random text' onChange={handleOnchange} type='text' />
   </div>
   <div className='btns-container'>
     <h2>Group by: </h2>
   <button  onClick={handleGroup} className={active ? '':'btn-Active' } value='continent'>Continent</button>
    <button onClick={handleGroup} className={active ? 'btn-Active':'' } value='languages'>Languages</button>
   </div>
   <div className='containerAll-card'>
    {filterDataName &&
      filterDataName.map(data => 
        <div className='container-card' key={data.code}>
          <h2>{(groupBy === 'continent' ) ? data.continent.name  : (data.languages[0]) ? data.languages[0].name : 'No register' }</h2>
            <div className='card'>
              <div className='card-title'>
              <span >{(data.emoji)}</span> <p>{data.name}</p>
              </div>
              <div className='card-body'>
                <p>Native: {data.native}</p>
                <p>Capital:  {data.capital ? data.capital:'no register' }</p>
                <p>Currency:  {data.currency ? data.currency : 'no register' }</p>
              </div>

            </div>
        </div>
        
        )
    }
    </div>
    </div>
  );
}

export default App;
