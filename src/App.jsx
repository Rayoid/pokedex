import React, { useEffect, useState } from 'react';
import PokemonList from '../components/PokemonList';
import './App.css';

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {

  }, []);

  const handleSelectPokemon = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error('Error fetching selected Pokémon data:', error);
    }
  };

  const handleClose = () => {
    setSelectedPokemon(null);
  };

  const getAnimatedSprite = (name) => {
    const nameToIdMap = {
      mawile: 303,
      scyther: 123,
      scizor: 212,
      bulbasaur: 1,
      ivysaur: 2,
      venusaur: 3,
    };

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${nameToIdMap[name]}.png`;
  };

  const getWikiLink = (name) => {
    return `https://pokemon.fandom.com/es/wiki/${name.charAt(0).toUpperCase() + name.slice(1)}`;
  };

  const handleMouseOver = (pokemon) => {
    const colors = {
      mawile: '#d7bba3',
      scyther: '#7bc87c',
      scizor: '#9c8ed0',
      bulbasaur: '#78c850',
      ivysaur: '#78c850',
      venusaur: '#78c850',
    };
    setBackgroundColor(colors[pokemon] || '');
  };

  const handleMouseOut = () => {
    setBackgroundColor('');
  };

  return (
    <div className="App" style={{ backgroundColor }}>
      <div className="pokemon-grid">
        <PokemonList 
          evolutions={[
            { name: 'mawile', url: 'https://pokeapi.co/api/v2/pokemon/mawile' },
            { name: 'scyther', url: 'https://pokeapi.co/api/v2/pokemon/scyther' },
            { name: 'scizor', url: 'https://pokeapi.co/api/v2/pokemon/scizor' },
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur' },
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/ivysaur' },
            { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/venusaur' },
          ]}
          onSelectPokemon={handleSelectPokemon}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      </div>
      {selectedPokemon && (
        <div className={`overlay ${selectedPokemon.name.toLowerCase()}`}>
          <div className={`selected-pokemon ${selectedPokemon.name.toLowerCase()}`}>
            <button className="close-button" onClick={handleClose}>X</button>
            <img src={getAnimatedSprite(selectedPokemon.name.toLowerCase())} alt={selectedPokemon.name} className="pokemon-sprite" />
            <h2>{selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</h2>
            <p>Altura: {(selectedPokemon.height * 10).toFixed(2)} cm</p>
            <p>Peso: {(selectedPokemon.weight / 10).toFixed(2)} kg</p>
            <a className='link-button' href={getWikiLink(selectedPokemon.name.toLowerCase())} target="_blank" rel="noopener noreferrer">Wiki</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
