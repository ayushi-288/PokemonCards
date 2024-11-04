import { useEffect, useState } from 'react';
import './Pokemon.css';
import { PokemonCards } from './PokemonCards';
export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [search, setSearch] = useState('');

  const API = 'https://pokeapi.co/api/v2/pokemon?limit=45';
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailOfPokemons = data.results.map(async (curElem) => {
        const res = await fetch(curElem.url);
        const data = await res.json();
        return data;
      });

      const detailedResponse = await Promise.all(detailOfPokemons);
      console.log(detailedResponse);
      setPokemon(detailedResponse);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }
  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokemons"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.map((curElem) => {
              return <PokemonCards key={curElem.id} data={curElem} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
